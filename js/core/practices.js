/* Practice-language detection and phrase segmentation for highlighting PE wording.
   Highlights come from two sources:
     - curated phrases in data/interpretations.js (tagged SEP, DCI, or CCC, with a note)
     - the practice patterns in data/vocab.js (performance language; SEP family)
*/
(function (SE) {
  'use strict';
  var compiled = null;

  function patterns() {
    if (!compiled) {
      compiled = SE.data.practicePatterns.map(function (p) { return { re: new RegExp('\\b' + p.re + '\\b', 'i'), sep: p.sep }; });
    }
    return compiled;
  }

  /* All non-overlapping practice phrases in a PE's text, in order of appearance. */
  function findPractices(text) {
    var hits = [];
    patterns().forEach(function (p) {
      var re = new RegExp(p.re.source, 'gi'), m;
      while ((m = re.exec(text))) {
        hits.push({ start: m.index, end: m.index + m[0].length, text: m[0], sep: p.sep, kind: 'practice' });
        if (m[0].length === 0) re.lastIndex++;
      }
    });
    hits.sort(function (a, b) { return a.start - b.start || (b.end - b.start) - (a.end - a.start); });
    var out = [], lastEnd = -1;
    hits.forEach(function (h) { if (h.start >= lastEnd) { out.push(h); lastEnd = h.end; } });
    return out;
  }

  /* The opening performance phrase (used for short labels and K-8 practice family). */
  function leadPhrase(text) {
    var f = findPractices(text);
    return f.length && f[0].start === 0 ? f[0] : (f[0] || null);
  }

  /* Segment a PE's official text into plain runs and highlighted phrases.
     Curated phrases win over pattern matches; overlaps are resolved by earliest start, then longest. */
  function segments(code) {
    var s = SE.store.get(code); if (!s) return [];
    var text = s.text, marks = [];
    var interp = (SE.data.interpretations || {})[code];
    if (interp && interp.phrases) {
      Object.keys(interp.phrases).forEach(function (ph) {
        var i = text.indexOf(ph);
        if (i >= 0) { var info = interp.phrases[ph]; marks.push({ start: i, end: i + ph.length, text: ph, kind: 'curated', dim: info.dim, ref: info.ref, note: info.note }); }
      });
    }
    findPractices(text).forEach(function (h) {
      var officialSep = (s.sep && s.sep.length === 1) ? s.sep[0] : null;
      marks.push({ start: h.start, end: h.end, text: h.text, kind: 'practice', dim: 'SEP', ref: officialSep || h.sep, inferred: !officialSep });
    });
    marks.sort(function (a, b) {
      if (a.start !== b.start) return a.start - b.start;
      if (a.kind !== b.kind) return a.kind === 'curated' ? -1 : 1;
      return (b.end - b.start) - (a.end - a.start);
    });
    var chosen = [], lastEnd = 0;
    marks.forEach(function (m) { if (m.start >= lastEnd) { chosen.push(m); lastEnd = m.end; } });
    var segs = [], pos = 0;
    chosen.forEach(function (m) {
      if (m.start > pos) segs.push({ text: text.slice(pos, m.start) });
      segs.push(m); pos = m.end;
    });
    if (pos < text.length) segs.push({ text: text.slice(pos) });
    return segs;
  }

  SE.practices = { findPractices: findPractices, leadPhrase: leadPhrase, segments: segments };
})(window.SE = window.SE || {});
