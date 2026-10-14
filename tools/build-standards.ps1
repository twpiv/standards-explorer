<#
  build-standards.ps1
  Regenerates data/generated/*.js from sources/NJSLS-Science-2026-Reference-Pack.md.

  Usage (from the standards-explorer folder):
      powershell -ExecutionPolicy Bypass -File tools\build-standards.ps1

  What it does
    1. Reads every performance expectation (section 6, [VERBATIM-NJ]).
    2. Reads the high school foundation details (section 7: DCI/SEP/CCC [NGSS],
       clarification and assessment-boundary paraphrases, NJ model placement, sources).
    3. Reads the K-12 DCI progression table (section 8, [COMPILED]).
    4. Reads the NJDOE model scope and sequence (section 9).
    5. Cross-checks the sources and stops with an error if anything is inconsistent:
       - 208 PEs total, 71 high school PEs, no duplicate codes
       - section 7 PE wording identical to section 6 wording
       - every DCI code used is a known component
       - every code in the progression table and model units exists
    6. Writes data/generated/standards.js, dci-progressions.js, model-curriculum.js.

  The generated files are never edited by hand. Curated content lives in data/*.js.
#>
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root 'sources\NJSLS-Science-2026-Reference-Pack.md'
$outDir = Join-Path $root 'data\generated'
$lines = [IO.File]::ReadAllLines($src, [Text.Encoding]::UTF8)
$CLIMATE_SYMBOL = [char]::ConvertFromUtf32(0x1F331)
$problems = New-Object System.Collections.ArrayList

# ---------- tiny JS literal serializer (readable, deterministic) ----------
function Esc([string]$s) {
  $s = $s.Replace('\', '\\').Replace('"', '\"').Replace("`r", '').Replace("`n", '\n')
  return '"' + $s + '"'
}
function ToJs($v, [int]$indent = 0) {
  $pad = '  ' * $indent
  if ($null -eq $v) { return 'null' }
  if ($v -is [bool]) { if ($v) { return 'true' } else { return 'false' } }
  if ($v -is [int] -or $v -is [double]) { return "$v" }
  if ($v -is [string]) { return (Esc $v) }
  if ($v -is [System.Collections.IDictionary]) {
    if ($v.Count -eq 0) { return '{}' }
    $parts = @()
    foreach ($k in $v.Keys) { $parts += ('  ' * ($indent + 1)) + (Esc ([string]$k)) + ': ' + (ToJs $v[$k] ($indent + 1)) }
    return "{`n" + ($parts -join ",`n") + "`n$pad}"
  }
  if ($v -is [System.Collections.IEnumerable]) {
    $items = @($v)
    if ($items.Count -eq 0) { return '[]' }
    $simple = $true
    foreach ($i in $items) { if (-not ($i -is [string] -or $i -is [int] -or $i -is [bool])) { $simple = $false } }
    if ($simple) { return '[' + (($items | ForEach-Object { ToJs $_ 0 }) -join ', ') + ']' }
    $parts = @()
    foreach ($i in $items) { $parts += ('  ' * ($indent + 1)) + (ToJs $i ($indent + 1)) }
    return "[`n" + ($parts -join ",`n") + "`n$pad]"
  }
  return (Esc ([string]$v))
}

function SectionRange([string]$startPrefix, [string]$endPrefix) {
  $s = -1; $e = $lines.Length
  for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($s -lt 0 -and $lines[$i].StartsWith($startPrefix)) { $s = $i; continue }
    if ($s -ge 0 -and $endPrefix -and $lines[$i].StartsWith($endPrefix)) { $e = $i; break }
  }
  if ($s -lt 0) { throw "Section not found: $startPrefix" }
  return @($s, $e)
}

function BandOf([string]$code) {
  if ($code -match '^HS-') { return '9-12' }
  if ($code -match '^MS-') { return '6-8' }
  if ($code -match '^(K|1|2|K-2)-') { return 'K-2' }
  if ($code -match '^(3|4|5|3-5)-') { return '3-5' }
  throw "Unknown band for $code"
}
function GradeOf([string]$code) {
  if ($code -match '^(K-2|3-5)-ETS') { return $Matches[1] }
  if ($code -match '^(HS|MS|K|\d)-') { return $Matches[1] }
  throw "Unknown grade for $code"
}
function DisciplineOf([string]$code) {
  if ($code -match '-(ESS)\d') { return 'ESS' }
  if ($code -match '-(ETS)\d') { return 'ETS' }
  if ($code -match '-(PS)\d') { return 'PS' }
  if ($code -match '-(LS)\d') { return 'LS' }
  throw "Unknown discipline for $code"
}
function CoreOf([string]$code) {
  if ($code -match '-(ESS\d|ETS\d|PS\d|LS\d)-') { return $Matches[1] }
  throw "Unknown core idea for $code"
}

# ---------- Section 4: DCI component names ----------
$dciNames = [ordered]@{}
$r = SectionRange '## 4.' '## 5.'
for ($i = $r[0]; $i -lt $r[1]; $i++) {
  if ($lines[$i] -match '^\|\s*([A-Z]+\d\.[A-Z])\s*\|\s*(.+?)\s*\|\s*$') { $dciNames[$Matches[1]] = $Matches[2] }
}

# ---------- Section 6: all PEs, verbatim ----------
$standards = [ordered]@{}
$coreNames = [ordered]@{}
$intros = [ordered]@{}
$r = SectionRange '## 6.' '## 7.'
$h3 = ''; $h4 = ''; $order = 0
for ($i = $r[0]; $i -lt $r[1]; $i++) {
  $ln = $lines[$i]
  if ($ln -match '^### (.+)$') { $h3 = $Matches[1].Trim(); $h4 = ''; continue }
  if ($ln -match '^#### (.+)$') { $h4 = $Matches[1].Trim(); continue }
  if ($ln -match '^> ?(.*)$') {
    $key = if ($h4) { "$h3 | $h4" } else { $h3 }
    if (-not $intros.Contains($key)) { $intros[$key] = New-Object System.Collections.ArrayList }
    [void]$intros[$key].Add($Matches[1].Trim())
    continue
  }
  if ($ln -match '^\*\*(?:\d-)?((?:PS|LS|ESS|ETS)\d): (.+)\*\*\s*$') {
    if (-not $coreNames.Contains($Matches[1])) { $coreNames[$Matches[1]] = $Matches[2].Trim() }
    continue
  }
  if ($ln -match '^- \*\*([A-Z0-9-]+)\*\*: (.+)$') {
    $code = $Matches[1]; $text = $Matches[2].Trim()
    $climate = $false
    if ($text.EndsWith($CLIMATE_SYMBOL, [StringComparison]::Ordinal)) { $climate = $true; $text = $text.Substring(0, $text.Length - $CLIMATE_SYMBOL.Length).Trim() }
    if ($standards.Contains($code)) { [void]$problems.Add("Duplicate code $code"); continue }
    $order++
    $standards[$code] = [ordered]@{
      code = $code; band = (BandOf $code); grade = (GradeOf $code); discipline = (DisciplineOf $code)
      core = (CoreOf $code); text = $text; climate = $climate; order = $order; gradeHeading = $h3
    }
  }
}

# ---------- Section 7: HS details ----------
$sepIds = [ordered]@{
  'Asking Questions and Defining Problems' = 'SEP1'; 'Developing and Using Models' = 'SEP2'
  'Planning and Carrying Out Investigations' = 'SEP3'; 'Analyzing and Interpreting Data' = 'SEP4'
  'Using Mathematics and Computational Thinking' = 'SEP5'; 'Constructing Explanations and Designing Solutions' = 'SEP6'
  'Engaging in Argument from Evidence' = 'SEP7'; 'Obtaining, Evaluating, and Communicating Information' = 'SEP8'
}
$cccIds = [ordered]@{
  'Patterns' = 'CCC1'; 'Cause and Effect' = 'CCC2'; 'Scale, Proportion, and Quantity' = 'CCC3'
  'Systems and System Models' = 'CCC4'; 'Energy and Matter' = 'CCC5'; 'Structure and Function' = 'CCC6'; 'Stability and Change' = 'CCC7'
}
function NoneOrText([string]$t) {
  $t = $t.Trim()
  if ($t -match '^\(?No clarification statement listed' -or $t -match '^None listed\.?$') { return $null }
  return $t
}
$r = SectionRange '## 7.' '## 8.'
$cur = $null
for ($i = $r[0]; $i -lt $r[1]; $i++) {
  $ln = $lines[$i]
  if ($ln -match '^### (HS-[A-Z0-9-]+) - (.+)$') {
    $code = $Matches[1]
    if (-not $standards.Contains($code)) { [void]$problems.Add("Section 7 has unknown code $code"); $cur = $null; continue }
    $cur = $standards[$code]; $cur['title'] = $Matches[2].Trim(); continue
  }
  if ($null -eq $cur) { continue }
  if ($ln -match '^- \*\*PE \[VERBATIM-NJ\]:\*\* (.+)$') {
    $t = $Matches[1].Trim(); if ($t.EndsWith($CLIMATE_SYMBOL, [StringComparison]::Ordinal)) { $t = $t.Substring(0, $t.Length - $CLIMATE_SYMBOL.Length).Trim() }
    if ($t -cne $cur['text']) { [void]$problems.Add("Wording mismatch between sections 6 and 7 for $($cur['code'])") }
  }
  elseif ($ln -match '^- \*\*Summary \[INTERPRETATION\]:\*\* (.+)$') { $cur['summary'] = $Matches[1].Trim() }
  elseif ($ln -match '^- \*\*DCI \[NGSS\]:\*\* (.+)$') {
    $prim = New-Object System.Collections.ArrayList; $sec = New-Object System.Collections.ArrayList
    foreach ($part in ($Matches[1] -split ';')) {
      $p = $part.Trim()
      if ($p -match '^([A-Z]+\d\.[A-Z])') {
        $dc = $Matches[1]
        if (-not $dciNames.Contains($dc)) { [void]$problems.Add("Unknown DCI $dc in $($cur['code'])") }
        if ($p -match '\(secondary\)') { [void]$sec.Add($dc) } else { [void]$prim.Add($dc) }
      }
    }
    $cur['dci'] = $prim.ToArray(); $cur['dciSecondary'] = $sec.ToArray()
  }
  elseif ($ln -match '^- \*\*SEP \[NGSS\]:\*\* (.+)$') {
    $ids = New-Object System.Collections.ArrayList
    foreach ($part in ($Matches[1] -split ';')) { $n = $part.Trim().TrimEnd('.'); if ($sepIds.Contains($n)) { [void]$ids.Add($sepIds[$n]) } else { [void]$problems.Add("Unknown SEP '$n' in $($cur['code'])") } }
    $cur['sep'] = $ids.ToArray()
  }
  elseif ($ln -match '^- \*\*CCC \[NGSS\]:\*\* (.+)$') {
    $raw = $Matches[1].Trim()
    $ids = New-Object System.Collections.ArrayList
    if ($raw -match '^None listed') { $cur['cccNote'] = $raw }
    else { foreach ($part in ($raw -split ';')) { $n = $part.Trim().TrimEnd('.'); if ($cccIds.Contains($n)) { [void]$ids.Add($cccIds[$n]) } else { [void]$problems.Add("Unknown CCC '$n' in $($cur['code'])") } } }
    $cur['ccc'] = $ids.ToArray()
  }
  elseif ($ln -match '^- \*\*Clarification \[PARAPHRASE\]:\*\* (.+)$') { $cur['clarification'] = (NoneOrText $Matches[1]) }
  elseif ($ln -match '^- \*\*Assessment boundary \[PARAPHRASE\]:\*\* (.+)$') { $cur['boundary'] = (NoneOrText $Matches[1]) }
  elseif ($ln -match '^- \*\*NJ model placement:\*\* (.+)$') {
    $pl = New-Object System.Collections.ArrayList
    foreach ($part in ($Matches[1] -split ';')) {
      $p = $part.Trim()
      if ($p -match '^([BCP]\.\d)(?:\s*\(([MC,]+)\))?$') {
        $flags = "$($Matches[2])"
        [void]$pl.Add([ordered]@{ unit = $Matches[1]; multiUnit = ($flags -match 'M'); crossCourse = ($flags -match 'C') })
      } else { [void]$problems.Add("Unparsed model placement '$p' in $($cur['code'])") }
    }
    $cur['modelPlacement'] = $pl.ToArray()
  }
  elseif ($ln -match '^- \*\*Sources:\*\* (.+)$') { $cur['sources'] = @($Matches[1] -split '\s;\s' | ForEach-Object { $_.Trim() }) }
}

# ---------- Section 8: DCI progression table (compiled) ----------
$progressions = [ordered]@{}
$r = SectionRange '## 8.' '## 9.'
for ($i = $r[0]; $i -lt $r[1]; $i++) {
  $ln = $lines[$i]
  if ($ln -match '^\|\s*([A-Z]+\d\.[A-Z]) [^|]+\|([^|]*)\|([^|]*)\|([^|]*)\|([^|]*)\|\s*$') {
    $dc = $Matches[1]
    $row = [ordered]@{}
    $bands = @('K-2', '3-5', '6-8', '9-12')
    for ($b = 0; $b -lt 4; $b++) {
      $cell = $Matches[$b + 2].Trim()
      $codes = @()
      if ($cell) { $codes = @($cell -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ }) }
      foreach ($c in $codes) {
        if (-not $standards.Contains($c)) { [void]$problems.Add("Progression table: unknown code $c ($dc)") }
        elseif ((BandOf $c) -ne $bands[$b]) { [void]$problems.Add("Progression table: $c listed in wrong band for $dc") }
      }
      $row[$bands[$b]] = $codes
    }
    $progressions[$dc] = $row
    foreach ($band in $row.Keys) { foreach ($c in $row[$band]) {
      if ($standards.Contains($c)) {
        if (-not $standards[$c].Contains('dciProgression')) { $standards[$c]['dciProgression'] = New-Object System.Collections.ArrayList }
        [void]$standards[$c]['dciProgression'].Add($dc)
      } } }
  }
}
foreach ($c in $standards.Keys) { if ($standards[$c].Contains('dciProgression')) { $standards[$c]['dciProgression'] = $standards[$c]['dciProgression'].ToArray() } else { $standards[$c]['dciProgression'] = @() } }

# ---------- Section 9: model scope and sequence ----------
$model = [ordered]@{}
$r = SectionRange '## 9.' '## 10.'
$course = $null
for ($i = $r[0]; $i -lt $r[1]; $i++) {
  $ln = $lines[$i]
  if ($ln -match '^### (Biology|Chemistry|Physics)') { $course = $Matches[1].ToLower(); $model[$course] = New-Object System.Collections.ArrayList; continue }
  if ($course -and $ln -match '^\|\s*([BCP]\.\d)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*$') {
    $unitId = $Matches[1]; $unitTitle = $Matches[2]; $unitList = $Matches[3]
    $pes = New-Object System.Collections.ArrayList
    foreach ($part in ($unitList -split ',(?![^(]*\))')) {
      $p = $part.Trim()
      if ($p -match '^((?:PS|LS|ESS|ETS)\d-\d)(?:\s*\(([MC, ]+)\))?$') {
        $code = 'HS-' + $Matches[1]; $flags = "$($Matches[2])"
        if (-not $standards.Contains($code)) { [void]$problems.Add("Model unit lists unknown $code") }
        [void]$pes.Add([ordered]@{ code = $code; multiUnit = ($flags -match 'M'); crossCourse = ($flags -match 'C') })
      } else { [void]$problems.Add("Unparsed model entry '$p'") }
    }
    [void]$model[$course].Add([ordered]@{ id = $unitId; title = $unitTitle; pes = $pes.ToArray() })
  }
}
foreach ($k in @($model.Keys)) { $model[$k] = $model[$k].ToArray() }

# ---------- Cross-checks ----------
$all = @($standards.Values)
$hs = @($all | Where-Object { $_.band -eq '9-12' })
if ($all.Count -ne 208) { [void]$problems.Add("Expected 208 PEs, found $($all.Count)") }
if ($hs.Count -ne 71) { [void]$problems.Add("Expected 71 HS PEs, found $($hs.Count)") }
foreach ($s in $hs) {
  foreach ($f in @('dci', 'sep', 'ccc', 'sources', 'title')) { if (-not $s.Contains($f)) { [void]$problems.Add("$($s.code) missing $f from section 7") } }
}
if ($standards['HS-ESS3-2'].text -notmatch 'conserving' -or $standards['HS-ESS3-2'].text -match 'cost-benefit ratios') { [void]$problems.Add('HS-ESS3-2 is not the revised 2026 wording') }

if ($problems.Count -gt 0) {
  Write-Host "BUILD FAILED - $($problems.Count) problem(s):" -ForegroundColor Red
  $problems | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
  exit 1
}

# ---------- Write ----------
$stamp = (Get-Date).ToString('yyyy-MM-dd')
$header = "/* GENERATED by tools/build-standards.ps1 from sources/NJSLS-Science-2026-Reference-Pack.md on $stamp.`n   Do not edit by hand: fix the source pack or the script, then rebuild. */`nwindow.SE = window.SE || {}; SE.data = SE.data || {};`n"
$utf8 = New-Object System.Text.UTF8Encoding($false)

