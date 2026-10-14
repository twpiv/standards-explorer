/* Standards Relationship Engine.
   Combines curated relationships (data/*.js) with relationships computed from official metadata,
   and labels every relationship with its provenance:
     official    the standard's own verbatim information
     documented  supported by an official structure (NJDOE progression table, NGSS foundation boxes, NJDOE model units,
                 official PE or clarification wording)
     suggested   an instructional suggestion (never a requirement or prerequisite)
   A shared DCI code is treated as evidence of a disciplinary relationship, never as proof of a prerequisite.
*/
(function (SE) {
  'use strict';
  var D = SE.data, S = SE.store, U = SE.util;
  var BANDS = D.bands.map(function (b) { return b.id; });

  /* ------------------------------------------------------------------ prior and later learning */

  function progressionHits(code, direction) {
    var s = S.get(code); if (!s) return {};
    var ci = S.bandIndex(s.band), out = {};
    S.dciAll(code).forEach(function (d) {
      var row = D.dciProgressions[d]; if (!row) return;
      BANDS.forEach(function (b, i) {
        var ok = direction === 'earlier' ? i < ci : i > ci;
        if (!ok) return;
        (row[b] || []).forEach(function (c) { if (c !== code) (out[c] = out[c] || []).push(d); });
      });
    });
    Object.keys(out).forEach(function (c) { out[c] = U.uniq(out[c]); });
    return out;
  }

  function lowerFirst(t) { return t.charAt(0).toLowerCase() + t.slice(1); }

  function autoRole(code, dcis, direction) {
    var s = S.get(code);
    var names = dcis.map(function (d) { return d + ' ' + S.dciName(d); }).join(' and ');
    var verb = direction === 'earlier' ? 'Students were expected to ' : 'Students will be expected to ';
    return verb + lowerFirst(s.text.replace(/\.$/, '')) + '. Listed under ' + names + ' in the NJDOE K–12 progression.';
  }

  /* Prior learning for any PE. Curated steps come first; remaining documented progression PEs follow as "more". */
  function priorLearning(code) {
    var s = S.get(code); if (!s) return null;
    var hits = progressionHits(code, 'earlier');
    var cur = (D.priorLearning || {})[code];
    var steps = [], have = {};
    if (cur) {
      cur.steps.forEach(function (st, i) {
        if (!S.exists(st.code)) return;
        have[st.code] = true;
        steps.push({ code: st.code, band: S.get(st.code).band, label: st.label || S.shortLabel(st.code), role: st.role,
          status: hits[st.code] ? 'documented' : 'suggested', dcis: hits[st.code] || [], curated: true, rank: i, featured: true });
      });
    }
    Object.keys(hits).forEach(function (c) {
      if (have[c]) return;
      steps.push({ code: c, band: S.get(c).band, label: S.shortLabel(c), role: autoRole(c, hits[c], 'earlier'),
        status: 'documented', dcis: hits[c], curated: false, rank: 100 + S.get(c).order, featured: !cur });
    });
    steps.sort(function (a, b) { return S.bandIndex(a.band) - S.bandIndex(b.band) || a.rank - b.rank; });
    var byBand = {};
    BANDS.forEach(function (b) { byBand[b] = steps.filter(function (x) { return x.band === b; }); });
    return { code: code, curated: !!cur, steps: steps, byBand: byBand,
      narrative: cur ? { ideaDevelops: cur.ideaDevelops, practiceDevelops: cur.practiceDevelops, newAtHS: cur.newAtHS, gaps: cur.gaps } : null };
  }

  /* Later learning (for K-8 PEs): documented progression PEs in later bands. */
  function laterLearning(code) {
    var hits = progressionHits(code, 'later');
    return Object.keys(hits).map(function (c) {
      return { code: c, band: S.get(c).band, label: S.shortLabel(c), role: autoRole(c, hits[c], 'later'), status: 'documented', dcis: hits[c] };
    }).sort(function (a, b) { return S.bandIndex(a.band) - S.bandIndex(b.band) || S.get(a.code).order - S.get(b.code).order; });
  }

  /* ------------------------------------------------------------------ related high school PEs */

  function hsDims(code) {
    var s = S.get(code) || {};
    return { dci: U.uniq((s.dci || []).concat(s.dciSecondary || [])), sep: s.sep || [], ccc: s.ccc || [],
      units: S.unitsFor(code).map(function (u) { return u.unit; }) };
  }
  function inter(a, b) { return a.filter(function (x) { return b.indexOf(x) >= 0; }); }

  function shared(a, b) {
    var A = hsDims(a), B = hsDims(b);
    return { dci: inter(A.dci, B.dci), sep: inter(A.sep, B.sep), ccc: inter(A.ccc, B.ccc), units: U.uniq(inter(A.units, B.units)) };
  }

  function curatedFor(code) {
    return (D.relationships || []).filter(function (r) {
      if (r.directional) return r.between[0] === code || r.between[1] === code;
      return r.between.indexOf(code) >= 0;
    });
  }

  function crossDiscipline(a, b) {
    var A = S.get(a), B = S.get(b);
    return !!(A && B && A.discipline !== B.discipline);
  }

  /* Every HS PE meaningfully related to `code`, curated first, scored. */
  function related(code) {
    if (!S.isHS(code)) return [];
    var items = {}, out = [];
    curatedFor(code).forEach(function (r) {
      var other = r.between[0] === code ? r.between[1] : r.between[0];
      if (!S.exists(other)) return;
      items[other] = { code: other, curated: true, id: r.id, category: r.category, status: r.status, strength: r.strength,
        label: r.label, why: r.why, question: r.question || null, evidence: r.evidence || [], shared: shared(code, other),
        direction: r.directional ? (r.between[0] === code ? 'to' : 'from') : null };
    });
    S.highSchool().forEach(function (o) {
      if (o.code === code || items[o.code]) return;
      var sh = shared(code, o.code);
      if (sh.dci.length) {
        items[o.code] = { code: o.code, curated: false, id: 'auto:' + code + '|' + o.code + ':dci', category: 'disciplinary', status: 'documented',
          strength: sh.units.length ? 1.6 : 1.4, label: 'Shares ' + sh.dci.join(', '),
          why: 'Both PEs list ' + sh.dci.map(function (d) { return d + ' ' + S.dciName(d); }).join(' and ') + ' in their NGSS foundation boxes. This shared disciplinary core idea is a documented link, but it does not by itself make one a prerequisite for the other, and no curated explanation has been written for this pair yet.',
          evidence: [ { kind: 'shared-dci', note: 'Shared DCI component(s): ' + sh.dci.join(', ') + '.' } ].concat(sh.units.length ? [ { kind: 'model-unit', note: 'Also grouped in NJDOE model unit(s) ' + sh.units.join(', ') + '.' } ] : []),
          shared: sh, computed: 'dci' };
      } else if (sh.units.length) {
        items[o.code] = { code: o.code, curated: false, id: 'auto:' + code + '|' + o.code + ':unit', category: 'integration', status: 'documented',
          strength: 1.2, label: 'Grouped in model unit ' + sh.units.join(', '),
          why: 'NJDOE’s high school model scope and sequence places both PEs in unit ' + sh.units.map(function (u) { var x = S.unit(u); return u + (x ? ' (' + x.title + ')' : ''); }).join(' and ') + '. The model is one example of how a course might be organized, not a required sequence, and grouping two PEs in a unit does not make either one a prerequisite.',
          evidence: [ { kind: 'model-unit', note: 'Co-placed in NJDOE model unit(s) ' + sh.units.join(', ') + '.' } ], shared: sh, computed: 'unit' };
      }
    });
    Object.keys(items).forEach(function (k) {
      var it = items[k];
      it.cross = crossDiscipline(code, k);
      it.branch = (it.category === 'interdisciplinary' || it.category === 'engineering' || it.cross) ? 'interdisciplinary' : 'related';
      it.score = (it.curated ? it.strength * 10 : it.strength * 4) + (it.status === 'documented' ? 1 : 0) + it.shared.sep.length * 0.5 + it.shared.ccc.length * 0.5;
      out.push(it);
    });
    out.sort(function (a, b) { return b.score - a.score || S.get(a.code).order - S.get(b.code).order; });
    return out;
  }

  /* ------------------------------------------------------------------ three dimensions */

  function threeD(code) {
    var s = S.get(code); if (!s) return null;
    var interp = (D.interpretations || {})[code] || null;
    var hs = s.band === '9-12';
    var dims = {
      official: hs,
      dci: hs ? (s.dci || []).map(function (d) { return { id: d, name: S.dciName(d), secondary: false }; })
                 .concat((s.dciSecondary || []).map(function (d) { return { id: d, name: S.dciName(d), secondary: true }; }))
              : (s.dciProgression || []).map(function (d) { return { id: d, name: S.dciName(d), secondary: false, fromProgression: true }; }),
      sep: hs ? (s.sep || []).map(function (p) { return { id: p, name: S.sepName(p) }; }) : [],
      ccc: hs ? (s.ccc || []).map(function (c) { return { id: c, name: S.cccName(c) }; }) : [],
      cccNote: s.cccNote || null,
      inferredPractices: [],
      integrated: interp ? interp.threeD : null,
      evidence: interp ? interp.evidence : null
    };
    if (!hs) {
      dims.inferredPractices = U.uniq(SE.practices.findPractices(s.text).map(function (h) { return h.sep; }))
        .map(function (p) { return { id: p, name: S.sepName(p) }; });
    }
    return dims;
  }

  /* Other HS PEs that share one 3D element. */
  function sharingElement(kind, id, exclude) {
    var list = kind === 'dci' ? S.withDci(id) : kind === 'sep' ? S.withSep(id) : S.withCcc(id);
    return list.filter(function (c) { return c !== exclude; });
  }

  /* ------------------------------------------------------------------ phenomena and reflections */

  var ALIGN_ORDER = { direct: 0, application: 1, extension: 2 };
  function phenomenaFor(code) {
    return (D.phenomena || []).filter(function (p) { return p.standards.indexOf(code) >= 0; })
      .map(function (p) { return { item: p, alignment: (p.alignment || {})[code] || 'application', primary: p.standards[0] === code }; })
      .sort(function (a, b) { return (b.primary - a.primary) || (ALIGN_ORDER[a.alignment] - ALIGN_ORDER[b.alignment]); });
  }
  function phenomenon(id) { return (D.phenomena || []).filter(function (p) { return p.id === id; })[0] || null; }

  function reflections(code, view) {
    var R = D.reflections, byS = (R.byStandard || {})[code] || {}, list = [];
    (byS[view] || []).forEach(function (q) { list.push({ text: q, specific: true }); });
    if (view !== 'standard' && !list.length) (byS.standard || []).forEach(function (q) { list.push({ text: q, specific: true }); });
    (R.generic[view] || []).forEach(function (q) { list.push({ text: q, specific: false }); });
    return list;
  }

  /* ------------------------------------------------------------------ explanations for a single link */

  function relationship(a, b) {
    if (!S.exists(a) || !S.exists(b)) return null;
    var rel = related(a).filter(function (r) { return r.code === b; })[0];
    if (rel) return { type: 'related', item: rel };
    var p = priorLearning(a);
    var step = p && p.steps.filter(function (x) { return x.code === b; })[0];
    if (step) return { type: 'prior', item: step };
    var p2 = priorLearning(b);
    var step2 = p2 && p2.steps.filter(function (x) { return x.code === a; })[0];
    if (step2) return { type: 'prior', item: step2, reversed: true };
    var sh = shared(a, b);
    if (sh.sep.length || sh.ccc.length) return { type: 'shared3d', item: { code: b, shared: sh, status: 'documented' } };
    return null;
  }

  /* ------------------------------------------------------------------ the network model for one center */

  function network(code) {
    var s = S.get(code); if (!s) return null;
    var hs = s.band === '9-12';
    var prior = priorLearning(code);
    var branches = [];
    branches.push({ id: 'prior', label: 'Prior Learning', sub: 'Where have students encountered this before?',
      items: prior.steps.map(function (st) {
        return { kind: 'standard', code: st.code, band: st.band, label: st.label, status: st.status, edge: st.status === 'documented' ? 'prior' : 'suggested',
          featured: st.featured, why: st.role, dcis: st.dcis };
      }) });
    if (hs) {
      var rel = related(code);
      ['related', 'interdisciplinary'].forEach(function (br) {
        branches.push({ id: br, label: br === 'related' ? 'Related High School Standards' : 'Interdisciplinary and Engineering',
          sub: br === 'related' ? 'Where could this lead?' : 'Connections across disciplines',
          items: rel.filter(function (r) { return r.branch === br; }).map(function (r) {
            return { kind: 'standard', code: r.code, label: r.label, status: r.status, edge: r.status === 'documented' ? 'related' : 'suggested',
              featured: r.curated && r.strength >= 2, strength: r.strength, curated: r.curated, category: r.category, why: r.why, evidence: r.evidence };
          }) });
      });
    } else {
      branches.push({ id: 'related', label: 'Where This Leads', sub: 'Later learning in the same progression',
        items: laterLearning(code).map(function (l) {
          return { kind: 'standard', code: l.code, band: l.band, label: l.label, status: 'documented', edge: 'prior', featured: l.band === '9-12' || l.band === '6-8', why: l.role };
        }) });
    }
    var td = threeD(code);
    branches.push({ id: 'threeD', label: 'Three Dimensions', sub: 'How does it all come together?',
      items: td.dci.map(function (d) { return { kind: 'dim', dim: 'DCI', id: d.id, label: d.id + ' ' + d.name + (d.secondary ? ' (secondary)' : ''), edge: 'shared3d', featured: !d.secondary, status: hs ? 'official' : 'documented' }; })
        .concat(td.sep.map(function (p) { return { kind: 'dim', dim: 'SEP', id: p.id, label: p.name, edge: 'shared3d', featured: true, status: 'official' }; }))
        .concat(td.ccc.map(function (c) { return { kind: 'dim', dim: 'CCC', id: c.id, label: c.name, edge: 'shared3d', featured: true, status: 'official' }; }))
        .concat(td.inferredPractices.map(function (p) { return { kind: 'dim', dim: 'SEP', id: p.id, label: p.name + ' (from wording)', edge: 'suggested', featured: true, status: 'suggested', inferred: true }; })) });
    if (hs) {
      branches.push({ id: 'phenomena', label: 'Phenomena Worth Exploring', sub: 'Suggested, not prescribed',
        items: phenomenaFor(code).map(function (p, i) { return { kind: 'phenomenon', id: p.item.id, label: p.item.title, edge: 'suggested', featured: i < 3, status: 'suggested', alignment: p.alignment, icon: p.item.icon }; }) });
    }
    return { center: code, hs: hs, branches: branches };
  }

  /* ------------------------------------------------------------------ "Surprise me" */

  function surpriseCandidates(code, opts) {
    opts = opts || {};
    var visited = opts.visited || {}, seen = opts.seen || {};
    var s = S.get(code); if (!s) return [];
    var out = [];
    function add(c) { if (!seen[c.id]) out.push(c); }

    related(code).forEach(function (r) {
      if (!r.curated) return;
      var o = S.get(r.code), score = r.strength * 2 + (visited[r.code] ? 0 : 3);
      var kind = null, headline = null;
      if (o.discipline === 'ESS') { kind = 'earth'; headline = 'An Earth and space science connection'; score += 3; }
      else if (o.discipline === 'ETS' || r.category === 'engineering') { kind = 'engineering'; headline = 'An engineering design application'; score += 2; }
      else if (r.cross) { kind = 'cross'; headline = 'A connection to ' + S.disciplineLabel(o.discipline); score += 3; }
      else if (r.strength >= 2 && !visited[r.code]) { kind = 'related'; headline = 'A related high school expectation you haven’t explored'; }
      if (!kind) return;
      add({ id: 'rel:' + r.id, kind: kind, headline: headline, target: r.code, status: r.status, text: r.why, label: r.label, score: score });
    });

    var prior = priorLearning(code);
    if (prior) prior.steps.forEach(function (st) {
      if (!st.curated) return;
      var b = st.band;
      if (b === 'K-2' || b === '3-5') {
        add({ id: 'prior:' + code + ':' + st.code, kind: 'elementary', headline: 'Students met this as early as ' + S.gradeLabel(st.code).replace('Grades ', 'grades ').replace('Grade ', 'grade '),
          target: st.code, status: st.status, text: st.role, label: st.label, score: (b === 'K-2' ? 7 : 6) + (visited[st.code] ? 0 : 2) });
      } else if (b === '6-8') {
        var pr = SE.practices.leadPhrase(S.get(st.code).text);
        add({ id: 'prior:' + code + ':' + st.code, kind: 'ms-practice', headline: 'What middle school students were already expected to do',
          target: st.code, status: st.status, text: st.role + (pr ? ' The performance language: “' + pr.text + '.”' : ''), label: st.label, score: 5 + (visited[st.code] ? 0 : 2) });
      }
    });

    if (S.isHS(code)) {
      (s.ccc || []).forEach(function (c) {
        var others = S.withCcc(c).filter(function (x) { return x !== code && S.get(x).discipline !== s.discipline; });
        others.sort(function (a, b) {
          var sa = shared(code, a).sep.length, sb = shared(code, b).sep.length;
          return (sb - sa) || ((visited[a] ? 1 : 0) - (visited[b] ? 1 : 0)) || S.get(a).order - S.get(b).order;
        });
        others.slice(0, 2).forEach(function (o, i) {
          var sameSep = shared(code, o).sep.length > 0;
          add({ id: 'ccc:' + code + ':' + c + ':' + o, kind: 'ccc', headline: 'A recurring crosscutting concept: ' + S.cccName(c), target: o, status: 'documented',
            label: S.shortLabel(o),
            text: 'Both ' + code + ' and ' + o + ' (' + S.disciplineLabel(S.get(o).discipline) + ') list ' + S.cccName(c) + ' as their crosscutting concept' +
              (sameSep ? ', and both also ask students to use ' + S.sepName(shared(code, o).sep[0]) + '.' : '.') +
              ' The same lens appears in ' + S.withCcc(c).length + ' high school PEs across disciplines. This is a shared element, not a claim that the two should be taught together.',
            score: 3 + (sameSep ? 1 : 0) - i + (visited[o] ? 0 : 1) });
        });
      });
    }
    out.sort(function (a, b) { return b.score - a.score || (a.id < b.id ? -1 : 1); });
    /* Interleave kinds so consecutive surprises differ when possible. */
    var result = [], lastKind = null, pool = out.slice();
    while (pool.length) {
      var idx = 0;
      for (var i = 0; i < pool.length; i++) { if (pool[i].kind !== lastKind) { idx = i; break; } }
      var pick = pool.splice(idx, 1)[0]; result.push(pick); lastKind = pick.kind;
    }
    return result;
  }

  /* ------------------------------------------------------------------ topics */

  function topics() { return D.topics || []; }
  function topic(id) { return topics().filter(function (t) { return t.id === id; })[0] || null; }
  function matchTopics(q) {
    var n = U.norm(q).trim(); if (n.length < 3) return [];
    return topics().map(function (t) {
      var score = 0, label = U.norm(t.label);
      if (label === n) score = 10; else if (label.indexOf(n) >= 0) score = 7;
      t.aliases.forEach(function (a) { var x = U.norm(a); if (x === n) score = Math.max(score, 9); else if (x.indexOf(n) >= 0 || (n.length > 4 && n.indexOf(x) >= 0)) score = Math.max(score, 5); });
      return { topic: t, score: score };
    }).filter(function (x) { return x.score > 0; }).sort(function (a, b) { return b.score - a.score; }).map(function (x) { return x.topic; });
  }

  SE.engine = { priorLearning: priorLearning, laterLearning: laterLearning, related: related, shared: shared, threeD: threeD,
    sharingElement: sharingElement, phenomenaFor: phenomenaFor, phenomenon: phenomenon, reflections: reflections,
    relationship: relationship, network: network, surpriseCandidates: surpriseCandidates,
    topics: topics, topic: topic, matchTopics: matchTopics, curatedFor: curatedFor };
})(window.SE = window.SE || {});
