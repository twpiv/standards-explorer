/* Exploration state ("My Exploration"): visited standards, trail, bookmarks, notes, and preferences.
   Saved automatically to localStorage on the same browser and device. Nothing is required from the teacher.
   Exports and imports a versioned JSON file. */
(function (SE) {
  'use strict';
  var FORMAT = 'standards-explorer-exploration';
  var FORMAT_VERSION = 1;
  var MAX_HISTORY = 300, MAX_TEXT = 4000;

  function blank() {
    return {
      v: FORMAT_VERSION,
      course: null,
      center: null,
      trail: [],
      trailPos: -1,
      history: [],
      bookmarks: { standards: [], relationships: [], phenomena: [], questions: [] },
      notes: { general: '', byCode: {} },
      surprisesSeen: [],
      ui: { view: 'map', tab: 'standard', introSeen: false, expanded: {}, collapsed: {}, reflectionHidden: false }
    };
  }

  function now() { return new Date().toISOString(); }
  function clip(s) { return String(s == null ? '' : s).slice(0, MAX_TEXT); }

  function create(opts) {
    opts = opts || {};
    var key = opts.key || 'standards-explorer-v1';
    var storage = opts.storage !== undefined ? opts.storage : safeLocalStorage();
    var listeners = [];
    var persistent = !!storage;
    var st = load();

    function safeLocalStorage() { try { var t = '__se_test__'; window.localStorage.setItem(t, t); window.localStorage.removeItem(t); return window.localStorage; } catch (e) { return null; } }

    function load() {
      if (!storage) return blank();
      try {
        var raw = storage.getItem(key);
        if (!raw) return blank();
        var parsed = JSON.parse(raw);
        var clean = sanitize(parsed, {});
        return clean;
      } catch (e) { return blank(); }
    }

    var saveTimer = null;
    function save() {
      if (!storage) return;
      try { storage.setItem(key, JSON.stringify(st)); persistent = true; }
      catch (e) { persistent = false; }
    }
    function changed(what) {
      save();
      listeners.forEach(function (fn) { try { fn(what, st); } catch (e) { if (window.console) console.error(e); } });
    }

    /* ---------------- reads ---------------- */
    function get() { return st; }
    function isPersistent() { return persistent; }
    function visitedMap() { var m = {}; st.history.forEach(function (h) { m[h.code] = true; }); return m; }
    function isBookmarked(code) { return st.bookmarks.standards.some(function (b) { return b.code === code; }); }
    function relKey(a, b) { return [a, b].sort().join('|'); }
    function isRelationshipSaved(a, b) { var k = relKey(a, b); return st.bookmarks.relationships.some(function (r) { return relKey(r.a, r.b) === k; }); }
    function isPhenomenonSaved(id) { return st.bookmarks.phenomena.some(function (p) { return p.id === id; }); }
    function isQuestionSaved(text) { return st.bookmarks.questions.some(function (q) { return q.text === text; }); }
    function recent(n) {
      var seen = {}, out = [];
      for (var i = st.history.length - 1; i >= 0 && out.length < (n || 8); i--) { var c = st.history[i].code; if (!seen[c]) { seen[c] = true; out.push(c); } }
      return out;
    }
    function note(code) { return st.notes.byCode[code] || ''; }

    /* ---------------- writes ---------------- */
    function setCourse(c) { st.course = c; changed('course'); }
    function setUI(patch) { Object.keys(patch).forEach(function (k) { st.ui[k] = patch[k]; }); changed('ui'); }

    /* Move the center. `fromTrailIndex` jumps back within the trail; otherwise the code is appended. */
    function visit(code, opts2) {
      opts2 = opts2 || {};
      if (!SE.store.exists(code)) return false;
      st.center = code;
      if (typeof opts2.trailIndex === 'number' && st.trail[opts2.trailIndex] === code) {
        st.trailPos = opts2.trailIndex;               /* move along the trail without losing it */
      } else {
        if (st.trail[st.trail.length - 1] !== code) st.trail.push(code);
        if (st.trail.length > 30) st.trail = st.trail.slice(-30);
        st.trailPos = st.trail.length - 1;
      }
      st.history.push({ code: code, at: now() });
      if (st.history.length > MAX_HISTORY) st.history = st.history.slice(-MAX_HISTORY);
      changed('visit');
      return true;
    }
    function clearCenter() { st.center = null; changed('visit'); }

    function toggleStandard(code) {
      if (isBookmarked(code)) st.bookmarks.standards = st.bookmarks.standards.filter(function (b) { return b.code !== code; });
      else st.bookmarks.standards.push({ code: code, at: now() });
      changed('bookmarks');
      return isBookmarked(code);
    }
    function toggleRelationship(a, b, label, kind) {
      var k = relKey(a, b);
      if (isRelationshipSaved(a, b)) st.bookmarks.relationships = st.bookmarks.relationships.filter(function (r) { return relKey(r.a, r.b) !== k; });
      else st.bookmarks.relationships.push({ a: a, b: b, label: clip(label || ''), kind: kind || 'suggested', at: now() });
      changed('bookmarks');
      return isRelationshipSaved(a, b);
    }
    function togglePhenomenon(id, code) {
      if (isPhenomenonSaved(id)) st.bookmarks.phenomena = st.bookmarks.phenomena.filter(function (p) { return p.id !== id; });
      else st.bookmarks.phenomena.push({ id: id, code: code || null, at: now() });
      changed('bookmarks');
      return isPhenomenonSaved(id);
    }
    function toggleQuestion(text, context, code) {
      if (isQuestionSaved(text)) st.bookmarks.questions = st.bookmarks.questions.filter(function (q) { return q.text !== text; });
      else st.bookmarks.questions.push({ text: clip(text), context: context || null, code: code || null, at: now() });
      changed('bookmarks');
      return isQuestionSaved(text);
    }
    function setNote(code, text) {
      text = clip(text);
      if (text.trim()) st.notes.byCode[code] = text; else delete st.notes.byCode[code];
      changed('notes');
    }
    function setGeneralNote(text) { st.notes.general = clip(text); changed('notes'); }
    function markSurpriseSeen(id) { if (st.surprisesSeen.indexOf(id) < 0) st.surprisesSeen.push(id); if (st.surprisesSeen.length > 500) st.surprisesSeen = st.surprisesSeen.slice(-500); changed('surprise'); }
    function seenSurprises() { var m = {}; st.surprisesSeen.forEach(function (i) { m[i] = true; }); return m; }

    function reset() { var c = st.course; st = blank(); st.course = null; changed('reset'); return c; }

    /* ---------------- export / import ---------------- */
    function exportObject() {
      return {
        app: 'Standards Explorer',
        format: FORMAT,
        formatVersion: FORMAT_VERSION,
        exportedAt: now(),
        standardsVersion: SE.data.meta.standardsVersion,
        note: 'A personal record of standards explored. Not a curriculum, alignment, or district-approved sequence.',
        exploration: JSON.parse(JSON.stringify(st))
      };
    }
    function exportJSON() { return JSON.stringify(exportObject(), null, 2); }

    function importJSON(text) {
      var obj;
      try { obj = JSON.parse(text); } catch (e) { return { ok: false, error: 'That file is not valid JSON.' }; }
      if (!obj || obj.format !== FORMAT) return { ok: false, error: 'That file is not a Standards Explorer exploration file.' };
      if (typeof obj.formatVersion !== 'number' || obj.formatVersion > FORMAT_VERSION) return { ok: false, error: 'That file was made by a newer version of Standards Explorer.' };
      var report = { dropped: 0 };
      st = sanitize(obj.exploration || {}, report);
      changed('import');
      return { ok: true, dropped: report.dropped };
    }

    function sanitize(x, report) {
      var b = blank();
      var ok = function (c) { var e = typeof c === 'string' && SE.store.exists(c); if (!e && c) report.dropped = (report.dropped || 0) + 1; return e; };
      if (x.course && SE.data.courses[x.course]) b.course = x.course;
      if (ok(x.center)) b.center = x.center;
      b.trail = (Array.isArray(x.trail) ? x.trail : []).filter(ok).slice(-30);
      b.trailPos = typeof x.trailPos === 'number' && x.trailPos >= 0 && x.trailPos < b.trail.length ? x.trailPos : b.trail.length - 1;
      b.history = (Array.isArray(x.history) ? x.history : []).filter(function (h) { return h && ok(h.code); })
        .map(function (h) { return { code: h.code, at: String(h.at || '') }; }).slice(-MAX_HISTORY);
      var bm = x.bookmarks || {};
      b.bookmarks.standards = (bm.standards || []).filter(function (s) { return s && ok(s.code); }).map(function (s) { return { code: s.code, at: String(s.at || '') }; });
      b.bookmarks.relationships = (bm.relationships || []).filter(function (r) { return r && ok(r.a) && ok(r.b); })
        .map(function (r) { return { a: r.a, b: r.b, label: clip(r.label), kind: String(r.kind || 'suggested'), at: String(r.at || '') }; });
      b.bookmarks.phenomena = (bm.phenomena || []).filter(function (p) { var e = p && SE.engine.phenomenon(p.id); if (!e && p) report.dropped = (report.dropped || 0) + 1; return e; })
        .map(function (p) { return { id: p.id, code: SE.store.exists(p.code) ? p.code : null, at: String(p.at || '') }; });
      b.bookmarks.questions = (bm.questions || []).filter(function (q) { return q && typeof q.text === 'string' && q.text.trim(); })
        .map(function (q) { return { text: clip(q.text), context: q.context ? String(q.context) : null, code: SE.store.exists(q.code) ? q.code : null, at: String(q.at || '') }; });
      var n = x.notes || {};
      b.notes.general = clip(n.general || '');
      Object.keys(n.byCode || {}).forEach(function (c) { if (ok(c) && String(n.byCode[c]).trim()) b.notes.byCode[c] = clip(n.byCode[c]); });
      b.surprisesSeen = (Array.isArray(x.surprisesSeen) ? x.surprisesSeen : []).filter(function (s) { return typeof s === 'string'; }).slice(-500);
      var ui = x.ui || {};
      if (ui.view === 'list' || ui.view === 'map') b.ui.view = ui.view;
      if (typeof ui.tab === 'string') b.ui.tab = ui.tab;
      b.ui.introSeen = !!ui.introSeen;
      b.ui.viewChosen = !!ui.viewChosen;
      b.ui.reflectionHidden = !!ui.reflectionHidden;
      return b;
    }

    function on(fn) { listeners.push(fn); return function () { listeners = listeners.filter(function (f) { return f !== fn; }); }; }

    return { get: get, isPersistent: isPersistent, visitedMap: visitedMap, isBookmarked: isBookmarked, isRelationshipSaved: isRelationshipSaved,
      isPhenomenonSaved: isPhenomenonSaved, isQuestionSaved: isQuestionSaved, recent: recent, note: note,
      setCourse: setCourse, setUI: setUI, visit: visit, clearCenter: clearCenter, toggleStandard: toggleStandard, toggleRelationship: toggleRelationship,
      togglePhenomenon: togglePhenomenon, toggleQuestion: toggleQuestion, setNote: setNote, setGeneralNote: setGeneralNote,
      markSurpriseSeen: markSurpriseSeen, seenSurprises: seenSurprises, reset: reset,
      exportObject: exportObject, exportJSON: exportJSON, importJSON: importJSON, on: on };
  }

  /* In-memory storage (used by tests and as a fallback). */
  function memoryStorage() {
    var m = {};
    return { getItem: function (k) { return Object.prototype.hasOwnProperty.call(m, k) ? m[k] : null; }, setItem: function (k, v) { m[k] = String(v); }, removeItem: function (k) { delete m[k]; } };
  }

  SE.stateFactory = { create: create, memoryStorage: memoryStorage, FORMAT: FORMAT, FORMAT_VERSION: FORMAT_VERSION };
})(window.SE = window.SE || {});