$introOut = [ordered]@{}
foreach ($k in $intros.Keys) { $introOut[$k] = ($intros[$k].ToArray() -join "`n") }

$meta = [ordered]@{
  standardsVersion = '2026 NJSLS-Science (readopted May 2026)'
  sourceFile = 'sources/NJSLS-Science-2026-Reference-Pack.md'
  generated = $stamp
  totalPEs = $all.Count
  highSchoolPEs = $hs.Count
  landingUrl = 'https://nj.gov/education/standards/science/2026/'
  wordDocUrl = 'https://www.nj.gov/education/standards/science/Docs/2026_NJSLS_Science.docx'
  progressionsUrl = 'https://www.nj.gov/education/standards/stamp/docs/Science_Disciplinary_Progressions.pdf'
  revisionsUrl = 'https://www.nj.gov/education/standards/stamp/docs/Revisions_2026_NJSLS_S.docx'
  stampUrl = 'https://www.nj.gov/education/standards/stamp/'
  modelScopeUrl = 'https://nj.gov/education/standards/science/accessible_9to12scope.shtml'
  modelFrameworkUrl = 'https://www.nj.gov/education/standards/science/9to12_framework.shtml'
  climateSymbolMeaning = 'performance expectation directly related to climate, climate change, or the effects of a changing climate on environmental systems.'
}

