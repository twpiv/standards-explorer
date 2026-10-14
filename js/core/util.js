/* Small shared helpers. No dependencies. */
(function (SE) {
  'use strict';

  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); }

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = String(html).trim();
    return t.content.firstElementChild;
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function uniq(arr) {
    var seen = {}, out = [];
    for (var i = 0; i < arr.length; i++) { var k = arr[i]; if (!seen[k]) { seen[k] = true; out.push(k); } }
    return out;
  }

  function debounce(fn, ms) {
    var t = null;
    return function () { var a = arguments, self = this; clearTimeout(t); t = setTimeout(function () { fn.apply(self, a); }, ms); };
  }

  function norm(s) {
    return String(s || '').toLowerCase()
      .replace(/[’‘]/g, "'").replace(/[–—]/g, '-')
      .normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function escapeRe(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function truncate(s, n) { s = String(s || ''); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s; }

  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : (many || one + 's')); }

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /* Normalize a user-typed code such as "hs ps2 1" or "hsps2-1" to "HS-PS2-1". Returns null if it doesn't look like a code. */
  function normalizeCode(q) {
    var s = String(q || '').toUpperCase().replace(/[–—_\s]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    var m = s.match(/^(HS|MS|K|[1-5]|K-2|3-5)-?(PS|LS|ESS|ETS)-?(\d)(?:-?(\d{1,2}))?$/);
    if (!m) return null;
    return m[1] + '-' + m[2] + m[3] + (m[4] ? '-' + m[4] : '');
  }

  SE.util = { esc: esc, el: el, $: $, $all: $all, uniq: uniq, debounce: debounce, norm: norm, escapeRe: escapeRe,
    truncate: truncate, plural: plural, today: today, prefersReducedMotion: prefersReducedMotion, normalizeCode: normalizeCode };
})(window.SE = window.SE || {});
