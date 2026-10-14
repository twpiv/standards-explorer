/* Views: landing, sidebar, search results, start panel, topic explorer, list view, popovers, surprise card. */
(function (SE) {
  'use strict';
  var U = SE.util, S = SE.store, E = SE.engine, D = SE.data, P = SE.panels, esc = U.esc, icon = SE.icon;
  var COURSE_ICON = { biology: 'bio', chemistry: 'chem', physics: 'phys' };

  /* ------------------------------------------------------------------ landing */
  function landing(app) {
    var st = app.state.get();
    var resume = st.center && S.exists(st.center) ? '<div class="resume"><button class="btn" data-act="resume">' + icon('clock') + 'Continue exploring <span class="code">' + esc(st.center) + '</span></button></div>' : '';
    return '<div class="landing"><main class="landing-inner">' +
      '<svg class="landing-net" viewBox="0 0 200 90" aria-hidden="true"><g stroke="#b9c7d6" stroke-width="1.5"><path d="M100 45L40 20M100 45L40 70M100 45L160 20M100 45L165 70M100 45L100 8"/></g>' +
      '<g><circle cx="100" cy="45" r="13" fill="#1d4f7a"/><circle cx="40" cy="20" r="7" fill="#2563c4"/><circle cx="40" cy="70" r="7" fill="#2563c4"/><circle cx="160" cy="20" r="7" fill="#1a7f45"/><circle cx="165" cy="70" r="7" fill="#c2560c"/><circle cx="100" cy="8" r="6" fill="#6d43c4"/></g></svg>' +
      '<div class="eyebrow">New Jersey Student Learning Standards for Science · 2026</div>' +
      '<h1>STANDARDS EXPLORER</h1>' +
      '<p class="tagline">Discover how science learning connects across grades, disciplines, and experiences.</p>' + resume +
      '<div class="course-grid">' + ['biology', 'chemistry', 'physics'].map(function (c) {
        var co = D.courses[c];
        return '<button class="course-card" data-act="course" data-course="' + c + '"><h2>' + icon(COURSE_ICON[c]) + esc(co.label) + '</h2><p>' + esc(co.blurb) + '</p><span class="go">Start exploring →</span></button>';
      }).join('') + '</div>' +
      '<div class="landing-foot"><span>All ' + D.meta.totalPEs + ' performance expectations · ' + D.meta.highSchoolPEs + ' high school</span><span aria-hidden="true">·</span>' +
      '<button class="linkish" data-act="intro">What is this?</button><span aria-hidden="true">·</span>' +
      '<a href="' + esc(D.meta.landingUrl) + '" target="_blank" rel="noopener">Official NJDOE standards</a></div>' +
      '</main></div>';
  }

  /* ------------------------------------------------------------------ pe list item */
  function peItem(code, why) {
    var s = S.get(code);
    return '<button class="pe-item" data-act="explore" data-code="' + esc(code) + '"><span class="bar bar-' + s.discipline + '" aria-hidden="true"></span>' +
      '<span class="code">' + esc(code) + '</span><span class="t">' + esc(S.shortLabel(code)) + '</span>' + (why ? '<span class="why">' + esc(why) + '</span>' : '') + '</button>';
  }

  /* ------------------------------------------------------------------ sidebar */
  function sidebar(app) {
    var st = app.state.get(), course = st.course;
    var h = '<div><h3>Course</h3><div class="seg" role="group" aria-label="Course">' + ['biology', 'chemistry', 'physics'].map(function (c) {
      return '<button data-act="course" data-course="' + c + '" aria-pressed="' + (course === c) + '">' + esc(D.courses[c].label) + '</button>';
    }).join('') + '</div><div class="hint">Sets which standards appear first. Every discipline stays open to explore.</div></div>';
    h += '<div><h3>' + icon('search') + 'Search standards</h3><div class="searchbox">' + icon('search') +
      '<input type="search" data-search="side" placeholder="Code, idea, topic, or practice" aria-label="Search standards by code, scientific idea, topic, or practice" value="' + esc(app.local.sideQuery || '') + '"></div>' +
      '<div class="results" data-results="side" aria-live="polite">' + (app.local.sideQuery ? results(app, app.local.sideQuery, true) : '') + '</div></div>';
    h += '<button class="btn" data-act="topics">' + icon('topic') + 'I Teach This Topic…</button>';
    if (!app.local.sideQuery) {
      if (course) {
        h += '<div><h3>' + icon('compass') + 'Possible starting points</h3>' + D.courses[course].starters.map(function (x) { return peItem(x.code); }).join('') + '</div>';
      }
      var rec = app.state.recent(6).filter(function (c) { return c !== st.center; });
      h += '<div><h3>' + icon('clock') + 'Recently explored</h3>' + (rec.length ? rec.map(function (c) { return peItem(c); }).join('') : '<div class="empty">Standards you open will appear here.</div>') + '</div>';
      var bms = st.bookmarks.standards;
      h += '<div><h3>' + icon('bookmark') + 'Bookmarks</h3>' + (bms.length ? bms.slice().reverse().map(function (b) { return peItem(b.code); }).join('') : '<div class="empty">Bookmark standards to keep them handy.</div>') + '</div>';
    }
    return h;
  }

  /* ------------------------------------------------------------------ search results */
  function results(app, q, compact) {
    var r = SE.search.search(q, { course: app.state.get().course });
    var h = '';
    if (r.exact) h += '<div class="group-label">Exact match</div>' + peItem(r.exact);
    if (r.topics.length) {
      h += '<div class="group-label">Familiar topics</div>' + r.topics.map(function (t) {
        return '<button class="result-card" data-act="topic" data-topic="' + esc(t.id) + '"><b>' + icon('topic') + ' ' + esc(t.label) + '</b><span>See which performance expectations connect, and how directly</span></button>';
      }).join('');
      var top = r.topics[0];
      var conns = top.connections.filter(function (c) { return c.fit !== 'earlier' && S.exists(c.code); }).slice(0, compact ? 4 : 6);
      if (conns.length) h += '<div class="group-label">Standards connected to “' + esc(top.label) + '”</div>' + conns.map(function (c) { return peItem(c.code, P.FIT[c.fit] + ': ' + U.truncate(c.note, 90)); }).join('');
    }
    r.practices.slice(0, 2).forEach(function (p) {
      h += '<div class="group-label">Practice: ' + esc(p.name) + ' · ' + p.codes.length + ' HS PEs</div>' + p.codes.slice(0, compact ? 6 : 12).map(function (c) { return peItem(c); }).join('');
    });
    r.crosscutting.slice(0, 1).forEach(function (p) {
      h += '<div class="group-label">Crosscutting concept: ' + esc(p.name) + ' · ' + p.codes.length + ' HS PEs</div>' + p.codes.slice(0, compact ? 6 : 12).map(function (c) { return peItem(c); }).join('');
    });
    r.dcis.slice(0, 2).forEach(function (p) {
      h += '<div class="group-label">Core idea ' + esc(p.id) + ' ' + esc(p.name) + '</div>' + p.codes.slice(0, 8).map(function (c) { return peItem(c); }).join('');
    });
    if (r.codes.length) h += '<div class="group-label">Performance expectations</div>' + r.codes.slice(0, compact ? 14 : 24).map(function (x) { return peItem(x.code); }).join('');
    if (!h) h = '<div class="empty">No standards match “' + esc(q) + '”. Try a code (HS-PS2-1), an idea (energy), or a topic (genetics).</div>';
    if (r.topics.length && r.codes.length) h += '<div class="tiny muted" style="margin-top:6px">A topic match is not the same as a standard. Open the topic to see which PEs connect directly and which only provide context.</div>';
    return h;
  }

  /* ------------------------------------------------------------------ start panel */
  function start(app) {
    var course = app.state.get().course, co = D.courses[course];
    var h = '<div class="start"><h1>' + esc(co.label) + ': where would you like to start?</h1>';
    h += '<p class="lede">Choose any performance expectation to open its network of connections. There is no setup and no required path. Follow whatever interests you.</p>';
    h += '<div class="searchbox big">' + icon('search') + '<input type="search" data-search="start" placeholder="Search by code (HS-PS2-1), idea (forces), topic (kinematics), or practice (modeling)" aria-label="Search standards" value="' + esc(app.local.startQuery || '') + '"></div>';
    h += '<div class="results start-results" data-results="start" aria-live="polite">' + (app.local.startQuery ? results(app, app.local.startQuery, false) : '') + '</div>';
    h += '<h2>' + icon('compass') + 'Possible starting points to explore</h2><p class="note">Inspired by NJDOE’s high school model curriculum. They are not the prescribed beginning of a course.</p>';
    h += '<div class="starter-grid">' + co.starters.map(function (x) {
      var s = S.get(x.code);
      return '<button class="starter disc-' + s.discipline + '" data-act="explore" data-code="' + esc(x.code) + '"><span class="code">' + esc(x.code) + '</span><span class="t">' + esc(S.shortLabel(x.code)) + '</span><span class="why">' + esc(x.why) + '</span></button>';
    }).join('') + '</div>';
    var tops = E.topics().filter(function (t) { return t.course === course || !t.course; });
    h += '<h2>' + icon('topic') + 'I teach a topic…</h2><p class="note">See which performance expectations connect to a familiar topic, and how directly.</p><div class="topic-chips">' +
      tops.map(function (t) { return '<button class="topic-chip" data-act="topic" data-topic="' + esc(t.id) + '">' + esc(t.label) + '</button>'; }).join('') +
      '<button class="topic-chip" data-act="topics">All topics…</button></div>';
    h += '<h2>' + icon('layers') + 'The NJDOE model ' + esc(co.label) + ' course, unit by unit</h2><p class="note">One example sequence from NJDOE’s model scope and sequence, shown for reference. It is not a required order. “M” means the PE builds across several units; “C” means it builds across courses.</p>';
    h += D.modelCurriculum[course].map(function (u) {
      return '<details class="sec"><summary>' + esc(u.id + ' ' + u.title) + '<span class="q">' + u.pes.length + ' PEs</span></summary><div class="body">' + u.pes.map(function (p) {
        return peItem(p.code, (p.multiUnit ? 'M ' : '') + (p.crossCourse ? 'C' : ''));
      }).join('') + '</div></details>';
    }).join('');
    h += '</div>';
    return h;
  }

  /* ------------------------------------------------------------------ topic explorer */
  function topicsView(app, topicId) {
    var course = app.state.get().course;
    var t = topicId ? E.topic(topicId) : null;
    var all = E.topics().slice().sort(function (a, b) { return ((b.course === course) - (a.course === course)) || a.label.localeCompare(b.label); });
    var h = '<div class="start"><div class="topic-view">';
    h += '<button class="btn btn-sm btn-ghost" data-act="home-work">' + icon('back') + 'Back</button>';
    h += '<h1 style="margin-top:8px">I Teach This Topic: What Standards Are Connected?</h1>';
    h += '<p class="lede">A bridge from familiar course topics into the standards. A topic is never the same thing as a performance expectation. Some connections are direct, and many are partial or only contextual.</p>';
    h += '<div class="searchbox big">' + icon('search') + '<input type="search" data-search="topic" placeholder="Type a topic: kinematics, stoichiometry, genetics, waves…" aria-label="Find a topic" value="' + esc(app.local.topicQuery || '') + '"></div>';
    var shown = app.local.topicQuery ? E.matchTopics(app.local.topicQuery) : all;
    h += '<div class="topic-chips" data-topic-chips>' + shown.map(function (x) { return '<button class="topic-chip" data-act="topic" data-topic="' + esc(x.id) + '" aria-pressed="' + (t && t.id === x.id) + '">' + esc(x.label) + '</button>'; }).join('') + '</div>';
    if (app.local.topicQuery && !shown.length) {
      h += '<div class="notice">No topic page for “' + esc(app.local.topicQuery) + '” yet. Standards whose wording matches:</div><div class="results">' + results(app, app.local.topicQuery, false) + '</div>';
    }
    if (t) {
      h += '<section class="topic-head" aria-labelledby="topic-title"><h2 id="topic-title">' + esc(t.label) + '</h2><p>' + esc(t.summary) + '</p><div class="prov">' + P.statusChip('suggested') + ' Topic-to-standard mapping written for this app. The official wording of each PE is the authority.</div></section>';
      ['direct', 'partial', 'contextual', 'earlier'].forEach(function (fit) {
        var rows = t.connections.filter(function (c) { return c.fit === fit && S.exists(c.code); });
        if (!rows.length) return;
        h += '<div class="fit-group"><h3 class="fit-' + fit + '">' + esc(P.FIT[fit]) + ' <span class="muted small" style="font-weight:500">' + esc({ direct: 'The topic’s core idea is central to what the PE asks students to do', partial: 'The topic is part of the PE, but the PE targets a specific performance or scope', contextual: 'The topic supplies tools, language, or context; the PE targets something else', earlier: 'Where students were expected to meet related ideas before high school' }[fit]) + '</span></h3>';
        rows.forEach(function (c) {
          h += '<div class="fit-row"><div>' + P.peLink(c.code) + ' ' + P.discChip(c.code) + '</div><div><div class="t">' + esc(S.shortLabel(c.code)) + '</div><div class="n">' + esc(c.note) + '</div></div><div>' + P.exploreBtn(c.code, 'Explore') + '</div></div>';
        });
        h += '</div>';
      });
      if (t.gap) h += '<div class="gap-box"><b>What a traditional unit may include that no single HS PE requires.</b> ' + esc(t.gap) + '</div>';
    } else if (!app.local.topicQuery) {
      h += '<p class="muted">Choose a topic above.</p>';
    }
    h += '</div></div>';
    return h;
  }

  /* ------------------------------------------------------------------ list view */
  function listView(app, net) {
    var h = '<div class="listview"><p class="small muted" style="margin:0 0 12px">The same connections as the map, as a readable list.</p>';
    net.branches.forEach(function (br) {
      var label = br.id === 'related' && !net.hs ? 'Where This Leads' : br.label;
      h += '<section class="lv-branch" aria-labelledby="lv-' + br.id + '"><h2 id="lv-' + br.id + '">' + esc(label) + ' <span class="muted small">(' + br.items.length + ')</span></h2><p>' + esc(br.sub) + '</p>';
      if (!br.items.length) h += '<div class="empty">' + (br.id === 'phenomena' ? 'No curated phenomena yet for this standard.' : br.id === 'prior' ? 'No earlier PEs are listed for this standard’s DCI components.' : 'None identified.') + '</div>';
      var lastBand = null;
      br.items.forEach(function (it) {
        if (it.band && it.band !== lastBand && (br.id === 'prior' || !net.hs)) { h += '<div class="lv-band">' + esc(S.bandLong(it.band)) + '</div>'; lastBand = it.band; }
        h += '<article class="lv-item e-' + it.edge + '"><div class="hd">';
        if (it.kind === 'standard') {
          h += P.peLink(it.code) + P.discChip(it.code) + P.statusChip(it.status) + (it.category ? P.catChip(it.category) : '') + '<span class="t">' + esc(it.label) + '</span></div>';
          if (it.why) h += '<p class="why">' + esc(it.why) + '</p>';
          h += '<div class="actions">' + P.exploreBtn(it.code) + P.saveRelBtn(app, net.center, it.code, it.label, it.status) + '</div>';
        } else if (it.kind === 'dim') {
          h += P.dimChip(it.dim) + '<span class="t">' + esc(it.label) + '</span>' + P.statusChip(it.status) + '</div><div class="actions"><button class="btn btn-sm" data-act="dim" data-dim="' + it.dim.toLowerCase() + '" data-id="' + esc(it.id) + '">Open in Three Dimensions</button></div>';
        } else {
          var ph = E.phenomenon(it.id);
          h += icon(it.icon) + '<span class="t">' + esc(it.label) + '</span>' + P.statusChip('suggested') + '<span class="chip">' + esc(it.alignment) + '</span></div><p class="why">' + esc(ph.question) + '</p><div class="actions"><button class="btn btn-sm" data-act="open-phen" data-id="' + esc(it.id) + '">Details</button></div>';
        }
        h += '</article>';
      });
      h += '</section>';
    });
    return h + '</div>';
  }

  /* ------------------------------------------------------------------ popovers */
  function peek(app, info) {
    var it = info.item, center = app.state.get().center, h = '';
    h += '<button class="btn btn-icon btn-ghost x" data-act="close-pop" aria-label="Close">' + icon('x') + '</button>';
    if (info.type === 'center') {
      var s = S.get(center);
      h += '<h3><span class="code">' + esc(center) + '</span></h3><div class="meta">' + P.discChip(center) + P.gradeChip(center) + P.statusChip('official') + '</div><div class="official">' + esc(s.text) + '</div>' +
        '<div class="actions"><button class="btn btn-sm btn-primary" data-act="tab" data-tab="standard">What is it really asking?</button>' + P.bookmarkBtn(app, center) + '</div>';
      return h;
    }
    if (it.kind === 'standard') {
      var t = S.get(it.code);
      h += '<h3><span class="code">' + esc(it.code) + '</span> ' + esc(it.label || S.shortLabel(it.code)) + '</h3>';
      h += '<div class="meta">' + P.discChip(it.code) + P.gradeChip(it.code) + P.statusChip(it.status) + (it.category ? P.catChip(it.category) : '') + '</div>';
      h += '<div class="lab">Official wording</div><div class="official">' + esc(t.text) + '</div>';
      h += '<div class="lab">' + (info.branch === 'prior' ? 'Role in the progression' : 'Why it is connected') + '</div><p>' + esc(it.why || '') + '</p>';
      h += '<div class="actions">' + P.exploreBtn(it.code, 'Explore this standard') + P.bookmarkBtn(app, it.code) + P.saveRelBtn(app, center, it.code, it.label, it.status) + '</div>';
      h += '<p class="tiny muted" style="margin-top:8px">Tip: double-click a standard on the map to explore it directly.</p>';
    } else if (it.kind === 'dim') {
      var about = it.dim === 'SEP' ? D.seps[it.id].about : it.dim === 'CCC' ? D.cccs[it.id].about : 'A component of the disciplinary core idea ' + it.id.split('.')[0] + ' ' + (D.coreNames[it.id.split('.')[0]] || '') + '.';
      var others = S.isHS(center) ? E.sharingElement(it.dim.toLowerCase(), it.id, center).length : 0;
      h += '<h3>' + P.dimChip(it.dim) + ' ' + esc(it.label) + '</h3><div class="meta">' + P.statusChip(it.status) + '</div><p>' + esc(about) + '</p>' +
        (others ? '<p class="small">' + others + ' other high school PEs share this element.</p>' : '') +
        '<div class="actions"><button class="btn btn-sm btn-primary" data-act="dim" data-dim="' + it.dim.toLowerCase() + '" data-id="' + esc(it.id) + '">Open in Three Dimensions</button></div>';
    } else if (it.kind === 'phenomenon') {
      var ph = E.phenomenon(it.id);
      h += '<h3>' + esc(ph.title) + '</h3><div class="meta">' + P.statusChip('suggested') + '<span class="chip">' + esc(it.alignment) + '</span><span class="chip">' + P.dots(ph.complexity) + ' ' + esc(ph.complexity) + '</span></div><p>' + esc(ph.phenomenon) + '</p><p><b>' + esc(ph.question) + '</b></p>' +
        '<div class="actions"><button class="btn btn-sm btn-primary" data-act="open-phen" data-id="' + esc(ph.id) + '">Open details</button><button class="btn btn-sm" data-act="save-phen" data-id="' + esc(ph.id) + '" aria-pressed="' + app.state.isPhenomenonSaved(ph.id) + '">' + icon('bookmark') + 'Save</button></div>';
    }
    return h;
  }

  function edgePop(app, info) {
    var it = info.item, center = app.state.get().center, h = '';
    h += '<button class="btn btn-icon btn-ghost x" data-act="close-pop" aria-label="Close">' + icon('x') + '</button><h3>Why are these connected?</h3>';
    if (it.kind === 'standard') {
      var typeLabel = info.branch === 'prior' ? (S.get(center).band === '9-12' || S.bandIndex(S.get(it.code).band) < S.bandIndex(S.get(center).band) ? 'Prior learning' : 'Later learning')
        : info.branch === 'interdisciplinary' ? 'Interdisciplinary or engineering connection' : (S.isHS(center) ? 'Related high school standard' : 'Later learning');
      h += '<div class="meta"><span class="code">' + esc(center) + '</span> ↔ <span class="code">' + esc(it.code) + '</span></div><div class="meta"><span class="chip">' + esc(typeLabel) + '</span>' + P.statusChip(it.status) + (it.category ? P.catChip(it.category) : '') + '</div>';
      h += '<p>' + esc(it.why || '') + '</p>';
      if (it.evidence && it.evidence.length) h += '<div class="lab">Evidence</div>' + it.evidence.map(function (e) { return '<p class="ev">• ' + esc(e.note) + '</p>'; }).join('');
      if (info.branch === 'prior' && it.dcis && it.dcis.length) h += '<div class="lab">Evidence</div><p class="ev">• Both are listed under ' + it.dcis.map(function (d) { return esc(d + ' ' + S.dciName(d)); }).join(', ') + ' in the NJDOE K–12 progression (compiled).</p>';
      if (it.status === 'suggested') h += '<p class="tiny muted">A suggested connection is a professional instructional idea, not a requirement or a prerequisite.</p>';
      else if (info.branch === 'prior') h += '<p class="tiny muted">An earlier PE describes intended learning, not proof that students mastered it.</p>';
      h += '<div class="actions">' + P.exploreBtn(it.code, 'Explore ' + it.code) + P.saveRelBtn(app, center, it.code, it.label, it.status) + '</div>';
    } else if (it.kind === 'dim') {
      h += '<div class="meta"><span class="chip">Three-dimensional element</span>' + P.statusChip(it.status) + '</div><p>' + esc(it.label) + ' is ' + (it.inferred ? 'the practice family suggested by the wording of ' : 'part of the documented foundation of ') + esc(center) + '. Other standards that share this element are listed in the Three Dimensions tab.</p>';
    } else {
      var ph = E.phenomenon(it.id);
      h += '<div class="meta"><span class="chip">Phenomenon</span>' + P.statusChip('suggested') + '</div><p>' + esc(ph.connection) + '</p>';
    }
    return h;
  }

  /* ------------------------------------------------------------------ surprise */
  function surprise(app, cand) {
    var h = '<div class="surprise" role="dialog" aria-label="Surprise connection"><div class="sh">' + icon('sparkle') + 'Show me something I might have missed</div><div class="sb">';
    if (!cand) {
      h += '<p>You have already seen the strongest connections for this standard. Try exploring one of its related standards, then ask again.</p><div class="actions"><button class="btn btn-sm" data-act="surprise-close">Close</button></div></div></div>';
      return h;
    }
    var center = app.state.get().center;
    h += '<h3>' + esc(cand.headline) + '</h3><div class="target">' + P.peLink(cand.target) + P.discChip(cand.target) + P.statusChip(cand.status) + '<span class="small">' + esc(cand.label || S.shortLabel(cand.target)) + '</span></div>';
    h += '<p>' + esc(cand.text) + '</p>';
    h += '<div class="actions"><button class="btn btn-sm btn-primary" data-act="explore" data-code="' + esc(cand.target) + '">Explore it</button>' +
      P.saveRelBtn(app, center, cand.target, cand.headline + ': ' + (cand.label || ''), cand.status) +
      '<button class="btn btn-sm" data-act="surprise-next">Show another</button><button class="btn btn-sm btn-ghost" data-act="surprise-close">Dismiss</button></div></div></div>';
    return h;
  }

  /* ------------------------------------------------------------------ legend */
  function legend() {
    function line(cls, dash, color, label) {
      return '<div class="row"><svg width="44" height="10" aria-hidden="true"><path d="M2 5H42" stroke="' + color + '" stroke-width="2.5" ' + (dash ? 'stroke-dasharray="' + dash + '"' : '') + ' stroke-linecap="round"/></svg>' + label + '</div>';
    }
    return '<div class="legend" role="dialog" aria-label="Map legend"><h4>Connections</h4>' +
      line('prior', null, '#2563c4', '<span><b>Prior learning</b>, documented in the NJDOE progression</span>') +
      line('related', null, '#1a7f45', '<span><b>Related HS standard</b>, documented (shared DCI, model unit, or official wording)</span>') +
      line('shared', '2 4', '#6d43c4', '<span><b>Three-dimensional element</b> (DCI, SEP, CCC)</span>') +
      line('suggested', '8 5', '#c2560c', '<span><b>Suggested</b> instructional connection or phenomenon</span>') +
      '<h4>Disciplines</h4>' + ['PS', 'LS', 'ESS', 'ETS'].map(function (d) { return '<div class="row"><span class="sw" style="background:var(--d-' + d + ')"></span>' + esc(D.disciplines[d].label) + '</div>'; }).join('') +
      '<h4>Using the map</h4><div class="small">Click a standard to preview it; double-click or choose “Explore” to make it the center. Click a line to see why two standards are connected. Click a branch label to collapse it. Drag to pan, scroll or use the buttons to zoom.</div></div>';
  }

  SE.views = { landing: landing, sidebar: sidebar, results: results, start: start, topicsView: topicsView, listView: listView,
    peek: peek, edgePop: edgePop, surprise: surprise, legend: legend, peItem: peItem };
})(window.SE = window.SE || {});