$out1 = $header + "SE.data.meta = " + (ToJs $meta) + ";`n`n" +
  "/* DCI component names [VERBATIM-NJ]. */`nSE.data.dciNames = " + (ToJs $dciNames) + ";`n`n" +
  "/* Disciplinary core idea names [VERBATIM-NJ headings]. */`nSE.data.coreNames = " + (ToJs $coreNames) + ";`n`n" +
  "/* NJDOE grade-level and discipline introductions [VERBATIM-NJ]. */`nSE.data.gradeIntros = " + (ToJs $introOut) + ";`n`n" +
  "/* All 208 performance expectations. text = [VERBATIM-NJ]. For HS PEs: dci/dciSecondary/sep/ccc = [NGSS] foundation boxes;`n   clarification/boundary = [PARAPHRASE] of NGSS; title/summary = [INTERPRETATION] short labels; modelPlacement = NJDOE model units.`n   dciProgression = components under which the PE appears in the [COMPILED] K-12 progression table. */`nSE.data.standards = " + (ToJs $all) + ";`n"
[IO.File]::WriteAllText((Join-Path $outDir 'standards.js'), $out1, $utf8)

$out2 = $header + "/* K-12 developmental progressions by DCI component [COMPILED] from the NJDOE Science Disciplinary Progressions`n   plus NGSS foundation-box DCI tags (reference pack section 8). Verify against STAMP before relying on a row. */`nSE.data.dciProgressions = " + (ToJs $progressions) + ";`n"
[IO.File]::WriteAllText((Join-Path $outDir 'dci-progressions.js'), $out2, $utf8)

$out3 = $header + "/* NJDOE High School Model Scope and Sequence (one example, not a requirement). multiUnit = (M), crossCourse = (C). */`nSE.data.modelCurriculum = " + (ToJs $model) + ";`n"
[IO.File]::WriteAllText((Join-Path $outDir 'model-curriculum.js'), $out3, $utf8)

Write-Host "OK: $($all.Count) PEs ($($hs.Count) HS), $($dciNames.Count) DCI components, $($progressions.Count) progression rows, model courses: $(@($model.Keys) -join ', ')" -ForegroundColor Green
