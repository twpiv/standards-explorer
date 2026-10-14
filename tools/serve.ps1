<#
  serve.ps1 - a tiny local web server for previewing and testing Standards Explorer.
  Usage (from the standards-explorer folder):
      powershell -ExecutionPolicy Bypass -File tools\serve.ps1            # http://localhost:8080/
      powershell -ExecutionPolicy Bypass -File tools\serve.ps1 -Port 5173
  Then open http://localhost:8080/ (app) or http://localhost:8080/tests/ (tests). Press Ctrl+C to stop.
  The app also works by double-clicking index.html; a server is only needed for some browsers' stricter file rules.
#>
param([int]$Port = 8080)
$root = Split-Path -Parent $PSScriptRoot
$types = @{ '.html' = 'text/html; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'; '.css' = 'text/css; charset=utf-8';
  '.json' = 'application/json'; '.svg' = 'image/svg+xml'; '.png' = 'image/png'; '.md' = 'text/markdown; charset=utf-8'; '.ico' = 'image/x-icon' }
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $root at http://localhost:$Port/  (Ctrl+C to stop)"
try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    try {
    $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
    if ($path -eq '' -or $path.EndsWith('/')) { $path = $path + 'index.html' }
    $full = [IO.Path]::GetFullPath((Join-Path $root $path))
    if (-not $full.StartsWith($root) -or -not (Test-Path $full -PathType Leaf)) {
      $ctx.Response.StatusCode = 404; $b = [Text.Encoding]::UTF8.GetBytes('Not found'); $ctx.Response.OutputStream.Write($b, 0, $b.Length)
    } else {
      $ext = [IO.Path]::GetExtension($full).ToLower()
      $ctx.Response.ContentType = $(if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' })
      $ctx.Response.Headers.Add('Cache-Control', 'no-store')
      $bytes = [IO.File]::ReadAllBytes($full)
      $ctx.Response.ContentLength64 = $bytes.Length
      if ($ctx.Request.HttpMethod -ne 'HEAD') { $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length) }
    }
    } catch { Write-Host "Request error: $($_.Exception.Message)" }
    try { $ctx.Response.OutputStream.Close() } catch { }
  }
} finally { $listener.Stop() }
