/* Minimal in-browser test runner (no dependencies). describe / it / expect, async tests, and DOM helpers for E2E. */
(function (global) {
  'use strict';
  var suites = [], current = null;
  function describe(name, fn) { var s = { name: name, tests: [], before: null }; suites.push(s); var prev = current; current = s; fn(); current = prev; }
  function it(name, fn) { current.tests.push({ name: name, fn: fn }); }
  function beforeEach(fn) { current.before = fn; }

  function fmt(v) { try { return JSON.stringify(v); } catch (e) { return String(v); } }
  function expect(actual) {
    var api = {
      toBe: function (e) { if (actual !== e) throw new Error('Expected ' + fmt(actual) + ' to be ' + fmt(e)); },
      toEqual: function (e) { if (fmt(actual) !== fmt(e)) throw new Error('Expected ' + fmt(actual) + ' to equal ' + fmt(e)); },
      toBeTruthy: function () { if (!actual) throw new Error('Expected ' + fmt(actual) + ' to be truthy'); },
      toBeFalsy: function () { if (actual) throw new Error('Expected ' + fmt(actual) + ' to be falsy'); },
      toContain: function (x) { if (!actual || actual.indexOf(x) < 0) throw new Error('Expected ' + fmt(actual).slice(0, 300) + ' to contain ' + fmt(x)); },
      notToContain: function (x) { if (actual && actual.indexOf(x) >= 0) throw new Error('Expected ' + fmt(actual).slice(0, 300) + ' not to contain ' + fmt(x)); },
      toBeGreaterThan: function (n) { if (!(actual > n)) throw new Error('Expected ' + fmt(actual) + ' > ' + n); },
      toBeLessThan: function (n) { if (!(actual < n)) throw new Error('Expected ' + fmt(actual) + ' < ' + n); },
      toMatch: function (re) { if (!re.test(actual)) throw new Error('Expected ' + fmt(actual) + ' to match ' + re); }
    };
    return api;
  }

  /* ---- E2E helpers ---- */
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  async function waitFor(fn, ms, label) {
    var end = Date.now() + (ms || 3000), last;
    while (Date.now() < end) { try { last = fn(); if (last) return last; } catch (e) { /* retry */ } await sleep(30); }
    throw new Error('Timed out waiting for ' + (label || fn.toString().slice(0, 120)));
  }
  function q(sel, root) { return (root || document).querySelector(sel); }
  function qa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  async function click(sel, root, label) {
    var el = typeof sel === 'string' ? await waitFor(function () { return q(sel, root); }, 3000, label || sel) : sel;
    if (el instanceof SVGElement) el.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
    else el.click();
    await sleep(40);
    return el;
  }
  async function typeInto(sel, text, root) {
    var el = await waitFor(function () { return q(sel, root); }, 3000, sel);
    el.focus(); el.value = text; el.dispatchEvent(new Event('input', { bubbles: true }));
    await sleep(260);
    return el;
  }
  function byText(sel, text, root) { return qa(sel, root).filter(function (e) { return e.textContent.indexOf(text) >= 0; })[0] || null; }

  async function run(out) {
    var pass = 0, fail = 0, t0 = performance.now(), html = [];
    for (var i = 0; i < suites.length; i++) {
      var s = suites[i];
      html.push('<h2>' + esc(s.name) + '</h2><ul>');
      for (var j = 0; j < s.tests.length; j++) {
        var t = s.tests[j], ok = true, msg = '';
        try { if (s.before) await s.before(); await t.fn(); } catch (e) { ok = false; msg = e && e.stack ? e.stack : String(e); }
        if (ok) pass++; else fail++;
        html.push('<li class="' + (ok ? 'pass' : 'fail') + '">' + (ok ? '✓ ' : '✗ ') + esc(t.name) + (ok ? '' : '<pre>' + esc(msg) + '</pre>') + '</li>');
        out.innerHTML = summary(pass, fail, false) + html.join('') + '</ul>';
      }
      html.push('</ul>');
    }
    var ms = Math.round(performance.now() - t0);
    out.innerHTML = summary(pass, fail, true, ms) + html.join('');
    global.TEST_RESULTS = { pass: pass, fail: fail, ms: ms, done: true,
      failures: qa('li.fail', out).map(function (li) { return li.textContent.slice(0, 400); }) };
    document.title = (fail ? 'FAIL ' : 'PASS ') + pass + '/' + (pass + fail) + ' · Standards Explorer tests';
    return global.TEST_RESULTS;
  }
  function summary(p, f, done, ms) {
    return '<div class="summary ' + (f ? 'bad' : 'good') + '">' + (done ? (f ? 'FAILED' : 'ALL PASSED') : 'Running…') + ': ' + p + ' passed, ' + f + ' failed' + (ms ? ' · ' + ms + ' ms' : '') + '</div>';
  }
  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }

  global.T = { describe: describe, it: it, beforeEach: beforeEach, expect: expect, run: run, sleep: sleep, waitFor: waitFor, q: q, qa: qa, click: click, typeInto: typeInto, byText: byText };
})(window);
