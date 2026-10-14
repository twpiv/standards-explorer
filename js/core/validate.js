/* Data validator. Run it from tools/validate.html or the test suite.
   Errors mean the dataset is inconsistent or claims something it cannot support; warnings deserve a look. */
(function (SE) {
  'use strict';
  function validate() {
    var D = SE.data, S = SE.store, E = SE.engine;
    var errors = [], warnings = [];
    function err(m) { errors.push(m); }
    function warn(m) { warnings.push(m); }
    var CODE_RE = /^(K|[1-5]|MS|HS|K-2|3-5)-(PS[1-4]|LS[1-4]|ESS[1-3]|ETS1)-\d{1,2}$/;

    /* ---------- official standards ---------- */
    var seen = {};
    D.standards.forEach(function (s) {
      if (!CODE_RE.test(s.code)) err('Malformed code: ' + s.code);
      if (seen[s.code]) err('Duplicate code: ' + s.code);
      seen[s.code] = true;
      if (!s.text || s.text.length < 20) err('Missing or short PE text: ' + s.code);
      if (/🌱/.test(s.text)) err('Climate symbol left inside text: ' + s.code);
      if (s.band === '9-12') {
        ['dci', 'dciSecondary', 'sep', 'ccc', 'sources'].forEach(function (f) { if (!Array.isArray(s[f])) err(s.code + ' missing ' + f); });
        if (!s.dci || !s.dci.length) err(s.code + ' has no primary DCI');
        if (!s.sep || !s.sep.length) err(s.code + ' has no SEP');
        (s.dci || []).concat(s.dciSecondary || []).forEach(function (d) { if (!D.dciNames[d]) err(s.code + ' unknown DCI ' + d); });
        (s.sep || []).forEach(function (p) { if (!D.seps[p]) err(s.code + ' unknown SEP ' + p); });
        (s.ccc || []).forEach(function (c) { if (!D.cccs[c]) err(s.code + ' unknown CCC ' + c); });
        if (!s.ccc.length && !s.cccNote) warn(s.code + ' lists no CCC and has no note explaining why');
        (s.sources || []).forEach(function (u) { if (!/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}\//i.test(u)) err(s.code + ' malformed source URL ' + u); });
      }
    });
    var hs = D.standards.filter(function (s) { return s.band === '9-12'; });
    if (D.standards.length !== 208) err('Expected 208 PEs, found ' + D.standards.length);
    if (hs.length !== 71) err('Expected 71 HS PEs, found ' + hs.length);
    var e32 = S.get('HS-ESS3-2');
    if (!e32 || e32.text.indexOf('conserving') < 0 || e32.text.indexOf('cost-benefit ratios') >= 0 || e32.text.indexOf('geopolitical') < 0) err('HS-ESS3-2 does not carry the revised 2026 wording');
    var k33 = S.get('K-ESS3-3'); if (k33 && /climate change/.test(k33.text)) err('K-ESS3-3 carries the pre-2026 wording');
    var e31 = S.get('3-ESS3-1'); if (e31 && /climate change/.test(e31.text)) err('3-ESS3-1 carries the pre-2026 wording');
    var k2e = S.get('K-2-ETS1-1'); if (k2e && /climate change/.test(k2e.text)) err('K-2-ETS1-1 carries the pre-2026 wording');

    Object.keys(D.dciProgressions).forEach(function (d) {
      if (!D.dciNames[d]) err('Progression row for unknown DCI ' + d);
      Object.keys(D.dciProgressions[d]).forEach(function (b) {
        D.dciProgressions[d][b].forEach(function (c) { if (!S.exists(c)) err('Progression ' + d + ' lists unknown ' + c); else if (S.get(c).band !== b) err('Progression ' + d + ': ' + c + ' is in band ' + b + ' but is ' + S.get(c).band); });
      });
    });

    /* ---------- courses and model ---------- */
    Object.keys(D.courses).forEach(function (c) {
      D.courses[c].starters.forEach(function (x) { if (!S.isHS(x.code)) err('Course ' + c + ' starter is not a HS PE: ' + x.code); });
      if (!D.modelCurriculum[c]) err('No model curriculum for course ' + c);
    });

    /* ---------- interpretations ---------- */
    Object.keys(D.interpretations).forEach(function (code) {
      var it = D.interpretations[code], s = S.get(code);
      if (!s) { err('Interpretation for unknown code ' + code); return; }
      if (s.band !== '9-12') warn('Interpretation for a non-HS PE: ' + code);
      ['bigIdea', 'demonstrate', 'within', 'boundaries', 'threeD', 'evidence'].forEach(function (f) { if (!it[f] || (Array.isArray(it[f]) && !it[f].length)) err('Interpretation ' + code + ' missing ' + f); });
      Object.keys(it.phrases || {}).forEach(function (ph) {
        var info = it.phrases[ph];
        if (s.text.indexOf(ph) < 0) err('Interpretation ' + code + ': phrase not found verbatim in PE text: "' + ph + '"');
        if (info.dim === 'SEP' && !D.seps[info.ref]) err('Interpretation ' + code + ': bad SEP ref ' + info.ref);
        if (info.dim === 'DCI' && !D.dciNames[info.ref]) err('Interpretation ' + code + ': bad DCI ref ' + info.ref);
        if (info.dim === 'CCC' && !D.cccs[info.ref]) err('Interpretation ' + code + ': bad CCC ref ' + info.ref);
        if (info.dim === 'SEP' && s.sep.indexOf(info.ref) < 0) warn('Interpretation ' + code + ': phrase "' + ph + '" maps to ' + info.ref + ', which is not this PE’s official SEP');
        if (info.dim === 'CCC' && s.ccc.indexOf(info.ref) < 0) warn('Interpretation ' + code + ': phrase "' + ph + '" maps to CCC ' + info.ref + ', which is not this PE’s official CCC');
        if (info.dim === 'DCI' && s.dci.concat(s.dciSecondary).indexOf(info.ref) < 0) warn('Interpretation ' + code + ': phrase "' + ph + '" maps to DCI ' + info.ref + ', which is not in this PE’s foundation box');
      });
    });

    /* ---------- prior learning ---------- */
    Object.keys(D.priorLearning).forEach(function (code) {
      var p = D.priorLearning[code], s = S.get(code);
      if (!s) { err('Prior-learning entry for unknown ' + code); return; }
      var computed = E.priorLearning(code), status = {};
      computed.steps.forEach(function (x) { status[x.code] = x.status; });
      var dup = {};
      p.steps.forEach(function (st) {
        if (!S.exists(st.code)) { err('Prior learning ' + code + ': unknown step ' + st.code); return; }
        if (dup[st.code]) err('Prior learning ' + code + ': duplicate step ' + st.code); dup[st.code] = true;
        if (S.bandIndex(S.get(st.code).band) >= S.bandIndex(s.band)) err('Prior learning ' + code + ': ' + st.code + ' is not from an earlier grade band');
        if (st.expect && st.expect !== status[st.code]) err('Prior learning ' + code + ': ' + st.code + ' expected "' + st.expect + '" but the progression table makes it "' + status[st.code] + '"');
        if (!st.role || /\b(mastered|know|knows)\b/i.test(st.role)) warn('Prior learning ' + code + ': check wording of role for ' + st.code + ' (should describe intended learning)');
      });
      if (!p.ideaDevelops || !p.practiceDevelops) err('Prior learning ' + code + ' is missing narrative fields');
    });

    /* ---------- relationships ---------- */
    var CATS = { disciplinary: 1, practice: 1, crosscutting: 1, interdisciplinary: 1, engineering: 1, integration: 1 };
    var rid = {}, pairs = {};
    D.relationships.forEach(function (r) {
      if (rid[r.id]) err('Duplicate relationship id ' + r.id); rid[r.id] = true;
      var a = r.between[0], b = r.between[1];
      if (!S.exists(a) || !S.exists(b)) { err('Relationship ' + r.id + ' references an unknown code'); return; }
      if (a === b) err('Relationship ' + r.id + ' links a PE to itself');
      var key = [a, b].sort().join('|'); if (pairs[key]) err('Two relationships for the same pair: ' + key); pairs[key] = true;
      if (!CATS[r.category]) err('Relationship ' + r.id + ' has unknown category ' + r.category);
      if (r.status !== 'documented' && r.status !== 'suggested') err('Relationship ' + r.id + ' has unknown status ' + r.status);
      if ([1, 2, 3].indexOf(r.strength) < 0) err('Relationship ' + r.id + ' strength must be 1, 2, or 3');
      if (!r.why || r.why.length < 40) err('Relationship ' + r.id + ' needs an explanation');
      var ev = r.evidence || [];
      if (!ev.length) err('Relationship ' + r.id + ' has no evidence entry');
      if (r.status === 'documented' && !ev.some(function (e) { return e.kind !== 'reasoning'; })) err('Relationship ' + r.id + ' is "documented" but has only reasoning as evidence');
      var sh = E.shared(a, b);
      ev.forEach(function (e) {
        if (e.kind === 'shared-dci' && !sh.dci.length) err('Relationship ' + r.id + ' claims a shared DCI, but the foundation boxes share none');
        if (e.kind === 'model-unit' && !sh.units.length) err('Relationship ' + r.id + ' claims a shared NJDOE model unit, but none is shared');
        var units = (e.note.match(/\b[BCP]\.\d\b/g) || []);
        if (e.kind === 'model-unit') units.forEach(function (u) { if (sh.units.indexOf(u) < 0) err('Relationship ' + r.id + ' names model unit ' + u + ', which does not contain both PEs'); });
      });
      if (r.status === 'suggested' && (sh.dci.length || sh.units.length)) warn('Relationship ' + r.id + ' is "suggested" although the PEs share ' + (sh.dci.length ? 'DCI ' + sh.dci.join(',') : 'model unit ' + sh.units.join(',')) + '; consider documenting it');
      if (!S.isHS(a) || !S.isHS(b)) warn('Relationship ' + r.id + ' involves a non-HS PE');
    });

    /* ---------- phenomena ---------- */
    var pid = {}, ALIGN = { direct: 1, application: 1, extension: 1 }, CPLX = { accessible: 1, moderate: 1, complex: 1 };
    D.phenomena.forEach(function (p) {
      if (pid[p.id]) err('Duplicate phenomenon id ' + p.id); pid[p.id] = true;
      if (!p.standards.length) err('Phenomenon ' + p.id + ' lists no standards');
      p.standards.forEach(function (c) { if (!S.exists(c)) err('Phenomenon ' + p.id + ' unknown standard ' + c); if (!p.alignment || !ALIGN[p.alignment[c]]) err('Phenomenon ' + p.id + ' needs an alignment for ' + c); });
      Object.keys(p.alignment || {}).forEach(function (c) { if (p.standards.indexOf(c) < 0) err('Phenomenon ' + p.id + ' alignment for unlisted ' + c); });
      if (!CPLX[p.complexity]) err('Phenomenon ' + p.id + ' bad complexity');
      ['phenomenon', 'question', 'connection'].forEach(function (f) { if (!p[f]) err('Phenomenon ' + p.id + ' missing ' + f); });
      if (!p.evidence || !p.evidence.length) err('Phenomenon ' + p.id + ' needs possible evidence');
      (p.others || []).forEach(function (o) { if (!S.exists(o.code)) err('Phenomenon ' + p.id + ' other-connection unknown ' + o.code); });
      if (SE.icon && !SE.icon.has(p.icon)) warn('Phenomenon ' + p.id + ' icon "' + p.icon + '" not found');
      if ((p.alignment || {})[p.standards[0]] === 'extension' && !p.caveats) err('Phenomenon ' + p.id + ' is an extension but explains no caveats');
    });

    /* ---------- reflections and topics ---------- */
    Object.keys(D.reflections.byStandard).forEach(function (c) { if (!S.exists(c)) err('Reflection for unknown ' + c); });
    var tid = {};
    D.topics.forEach(function (t) {
      if (tid[t.id]) err('Duplicate topic ' + t.id); tid[t.id] = true;
      t.connections.forEach(function (c) {
        if (!S.exists(c.code)) err('Topic ' + t.id + ' unknown ' + c.code);
        else if (c.fit === 'earlier' && S.isHS(c.code)) err('Topic ' + t.id + ': ' + c.code + ' marked "earlier" but is a HS PE');
        else if (c.fit !== 'earlier' && !S.isHS(c.code)) err('Topic ' + t.id + ': ' + c.code + ' is not HS but is not marked "earlier"');
        if (['direct', 'partial', 'contextual', 'earlier'].indexOf(c.fit) < 0) err('Topic ' + t.id + ' bad fit ' + c.fit);
      });
      if (t.connections.filter(function (c) { return c.fit === 'direct'; }).length > 6) warn('Topic ' + t.id + ' has many "direct" connections; check that a topic is not being equated with PEs');
    });

    var stats = {
      totalPEs: D.standards.length, highSchool: hs.length,
      curatedInterpretations: Object.keys(D.interpretations).length,
      curatedProgressions: Object.keys(D.priorLearning).length,
      relationships: D.relationships.length,
      documentedRelationships: D.relationships.filter(function (r) { return r.status === 'documented'; }).length,
      phenomena: D.phenomena.length, topics: D.topics.length
    };
    return { errors: errors, warnings: warnings, stats: stats };
  }
  SE.validate = validate;
})(window.SE = window.SE || {});
