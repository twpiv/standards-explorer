/* "My Exploration" dialog, exploration mini-map, printable summary, and the optional introduction. */
(function (SE) {
  'use strict';
  var U = SE.util, S = SE.store, E = SE.engine, D = SE.data, P = SE.panels, esc = U.esc, icon = SE.icon;

  /* Standards to show in the exploration record: bookmarks first, then recently explored. */
  function recordCodes(app, max) {
    var st = app.state.get(), out = [];
    st.bookmarks.standards.forEach(function (b) { if (out.indexOf(b.code) < 0) out.push(b.code); });
    app.state.recent(60).forEach(function (c) { if (out.indexOf(c) < 0) out.push(c); });
    return out.slice(0, max || 24);
  }

  /* Simplified network of explored and bookmarked standards (not a curriculum map). */
  function miniMap(app, opts) {
    opts = opts || {};
    var codes = recordCodes(app, opts.max || 20), st = app.state.get();
    if (!codes.length) return '<div class="empty">Explore or bookmark a few standards and they will appear here.</div>';
    var W = 760, H = 420, cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 - 60;
    var pos = {};
    codes.forEach(function (c, i) {
      var a = -Math.PI / 2 + i * 2 * Math.PI / codes.length;
      pos[c] = codes.length === 1 ? { x: cx, y: cy } : { x: cx + R * 1.35 * Math.cos(a), y: cy + R * Math.sin(a) };
    });
    var edges = '', savedKeys = {};
    st.bookmarks.relationships.forEach(function (r) { savedKeys[[r.a, r.b].sort().join('|')] = true; });
    for (var i = 0; i < codes.length; i++) for (var j = i + 1; j < codes.length; j++) {
      var a = codes[i], b = codes[j], rel = E.relationship(a, b), k = [a, b].sort().join('|');
      if (!rel && !savedKeys[k]) continue;
      var color = '#94a0ad', dash = '';
      if (rel && rel.type === 'prior') color = rel.item.status === 'documented' ? '#2563c4' : '#c2560c';
      else if (rel && rel.type === 'related') { color = rel.item.status === 'documented' ? '#1a7f45' : '#c2560c'; if (rel.item.status === 'suggested') dash = '7 4'; }
      else if (rel && rel.type === 'shared3d') { color = '#6d43c4'; dash = '2 4'; }
      if (rel && rel.type === 'shared3d' && !savedKeys[k]) continue;
      var w = savedKeys[k] ? 4 : 1.8;
      edges += '<line x1="' + pos[a].x.toFixed(1) + '" y1="' + pos[a].y.toFixed(1) + '" x2="' + pos[b].x.toFixed(1) + '" y2="' + pos[b].y.toFixed(1) + '" stroke="' + color + '" stroke-width="' + w + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + ' opacity=".85"/>';
    }
    var nodes = codes.map(function (c) {
      var s = S.get(c), bm = app.state.isBookmarked(c), p = pos[c];
      var col = { PS: '#b4234f', LS: '#0f7f74', ESS: '#93600b', ETS: '#4b5868' }[s.discipline];
      return '<g class="mm-node" ' + (opts.interactive ? 'data-act="explore" data-code="' + esc(c) + '" tabindex="0" role="button" aria-label="Explore ' + esc(c) + '"' : '') + ' transform="translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ')">' +
        '<circle r="' + (bm ? 11 : 8) + '" fill="' + col + '"' + (bm ? ' stroke="#1d4f7a" stroke-width="3"' : '') + '/>' +
        (Math.abs(p.x - cx) > 40
          ? '<text x="' + (p.x > cx ? 16 : -16) + '" y="4" text-anchor="' + (p.x > cx ? 'start' : 'end') + '"'
          : '<text x="0" y="' + (p.y < cy ? -16 : 24) + '" text-anchor="middle"') + ' style="font:650 11px ui-monospace,Consolas,monospace;fill:#17202b">' + esc(c) + '</text><title>' + esc(c + ': ' + S.shortLabel(c)) + '</title></g>';
    }).join('');
    return '<svg class="mini-map' + (opts.cls ? ' ' + opts.cls : '') + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Network of explored and bookmarked standards">' + edges + nodes + '</svg>' +
      '<div class="tiny muted" style="margin-top:4px">Larger outlined circles are bookmarked. Thick lines are connections you saved. Blue = documented prior learning, green = documented relationship, dashed orange = suggested. This is a record of exploration, not a curriculum map.</div>';
  }

  /* ------------------------------------------------------------------ dialog */
  function dialogHTML(app, tab) {
    var st = app.state.get(), bm = st.bookmarks;
    var tabs = [['overview', 'Overview'], ['saved', 'Saved'], ['notes', 'Notes'], ['history', 'History'], ['map', 'Map']];
    var h = '<div class="dlg"><div class="dlg-head"><h2 id="mx-title">My Exploration</h2><button class="btn btn-icon btn-ghost" data-act="close-dialog" aria-label="Close">' + icon('x') + '</button></div>';
    h += '<div class="tabs" role="tablist" aria-label="My Exploration sections">' + tabs.map(function (t) { return '<button role="tab" data-act="mx-tab" data-tab="' + t[0] + '" aria-selected="' + (tab === t[0]) + '">' + t[1] + '</button>'; }).join('') + '</div>';
    h += '<div class="dlg-body">';
    if (tab === 'overview') {
      var explored = U.uniq(st.history.map(function (x) { return x.code; }));
      h += '<p>A quiet record of what you explored and found interesting, saved automatically in this browser on this device. It is not a curriculum map and does not mean any standard has been “covered.”</p>';
      h += '<div class="stat-grid">' + stat(explored.length, 'standards explored') + stat(bm.standards.length, 'bookmarked standards') + stat(bm.relationships.length, 'saved connections') + stat(bm.phenomena.length, 'saved phenomena') + stat(bm.questions.length, 'saved questions') + stat(Object.keys(st.notes.byCode).length + (st.notes.general ? 1 : 0), 'notes') + '</div>';
      var byD = {}; explored.forEach(function (c) { var d = S.get(c).discipline; byD[d] = (byD[d] || 0) + 1; });
      var byB = {}; explored.forEach(function (c) { var b = S.get(c).band; byB[b] = (byB[b] || 0) + 1; });
      if (explored.length) h += '<p class="small">Across disciplines: ' + Object.keys(byD).map(function (d) { return esc(D.disciplines[d].label) + ' ' + byD[d]; }).join(' · ') + '<br>Across grade bands: ' + D.bands.filter(function (b) { return byB[b.id]; }).map(function (b) { return esc(b.long) + ' ' + byB[b.id]; }).join(' · ') + '</p>';
      if (!app.state.isPersistent()) h += '<div class="notice">This browser is not allowing saved data, so your exploration will be lost when you close the page. Use “Save exploration (JSON)” to keep a copy.</div>';
    } else if (tab === 'saved') {
      h += '<h3 style="font-size:15px">Bookmarked standards</h3>' + list(bm.standards.map(function (b) {
        return '<li><div class="grow">' + P.peLink(b.code) + ' ' + esc(S.shortLabel(b.code)) + '<div class="sub">' + esc(U.truncate(S.get(b.code).text, 140)) + '</div></div><button class="btn btn-sm btn-ghost" data-act="bookmark-std" data-code="' + esc(b.code) + '" aria-label="Remove bookmark ' + esc(b.code) + '">' + icon('trash') + '</button></li>';
      }), 'No bookmarked standards yet.');
      h += '<h3 style="font-size:15px">Saved connections</h3>' + list(bm.relationships.map(function (r) {
        var rel = E.relationship(r.a, r.b);
        var st2 = rel ? (rel.item.status || 'documented') : 'suggested';
        return '<li><div class="grow">' + P.peLink(r.a) + ' ↔ ' + P.peLink(r.b) + ' ' + P.statusChip(st2) + '<div class="sub">' + esc(r.label || (rel && rel.item.label) || '') + '</div></div><button class="btn btn-sm btn-ghost" data-act="save-rel" data-a="' + esc(r.a) + '" data-b="' + esc(r.b) + '" aria-label="Remove saved connection">' + icon('trash') + '</button></li>';
      }), 'No saved connections yet. Use “Save connection” on any connection card or line.');
      h += '<h3 style="font-size:15px">Saved phenomena</h3>' + list(bm.phenomena.map(function (p) {
        var ph = E.phenomenon(p.id);
        return '<li><div class="grow"><b>' + esc(ph.title) + '</b> ' + ph.standards.map(P.peLink).join(' ') + '<div class="sub">' + esc(ph.question) + '</div></div><button class="btn btn-sm btn-ghost" data-act="save-phen" data-id="' + esc(p.id) + '" aria-label="Remove saved phenomenon">' + icon('trash') + '</button></li>';
      }), 'No saved phenomena yet.');
      h += '<h3 style="font-size:15px">Saved questions</h3>' + list(bm.questions.map(function (q) {
        return '<li><div class="grow"><i>' + esc(q.text) + '</i><div class="sub">' + (q.code ? 'While exploring ' + esc(q.code) : '') + '</div></div><button class="btn btn-sm btn-ghost" data-act="save-q" data-q="' + esc(q.text) + '" aria-label="Remove saved question">' + icon('trash') + '</button></li>';
      }), 'No saved questions yet.');
    } else if (tab === 'notes') {
      h += '<label for="general-note"><b>General note</b> <span class="muted small">(optional)</span></label><textarea id="general-note" class="note-area" data-note="__general" placeholder="Anything worth bringing to a curriculum conversation…">' + esc(st.notes.general) + '</textarea><div class="saved-msg" aria-live="polite"></div>';
      var ns = Object.keys(st.notes.byCode);
      h += '<h3 style="font-size:15px;margin-top:14px">Notes on standards</h3>' + list(ns.map(function (c) {
        return '<li><div class="grow">' + P.peLink(c) + '<div class="sub" style="white-space:pre-wrap">' + esc(st.notes.byCode[c]) + '</div></div></li>';
      }), 'Add a note from the “My Note” section of any standard.');
    } else if (tab === 'history') {
      var hist = st.history.slice().reverse().slice(0, 80);
      h += list(hist.map(function (x) {
        var t = x.at ? new Date(x.at) : null;
        return '<li><div class="grow">' + P.peLink(x.code) + ' ' + esc(S.shortLabel(x.code)) + '</div><span class="sub">' + (t && !isNaN(t) ? esc(t.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })) : '') + '</span></li>';
      }), 'Nothing explored yet.');
    } else if (tab === 'map') {
      h += miniMap(app, { interactive: true });
    }
    h += '</div><div class="dlg-foot">' +
      '<button class="btn btn-sm" data-act="export">' + icon('download') + 'Save exploration (JSON)</button>' +
      '<button class="btn btn-sm" data-act="import">' + icon('upload') + 'Open saved exploration</button>' +
      '<button class="btn btn-sm" data-act="print">' + icon('print') + 'Print / Save as PDF</button><span class="spacer"></span>' +
      '<button class="btn btn-sm btn-ghost" data-act="reset">' + icon('reset') + 'Start over</button></div></div>';
    return h;
  }
  function stat(n, l) { return '<div class="stat"><b>' + n + '</b><span>' + esc(l) + '</span></div>'; }
  function list(items, empty) { return items.length ? '<ul class="saved-list">' + items.join('') + '</ul>' : '<div class="empty">' + esc(empty) + '</div>'; }

  /* ------------------------------------------------------------------ printable summary */
  function report(app) {
    var st = app.state.get(), bm = st.bookmarks;
    var course = st.course ? D.courses[st.course].label : 'Not selected';
    var date = new Date().toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
    var bmCodes = bm.standards.map(function (b) { return b.code; });
    var explored = U.uniq(st.history.map(function (x) { return x.code; })).filter(function (c) { return bmCodes.indexOf(c) < 0; });
    var focus = bmCodes.length ? bmCodes : explored.filter(S.isHS).slice(0, 6);
    var TS = '<span class="tag">Teacher-selected</span>', AUTO = '<span class="tag">Suggested by Standards Explorer</span>', DOC = '<span class="tag">Documented</span>', OFF = '<span class="tag">Official</span>';

    var h = '<article class="report"><h1>Standards Exploration Summary</h1>';
    h += '<div class="meta">Subject: <b>' + esc(course) + '</b> · Date: ' + esc(date) + ' · Standards: ' + esc(D.meta.standardsVersion) + '</div>';
    h += '<div class="disclaimer">This is a record of what one teacher explored and found interesting in the 2026 New Jersey Student Learning Standards for Science. It is <b>not</b> a curriculum, a standards alignment, or a district-approved sequence. ' +
      'Labels: ' + OFF + ' verbatim NJDOE wording; ' + DOC + ' supported by official structures (NJDOE progressions, NGSS foundation boxes, NJDOE model units); ' + AUTO + ' instructional suggestions written for the app; ' + TS + ' items the teacher chose to save.</div>';

    h += '<h2>Standards Bookmarked ' + TS + '</h2>';
    h += bmCodes.length ? bmCodes.map(function (c) { return peBlock(c, st); }).join('') : '<p>No standards were bookmarked.</p>';
    if (explored.length) {
      h += '<h2>Other Standards Explored</h2><ul>' + explored.slice(0, 40).map(function (c) { return '<li><b>' + esc(c) + '</b> ' + esc(S.shortLabel(c)) + (st.notes.byCode[c] ? ' (note below)' : '') + '</li>'; }).join('') + '</ul>';
    }

    if (focus.length) {
      h += '<h2>Important Prior-Grade Connections</h2>';
      focus.forEach(function (c) {
        var p = E.priorLearning(c);
        var steps = p.steps.filter(function (x) { return x.featured; }).slice(0, 8);
        if (!steps.length) return;
        h += '<h3>' + esc(c) + ' ' + esc(S.shortLabel(c)) + '</h3><ul>' + steps.map(function (x) {
          return '<li><b>' + esc(x.code) + '</b> (' + esc(S.gradeLabel(x.code)) + ') ' + (x.status === 'documented' ? DOC : AUTO) + ' Students were expected to: ' + esc(S.get(x.code).text) + '</li>';
        }).join('') + '</ul>';
        if (p.narrative) h += '<p style="font-size:10.5pt"><i>What develops:</i> ' + esc(p.narrative.ideaDevelops) + ' ' + AUTO + '</p>';
      });
      h += '<h2>Related High School Standards</h2>';
      focus.forEach(function (c) {
        var rel = E.related(c).filter(function (r) { return r.curated; }).slice(0, 5);
        if (!rel.length) rel = E.related(c).slice(0, 3);
        if (!rel.length) return;
        h += '<h3>' + esc(c) + '</h3><ul>' + rel.map(function (r) { return '<li><b>' + esc(r.code) + '</b> ' + esc(S.shortLabel(r.code)) + ': ' + esc(r.label) + ' ' + (r.status === 'documented' ? DOC : AUTO) + '</li>'; }).join('') + '</ul>';
      });
    }

    h += '<h2>Saved Connections ' + TS + '</h2>' + (bm.relationships.length ? '<ul>' + bm.relationships.map(function (r) {
      var rel = E.relationship(r.a, r.b), stt = rel ? rel.item.status : 'suggested';
      return '<li><b>' + esc(r.a) + ' ↔ ' + esc(r.b) + '</b>: ' + esc(r.label || '') + ' ' + (stt === 'documented' ? DOC : AUTO) + (rel && rel.item.why ? '<br><span style="font-size:10pt">' + esc(rel.item.why || rel.item.role || '') + '</span>' : '') + '</li>';
    }).join('') + '</ul>' : '<p>None saved.</p>');

    h += '<h2>Saved Phenomena ' + TS + '</h2>' + (bm.phenomena.length ? '<ul>' + bm.phenomena.map(function (p) {
      var ph = E.phenomenon(p.id);
      return '<li><b>' + esc(ph.title) + '</b> (' + esc(ph.standards.join(', ')) + ') ' + AUTO + '<br>' + esc(ph.phenomenon) + '<br><i>' + esc(ph.question) + '</i></li>';
    }).join('') + '</ul>' : '<p>None saved.</p>');

    h += '<h2>Saved Reflection Questions ' + TS + '</h2>' + (bm.questions.length ? '<ul>' + bm.questions.map(function (q) { return '<li><i>' + esc(q.text) + '</i>' + (q.code ? ' (' + esc(q.code) + ')' : '') + '</li>'; }).join('') + '</ul>' : '<p>None saved.</p>');

    var ns = Object.keys(st.notes.byCode);
    h += '<h2>Teacher Notes ' + TS + '</h2>';
    if (st.notes.general) h += '<div class="note">' + esc(st.notes.general) + '</div>';
    h += ns.length ? ns.map(function (c) { return '<h3>' + esc(c) + '</h3><div class="note">' + esc(st.notes.byCode[c]) + '</div>'; }).join('') : (st.notes.general ? '' : '<p>No notes.</p>');

    h += '<h2>Snapshot of Explored Connections</h2>' + miniMap(app, { cls: 'snapshot', max: 18 });
    h += '<p class="meta" style="margin-top:12px">Sources: NJDOE 2026 NJSLS-Science (' + esc(D.meta.landingUrl) + '); NJDOE Science Disciplinary Progressions; NGSS foundation boxes; NJDOE High School Model Scope and Sequence. Generated by Standards Explorer.</p>';
    h += '</article>';
    return h;
  }
  function peBlock(c, st) {
    return '<div class="pe"><h3>' + esc(c) + ' · ' + esc(S.shortLabel(c)) + ' <span class="tag">' + esc(S.get(c).discipline) + '</span></h3><div class="official">' + esc(S.get(c).text) + ' <span class="tag">Official</span></div>' +
      (st.notes.byCode[c] ? '<div class="note">Note: ' + esc(st.notes.byCode[c]) + '</div>' : '') + '</div>';
  }

  /* ------------------------------------------------------------------ introduction */
  function introHTML() {
    return '<div class="dlg"><div class="dlg-head"><h2>Welcome to Standards Explorer</h2><button class="btn btn-icon btn-ghost" data-act="close-dialog" aria-label="Close">' + icon('x') + '</button></div><div class="dlg-body">' +
      '<p>A discovery and reference tool for the 2026 New Jersey Student Learning Standards for Science. There are no stages, quizzes, or required answers. Click whatever interests you.</p>' +
      '<div class="intro-steps"><div><b>1 · Pick a standard</b>Choose a starting point, search by code or idea, or start from a topic you teach.</div>' +
      '<div><b>2 · See what it really asks</b>The official wording, with the practice language highlighted and a teacher-friendly interpretation.</div>' +
      '<div><b>3 · Follow connections</b>Prior learning from K–8, related high school standards, the three dimensions, and phenomena. Click any line to see why.</div>' +
      '<div><b>4 · Keep what matters</b>Bookmark standards, connections, phenomena, and questions. Everything saves in this browser; export or print anytime.</div></div>' +
      '<h3 style="font-size:15px;margin-top:10px">How to read the information</h3><p>' + P.statusChip('official') + ' Verbatim NJDOE 2026 wording and NGSS foundation categories.<br>' + P.statusChip('documented') + ' Supported by an official structure: the NJDOE K–12 progressions, NGSS foundation boxes, the NJDOE model scope and sequence, or official wording.<br>' + P.statusChip('suggested') + ' Instructional suggestions written for this app. They are never requirements or prerequisites.</p>' +
      '<p class="small muted">Earlier-grade standards describe intended learning, not proof of mastery. Clarification statements and assessment boundaries are paraphrased from NGSS; follow source links for official wording. Curated interpretations cover a growing set of standards; all ' + D.meta.highSchoolPEs + ' high school PEs show their official information.</p>' +
      '</div><div class="dlg-foot"><span class="spacer"></span><button class="btn btn-primary" data-act="close-dialog">Start exploring</button></div></div>';
  }

  SE.exploration = { dialogHTML: dialogHTML, report: report, miniMap: miniMap, introHTML: introHTML, recordCodes: recordCodes };
})(window.SE = window.SE || {});
