/* Application controller: routing, rendering, and event handling.
   Routes (hash-based so pages can be linked from a Google Site or district page):
     #/                     landing
     #/course/<course>      workspace with starting points
     #/explore/<CODE>       exploration workspace centered on a PE
     #/topics[/<topicId>]   "I Teach This Topic" explorer
   mount(root, opts) returns an app object (used by the browser tests). */
(function (SE) {
  'use strict';
  var U = SE.util, S = SE.store, E = SE.engine, D = SE.data, V = SE.views, P = SE.panels, X = SE.exploration, esc = U.esc, icon = SE.icon;
  var TAB_FOR_BRANCH = { prior: 'prior', related: 'related', interdisciplinary: 'related', threeD: 'threeD', phenomena: 'phenomena' };
  var TABS = [['standard', 'Standard', 'doc'], ['prior', 'Prior', 'prior'], ['related', 'Connections', 'link'], ['threeD', '3D', 'layers'], ['phenomena', 'Phenomena', 'lightbulb']];

  function freshLocal() {
    return { phraseOpen: null, stepOpen: null, priorShowAll: false, connFilter: 'all', connMore: false, phenOpen: {}, dimOpen: {},
      reflectIdx: {}, reflectDismissed: {}, expanded: {}, selectedKey: null, sideQuery: '', startQuery: '', topicQuery: '', legend: false, surprise: null };
  }

  function mount(root, opts) {
    opts = opts || {};
    var useHash = opts.useHash !== false;
    var state = opts.state || SE.stateFactory.create({ key: opts.storageKey, storage: opts.storage });
    var app = { root: root, state: state, opts: opts, local: freshLocal(), route: { page: 'landing' }, graph: null, dialog: null, shell: null };
    app.confirm = opts.confirm || function (m) { return window.confirm(m); };
    app.download = opts.download || defaultDownload;
    app.print = opts.print || function () { window.print(); };

    /* ------------------------------------------------------------ routing */
    function parse(hash) {
      var h = String(hash || '').replace(/^#\/?/, ''), parts = h.split('/').map(decodeURIComponent);
      if (parts[0] === 'explore' && S.exists(parts[1])) return { page: 'explore', code: parts[1] };
      if (parts[0] === 'course' && D.courses[parts[1]]) return { page: 'start', course: parts[1] };
      if (parts[0] === 'topics') return { page: 'topics', topic: parts[1] && E.topic(parts[1]) ? parts[1] : null };
      return { page: 'landing' };
    }
    function pathFor(r) {
      if (r.page === 'explore') return '#/explore/' + r.code;
      if (r.page === 'start') return '#/course/' + r.course;
      if (r.page === 'topics') return '#/topics' + (r.topic ? '/' + r.topic : '');
      return '#/';
    }
    function go(r) {
      if (useHash) {
        var p = pathFor(r);
        if (window.location.hash === p) applyRoute(r); else window.location.hash = p;
      } else applyRoute(r);
    }
    function applyRoute(r) {
      closePops();
      if (r.page === 'explore') {
        var st = state.get();
        if (st.center !== r.code || app.local.pendingTrail !== undefined) {
          var ti = app.local.pendingTrail;
          if (ti === undefined) { /* browser back/forward moves along the trail */
            var pos = typeof st.trailPos === 'number' ? st.trailPos : st.trail.length - 1;
            if (st.trail[pos - 1] === r.code) ti = pos - 1; else if (st.trail[pos + 1] === r.code) ti = pos + 1;
          }
          state.visit(r.code, ti !== undefined ? { trailIndex: ti } : {});
          app.local = Object.assign(freshLocal(), { sideQuery: app.local.sideQuery, legend: app.local.legend, sideCollapsed: app.local.sideCollapsed });
          state.setUI({ tab: 'standard' });
          app.local.animate = true;
        }
        delete app.local.pendingTrail;
        if (!state.get().course) { var c = S.courseOf(r.code); if (c) state.setCourse(c); }
        announce('Now exploring ' + r.code + ': ' + S.shortLabel(r.code));
      }
      if (r.page === 'start' && r.course) { if (state.get().course !== r.course) state.setCourse(r.course); }
      app.route = r;
      render();
      if (r.page === 'explore' && window.innerWidth <= 800) window.scrollTo(0, 0);
    }
    app.go = go;
    app.explore = function (code, trailIndex) {
      if (!S.exists(code)) return;
      if (trailIndex !== undefined) app.local.pendingTrail = trailIndex;
      go({ page: 'explore', code: code });
    };

    /* ------------------------------------------------------------ rendering */
    function render() {
      if (app.route.page === 'landing') {
        destroyGraph(); app.shell = null;
        root.innerHTML = V.landing(app);
        return;
      }
      ensureShell();
      app.shell.classList.toggle('no-center', app.route.page !== 'explore');
      /* On narrower desktops the sidebar steps aside while exploring so the map has room; the menu button brings it back. */
      var auto = app.route.page === 'explore' && window.innerWidth < 1500;
      app.shell.classList.toggle('side-collapsed', app.local.sideCollapsed === undefined ? auto : app.local.sideCollapsed);
      renderTop(); renderSide(); renderWork(); renderDetail();
    }

    function ensureShell() {
      if (app.shell && root.contains(app.shell)) return;
      root.innerHTML = '<div class="shell"><header class="top"></header><nav class="side" aria-label="Course, search, and saved standards"></nav>' +
        '<main class="work" aria-label="Exploration workspace"></main><section class="detail" aria-label="Standard details"></section>' +
        '<div class="sr-only" aria-live="polite" data-live></div></div>';
      app.shell = root.querySelector('.shell');
    }

    function renderTop() {
      var st = state.get(), top = app.shell.querySelector('.top');
      var nb = st.bookmarks.standards.length + st.bookmarks.relationships.length + st.bookmarks.phenomena.length + st.bookmarks.questions.length;
      var trail = st.trail.slice(-10), offset = st.trail.length - trail.length;
      var pos = typeof st.trailPos === 'number' ? st.trailPos : st.trail.length - 1;
      top.innerHTML = '<button class="btn btn-icon btn-ghost menu-btn" data-act="menu" aria-label="Open course and search panel">' + icon('menu') + '</button>' +
        '<a class="brand" href="' + (useHash ? '#/' : '#') + '" data-act="home">' + logo() + '<span>Standards Explorer</span></a>' +
        '<span class="trail-label">' + (trail.length ? 'Your path:' : '') + '</span><nav class="trail" aria-label="Exploration trail">' + trail.map(function (c, i) {
          var cur = app.route.page === 'explore' && i + offset === pos;
          return (i ? '<span class="sep" aria-hidden="true">›</span>' : '') + '<button class="crumb" data-act="crumb" data-i="' + (i + offset) + '" data-code="' + esc(c) + '"' + (cur ? ' aria-current="page"' : '') + ' title="' + esc(S.shortLabel(c)) + '">' + esc(c) + '</button>';
        }).join('') + '</nav>' +
        '<div class="top-actions"><button class="btn btn-surprise" data-act="surprise" title="Show me a connection I might have missed">' + icon('sparkle') + '<span class="label-mid">Surprise Me</span></button>' +
        '<button class="btn" data-act="exploration">' + icon('bookmark') + '<span class="label-mid">My Exploration</span>' + (nb ? '<span class="count-badge">' + nb + '</span>' : '') + '</button>' +
        '<button class="btn btn-icon btn-ghost" data-act="intro" aria-label="About Standards Explorer" title="About">' + icon('question') + '</button></div>';
    }

    function renderSide() {
      var side = app.shell.querySelector('.side');
      var focused = document.activeElement && document.activeElement.getAttribute && document.activeElement.getAttribute('data-search') === 'side';
      side.innerHTML = V.sidebar(app);
      if (focused) { var inp = side.querySelector('[data-search="side"]'); inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
    }

    function renderWork() {
      var work = app.shell.querySelector('.work');
      if (app.route.page === 'start') { destroyGraph(); work.innerHTML = V.start(app); return; }
      if (app.route.page === 'topics') { destroyGraph(); work.innerHTML = V.topicsView(app, app.route.topic); return; }
      var st = state.get(), code = st.center, view = st.ui.view;
      if (!st.ui.viewChosen && window.innerWidth < 600) view = 'list'; /* phones start with the readable list */
      var head = work.querySelector('.work-head');
      if (!head) {
        work.innerHTML = '<div class="work-head"></div><div class="canvas"></div><div class="pops"></div>';
        head = work.querySelector('.work-head');
      }
      head.innerHTML = '<div class="center-id"><span class="code">' + esc(code) + '</span><span class="t">' + esc(S.shortLabel(code)) + '</span></div>' +
        P.bookmarkBtn(app, code) +
        '<div class="toggle" role="group" aria-label="View"><button data-act="view" data-view="map" aria-pressed="' + (view === 'map') + '">' + icon('map') + 'Map</button><button data-act="view" data-view="list" aria-pressed="' + (view === 'list') + '">' + icon('list') + 'List</button></div>';
      var canvas = work.querySelector('.canvas');
      var net = E.network(code);
      if (view === 'map') {
        if (!app.graph) {
          canvas.innerHTML = '';
          app.graph = SE.Graph.create(canvas, graphHandlers());
          var tools = document.createElement('div');
          tools.innerHTML = '<div class="zoom"><button class="btn btn-icon" data-act="zoom-in" aria-label="Zoom in">' + icon('plus') + '</button><button class="btn btn-icon" data-act="zoom-out" aria-label="Zoom out">' + icon('minus') + '</button><button class="btn btn-icon" data-act="fit" aria-label="Fit map to screen" title="Reset view">' + icon('fit') + '</button></div>' +
            '<button class="btn btn-sm legend-btn" data-act="legend" aria-expanded="false">' + icon('info') + 'Legend</button><div data-legend-slot></div><div data-tip-slot></div>';
          while (tools.firstChild) canvas.appendChild(tools.firstChild);
        }
        var st2 = state.get();
        app.graph.render(net, { expanded: app.local.expanded, collapsed: st2.ui.collapsed || {}, visited: state.visitedMap(), bookmarked: bookmarkedMap(),
          selected: app.local.selectedKey, animate: !!app.local.animate, fit: app.local.fitNext !== false });
        app.local.animate = false; app.local.fitNext = true;
        var ls = canvas.querySelector('[data-legend-slot]'); if (ls) ls.innerHTML = app.local.legend ? V.legend() : '';
        var lb = canvas.querySelector('.legend-btn'); if (lb) lb.setAttribute('aria-expanded', String(!!app.local.legend));
        var ts = canvas.querySelector('[data-tip-slot]');
        if (ts) ts.innerHTML = st2.ui.introSeen ? '' : '<div class="tip-banner">New here? <button class="btn btn-sm" data-act="intro">Quick introduction</button><button class="btn btn-icon btn-sm btn-ghost" data-act="tip-dismiss" aria-label="Dismiss">' + icon('x') + '</button></div>';
      } else {
        destroyGraph();
        canvas.innerHTML = V.listView(app, net);
      }
      renderSurprise();
    }

    function renderDetail() {
      var det = app.shell.querySelector('.detail');
      if (app.route.page !== 'explore') { det.innerHTML = ''; return; }
      var st = state.get(), code = st.center, tab = st.ui.tab || 'standard';
      if (!TABS.some(function (t) { return t[0] === tab; })) tab = 'standard';
      var prevPanel = det.querySelector('.panel'), scroll = prevPanel && det.getAttribute('data-for') === code + ':' + tab ? prevPanel.scrollTop : 0;
      var counts = { prior: E.priorLearning(code).steps.length, related: S.isHS(code) ? E.related(code).length : E.laterLearning(code).length, phenomena: E.phenomenaFor(code).length };
      var html = '<div class="tabs" role="tablist" aria-label="Standard details">' + TABS.map(function (t) {
        var n = counts[t[0]];
        return '<button role="tab" id="tab-' + t[0] + '" aria-controls="panel" data-act="tab" data-tab="' + t[0] + '" aria-selected="' + (tab === t[0]) + '" tabindex="' + (tab === t[0] ? 0 : -1) + '">' + t[1] + (n !== undefined ? ' <span class="muted">' + n + '</span>' : '') + '</button>';
      }).join('') + '</div><div class="panel" id="panel" role="tabpanel" aria-labelledby="tab-' + tab + '" tabindex="0">' +
        (tab === 'standard' ? P.standardTab(app, code) : tab === 'prior' ? P.priorTab(app, code) : tab === 'related' ? P.relatedTab(app, code) : tab === 'threeD' ? P.threeDTab(app, code) : P.phenomenaTab(app, code)) + '</div>';
      det.innerHTML = html;
      det.setAttribute('data-for', code + ':' + tab);
      var panel = det.querySelector('.panel'); if (scroll) panel.scrollTop = scroll;
    }

    function rerenderPanelsOnly() { renderDetail(); }

    function bookmarkedMap() { var m = {}; state.get().bookmarks.standards.forEach(function (b) { m[b.code] = true; }); return m; }
    function destroyGraph() { if (app.graph) { app.graph.destroy(); app.graph = null; } }
    function logo() { return '<svg viewBox="0 0 26 26" aria-hidden="true"><g stroke="#9fb3c8" stroke-width="1.6"><path d="M13 13L5 6M13 13L21 6M13 13L5 20M13 13L21 20"/></g><circle cx="13" cy="13" r="5" fill="#1d4f7a"/><circle cx="5" cy="6" r="2.6" fill="#2563c4"/><circle cx="21" cy="6" r="2.6" fill="#1a7f45"/><circle cx="5" cy="20" r="2.6" fill="#6d43c4"/><circle cx="21" cy="20" r="2.6" fill="#c2560c"/></svg>'; }
    function announce(msg) { var l = root.querySelector('[data-live]'); if (l) l.textContent = msg; }

    /* ------------------------------------------------------------ graph handlers and popovers */
    function graphHandlers() {
      return {
        onNode: function (info, rect) { app.local.selectedKey = info.key; showPop(V.peek(app, { type: info.item.kind, item: info.item, branch: info.branch }), rect, info); markSelected(info.key); },
        onCenter: function () { showPop(V.peek(app, { type: 'center' }), app.graph.nodeRect('__center') || centerRect(), null); },
        onEdge: function (info, pt) { showPop(V.edgePop(app, info), { x: pt.x, y: pt.y, w: 0, h: 0 }, info); },
        onHub: function (branch) {
          var col = Object.assign({}, state.get().ui.collapsed || {}); col[branch] = !col[branch];
          app.local.fitNext = false;
          state.setUI({ collapsed: col, tab: TAB_FOR_BRANCH[branch] });
          renderWork(); renderDetail();
        },
        onMore: function (branch) { app.local.expanded[branch] = !app.local.expanded[branch]; renderWork(); },
        onRecenter: function (code) { app.explore(code); },
        onBackground: function () { closePops(); }
      };
    }
    function centerRect() { var c = app.shell.querySelector('.canvas').getBoundingClientRect(); return { x: c.width / 2 - 140, y: c.height / 2 - 56, w: 280, h: 112 }; }
    function markSelected(key) {
      if (!app.graph) return;
      U.$all('.g-node.selected', app.graph.el).forEach(function (n) { n.classList.remove('selected'); });
      var n = app.graph.el.querySelector('[data-key="' + key + '"]'); if (n) n.classList.add('selected');
    }
    function showPop(html, rect, info) {
      var pops = app.shell.querySelector('.pops'), canvas = app.shell.querySelector('.canvas');
      if (!pops) return;
      pops.innerHTML = '<div class="pop" role="dialog" aria-label="Details">' + html + '</div>';
      var pop = pops.firstChild, work = app.shell.querySelector('.work');
      var off = canvas.offsetTop, cw = work.clientWidth, ch = work.clientHeight, pw = Math.min(340, cw - 24);
      var left = rect.x + rect.w + 12; if (left + pw > cw - 12) left = rect.x - pw - 12; if (left < 12) left = Math.max(12, Math.min(cw - pw - 12, rect.x + rect.w / 2 - pw / 2));
      var top = off + rect.y; var ph = pop.offsetHeight; if (top + ph > ch - 12) top = Math.max(off + 8, ch - ph - 12);
      pop.style.left = left + 'px'; pop.style.top = top + 'px';
      app.local.popFor = info;
      var firstBtn = pop.querySelector('.btn-primary') || pop.querySelector('button');
      if (firstBtn && app.local.keyboardNav) firstBtn.focus();
    }
    function closePops() {
      if (!app.shell) return;
      var pops = app.shell.querySelector('.pops'); if (pops) pops.innerHTML = '';
      app.local.selectedKey = null;
      if (app.graph) U.$all('.g-node.selected', app.graph.el).forEach(function (n) { n.classList.remove('selected'); });
    }

    /* ------------------------------------------------------------ surprise */
    function renderSurprise() {
      if (!app.shell) return;
      var host = app.shell.querySelector('.work .pops') || app.shell.querySelector('.work');
      var old = app.shell.querySelector('.surprise'); if (old) old.remove();
      if (!app.local.surprise) return;
      var wrap = document.createElement('div'); wrap.innerHTML = V.surprise(app, app.local.surprise.cand);
      app.shell.querySelector('.work').appendChild(wrap.firstChild);
    }
    function surprise(next) {
      var st = state.get();
      if (app.route.page !== 'explore' || !st.center) {
        var course = st.course || 'physics', vis = state.visitedMap();
        var starter = D.courses[course].starters.filter(function (x) { return !vis[x.code]; })[0] || D.courses[course].starters[0];
        app.explore(starter.code);
        toast('Starting with ' + starter.code + '. Press Surprise Me again for a connection.');
        return;
      }
      if (next && app.local.surprise && app.local.surprise.cand) state.markSurpriseSeen(app.local.surprise.cand.id);
      var cands = E.surpriseCandidates(st.center, { visited: state.visitedMap(), seen: state.seenSurprises() });
      var cand = cands[0] || null;
      if (cand) state.markSurpriseSeen(cand.id);
      app.local.surprise = { cand: cand };
      renderSurprise();
      var card = app.shell.querySelector('.surprise'); if (card) { var b = card.querySelector('button'); if (b) b.focus(); }
    }

    /* ------------------------------------------------------------ dialogs */
    function openDialog(kind, html) {
      closeDialog();
      var d = document.createElement('dialog');
      d.className = 'se-dialog se-dialog-' + kind;
      d.setAttribute('aria-label', kind === 'exploration' ? 'My Exploration' : 'Introduction');
      d.innerHTML = html;
      document.body.appendChild(d);
      d.addEventListener('click', function (e) { if (e.target === d) { closeDialog(); return; } onClick(e); });
      d.addEventListener('input', onInput);
      d.addEventListener('close', function () { if (app.dialog && app.dialog.el === d) { d.remove(); app.dialog = null; } });
      if (d.showModal) { try { d.showModal(); } catch (e) { d.setAttribute('open', ''); } } else d.setAttribute('open', '');
      app.dialog = { el: d, kind: kind, tab: 'overview' };
      return d;
    }
    function closeDialog() { if (app.dialog) { var d = app.dialog.el; app.dialog = null; try { d.close(); } catch (e) { /* ignore */ } d.remove(); } }
    function openExploration(tab) {
      var d = openDialog('exploration', X.dialogHTML(app, tab || 'overview'));
      app.dialog.tab = tab || 'overview';
      return d;
    }
    function refreshExploration() {
      if (!app.dialog || app.dialog.kind !== 'exploration') return;
      var body = app.dialog.el.querySelector('.dlg-body'), sc = body ? body.scrollTop : 0;
      var active = document.activeElement && document.activeElement.getAttribute && document.activeElement.getAttribute('data-note');
      if (active) return; /* don't clobber a note while typing */
      app.dialog.el.innerHTML = X.dialogHTML(app, app.dialog.tab);
      var nb = app.dialog.el.querySelector('.dlg-body'); if (nb) nb.scrollTop = sc;
    }

    /* ------------------------------------------------------------ export / import / print */
    function doExport() {
      var name = 'standards-exploration-' + U.today() + '.json';
      app.download(name, state.exportJSON());
      toast('Saved ' + name);
    }
    function doImport(text) {
      var r = state.importJSON(text);
      if (!r.ok) { toast(r.error); return r; }
      toast('Exploration restored' + (r.dropped ? ' (' + r.dropped + ' unrecognized item' + (r.dropped === 1 ? '' : 's') + ' skipped)' : '') + '.');
      var st = state.get();
      app.local = freshLocal();
      if (st.center) go({ page: 'explore', code: st.center }); else if (st.course) go({ page: 'start', course: st.course }); else go({ page: 'landing' });
      refreshExploration();
      return r;
    }
    function pickFile() {
      var input = document.createElement('input');
      input.type = 'file'; input.accept = 'application/json,.json'; input.style.display = 'none';
      input.setAttribute('data-import-input', '');
      input.addEventListener('change', function () {
        var f = input.files && input.files[0]; if (!f) return;
        var reader = new FileReader();
        reader.onload = function () { doImport(String(reader.result)); input.remove(); };
        reader.readAsText(f);
      });
      (app.dialog ? app.dialog.el : document.body).appendChild(input);
      if (!opts.noFilePicker) input.click();
      return input;
    }
    app.importText = doImport;
    function doPrint() {
      var pr = document.getElementById('print-root');
      if (!pr) { pr = document.createElement('div'); pr.id = 'print-root'; document.body.appendChild(pr); }
      pr.innerHTML = X.report(app);
      app.print();
    }

    /* ------------------------------------------------------------ events */
    function onClick(e) {
      var t = e.target.closest ? e.target.closest('[data-act]') : null;
      if (!t) {
        if (app.local.legend && !e.target.closest('.legend')) { app.local.legend = false; renderLegend(); }
        return;
      }
      var act = t.getAttribute('data-act'), code = t.getAttribute('data-code');
      app.local.keyboardNav = e.detail === 0;
      switch (act) {
        case 'home': e.preventDefault(); go({ page: 'landing' }); break;
        case 'resume': go({ page: 'explore', code: state.get().center }); break;
        case 'course': {
          var c = t.getAttribute('data-course'); state.setCourse(c);
          if (app.route.page === 'landing' || app.route.page === 'start') go({ page: 'start', course: c });
          else { renderSide(); }
          break;
        }
        case 'explore': e.preventDefault(); closeDialog(); app.local.surprise = null; closeSide(); app.explore(code); break;
        case 'crumb': app.explore(code, +t.getAttribute('data-i')); break;
        case 'home-work': if (state.get().center) go({ page: 'explore', code: state.get().center }); else go({ page: 'start', course: state.get().course || 'physics' }); break;
        case 'topics': closeSide(); go({ page: 'topics', topic: null }); break;
        case 'topic': closeSide(); app.local.topicQuery = ''; go({ page: 'topics', topic: t.getAttribute('data-topic') }); break;
        case 'tab': closePops(); state.setUI({ tab: t.getAttribute('data-tab') }); renderDetail(); focusPanel(); break;
        case 'view': state.setUI({ view: t.getAttribute('data-view'), viewChosen: true }); renderWork(); break;
        case 'bookmark-std': {
          var on = state.toggleStandard(code); toast(on ? code + ' bookmarked' : 'Bookmark removed');
          refreshAfterSave(); break;
        }
        case 'save-rel': {
          var on2 = state.toggleRelationship(t.getAttribute('data-a'), t.getAttribute('data-b'), t.getAttribute('data-label'), t.getAttribute('data-kind'));
          toast(on2 ? 'Connection saved to My Exploration' : 'Connection removed'); refreshAfterSave(); break;
        }
        case 'save-phen': {
          var on3 = state.togglePhenomenon(t.getAttribute('data-id'), state.get().center);
          toast(on3 ? 'Phenomenon saved' : 'Phenomenon removed'); refreshAfterSave(); break;
        }
        case 'save-q': {
          var on4 = state.toggleQuestion(t.getAttribute('data-q'), t.getAttribute('data-view'), state.get().center);
          toast(on4 ? 'Question saved' : 'Question removed'); refreshAfterSave(); break;
        }
        case 'phrase': {
          var id = t.getAttribute('data-scope') + '-' + t.getAttribute('data-i');
          app.local.phraseOpen = app.local.phraseOpen === id ? null : id; renderDetail();
          var again = app.shell.querySelector('[data-act="phrase"][data-scope="' + t.getAttribute('data-scope') + '"][data-i="' + t.getAttribute('data-i') + '"]'); if (again) again.focus();
          break;
        }
        case 'step': app.local.stepOpen = app.local.stepOpen === code ? null : code; renderDetail(); break;
        case 'prior-all': app.local.priorShowAll = !app.local.priorShowAll; renderDetail(); break;
        case 'filter': app.local.connFilter = t.getAttribute('data-f'); renderDetail(); break;
        case 'conn-more': app.local.connMore = !app.local.connMore; renderDetail(); break;
        case 'phen-more': { var pid = t.getAttribute('data-id'); app.local.phenOpen[pid] = !app.local.phenOpen[pid]; renderDetail(); break; }
        case 'open-phen': { var oid = t.getAttribute('data-id'); app.local.phenOpen[oid] = true; closePops(); state.setUI({ tab: 'phenomena' }); renderDetail(); scrollToEl('#phen-' + oid); break; }
        case 'dim': {
          var key = t.getAttribute('data-dim') + ':' + t.getAttribute('data-id'); app.local.dimOpen[key] = true; closePops();
          state.setUI({ tab: 'threeD' }); renderDetail(); scrollToEl('#dim-' + t.getAttribute('data-dim') + '-' + t.getAttribute('data-id').replace('.', '-')); break;
        }
        case 'dim-toggle': { var k = t.getAttribute('data-key'); app.local.dimOpen[k] = !app.local.dimOpen[k]; renderDetail(); break; }
        case 'reflect-next': { var rk = state.get().center + ':' + t.getAttribute('data-view'); app.local.reflectIdx[rk] = (app.local.reflectIdx[rk] || 0) + 1; renderDetail(); break; }
        case 'reflect-dismiss': app.local.reflectDismissed[state.get().center + ':' + t.getAttribute('data-view')] = true; renderDetail(); break;
        case 'reflect-restore': delete app.local.reflectDismissed[state.get().center + ':' + t.getAttribute('data-view')]; renderDetail(); break;
        case 'zoom-in': if (app.graph) app.graph.zoomIn(); break;
        case 'zoom-out': if (app.graph) app.graph.zoomOut(); break;
        case 'fit': if (app.graph) app.graph.fit(); break;
        case 'legend': app.local.legend = !app.local.legend; renderLegend(); break;
        case 'close-pop': closePops(); break;
        case 'surprise': surprise(false); break;
        case 'surprise-next': surprise(true); break;
        case 'surprise-close': app.local.surprise = null; renderSurprise(); break;
        case 'exploration': openExploration('overview'); break;
        case 'mx-tab': app.dialog.tab = t.getAttribute('data-tab'); refreshExploration(); break;
        case 'close-dialog': closeDialog(); if (app.local.introOpen) { app.local.introOpen = false; state.setUI({ introSeen: true }); if (app.route.page === 'explore') renderWork(); } break;
        case 'intro': app.local.introOpen = true; openDialog('intro', X.introHTML()); break;
        case 'tip-dismiss': state.setUI({ introSeen: true }); renderWork(); break;
        case 'export': doExport(); break;
        case 'import': pickFile(); break;
        case 'print': doPrint(); break;
        case 'reset':
          if (app.confirm('Start over? This clears your bookmarks, notes, and history in this browser. Consider saving your exploration (JSON) first.')) {
            closeDialog(); state.reset(); app.local = freshLocal(); go({ page: 'landing' }); toast('Exploration cleared');
          }
          break;
        case 'menu':
          if (window.innerWidth > 1040) {
            app.local.sideCollapsed = !app.shell.classList.contains('side-collapsed');
            app.shell.classList.toggle('side-collapsed', app.local.sideCollapsed);
            if (app.graph) setTimeout(function () { app.graph.fit(); }, 30);
          } else { app.shell.classList.toggle('side-open'); syncScrim(); }
          break;
        case 'scrim': closeSide(); break;
        case 'noop': break;
      }
    }

    function refreshAfterSave() {
      renderTop();
      if (app.route.page === 'explore') {
        var head = app.shell.querySelector('.work-head .btn[data-act="bookmark-std"]');
        if (head) head.outerHTML = P.bookmarkBtn(app, state.get().center);
        if (app.graph && state.get().ui.view === 'map') { app.local.fitNext = false; renderWork(); }
        else if (state.get().ui.view === 'list') renderWork();
        renderDetail();
        var pops = app.shell.querySelector('.pops .pop');
        if (pops && app.local.popFor && app.local.popFor.item) { U.$all('[data-act="bookmark-std"],[data-act="save-rel"],[data-act="save-phen"]', pops).forEach(function (b) { refreshToggle(b); }); }
        renderSurprise();
      }
      renderSide();
      refreshExploration();
    }
    function refreshToggle(b) {
      var act = b.getAttribute('data-act'), on;
      if (act === 'bookmark-std') { on = state.isBookmarked(b.getAttribute('data-code')); b.outerHTML = P.bookmarkBtn(app, b.getAttribute('data-code')); return; }
      if (act === 'save-rel') { on = state.isRelationshipSaved(b.getAttribute('data-a'), b.getAttribute('data-b')); b.outerHTML = P.saveRelBtn(app, b.getAttribute('data-a'), b.getAttribute('data-b'), b.getAttribute('data-label'), b.getAttribute('data-kind')); return; }
      if (act === 'save-phen') { on = state.isPhenomenonSaved(b.getAttribute('data-id')); b.setAttribute('aria-pressed', String(on)); b.innerHTML = icon(on ? 'bookmarkFill' : 'bookmark') + (on ? 'Saved' : 'Save'); }
    }

    function renderLegend() {
      var slot = app.shell && app.shell.querySelector('[data-legend-slot]');
      if (slot) slot.innerHTML = app.local.legend ? V.legend() : '';
      var lb = app.shell && app.shell.querySelector('.legend-btn'); if (lb) lb.setAttribute('aria-expanded', String(!!app.local.legend));
    }
    function focusPanel() { var p = app.shell.querySelector('.tabs [aria-selected="true"]'); if (p) p.focus(); }
    function scrollToEl(sel) { setTimeout(function () { var el = app.shell.querySelector(sel); if (el && el.scrollIntoView) el.scrollIntoView({ block: 'start', behavior: U.prefersReducedMotion() ? 'auto' : 'smooth' }); }, 30); }
    function closeSide() { if (app.shell) { app.shell.classList.remove('side-open'); syncScrim(); } }
    function syncScrim() {
      var open = app.shell.classList.contains('side-open'), sc = app.shell.querySelector('.scrim');
      if (open && !sc) { sc = document.createElement('div'); sc.className = 'scrim'; sc.setAttribute('data-act', 'scrim'); app.shell.appendChild(sc); }
      if (!open && sc) sc.remove();
    }

    var searchSide = U.debounce(function (v) { app.local.sideQuery = v; renderSide(); }, 160);
    var searchStart = U.debounce(function (v) {
      app.local.startQuery = v;
      var box = app.shell && app.shell.querySelector('[data-results="start"]'); if (box) box.innerHTML = v ? V.results(app, v, false) : '';
    }, 160);
    var searchTopic = U.debounce(function (v) { app.local.topicQuery = v; var inp = document.activeElement; renderWork(); var again = app.shell.querySelector('[data-search="topic"]'); if (again && inp && inp.getAttribute('data-search') === 'topic') { again.focus(); again.setSelectionRange(again.value.length, again.value.length); } }, 200);
    var saveNote = U.debounce(function (code, val, msgEl) {
      if (code === '__general') state.setGeneralNote(val); else state.setNote(code, val);
      if (msgEl) msgEl.textContent = 'Saved in this browser';
    }, 350);

    function onInput(e) {
      var t = e.target;
      var s = t.getAttribute && t.getAttribute('data-search');
      if (s === 'side') searchSide(t.value.trim());
      else if (s === 'start') searchStart(t.value.trim());
      else if (s === 'topic') searchTopic(t.value.trim());
      var n = t.getAttribute && t.getAttribute('data-note');
      if (n) { var msg = t.parentNode.querySelector('.saved-msg'); if (msg) msg.textContent = 'Saving…'; saveNote(n, t.value, msg); }
    }

    function onKey(e) {
      if (e.key === 'Escape') {
        if (app.local.legend) { app.local.legend = false; renderLegend(); return; }
        if (app.local.surprise) { app.local.surprise = null; renderSurprise(); return; }
        closePops(); closeSide();
      }
      if (e.key === 'Enter' && e.target.getAttribute && e.target.getAttribute('data-search')) {
        var q = e.target.value.trim(), code = U.normalizeCode(q);
        if (code && S.exists(code)) { e.preventDefault(); app.explore(code); }
      }
      if (e.target.getAttribute && e.target.getAttribute('role') === 'tab' && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        var tabs = U.$all('[role="tab"]', e.target.parentNode), i = tabs.indexOf(e.target);
        var nx = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length]; nx.click(); nx.focus(); e.preventDefault();
      }
    }

    function toast(msg) {
      var old = document.querySelector('.toast'); if (old) old.remove();
      var t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg;
      document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2600);
    }
    app.toast = toast;

    function defaultDownload(name, text) {
      var blob = new Blob([text], { type: 'application/json' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
      document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    }

    root.addEventListener('click', onClick);
    root.addEventListener('input', onInput);
    root.addEventListener('keydown', onKey);
    var hashHandler = function () { applyRoute(parse(window.location.hash)); };
    if (useHash) window.addEventListener('hashchange', hashHandler);

    app.render = render;
    app.renderDetail = rerenderPanelsOnly;
    app.openExploration = openExploration;
    app.closeDialog = closeDialog;
    app.surprise = surprise;
    app.doExport = doExport;
    app.doPrint = doPrint;
    app.pickFile = pickFile;
    app.destroy = function () {
      root.removeEventListener('click', onClick); root.removeEventListener('input', onInput); root.removeEventListener('keydown', onKey);
      if (useHash) window.removeEventListener('hashchange', hashHandler);
      closeDialog(); destroyGraph(); root.innerHTML = '';
    };

    applyRoute(useHash ? parse(window.location.hash) : (opts.initialRoute || { page: 'landing' }));
    return app;
  }

  SE.App = { mount: mount };
})(window.SE = window.SE || {});
