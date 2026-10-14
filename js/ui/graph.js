/* Interactive standards network (SVG). Deterministic hub-and-branch layout:
     center PE in the middle; five branches (prior learning left, three dimensions top, related right,
     interdisciplinary bottom-right, phenomena bottom-left). Prior learning is laid out as grade-band columns,
     so the K-12 progression reads left to right toward the center.
   Only the most meaningful items are visible at first; "+N more" nodes reveal the rest. */
(function (SE) {
  'use strict';
  var U = SE.util, S = SE.store, NS = 'http://www.w3.org/2000/svg';
  var NW = 160, NH = 54, CW = 250, CH = 104, HW = 168, HH = 36, ROW = 62, COLW = 172;
  var LIMIT = { prior: 2, related: 4, interdisciplinary: 3, threeD: 8, phenomena: 3 };
  var HUB = { prior: { x: -232, y: 0 }, related: { x: 232, y: -18 }, interdisciplinary: { x: 205, y: 190 }, threeD: { x: 0, y: -178 }, phenomena: { x: -205, y: 190 } };

  function wrap(text, max, lines) {
    var words = String(text).split(/\s+/), out = [], cur = '';
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if ((cur + ' ' + w).trim().length <= max) cur = (cur + ' ' + w).trim();
      else { if (cur) out.push(cur); cur = w; if (out.length === lines) break; }
    }
    if (out.length < lines && cur) out.push(cur);
    var used = out.join(' ').split(/\s+/).length;
    if (used < words.length && out.length) { var last = out[out.length - 1]; out[out.length - 1] = (last.length > max - 1 ? last.slice(0, max - 1) : last).replace(/[,;:.]?$/, '') + '…'; }
    return out.slice(0, lines);
  }

  function svgEl(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { if (attrs[k] !== null && attrs[k] !== undefined) e.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(e);
    return e;
  }

  function create(container, handlers) {
    handlers = handlers || {};
    var svg = svgEl('svg', { 'class': 'graph', role: 'group', 'aria-label': 'Standards network. Use Tab to move between standards; Enter to open; plus and minus keys to zoom; arrow keys to pan.', tabindex: '0' });
    svg.innerHTML = '<defs>' +
      '<marker id="arrow-prior" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#2563c4"/></marker>' +
      '<marker id="arrow-suggested" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#c2560c"/></marker>' +
      '</defs>';
    var root = svgEl('g', { 'class': 'viewport' }, svg);
    container.appendChild(svg);

    var vb = { x: -600, y: -400, w: 1200, h: 800 }, bbox = null, items = [];
    function applyVB() { svg.setAttribute('viewBox', [vb.x, vb.y, vb.w, vb.h].map(function (n) { return n.toFixed(1); }).join(' ')); }
    applyVB();

    /* ---------------------------------------------------- rendering */
    function render(net, opts) {
      opts = opts || {};
      var expanded = opts.expanded || {}, collapsed = opts.collapsed || {}, visited = opts.visited || {}, marked = opts.bookmarked || {};
      var animate = opts.animate && !U.prefersReducedMotion();
      root.innerHTML = '';
      items = [];
      var edgesG = svgEl('g', { 'class': 'edges' }, root);
      var nodesG = svgEl('g', { 'class': 'nodes' }, root);
      var minX = -CW / 2, maxX = CW / 2, minY = -CH / 2, maxY = CH / 2;
      function grow(x, y, w, h) { minX = Math.min(minX, x - w / 2); maxX = Math.max(maxX, x + w / 2); minY = Math.min(minY, y - h / 2); maxY = Math.max(maxY, y + h / 2); }

      var center = S.get(net.center);

      net.branches.forEach(function (br) {
        var hub = HUB[br.id]; if (!hub) return;
        var isCollapsed = !!collapsed[br.id];
        var all = br.items;
        /* trunk */
        svgEl('path', { d: 'M0 0L' + hub.x + ' ' + hub.y, 'class': 'g-edge trunk' }, edgesG);
        /* hub node */
        var hubG = svgEl('g', { 'class': 'g-hub hub-' + br.id, transform: 'translate(' + hub.x + ' ' + hub.y + ')', tabindex: '0', role: 'button',
          'aria-expanded': String(!isCollapsed), 'aria-label': br.label + ', ' + all.length + ' items. ' + (isCollapsed ? 'Collapsed. Press Enter to expand.' : 'Press Enter to collapse.'), 'data-branch': br.id }, nodesG);
        svgEl('rect', { x: -HW / 2, y: -HH / 2, width: HW, height: HH, rx: HH / 2 }, hubG);
        var ht = svgEl('text', { x: 0, y: 4, 'text-anchor': 'middle' }, hubG);
        ht.textContent = (br.id === 'related' && !net.hs ? 'Where This Leads' : shortHub(br.id)) + '  ';
        var cnt = svgEl('tspan', { 'class': 'cnt' }, ht); cnt.textContent = '(' + all.length + ')' + (isCollapsed ? ' ▸' : '');
        hubG.addEventListener('click', function (e) { e.stopPropagation(); if (!dragMoved) handlers.onHub && handlers.onHub(br.id); });
        keyActivate(hubG, function () { handlers.onHub && handlers.onHub(br.id); });
        if (animate) hubG.classList.add('g-fade');
        grow(hub.x, hub.y, HW, HH);
        if (isCollapsed) return;

        var visible = pickVisible(br, !!expanded[br.id]);
        var positions = layoutBranch(br, visible.list, hub, net);
        positions.forEach(function (p) {
          if (p.header) {
            var t = svgEl('text', { x: p.x, y: p.y, 'text-anchor': 'middle', 'class': 'g-band' }, nodesG);
            t.textContent = p.header;
            return;
          }
          if (p.empty) {
            var t2 = svgEl('text', { x: p.x, y: p.y, 'text-anchor': 'middle', 'class': 'g-band', style: 'font-weight:500;text-transform:none;letter-spacing:0' }, nodesG);
            t2.textContent = p.empty;
            return;
          }
          var it = p.item;
          drawEdge(edgesG, br, it, hub, p);
          var g = drawNode(nodesG, br, it, p, visited, marked, opts.selected);
          if (animate) g.classList.add('g-fade');
          grow(p.x, p.y, NW, NH);
        });
        if (visible.hidden > 0 || (expanded[br.id] && visible.canCollapse)) {
          var mp = morePosition(br, positions, hub);
          var mg = svgEl('g', { 'class': 'g-more', transform: 'translate(' + mp.x + ' ' + mp.y + ')', tabindex: '0', role: 'button',
            'aria-label': expanded[br.id] ? 'Show fewer ' + br.label : 'Show ' + visible.hidden + ' more in ' + br.label, 'data-more': br.id }, nodesG);
          svgEl('rect', { x: -62, y: -14, width: 124, height: 28, rx: 14 }, mg);
          var mt = svgEl('text', { x: 0, y: 4, 'text-anchor': 'middle' }, mg);
          mt.textContent = expanded[br.id] ? 'Show fewer' : '+' + visible.hidden + ' more';
          mg.addEventListener('click', function (e) { e.stopPropagation(); if (!dragMoved) handlers.onMore && handlers.onMore(br.id); });
          keyActivate(mg, function () { handlers.onMore && handlers.onMore(br.id); });
          grow(mp.x, mp.y, 124, 28);
        }
      });

      /* center node (drawn last so it is on top) */
      var cg = svgEl('g', { 'class': 'g-node g-center', transform: 'translate(0 0)', tabindex: '0', role: 'button',
        'aria-label': 'Current standard ' + center.code + ': ' + center.text, 'data-center': center.code }, nodesG);
      svgEl('rect', { 'class': 'box', x: -CW / 2, y: -CH / 2, width: CW, height: CH, rx: 14 }, cg);
      svgEl('rect', { 'class': 'stripe-' + center.discipline, x: -CW / 2, y: -CH / 2 + 10, width: 6, height: CH - 20, rx: 3 }, cg);
      var gl = svgEl('text', { x: -CW / 2 + 20, y: -CH / 2 + 22, 'class': 'grade' }, cg);
      gl.textContent = S.gradeLabel(center.code) + ' · ' + S.disciplineLabel(center.discipline);
      var ct = svgEl('text', { x: -CW / 2 + 20, y: -CH / 2 + 46, 'class': 'code-t' }, cg); ct.textContent = center.code;
      wrap(S.shortLabel(center.code), 30, 2).forEach(function (line, i) {
        var t = svgEl('text', { x: -CW / 2 + 20, y: -CH / 2 + 70 + i * 17, 'class': 'lbl' }, cg); t.textContent = line;
      });
      cg.addEventListener('click', function (e) { e.stopPropagation(); if (!dragMoved) handlers.onCenter && handlers.onCenter(center.code); });
      keyActivate(cg, function () { handlers.onCenter && handlers.onCenter(center.code); });

      bbox = { x: minX - 40, y: minY - 40, w: (maxX - minX) + 80, h: (maxY - minY) + 80 };
      if (opts.fit !== false) fit();
    }

    function shortHub(id) {
      return { prior: 'Prior Learning', related: 'Related HS Standards', interdisciplinary: 'Interdisciplinary', threeD: 'Three Dimensions', phenomena: 'Phenomena' }[id];
    }

    function pickVisible(br, isExpanded) {
      var list = br.items.slice();
      if (isExpanded) return { list: list, hidden: 0, canCollapse: list.length > LIMIT[br.id] };
      var vis;
      if (br.id === 'prior' || (br.id === 'related' && list.length && list[0].band && list[0].band !== '9-12') || (br.id === 'related' && list.length && list.every(function (x) { return x.band; }))) {
        var by = {};
        list.forEach(function (x) { (by[x.band] = by[x.band] || []).push(x); });
        vis = [];
        Object.keys(by).forEach(function (b) {
          var arr = by[b].slice().sort(function (a, c) { return (c.featured ? 1 : 0) - (a.featured ? 1 : 0); });
          vis = vis.concat(arr.slice(0, LIMIT.prior));
        });
      } else {
        var featured = list.filter(function (x) { return x.featured; });
        vis = (featured.length ? featured : list).slice(0, LIMIT[br.id]);
        if (vis.length < Math.min(2, list.length)) vis = list.slice(0, Math.min(LIMIT[br.id], list.length));
      }
      var keep = vis.map(function (x) { return x; });
      return { list: list.filter(function (x) { return keep.indexOf(x) >= 0; }), hidden: list.length - keep.length, canCollapse: false };
    }

    /* Grade-band columns: used for prior learning (left) and later learning for K-8 centers (right). */
    function bandColumns(visible, hub, dir, net) {
      var cBand = S.get(net.center).band, ci = S.bandIndex(cBand);
      var bands = SE.data.bands.map(function (b) { return b.id; }).filter(function (b, i) { return dir < 0 ? i < ci : i > ci; });
      if (dir < 0) bands.reverse();
      var out = [];
      bands.forEach(function (b, idx) {
        var col = visible.filter(function (x) { return x.band === b; });
        var x = hub.x + dir * (176 + idx * COLW);
        var n = Math.max(col.length, 1), top = -((n - 1) / 2) * ROW + hub.y;
        out.push({ header: S.bandLabel(b), x: x, y: top - NH / 2 - 14 });
        if (!col.length) out.push({ empty: 'none shown', x: x, y: top + 4 });
        col.forEach(function (it, i) { out.push({ item: it, x: x, y: top + i * ROW }); });
      });
      return out;
    }

    function layoutBranch(br, visible, hub, net) {
      if (br.id === 'prior') return bandColumns(visible, hub, -1, net);
      if (br.id === 'related' && !net.hs) return bandColumns(visible, hub, 1, net);
      var out = [];
      if (br.id === 'related') {
        var perCol = 5;
        visible.forEach(function (it, i) {
          var col = Math.floor(i / perCol), row = i % perCol, inCol = Math.min(perCol, visible.length - col * perCol);
          out.push({ item: it, x: hub.x + 180 + col * COLW, y: hub.y + (row - (inCol - 1) / 2) * ROW });
        });
      } else if (br.id === 'threeD') {
        visible.forEach(function (it, i) {
          var perRow = 5, r = Math.floor(i / perRow), k = i % perRow, inRow = Math.min(perRow, visible.length - r * perRow);
          out.push({ item: it, x: (k - (inRow - 1) / 2) * (NW + 12), y: hub.y - 100 - r * ROW });
        });
      } else {
        var dir = br.id === 'phenomena' ? -1 : 1;
        visible.forEach(function (it, i) {
          var perRow = 4, r = Math.floor(i / perRow), k = i % perRow;
          out.push({ item: it, x: hub.x + dir * (-50 + k * (NW + 12)), y: hub.y + 104 + r * ROW });
        });
      }
      return out;
    }

    function morePosition(br, positions, hub) {
      var pts = positions.filter(function (p) { return p.item; });
      if (!pts.length) return { x: hub.x, y: hub.y + 50 };
      if (br.id === 'threeD') { var minY = Math.min.apply(null, pts.map(function (p) { return p.y; })); return { x: 0, y: minY - 56 }; }
      if (br.id === 'phenomena' || br.id === 'interdisciplinary') {
        var maxY = Math.max.apply(null, pts.map(function (p) { return p.y; }));
        return { x: pts[0].x, y: maxY + 52 };
      }
      var maxY2 = Math.max.apply(null, pts.map(function (p) { return p.y; }));
      var avgX = pts.reduce(function (s, p) { return s + p.x; }, 0) / pts.length;
      if (br.id === 'prior' || br.id === 'related') { var nearest = pts.reduce(function (a, p) { return Math.abs(p.x - hub.x) < Math.abs(a.x - hub.x) ? p : a; }, pts[0]); avgX = nearest.x; }
      return { x: avgX, y: maxY2 + 52 };
    }

    function drawEdge(g, br, it, hub, p) {
      var x1 = p.x, y1 = p.y, x2 = hub.x, y2 = hub.y, d;
      var horiz = br.id === 'prior' || br.id === 'related';
      if (horiz) {
        var sx = x1 + (x1 < x2 ? NW / 2 : -NW / 2), ex = x2 + (x1 < x2 ? -HW / 2 : HW / 2);
        d = 'M' + sx + ' ' + y1 + 'C' + ((sx + ex) / 2) + ' ' + y1 + ' ' + ((sx + ex) / 2) + ' ' + y2 + ' ' + ex + ' ' + y2;
      } else {
        var sy = y1 + (y1 < y2 ? NH / 2 : -NH / 2), ey = y2 + (y1 < y2 ? -HH / 2 : HH / 2);
        d = 'M' + x1 + ' ' + sy + 'C' + x1 + ' ' + ((sy + ey) / 2) + ' ' + x2 + ' ' + ((sy + ey) / 2) + ' ' + x2 + ' ' + ey;
      }
      var hit = svgEl('path', { d: d, 'class': 'g-hit', tabindex: '-1', 'data-branch': br.id }, g);
      var marker = br.id === 'prior' ? (it.edge === 'suggested' ? 'url(#arrow-suggested)' : 'url(#arrow-prior)') : null;
      var vis = svgEl('path', { d: d, 'class': 'g-edge ' + it.edge, 'marker-end': marker }, g);
      var title = svgEl('title', null, hit);
      title.textContent = edgeTitle(br, it) + ' (click to see why)';
      hit.addEventListener('click', function (e) {
        e.stopPropagation(); if (dragMoved) return;
        var r = container.getBoundingClientRect();
        handlers.onEdge && handlers.onEdge({ branch: br.id, item: it }, { x: e.clientX - r.left, y: e.clientY - r.top });
      });
      hit.addEventListener('mouseenter', function () { vis.classList.add('hot'); });
      hit.addEventListener('mouseleave', function () { vis.classList.remove('hot'); });
    }

    function edgeTitle(br, it) {
      if (it.kind === 'dim') return 'Three-dimensional element of this standard';
      if (it.kind === 'phenomenon') return 'Suggested phenomenon';
      if (br.id === 'prior') return it.status === 'documented' ? 'Prior learning (documented progression)' : 'Prior learning (suggested connection)';
      return it.status === 'documented' ? 'Documented relationship' : 'Suggested instructional connection';
    }

    function drawNode(parent, br, it, p, visited, marked, selected) {
      var key = nodeKey(it);
      var cls = 'g-node';
      if (it.kind === 'dim') cls += ' g-dim dim-' + it.dim;
      if (it.kind === 'phenomenon') cls += ' g-phen';
      if (it.status === 'suggested') cls += ' suggested';
      if (selected && selected === key) cls += ' selected';
      var label = it.kind === 'standard' ? it.code + ': ' + S.shortLabel(it.code) + '. ' + (it.status === 'documented' ? 'Documented' : it.status === 'suggested' ? 'Suggested' : '') + ' connection. ' + br.label
        : it.kind === 'dim' ? it.dim + ': ' + it.label : 'Phenomenon: ' + it.label;
      var g = svgEl('g', { 'class': cls, transform: 'translate(' + p.x + ' ' + p.y + ')', tabindex: '0', role: 'button', 'aria-label': label, 'data-key': key, 'data-branch': br.id }, parent);
      svgEl('rect', { 'class': 'box', x: -NW / 2, y: -NH / 2, width: NW, height: NH, rx: 9 }, g);
      if (it.kind === 'standard') {
        var s = S.get(it.code);
        svgEl('rect', { 'class': 'stripe-' + s.discipline, x: -NW / 2, y: -NH / 2 + 7, width: 4, height: NH - 14, rx: 2 }, g);
        var c = svgEl('text', { x: -NW / 2 + 12, y: -NH / 2 + 18, 'class': 'code-t' }, g); c.textContent = it.code;
        wrap(it.label || S.shortLabel(it.code), 23, 2).forEach(function (line, i) {
          var t = svgEl('text', { x: -NW / 2 + 12, y: -NH / 2 + 33 + i * 13.5, 'class': 'lbl' }, g); t.textContent = line;
        });
        if (visited[it.code]) svgEl('circle', { 'class': 'visited-dot', cx: NW / 2 - 10, cy: -NH / 2 + 10, r: 3.5 }, g).appendChild(titleEl('Explored'));
        if (marked[it.code]) {
          var bm = svgEl('path', { d: 'M' + (NW / 2 - 24) + ' ' + (-NH / 2 + 5) + 'h8v11l-4-3-4 3z', fill: '#1d4f7a' }, g); bm.appendChild(titleEl('Bookmarked'));
        }
      } else if (it.kind === 'dim') {
        var tg = svgEl('text', { x: -NW / 2 + 12, y: -NH / 2 + 17, 'class': 'tag' }, g); tg.textContent = it.dim + (it.inferred ? ' · from wording' : '');
        wrap(it.label.replace(' (from wording)', ''), 23, 2).forEach(function (line, i) {
          var t = svgEl('text', { x: -NW / 2 + 12, y: -NH / 2 + 32 + i * 13.5, 'class': 'lbl' }, g); t.textContent = line;
        });
      } else {
        var ig = svgEl('g', { transform: 'translate(' + (-NW / 2 + 8) + ' ' + (-12) + ')', 'class': 'ico', fill: 'none', stroke: '#c2560c', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
        ig.innerHTML = SE.icon.paths[it.icon] || SE.icon.paths.lightbulb;
        wrap(it.label, 18, 2).forEach(function (line, i, arr) {
          var t = svgEl('text', { x: -NW / 2 + 40, y: (arr.length === 1 ? 4 : -3 + i * 14), 'class': 'lbl', style: 'font-weight:600' }, g); t.textContent = line;
        });
      }
      g.addEventListener('click', function (e) {
        e.stopPropagation(); if (dragMoved) return;
        handlers.onNode && handlers.onNode({ branch: br.id, item: it, key: key }, rectOf(g));
      });
      g.addEventListener('dblclick', function (e) { e.stopPropagation(); if (it.kind === 'standard' && handlers.onRecenter) handlers.onRecenter(it.code); });
      keyActivate(g, function () { handlers.onNode && handlers.onNode({ branch: br.id, item: it, key: key }, rectOf(g)); });
      return g;
    }

    function titleEl(t) { var e = svgEl('title'); e.textContent = t; return e; }
    function nodeKey(it) { return it.kind === 'standard' ? 's:' + it.code : it.kind === 'dim' ? 'd:' + it.dim + ':' + it.id : 'p:' + it.id; }
    function rectOf(el) {
      var r = el.getBoundingClientRect(), c = container.getBoundingClientRect();
      return { x: r.left - c.left, y: r.top - c.top, w: r.width, h: r.height };
    }
    function keyActivate(el, fn) {
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); fn(); } });
    }

    /* ---------------------------------------------------- pan and zoom */
    function fit() {
      if (!bbox) return;
      var r = svg.getBoundingClientRect();
      var aspect = r.width && r.height ? r.width / r.height : 1.5;
      var w = bbox.w, h = bbox.h;
      if (w / h > aspect) h = w / aspect; else w = h * aspect;
      vb = { x: bbox.x + bbox.w / 2 - w / 2, y: bbox.y + bbox.h / 2 - h / 2, w: w, h: h };
      applyVB();
    }
    function zoomBy(f, px, py) {
      var nw = Math.min(Math.max(vb.w * f, 320), 5000), k = nw / vb.w;
      if (px === undefined) { px = vb.x + vb.w / 2; py = vb.y + vb.h / 2; }
      vb.x = px - (px - vb.x) * k; vb.y = py - (py - vb.y) * k; vb.w *= k; vb.h *= k;
      applyVB();
    }
    function toSvg(cx, cy) {
      var pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy;
      var m = svg.getScreenCTM(); if (!m) return { x: 0, y: 0 };
      var q = pt.matrixTransform(m.inverse()); return { x: q.x, y: q.y };
    }
    function scale() { var r = svg.getBoundingClientRect(); return Math.max(vb.w / (r.width || 1), vb.h / (r.height || 1)); }

    svg.addEventListener('wheel', function (e) {
      e.preventDefault();
      var p = toSvg(e.clientX, e.clientY);
      zoomBy(Math.exp(e.deltaY * 0.0015), p.x, p.y);
    }, { passive: false });

    var drag = null, dragMoved = false;
    svg.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      dragMoved = false;
      drag = { x: e.clientX, y: e.clientY, vx: vb.x, vy: vb.y, s: scale(), id: e.pointerId };
    });
    svg.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!dragMoved && Math.abs(dx) + Math.abs(dy) > 5) {
        dragMoved = true; svg.classList.add('dragging');
        try { svg.setPointerCapture(drag.id); } catch (err) { /* ignore */ }
      }
      if (dragMoved) { vb.x = drag.vx - dx * drag.s; vb.y = drag.vy - dy * drag.s; applyVB(); }
    });
    function endDrag() { if (drag) { svg.classList.remove('dragging'); drag = null; setTimeout(function () { dragMoved = false; }, 0); } }
    svg.addEventListener('pointerup', endDrag);
    svg.addEventListener('pointercancel', endDrag);
    svg.addEventListener('click', function () { if (!dragMoved && handlers.onBackground) handlers.onBackground(); });
    svg.addEventListener('keydown', function (e) {
      if (e.target !== svg && !(e.key === '+' || e.key === '=' || e.key === '-' || e.key === '0')) return;
      var step = vb.w * 0.08;
      if (e.key === '+' || e.key === '=') { zoomBy(0.8); e.preventDefault(); }
      else if (e.key === '-') { zoomBy(1.25); e.preventDefault(); }
      else if (e.key === '0') { fit(); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { vb.x -= step; applyVB(); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { vb.x += step; applyVB(); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { vb.y -= step; applyVB(); e.preventDefault(); }
      else if (e.key === 'ArrowDown') { vb.y += step; applyVB(); e.preventDefault(); }
    });

    var ro = window.ResizeObserver ? new ResizeObserver(U.debounce(function () { fit(); }, 120)) : null;
    if (ro) ro.observe(container);

    function nodeRect(key) {
      var el = svg.querySelector('[data-key="' + key + '"]');
      return el ? rectOf(el) : null;
    }
    function focusKey(key) { var el = svg.querySelector('[data-key="' + key + '"]'); if (el) el.focus(); }
    function destroy() { if (ro) ro.disconnect(); svg.remove(); }

    return { render: render, fit: fit, zoomIn: function () { zoomBy(0.8); }, zoomOut: function () { zoomBy(1.25); },
      nodeRect: nodeRect, focusKey: focusKey, destroy: destroy, el: svg, viewBox: function () { return vb; } };
  }

  SE.Graph = { create: create, LIMIT: LIMIT };
})(window.SE = window.SE || {});
