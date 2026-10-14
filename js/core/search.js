/* Search across codes, scientific ideas, familiar topics, practices, and crosscutting concepts. */
(function (SE) {
  'use strict';
  var D = SE.data, S = SE.store, U = SE.util;
  var docs = null;

  var PRACTICE_TERMS = {
    SEP1: ['asking questions', 'questions', 'defining problems', 'define problems'],
    SEP2: ['modeling', 'modelling', 'models', 'model', 'developing models', 'using models'],
    SEP3: ['investigation', 'investigations', 'planning investigations', 'experiments', 'lab', 'labs'],
    SEP4: ['analyzing data', 'analyze data', 'data analysis', 'interpreting data', 'graphs', 'graphing'],
    SEP5: ['mathematics', 'math', 'computational thinking', 'computation', 'simulation', 'simulations', 'statistics'],
    SEP6: ['explanations', 'constructing explanations', 'designing solutions', 'design', 'explanation'],
    SEP7: ['argument', 'argumentation', 'arguing', 'evidence', 'claims'],
    SEP8: ['communicating', 'communication', 'information', 'reading', 'literacy', 'obtaining information']
  };

  function stem(t) { return t.length > 4 ? t.replace(/(ies|es|s|ing|ed|ion|al)$/, '') : t; }
  function words(s) { return U.norm(s).split(/[^a-z0-9.-]+/).filter(Boolean); }

  function build() {
    docs = D.standards.map(function (s) {
      var dciText = S.dciAll(s.code).map(function (d) { return d + ' ' + S.dciName(d); }).join(' ');
      return {
        code: s.code,
        title: words(s.title || ''),
        text: words(s.text),
        summary: words(s.summary || ''),
        dci: words(dciText + ' ' + (D.coreNames[s.core] || '')),
        sep: words((s.sep || []).map(S.sepName).join(' ') + ' ' + (s.ccc || []).map(S.cccName).join(' ')),
        hs: s.band === '9-12'
      };
    });
  }

  function fieldHit(ws, st) { for (var i = 0; i < ws.length; i++) if (ws[i].indexOf(st) === 0) return true; return false; }

  var STOP = { the: 1, and: 1, for: 1, with: 1, of: 1, to: 1, in: 1, a: 1, an: 1, how: 1, what: 1, about: 1, on: 1 };

  function inCourse(code, course) {
    if (!course) return false;
    return S.unitsFor(code).some(function (u) { return u.course === course; });
  }

  function search(query, opts) {
    opts = opts || {};
    if (!docs) build();
    var q = String(query || '').trim();
    var res = { query: q, exact: null, codes: [], topics: [], practices: [], crosscutting: [], dcis: [] };
    if (!q) return res;

    var code = U.normalizeCode(q);
    if (code && S.exists(code)) res.exact = code;
    var upper = q.toUpperCase().replace(/\s+/g, '-');
    if (/^(HS|MS|K|[1-5])-?(PS|LS|ESS|ETS)/.test(upper)) {
      var prefix = (U.normalizeCode(upper) || upper);
      res.codes = D.standards.filter(function (s) { return s.code.indexOf(prefix) === 0 && s.code !== res.exact; })
        .map(function (s) { return { code: s.code, score: 50 }; }).slice(0, 40);
      return res;
    }

    res.topics = SE.engine.matchTopics(q).slice(0, 4);

    var nq = U.norm(q);
    Object.keys(PRACTICE_TERMS).forEach(function (id) {
      var name = U.norm(S.sepName(id));
      var hit = name.indexOf(nq) >= 0 || PRACTICE_TERMS[id].some(function (t) { return t === nq || (nq.length > 5 && t.indexOf(nq) === 0); });
      if (hit) res.practices.push({ id: id, name: S.sepName(id), codes: S.withSep(id) });
    });
    Object.keys(D.cccs).forEach(function (id) {
      var name = U.norm(D.cccs[id].name);
      if (nq.length >= 4 && name.indexOf(nq) >= 0) res.crosscutting.push({ id: id, name: D.cccs[id].name, codes: S.withCcc(id) });
    });
    Object.keys(D.dciNames).forEach(function (id) {
      var name = U.norm(D.dciNames[id]);
      if ((nq.length >= 4 && name.indexOf(nq) >= 0) || U.norm(id) === nq) res.dcis.push({ id: id, name: D.dciNames[id], codes: S.withDci(id) });
    });

    var toks = words(q).filter(function (t) { return t.length >= 3 && !STOP[t]; }).map(stem);
    if (!toks.length) return res;
    var scored = [];
    docs.forEach(function (d) {
      var score = 0, matched = 0;
      toks.forEach(function (t) {
        var s = 0;
        if (fieldHit(d.title, t)) s += 4;
        if (fieldHit(d.text, t)) s += 3;
        if (fieldHit(d.summary, t)) s += 1;
        if (fieldHit(d.dci, t)) s += 2;
        if (fieldHit(d.sep, t)) s += 1;
        if (s) matched++;
        score += s;
      });
      if (!matched) return;
      if (matched < toks.length) score *= 0.4;
      if (d.hs) score += 2.5;
      if (inCourse(d.code, opts.course)) score += 1.5;
      if (d.code === res.exact) return;
      scored.push({ code: d.code, score: score });
    });
    scored.sort(function (a, b) { return b.score - a.score || S.get(a.code).order - S.get(b.code).order; });
    res.codes = scored.slice(0, 30);
    return res;
  }

  SE.search = { search: search, rebuild: build };
})(window.SE = window.SE || {});
