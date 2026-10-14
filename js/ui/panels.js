/* Detail-panel renderers. Each returns an HTML string; events are handled by delegation in app.js using data-act. */
(function (SE) {
  'use strict';
  var U = SE.util, S = SE.store, E = SE.engine, D = SE.data, esc = U.esc, icon = SE.icon;

  var CATEGORY = {
    disciplinary: 'Closely related disciplinary ideas',
    practice: 'Shared science practice',
    crosscutting: 'Shared crosscutting concept',
    interdisciplinary: 'Interdisciplinary connection',
    engineering: 'Engineering design application',
    integration: 'Possible instructional integration'
  };
  var STATUS_TIP = {
    official: 'Official: verbatim NJDOE 2026 wording or NGSS foundation-box element.',
    documented: 'Documented: supported by an official structure (NJDOE progressions, NGSS foundation boxes, NJDOE model units, or official wording).',
    suggested: 'Suggested: a professional instructional suggestion written for this app. Not a state requirement or prerequisite.'
  };
  var FIT = { direct: 'Direct', partial: 'Part of a broader expectation', contextual: 'Contextual', earlier: 'Earlier grades' };

  function statusChip(st) {
    var label = { official: 'Official', documented: 'Documented', suggested: 'Suggested' }[st] || st;
    return '<span class="chip ' + st + '" title="' + esc(STATUS_TIP[st] || '') + '"><i></i>' + label + '</span>';
  }
  function discChip(code) { var s = S.get(code); return '<span class="chip disc disc-' + s.discipline + '" title="' + esc(S.disciplineLabel(s.discipline)) + '">' + s.discipline + '</span>'; }
  function gradeChip(code) { return '<span class="chip">' + esc(S.gradeLabel(code)) + '</span>'; }
  function climateChip(code) { var s = S.get(code); return s.climate ? '<span class="chip climate" title="NJDOE climate symbol: ' + esc(D.meta.climateSymbolMeaning) + '">🌱 Climate</span>' : ''; }
  function peLink(code) { return '<button class="pe-link" data-act="explore" data-code="' + esc(code) + '" title="Explore ' + esc(code) + '">' + esc(code) + '</button>'; }
  function catChip(cat) { return '<span class="chip cat">' + esc(CATEGORY[cat] || cat) + '</span>'; }
  function dimChip(dim, text) { return '<span class="chip dim-' + dim + '">' + esc(text || dim) + '</span>'; }
  function bookmarkBtn(app, code, small) {
    var on = app.state.isBookmarked(code);
    return '<button class="btn ' + (small ? 'btn-sm' : 'btn-sm') + '" data-act="bookmark-std" data-code="' + esc(code) + '" aria-pressed="' + on + '" title="' + (on ? 'Remove bookmark' : 'Bookmark this standard') + '">' +
      icon(on ? 'bookmarkFill' : 'bookmark') + '<span>' + (on ? 'Bookmarked' : 'Bookmark') + '</span></button>';
  }
  function exploreBtn(code, label) {
    return '<button class="btn btn-sm btn-primary" data-act="explore" data-code="' + esc(code) + '">' + esc(label || ('Explore ' + code)) + icon('chevron') + '</button>';
  }
  function saveRelBtn(app, a, b, label, kind) {
    var on = app.state.isRelationshipSaved(a, b);
    return '<button class="btn btn-sm" data-act="save-rel" data-a="' + esc(a) + '" data-b="' + esc(b) + '" data-label="' + esc(label || '') + '" data-kind="' + esc(kind || '') + '" aria-pressed="' + on + '">' +
      icon(on ? 'bookmarkFill' : 'bookmark') + (on ? 'Saved' : 'Save connection') + '</button>';
  }

  /* Official PE text with highlighted, clickable phrases. */
  function peText(app, code, scope) {
    var segs = SE.practices.segments(code);
    var open = app.local.phraseOpen;
    var html = segs.map(function (s, i) {
      if (!s.dim) return esc(s.text);
      var id = scope + '-' + i;
      return '<button class="hl ' + s.dim + '" data-act="phrase" data-i="' + i + '" data-scope="' + scope + '" aria-expanded="' + (open === id) + '" title="' + esc(s.dim === 'SEP' ? 'Practice language' : s.dim === 'DCI' ? 'Disciplinary core idea' : 'Crosscutting concept') + ': click for an explanation">' + esc(s.text) + '</button>';
    }).join('');
    var note = '';
    if (open && open.indexOf(scope + '-') === 0) {
      var seg = segs[+open.split('-')[1]];
      if (seg && seg.dim) note = phraseNote(code, seg);
    }
    return { html: html, note: note };
  }

  function phraseNote(code, seg) {
    var s = S.get(code), hs = s.band === '9-12', head, body;
    if (seg.dim === 'SEP') {
      var sep = D.seps[seg.ref];
      head = dimChip('SEP', 'Practice: ' + (sep ? sep.name : seg.ref));
      body = seg.note ? esc(seg.note) : esc(sep ? sep.about : '');
      if (seg.kind === 'practice' && (seg.inferred || !hs)) body += ' <span class="muted">(Practice family read from the PE wording; ' + (hs ? 'this PE lists more than one practice.' : 'K–8 foundation boxes are not included in this dataset.') + ')</span>';
      else if (seg.kind === 'practice' && hs) body += ' <span class="muted">(Matches the NGSS foundation-box practice for this PE.)</span>';
    } else if (seg.dim === 'DCI') {
      head = dimChip('DCI', 'Science idea: ' + seg.ref + ' ' + S.dciName(seg.ref));
      body = esc(seg.note || '');
    } else {
      head = dimChip('CCC', 'Crosscutting concept: ' + S.cccName(seg.ref));
      body = esc(seg.note || (D.cccs[seg.ref] || {}).about || '');
    }
    return '<div class="phrase-note" role="note"><div class="hd">' + head + ' <span class="chip">“' + esc(seg.text) + '”</span>' +
      (seg.kind === 'curated' ? statusChip('suggested') : '') + '</div>' + body + '</div>';
  }

  /* ------------------------------------------------------------------ Standard tab */
  function standardTab(app, code) {
    var s = S.get(code), interp = (D.interpretations || {})[code], hs = s.band === '9-12';
    var t = peText(app, code, 'std');
    var h = '';
    h += '<div class="pe-head"><span class="code">' + esc(code) + '</span>' + discChip(code) + gradeChip(code) + climateChip(code) + '<span class="spacer"></span>' + bookmarkBtn(app, code) + '</div>';
    h += '<div class="pe-title">' + esc(S.shortLabel(code)) + (s.title ? ' <span class="tiny">(short label written for this app)</span>' : '') + '</div>';
    h += '<h2>What Is This Standard Really Asking Students to Do?</h2>';
    h += '<div class="official-box"><div class="lab">' + icon('doc') + 'Official 2026 NJSLS-S performance expectation ' + statusChip('official') + '</div><p class="pe-text">' + t.html + '</p></div>';
    h += '<div class="hl-legend"><span>Click a highlighted phrase:</span><span class="l-SEP">practice (SEP)</span>' + (interp ? '<span class="l-DCI">science idea (DCI)</span><span class="l-CCC">crosscutting concept</span>' : '') + '</div>';
    h += t.note;

    if (interp) {
      h += '<div class="prov">' + statusChip('suggested') + ' The interpretation below was written for this app and reviewed against the official wording. It is not NJDOE text.</div>';
      h += sec('The Big Scientific Idea', 'What central understanding is involved?', '<p>' + esc(interp.bigIdea) + '</p>', true);
      h += sec('What Students Must Demonstrate', 'What must students actually do?', '<p>' + esc(interp.demonstrate) + '</p>', true);
      h += sec('What Falls Within This Expectation?', 'Scope versus a traditional unit',
        '<h4>Within the scope of this PE</h4><ul>' + interp.within.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
        (interp.beyond && interp.beyond.length ? '<h4>Often taught alongside, but not required by this PE alone</h4><ul>' + interp.beyond.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
          '<p class="small muted">Some of these may be useful tools or belong to other PEs. A performance expectation is neither a chapter title nor a list of everything that can be taught.</p>' : ''), false);
      h += sec('Important Boundaries', 'What do the clarification and assessment boundary say about depth?', '<p>' + esc(interp.boundaries) + '</p>' + officialBoundaries(s), false);
    } else {
      h += '<div class="notice">' + icon('info') + ' No curated interpretation has been written for this standard yet. Everything below comes from official metadata' + (hs ? ' (NGSS foundation boxes and paraphrased clarification statements)' : '') + '. No suggestions have been added.</div>';
      if (hs) {
        h += sec('The Big Scientific Idea', 'From the DCI foundation', '<p>Disciplinary core idea component(s): ' + s.dci.map(function (d) { return '<b>' + esc(d) + '</b> ' + esc(S.dciName(d)); }).join('; ') +
          (s.dciSecondary.length ? '; secondary: ' + s.dciSecondary.map(function (d) { return esc(d + ' ' + S.dciName(d)); }).join('; ') : '') + '.</p>', true);
        h += sec('What Students Must Demonstrate', 'From the practice in the PE', '<p>Practice: <b>' + s.sep.map(function (p) { return esc(S.sepName(p)); }).join(', ') + '</b>. ' + esc((D.seps[s.sep[0]] || {}).about || '') + '</p>', true);
        h += sec('Important Boundaries', 'Clarification and assessment boundary', officialBoundaries(s) || '<p class="muted">None listed.</p>', true);
      } else {
        h += sec('Where this fits', 'DCI components (compiled progression table)', '<p>' + (s.dciProgression.length ? s.dciProgression.map(function (d) { return '<b>' + esc(d) + '</b> ' + esc(S.dciName(d)); }).join('; ') : 'This PE does not appear in the compiled progression table.') + '</p>' +
          '<p class="small muted">K–8 foundation boxes (SEP, DCI, and CCC elements) are not included in this dataset. Follow the source link for the full NJDOE page.</p>', true);
      }
    }
    h += sec('Official Details and Sources', 'Foundations, model placement, links', officialDetails(app, code), false);
    h += sec('My Note (optional)', 'Saved only in this browser', '<textarea class="note-area" data-note="' + esc(code) + '" aria-label="Optional personal note about ' + esc(code) + '" placeholder="Anything you want to remember about this standard…">' + esc(app.state.note(code)) + '</textarea><div class="saved-msg" aria-live="polite"></div>', !!app.state.note(code));
    h += reflection(app, code, 'standard');
    return h;
  }

  function officialBoundaries(s) {
    if (s.band !== '9-12') return '';
    var out = '';
    out += '<h4>Clarification statement ' + statusChip('documented') + '</h4><p>' + (s.clarification ? esc(s.clarification) : '<span class="muted">NGSS lists no clarification statement.</span>') + '</p>';
    out += '<h4>Assessment boundary ' + statusChip('documented') + '</h4><p>' + (s.boundary ? esc(s.boundary) : '<span class="muted">None listed.</span>') + '</p>';
    out += '<p class="tiny muted">Clarification statements and assessment boundaries are paraphrased from NGSS. NJDOE’s 2026 pages do not print them. See the NGSS source link for official wording.</p>';
    return out;
  }

  function officialDetails(app, code) {
    var s = S.get(code), h = '<dl class="kv">';
    if (s.band === '9-12') {
      h += '<dt>DCI</dt><dd>' + s.dci.map(function (d) { return dimChip('DCI', d + ' ' + S.dciName(d)); }).join(' ') + (s.dciSecondary.length ? ' ' + s.dciSecondary.map(function (d) { return dimChip('DCI', d + ' (secondary)'); }).join(' ') : '') + '</dd>';
      h += '<dt>SEP</dt><dd>' + (s.sep.map(function (p) { return dimChip('SEP', S.sepName(p)); }).join(' ') || '—') + '</dd>';
      h += '<dt>CCC</dt><dd>' + (s.ccc.length ? s.ccc.map(function (c) { return dimChip('CCC', S.cccName(c)); }).join(' ') : '<span class="muted">' + esc(s.cccNote || 'None listed') + '</span>') + '</dd>';
      h += '<dt></dt><dd class="tiny muted">Foundation categories from the NGSS foundation boxes. NJDOE relocated foundations to STAMP in 2026 without substantive change.</dd>';
    } else if (s.dciProgression.length) {
      h += '<dt>DCI</dt><dd>' + s.dciProgression.map(function (d) { return dimChip('DCI', d + ' ' + S.dciName(d)); }).join(' ') + ' <span class="tiny muted">(compiled progression table)</span></dd>';
    }
    var units = S.unitsFor(code);
    if (units.length) {
      h += '<dt>NJ model</dt><dd>' + units.map(function (u) { return '<span class="unit-chip" title="NJDOE model ' + esc(D.courses[u.course].label) + ' unit">' + esc(u.unit + ' ' + u.title) + (u.multiUnit ? ' · builds across units' : '') + (u.crossCourse ? ' · builds across courses' : '') + '</span>'; }).join('') +
        '<div class="tiny muted">NJDOE’s model scope and sequence is one example of course design, not a requirement.</div></dd>';
    }
    h += '<dt>Sources</dt><dd>' + S.sourceLinks(code).map(function (u) { return '<a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')) + '</a>'; }).join('<br>') + '</dd>';
    h += '</dl>';
    return h;
  }

  function sec(title, q, body, open) {
    return '<details class="sec"' + (open ? ' open' : '') + '><summary>' + esc(title) + '<span class="q">' + esc(q) + '</span></summary><div class="body">' + body + '</div></details>';
  }

  /* ------------------------------------------------------------------ Prior learning tab */
  function priorTab(app, code) {
    var s = S.get(code), p = E.priorLearning(code), ci = S.bandIndex(s.band);
    var showAll = app.local.priorShowAll, open = app.local.stepOpen;
    var h = '<h2>Where Have Students Encountered This Before?</h2>';
    h += '<p class="lede">Earlier performance expectations describe what students were <em>expected</em> to learn, not proof that they mastered it. Not every idea has a neat predecessor in every grade band.</p>';
    var hidden = p.steps.filter(function (x) { return !x.featured; }).length;
    h += '<div class="prog" role="list" aria-label="K to 12 progression">';
    D.bands.forEach(function (b, i) {
      var cur = i === ci;
      h += '<div class="col' + (cur ? ' current' : '') + '" role="listitem"><h4>' + esc(b.label) + '</h4>';
      if (cur) h += '<button class="step documented" data-act="noop" aria-current="true" style="border-color:#1d4f7a"><span class="code">' + esc(code) + '</span>' + esc(U.truncate(S.shortLabel(code), 40)) + '</button>';
      else if (i > ci) h += '<div class="none">' + (i === ci + 1 ? 'Later' : '') + '</div>';
      else {
        var list = p.byBand[b.id].filter(function (x) { return showAll || x.featured; });
        if (!list.length) h += '<div class="none">' + (p.byBand[b.id].length ? 'more below' : 'No PE identified') + '</div>';
        list.forEach(function (st) {
          h += '<button class="step ' + st.status + '" data-act="step" data-code="' + esc(st.code) + '" aria-expanded="' + (open === st.code) + '" title="' + esc(st.status === 'documented' ? 'Documented in the NJDOE progression table for this PE’s DCI' : 'Suggested connection (not listed under this PE’s DCI in the progression table)') + '"><span class="code">' + esc(st.code) + '</span>' + esc(U.truncate(st.label, 46)) + '</button>';
        });
      }
      h += '</div>';
    });
    h += '</div>';
    h += '<div class="tiny muted" style="margin:-4px 0 8px">Solid blue edge = documented in the NJDOE progression for this PE’s DCI components. Dashed orange = suggested connection.</div>';
    if (hidden) h += '<button class="linkish small" data-act="prior-all">' + (showAll ? 'Show featured connections only' : 'Show all ' + p.steps.length + ' earlier PEs from the progression') + '</button>';

    if (open) {
      var st = p.steps.filter(function (x) { return x.code === open; })[0];
      if (st) h += stepDetail(app, code, st);
    }

    if (p.narrative) {
      h += '<div class="develops"><h4>What develops across the progression</h4><p>' + esc(p.narrative.ideaDevelops) + '</p>' +
        '<h4>Practices revisited or extended</h4><p>' + esc(p.narrative.practiceDevelops) + '</p>' +
        (p.narrative.newAtHS ? '<h4>What becomes more sophisticated at high school</h4><p>' + esc(p.narrative.newAtHS) + '</p>' : '') +
        (p.narrative.gaps ? '<h4>Not a neat chain</h4><p>' + esc(p.narrative.gaps) + '</p>' : '') +
        '<div class="prov">' + statusChip('suggested') + ' Narrative written for this app from the official PE wording.</div></div>';
    } else if (p.steps.length) {
      h += '<div class="notice">No curated progression narrative yet. The earlier PEs shown are listed with this standard’s DCI components in the NJDOE K–12 progression table (compiled). Their official wording is the best guide to what students were expected to do.</div>';
    } else {
      h += '<div class="notice">The compiled progression table lists no earlier PEs for this standard’s DCI components. Related ideas may appear under other components. This dataset does not invent a progression where none is documented.</div>';
    }

    var trace = p.steps.filter(function (x) { return x.featured; }).concat([{ code: code, band: s.band }]);
    var lines = trace.map(function (x) {
      var lead = SE.practices.leadPhrase(S.get(x.code).text);
      return lead ? '<li><span class="chip">' + esc(S.bandLabel(x.band)) + '</span> ' + peLink(x.code) + ' <b>' + esc(lead.text) + '</b> <span class="muted small">(' + esc(S.sepName(lead.sep)) + ')</span></li>' : '';
    }).join('');
    if (lines) h += sec('Practice language across the progression', 'What were students asked to do?', '<ul class="practice-trace">' + lines + '</ul><p class="tiny muted">Practice families are read from each PE’s wording.</p>', false);

    if (s.band === '9-12' && s.sep.length) {
      var sepBody = s.sep.map(function (id) {
        var sp = D.seps[id];
        return '<p><b>' + esc(sp.name) + '</b></p><div class="sep-prog">' + D.bands.map(function (b) {
          return '<div class="b">' + esc(b.label) + '</div><div class="' + (b.id === '9-12' ? 'cur' : '') + '">' + esc(sp.progression[b.id]) + '</div>';
        }).join('') + '</div>';
      }).join('') + '<p class="tiny muted">' + statusChip('documented') + ' Paraphrase of the grade-band summaries in <a href="' + esc(D.sepProgressionSource.url) + '" target="_blank" rel="noopener">NGSS Appendix F</a>.</p>';
      h += sec('How this practice grows K–12', 'Science and engineering practice progression', sepBody, false);
    }
    h += '<p class="tiny muted" style="margin-top:10px">Sources: <a href="' + esc(D.meta.progressionsUrl) + '" target="_blank" rel="noopener">NJDOE Science Disciplinary Progressions</a> (compiled into this dataset; verify against STAMP).</p>';
    h += reflection(app, code, 'prior');
    return h;
  }

  function stepDetail(app, center, st) {
    var s = S.get(st.code);
    return '<div class="step-detail" aria-live="polite"><div class="pe-head"><span class="code">' + esc(st.code) + '</span>' + discChip(st.code) + gradeChip(st.code) + statusChip(st.status) + '</div>' +
      '<div class="official-box" style="margin:6px 0"><div class="lab">Official wording</div><p class="pe-text" style="font-size:14px">' + esc(s.text) + '</p></div>' +
      '<p><b>Role in this progression.</b> ' + esc(st.role) + '</p>' +
      (st.dcis && st.dcis.length ? '<p class="small muted">Listed with ' + esc(center) + ' under ' + st.dcis.map(function (d) { return esc(d + ' ' + S.dciName(d)); }).join(', ') + ' in the progression table.</p>' : '<p class="small muted">Not listed under this PE’s DCI components in the progression table; shown as a suggested connection.</p>') +
      '<div class="actions" style="display:flex;gap:6px;flex-wrap:wrap">' + exploreBtn(st.code) + bookmarkBtn(app, st.code, true) + saveRelBtn(app, center, st.code, st.label, st.status) + '</div></div>';
  }

  /* ------------------------------------------------------------------ Related tab */
  function relatedTab(app, code) {
    var s = S.get(code);
    if (s.band !== '9-12') return laterTab(app, code);
    var rel = E.related(code), f = app.local.connFilter || 'all';
    var h = '<h2>Where Could This Lead?</h2>';
    h += '<p class="lede">Potential connections to other high school expectations. They are not claims that standards must be taught together or in a particular order.</p>';
    var cats = ['all', 'disciplinary', 'interdisciplinary', 'engineering', 'integration', 'crosscutting'];
    var present = {}; rel.forEach(function (r) { present[r.category] = true; });
    h += '<div class="filters" role="group" aria-label="Filter connections">' + cats.filter(function (c) { return c === 'all' || present[c]; }).map(function (c) {
      return '<button data-act="filter" data-f="' + c + '" aria-pressed="' + (f === c) + '">' + esc(c === 'all' ? 'All' : CATEGORY[c].replace('Possible instructional integration', 'Instructional integration').replace('Closely related disciplinary ideas', 'Disciplinary ideas').replace('Engineering design application', 'Engineering').replace('Interdisciplinary connection', 'Interdisciplinary').replace('Shared crosscutting concept', 'Crosscutting')) + '</button>';
    }).join('') + '</div>';
    var list = rel.filter(function (r) { return f === 'all' || r.category === f; });
    var primary = list.filter(function (r) { return r.curated; });
    var rest = list.filter(function (r) { return !r.curated; });
    if (!primary.length) h += '<div class="notice">No curated connections have been written for this standard' + (f === 'all' ? '' : ' in this category') + ' yet. ' + (rest.length ? 'The connections below are computed from shared official foundations and are labeled as such.' : '') + '</div>';
    primary.forEach(function (r) { h += connCard(app, code, r); });
    if (rest.length) {
      if (app.local.connMore || !primary.length) {
        h += '<h3 style="font-size:14px;margin:14px 0 6px">Computed from shared foundations</h3><p class="small muted">These pairs share a DCI component or an NJDOE model unit. The shared element is documented; no curated reasoning has been written yet.</p>';
        rest.forEach(function (r) { h += connCard(app, code, r); });
        if (primary.length) h += '<button class="btn btn-sm" data-act="conn-more">Show fewer connections</button>';
      } else {
        h += '<button class="btn btn-sm" data-act="conn-more">' + icon('plus') + 'Show more connections (' + rest.length + ')</button>';
      }
    }
    if (s.sep.length || s.ccc.length) {
      h += '<div class="develops" style="margin-top:14px"><h4>Also shares a practice or crosscutting concept</h4>';
      s.sep.forEach(function (id) { h += '<p class="small">' + dimChip('SEP', S.sepName(id)) + ' with ' + (E.sharingElement('sep', id, code).length) + ' other HS PEs. <button class="linkish" data-act="dim" data-dim="sep" data-id="' + id + '">See them</button></p>'; });
      s.ccc.forEach(function (id) { h += '<p class="small">' + dimChip('CCC', S.cccName(id)) + ' with ' + (E.sharingElement('ccc', id, code).length) + ' other HS PEs. <button class="linkish" data-act="dim" data-dim="ccc" data-id="' + id + '">See them</button></p>'; });
      h += '<p class="tiny muted">Shared practices and crosscutting concepts are common across many PEs, so they are listed here rather than drawn as connections.</p></div>';
    }
    h += reflection(app, code, 'related');
    return h;
  }

  function connCard(app, center, r) {
    var cls = 'conn' + (r.status === 'suggested' ? ' suggested' : '');
    var h = '<article class="' + cls + '"><div class="hd">' + peLink(r.code) + discChip(r.code) + catChip(r.category) + statusChip(r.status) + (r.curated ? '' : '<span class="chip" title="Computed automatically from official metadata">computed</span>') + '</div>';
    h += '<div class="t">' + esc(S.shortLabel(r.code)) + '</div>';
    h += '<div class="rl">' + icon('link', 'inline') + ' ' + esc(r.label) + '</div>';
    h += '<div class="why">' + esc(r.why) + '</div>';
    if (r.question) h += '<div class="q">' + esc(r.question) + '</div>';
    if (r.evidence && r.evidence.length) h += '<details><summary>Evidence for this connection</summary><ul>' + r.evidence.map(function (e) { return '<li>' + esc(e.note) + '</li>'; }).join('') + '</ul></details>';
    h += '<div class="actions">' + exploreBtn(r.code) + saveRelBtn(app, center, r.code, r.label, r.status) + '</div></article>';
    return h;
  }

  function laterTab(app, code) {
    var later = E.laterLearning(code);
    var h = '<h2>Where Does This Lead?</h2><p class="lede">Later performance expectations listed under the same DCI components in the NJDOE K–12 progression table.</p>';
    if (!later.length) h += '<div class="notice">No later PEs are listed for this standard’s DCI components in the compiled progression table.</div>';
    D.bands.forEach(function (b) {
      var l = later.filter(function (x) { return x.band === b.id; });
      if (!l.length) return;
      h += '<div class="lv-band">' + esc(b.long) + '</div>';
      l.forEach(function (x) {
        h += '<article class="conn"><div class="hd">' + peLink(x.code) + discChip(x.code) + statusChip('documented') + '</div><div class="t">' + esc(S.shortLabel(x.code)) + '</div><div class="why">' + esc(S.get(x.code).text) + '</div><div class="actions">' + exploreBtn(x.code) + '</div></article>';
      });
    });
    h += reflection(app, code, 'related');
    return h;
  }

  /* ------------------------------------------------------------------ 3D tab */
  function threeDTab(app, code) {
    var s = S.get(code), td = E.threeD(code), hs = s.band === '9-12', interp = (D.interpretations || {})[code];
    var h = '<h2>Explore the Three Dimensions</h2>';
    h += '<p class="lede">A performance expectation integrates a science idea (DCI), a practice (SEP), and a crosscutting lens (CCC) into one student performance.</p>';
    var dciTxt = td.dci.filter(function (d) { return !d.secondary; }).map(function (d) { return d.id + ' ' + d.name; }).join('; ') || '—';
    var sepTxt = td.sep.map(function (p) { return p.name; }).join('; ') || (td.inferredPractices.map(function (p) { return p.name; }).join('; ') + (td.inferredPractices.length ? ' (from wording)' : '—'));
    var cccTxt = td.ccc.map(function (c) { return c.name; }).join('; ') || (hs ? 'None listed' : 'Not in dataset');
    h += '<div class="triad"><div class="d DCI"><div class="k">DCI</div><div class="n">' + esc(dciTxt) + '</div><div class="s">What scientific idea is being developed?</div></div>' +
      '<div class="d SEP"><div class="k">SEP</div><div class="n">' + esc(sepTxt) + '</div><div class="s">What do students do with the idea?</div></div>' +
      '<div class="d CCC"><div class="k">CCC</div><div class="n">' + esc(cccTxt) + '</div><div class="s">What lens connects it to other science?</div></div></div>';
    h += '<div class="perf"><b>Integrated student performance</b>' + (td.integrated ? esc(td.integrated) + '<div class="prov" style="margin-top:6px">' + statusChip('suggested') + ' Written for this app.</div>'
      : hs ? 'Students ' + esc(lowerFirst(s.text.replace(/\.$/, ''))) + '. In this PE, the practice of <b>' + esc(sepTxt) + '</b> is used to build ' + esc(dciTxt) + (td.ccc.length ? ', viewed through <b>' + esc(cccTxt) + '</b>' : '') + '. <span class="muted">(Assembled from official foundations.)</span>'
      : esc('K–8 foundation boxes are not included in this dataset. The DCI components come from the compiled progression table and the practice is read from the PE wording.')) + '</div>';

    var t = peText(app, code, 'td');
    h += '<h3 style="font-size:14px;margin:4px 0 4px">Click a phrase to see how it relates to the dimensions</h3><div class="official-box"><p class="pe-text">' + t.html + '</p></div>' + t.note;

    td.dci.forEach(function (d) { h += dimCard(app, code, 'dci', d.id, d.id + ' ' + d.name + (d.secondary ? ' (secondary)' : ''), (D.coreNames[d.id.split('.')[0]] ? 'Part of ' + d.id.split('.')[0] + ': ' + D.coreNames[d.id.split('.')[0]] + '. ' : '') + (d.fromProgression ? 'From the compiled progression table.' : 'From the NGSS foundation box.'), hs); });
    td.sep.forEach(function (p) { h += dimCard(app, code, 'sep', p.id, p.name, D.seps[p.id].about, hs, true); });
    td.inferredPractices.forEach(function (p) { h += dimCard(app, code, 'sep', p.id, p.name + ' (read from the wording)', D.seps[p.id].about, false, true); });
    td.ccc.forEach(function (c) { h += dimCard(app, code, 'ccc', c.id, c.name, D.cccs[c.id].about, hs); });
    if (hs && !td.ccc.length) h += '<div class="notice">' + esc(td.cccNote || 'NGSS lists no crosscutting concept for this PE.') + ' A teacher might emphasize a crosscutting concept instructionally, but that would be an extension, not part of the documented foundation.</div>';

    h += '<h3 style="font-size:15px;margin:16px 0 4px">What Might Evidence of This Learning Look Like?</h3>';
    if (td.evidence && td.evidence.length) {
      h += '<p class="small muted">Illustrations of possible student performances, not lesson plans or prescribed assessments.</p><ul class="evidence-ex">' + td.evidence.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul><div class="prov">' + statusChip('suggested') + ' Written for this app.</div>';
    } else {
      h += '<div class="notice">No curated examples yet for this standard. ' + (hs ? 'The clarification statement in the Standard tab is the most reliable guide to the kinds of evidence intended.' : '') + '</div>';
    }
    h += reflection(app, code, 'threeD');
    return h;
  }
  function lowerFirst(t) { return t.charAt(0).toLowerCase() + t.slice(1); }

  function dimCard(app, code, kind, id, name, about, hs, isSep) {
    var dim = kind === 'dci' ? 'DCI' : kind === 'sep' ? 'SEP' : 'CCC';
    var others = E.sharingElement(kind, id, code);
    var openKey = kind + ':' + id, open = app.local.dimOpen[openKey];
    var h = '<div class="dimcard" id="dim-' + esc(kind + '-' + id.replace('.', '-')) + '"><div class="hd">' + dimChip(dim) + '<span class="n">' + esc(name) + '</span>' + (hs ? statusChip('official') : '') + '</div><p>' + esc(about) + '</p>';
    if (isSep) {
      var sp = D.seps[id];
      h += '<details><summary class="small">How this practice grows from K–2 to 9–12</summary><div class="sep-prog">' + D.bands.map(function (b) { return '<div class="b">' + esc(b.label) + '</div><div class="' + (b.id === S.get(code).band ? 'cur' : '') + '">' + esc(sp.progression[b.id]) + '</div>'; }).join('') + '</div><p class="tiny muted">Paraphrase of NGSS Appendix F.</p></details>';
    }
    if (others.length) {
      h += '<button class="linkish small" data-act="dim-toggle" data-key="' + esc(openKey) + '" aria-expanded="' + !!open + '">' + (open ? 'Hide' : 'Show') + ' the ' + others.length + ' other high school PEs that share this element</button>';
      if (open) h += '<div class="code-list">' + others.map(function (c) { return '<span title="' + esc(S.shortLabel(c)) + '">' + peLink(c) + '</span>'; }).join('') + '</div><p class="tiny muted">' + statusChip('documented') + ' A shared element. It does not, by itself, mean the standards should be taught together.</p>';
    }
    h += '</div>';
    return h;
  }

  /* ------------------------------------------------------------------ Phenomena tab */
  function phenomenaTab(app, code) {
    var list = E.phenomenaFor(code);
    var h = '<h2>Phenomena Worth Exploring</h2>';
    h += '<p class="lede">Suggestions to spark sensemaking, not prescribed lessons. They differ in complexity and in how closely they align with this expectation.</p>';
    if (!list.length) {
      h += '<div class="notice">No curated phenomena have been written for this standard yet. ' + (S.isHS(code) && S.get(code).clarification ? 'The clarification statement (Standard tab) names contexts that NGSS considers appropriate.' : '') + '</div>';
      h += reflection(app, code, 'phenomena');
      return h;
    }
    h += '<table class="compare"><thead><tr><th>Phenomenon</th><th>Fit with ' + esc(code) + '</th><th>Complexity</th></tr></thead><tbody>' + list.map(function (p) {
      return '<tr><td>' + esc(p.item.title) + '</td><td>' + alignLabel(p.alignment) + '</td><td>' + dots(p.item.complexity) + ' <span class="tiny muted">' + esc(p.item.complexity) + '</span></td></tr>';
    }).join('') + '</tbody></table>';
    list.forEach(function (p) { h += phenCard(app, code, p); });
    h += reflection(app, code, 'phenomena');
    return h;
  }
  function alignLabel(a) {
    var t = { direct: 'Direct: builds evidence toward the PE', application: 'Application of the PE’s ideas', extension: 'Extension beyond the PE’s boundary' }[a] || a;
    return '<span class="small">' + esc(t) + '</span>';
  }
  function dots(c) { var n = { accessible: 1, moderate: 2, complex: 3 }[c] || 1; return '<span class="dots" aria-label="complexity ' + n + ' of 3"><i class="on"></i><i class="' + (n > 1 ? 'on' : '') + '"></i><i class="' + (n > 2 ? 'on' : '') + '"></i></span>'; }

  function phenCard(app, code, p) {
    var it = p.item, open = !!app.local.phenOpen[it.id], saved = app.state.isPhenomenonSaved(it.id);
    var h = '<article class="phen" id="phen-' + esc(it.id) + '"><div class="thumb">' + icon(SE.icon.has(it.icon) ? it.icon : 'lightbulb') + '</div><div class="main">';
    h += '<h3>' + esc(it.title) + '</h3><div class="meta">' + statusChip('suggested') + '<span class="chip">' + esc({ direct: 'Direct', application: 'Application', extension: 'Extension' }[p.alignment]) + '</span><span class="chip">' + dots(it.complexity) + ' ' + esc(it.complexity) + '</span></div>';
    h += '<p class="p"><b>The phenomenon.</b> ' + esc(it.phenomenon) + '</p><p class="qq">' + esc(it.question) + '</p>';
    h += '<div class="actions"><button class="btn btn-sm" data-act="phen-more" data-id="' + esc(it.id) + '" aria-expanded="' + open + '">' + (open ? 'Hide details' : 'Details') + '</button>' +
      '<button class="btn btn-sm" data-act="save-phen" data-id="' + esc(it.id) + '" aria-pressed="' + saved + '">' + icon(saved ? 'bookmarkFill' : 'bookmark') + (saved ? 'Saved' : 'Save') + '</button></div></div>';
    if (open) {
      h += '<div class="more"><h4>The standards connection</h4><p>' + esc(it.connection) + '</p>';
      var others = (it.others || []).filter(function (o) { return S.exists(o.code); });
      if (others.length) h += '<h4>Other connections</h4><ul>' + others.map(function (o) { return '<li>' + peLink(o.code) + ' ' + esc(o.note) + '</li>'; }).join('') + '</ul>';
      h += '<h4>Possible evidence</h4><ul>' + it.evidence.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul>';
      if (it.caveats) h += '<h4>Complexity and limits</h4><p>' + esc(it.caveats) + '</p>';
      var also = it.standards.filter(function (c) { return c !== code; });
      if (also.length) h += '<p class="small muted">Also suggested for: ' + also.map(peLink).join(', ') + '</p>';
      h += '</div>';
    }
    h += '</article>';
    return h;
  }

  /* ------------------------------------------------------------------ "Something to Think About" */
  function reflection(app, code, view) {
    var key = code + ':' + view;
    if (app.local.reflectDismissed[key]) return '<div class="reflect-restore"><button class="linkish" data-act="reflect-restore" data-view="' + view + '">Show something to think about</button></div>';
    var list = E.reflections(code, view);
    if (!list.length) return '';
    var i = (app.local.reflectIdx[key] || 0) % list.length, q = list[i];
    var saved = app.state.isQuestionSaved(q.text);
    return '<aside class="reflect" aria-label="Something to Think About"><div class="hd">' + icon('lightbulb') + 'Something to Think About</div>' +
      '<blockquote>' + esc(q.text) + '</blockquote><div class="actions">' +
      '<button class="btn btn-sm" data-act="save-q" data-view="' + view + '" data-q="' + esc(q.text) + '" aria-pressed="' + saved + '">' + icon(saved ? 'bookmarkFill' : 'bookmark') + (saved ? 'Saved' : 'Save question') + '</button>' +
      (list.length > 1 ? '<button class="btn btn-sm btn-ghost" data-act="reflect-next" data-view="' + view + '">Another question</button>' : '') +
      '<button class="btn btn-sm btn-ghost" data-act="reflect-dismiss" data-view="' + view + '">Dismiss</button></div></aside>';
  }

  SE.panels = { standardTab: standardTab, priorTab: priorTab, relatedTab: relatedTab, threeDTab: threeDTab, phenomenaTab: phenomenaTab,
    statusChip: statusChip, discChip: discChip, gradeChip: gradeChip, peLink: peLink, catChip: catChip, dimChip: dimChip,
    exploreBtn: exploreBtn, bookmarkBtn: bookmarkBtn, saveRelBtn: saveRelBtn, CATEGORY: CATEGORY, FIT: FIT, alignLabel: alignLabel, dots: dots };
})(window.SE = window.SE || {});
