/* Standards store: indexes over the generated and curated data. Read-only. */
(function (SE) {
  'use strict';
  var D = SE.data;
  var byCode = {}, byDci = {}, bySep = {}, byCcc = {}, unitIndex = {}, unitsByCode = {};

  D.standards.forEach(function (s) {
    byCode[s.code] = s;
    if (s.band === '9-12') {
      (s.dci || []).concat(s.dciSecondary || []).forEach(function (d) { (byDci[d] = byDci[d] || []).push(s.code); });
      (s.sep || []).forEach(function (p) { (bySep[p] = bySep[p] || []).push(s.code); });
      (s.ccc || []).forEach(function (c) { (byCcc[c] = byCcc[c] || []).push(s.code); });
    }
  });

  Object.keys(D.modelCurriculum).forEach(function (course) {
    D.modelCurriculum[course].forEach(function (u) {
      unitIndex[u.id] = { id: u.id, title: u.title, course: course, pes: u.pes };
      u.pes.forEach(function (p) { (unitsByCode[p.code] = unitsByCode[p.code] || []).push({ unit: u.id, title: u.title, course: course, multiUnit: p.multiUnit, crossCourse: p.crossCourse }); });
    });
  });

  function get(code) { return byCode[code] || null; }
  function exists(code) { return !!byCode[code]; }
  function all() { return D.standards; }
  function highSchool() { return D.standards.filter(function (s) { return s.band === '9-12'; }); }
  function isHS(code) { var s = byCode[code]; return !!s && s.band === '9-12'; }

  /* All DCI components for a PE: foundation box (HS) plus the compiled progression table. */
  function dciAll(code) {
    var s = byCode[code]; if (!s) return [];
    return SE.util.uniq((s.dci || []).concat(s.dciSecondary || []).concat(s.dciProgression || []));
  }

  function dciName(id) { return D.dciNames[id] || id; }
  function sepName(id) { return (D.seps[id] || {}).name || id; }
  function cccName(id) { return (D.cccs[id] || {}).name || id; }
  function disciplineLabel(d) { return (D.disciplines[d] || {}).label || d; }
  function bandLabel(b) { var x = D.bands.filter(function (y) { return y.id === b; })[0]; return x ? x.label : b; }
  function bandLong(b) { var x = D.bands.filter(function (y) { return y.id === b; })[0]; return x ? x.long : b; }
  function bandIndex(b) { for (var i = 0; i < D.bands.length; i++) if (D.bands[i].id === b) return i; return -1; }

  /* Short display label. HS PEs have an app-written title; other PEs get a trimmed form of their official wording. */
  function shortLabel(code) {
    var s = byCode[code]; if (!s) return code;
    if (s.title) return s.title;
    var t = s.text;
    var hit = SE.practices ? SE.practices.leadPhrase(t) : null;
    if (hit && hit.end < t.length - 10) {
      t = t.slice(hit.end).replace(/^[\s,]*(?:to|that|of|about|for|on)\s+/i, '');
      t = t.charAt(0).toUpperCase() + t.slice(1);
    }
    return SE.util.truncate(t.replace(/\.$/, ''), 64);
  }

  function gradeLabel(code) {
    var s = byCode[code]; if (!s) return '';
    if (s.grade === 'HS') return 'High School';
    if (s.grade === 'MS') return 'Middle School';
    if (s.grade === 'K') return 'Kindergarten';
    if (s.grade === 'K-2') return 'Grades K–2';
    if (s.grade === '3-5') return 'Grades 3–5';
    return 'Grade ' + s.grade;
  }

  function withDci(id) { return (byDci[id] || []).slice(); }
  function withSep(id) { return (bySep[id] || []).slice(); }
  function withCcc(id) { return (byCcc[id] || []).slice(); }
  function unitsFor(code) { return (unitsByCode[code] || []).slice(); }
  function unit(id) { return unitIndex[id] || null; }

  function courseOf(code) {
    var u = unitsByCode[code];
    if (u && u.length) {
      var notCross = u.filter(function (x) { return !x.crossCourse; });
      return (notCross[0] || u[0]).course;
    }
    var s = byCode[code];
    return s && s.discipline === 'LS' ? 'biology' : null;
  }

  function sourceLinks(code) {
    var s = byCode[code]; if (!s) return [];
    if (s.sources && s.sources.length) return s.sources.slice();
    var page = { 'K-2': null, '3-5': null }[s.band];
    if (s.band === '6-8') {
      var m = { PS: 'ps', LS: 'ls', ESS: 'ess', ETS: 'ets' }[s.discipline];
      return ['https://nj.gov/education/standards/science/2026/ms/' + m + '.shtml'];
    }
    var g = s.grade;
    if (g === 'K') return ['https://nj.gov/education/standards/science/2026/kto5/kindergarten.shtml'];
    if (/^[1-5]$/.test(g)) return ['https://nj.gov/education/standards/science/2026/kto5/' + g + '.shtml'];
    return page ? [page] : [D.meta.landingUrl];
  }

  SE.store = { get: get, exists: exists, all: all, highSchool: highSchool, isHS: isHS, dciAll: dciAll,
    dciName: dciName, sepName: sepName, cccName: cccName, disciplineLabel: disciplineLabel,
    bandLabel: bandLabel, bandLong: bandLong, bandIndex: bandIndex, shortLabel: shortLabel, gradeLabel: gradeLabel,
    withDci: withDci, withSep: withSep, withCcc: withCcc, unitsFor: unitsFor, unit: unit, courseOf: courseOf, sourceLinks: sourceLinks };
})(window.SE = window.SE || {});
