/* Browser-level interaction tests. They mount the real application into #app-host with in-memory storage,
   then click through it the way a teacher would. */
(function () {
  var describe = T.describe, it = T.it, expect = T.expect, click = T.click, q = T.q, qa = T.qa, waitFor = T.waitFor, sleep = T.sleep;
  var app = null, printed = 0;

  function host() { return document.getElementById('app-host'); }
  function mount() {
    if (app) app.destroy();
    printed = 0;
    var downloads = [];
    app = SE.App.mount(host(), { useHash: false, storage: SE.stateFactory.memoryStorage(), download: function (n, t) { downloads.push({ name: n, text: t }); },
      print: function () { printed++; }, confirm: function () { return true; }, noFilePicker: true });
    app.downloads = downloads;
    return app;
  }
  function center() { return app.state.get().center; }
  async function exploreVia(selector) { await click(selector, host()); await waitFor(function () { return q('.work-head', host()); }, 3000, 'workspace'); }
  async function tab(id) { await click('.tabs [data-tab="' + id + '"]', host()); await waitFor(function () { return q('.tabs [data-tab="' + id + '"][aria-selected="true"]', host()); }, 2000, 'tab ' + id); }
  function panelText() { var p = q('.detail .panel', host()); return p ? p.textContent : ''; }
  function cardFor(code) { return qa('.detail article.conn', host()).filter(function (a) { return a.querySelector('.pe-link[data-code="' + code + '"]'); })[0]; }

  describe('E2E · Physics teacher explores HS-PS2-1 (the demonstration scenario)', function () {
    it('selects a course from the opening screen', async function () {
      mount();
      expect(q('.landing h1', host()).textContent).toBe('STANDARDS EXPLORER');
      await click('.course-card[data-course="physics"]', host());
      await waitFor(function () { return q('.start h1', host()); });
      expect(q('.start h1', host()).textContent).toContain('Physics');
      expect(qa('.starter', host()).length).toBeGreaterThan(3);
      expect(q('.start', host()).textContent).toContain('Possible starting points to explore');
    });

    it('searches for HS-PS2-1 and opens it with no setup steps', async function () {
      var inp = await T.typeInto('[data-search="start"]', 'HS-PS2-1', host());
      await waitFor(function () { return q('[data-results="start"] .pe-item[data-code="HS-PS2-1"]', host()); }, 3000, 'search result');
      await exploreVia('[data-results="start"] .pe-item[data-code="HS-PS2-1"]');
      expect(center()).toBe('HS-PS2-1');
      var t = panelText();
      expect(t).toContain('What Is This Standard Really Asking Students to Do?');
      expect(t).toContain('Newton’s second law of motion describes the mathematical relationship');
      expect(t).toContain('The Big Scientific Idea');
      expect(t).toContain('Something to Think About');
      expect(q('.detail .hl.SEP', host()).textContent).toBe('Analyze data');
    });

    it('shows the network: prior learning, related, 3D, phenomena', async function () {
      var svg = await waitFor(function () { return q('svg.graph', host()); });
      expect(qa('.g-hub', svg).length).toBe(5);
      expect(q('[data-key="s:MS-PS2-2"]', svg)).toBeTruthy();
      expect(q('[data-key="s:HS-PS2-2"]', svg)).toBeTruthy();
      expect(q('[data-key="d:SEP:SEP4"]', svg)).toBeTruthy();
      expect(qa('.g-phen', svg).length).toBeGreaterThan(1);
    });

    it('explains a highlighted phrase from the PE', async function () {
      await click('.detail .hl.SEP', host());
      var note = await waitFor(function () { return q('.detail .phrase-note', host()); });
      expect(note.textContent).toContain('Analyzing and Interpreting Data');
    });

    it('previews a node and explains why a connection line exists', async function () {
      await click('[data-key="s:MS-PS2-2"]', host());
      var pop = await waitFor(function () { return q('.pops .pop', host()); });
      expect(pop.textContent).toContain('Role in the progression');
      expect(pop.textContent).toContain('Plan an investigation');
      await click('.pops [data-act="close-pop"]', host());
      await click('.g-hit[data-branch="related"]', host());
      var pop2 = await waitFor(function () { return q('.pops .pop', host()); });
      expect(pop2.textContent).toContain('Why are these connected?');
      await click('.pops [data-act="close-pop"]', host());
    });

    it('follows a prior-learning connection to MS-PS2-2', async function () {
      await tab('prior');
      expect(panelText()).toContain('Where Have Students Encountered This Before?');
      expect(panelText()).toContain('What develops across the progression');
      await click('.detail .step[data-code="MS-PS2-2"]', host());
      var det = await waitFor(function () { return q('.detail .step-detail', host()); });
      expect(det.textContent).toContain('Students were expected to plan an investigation');
      await click('.detail .step-detail .btn-primary', host());
      await waitFor(function () { return center() === 'MS-PS2-2'; }, 3000, 'center MS-PS2-2');
      expect(panelText()).toContain('Plan an investigation to provide evidence that the change in an object’s motion depends on the sum of the forces');
    });

    it('returns to HS-PS2-1 through the exploration trail', async function () {
      await click('.trail .crumb[data-code="HS-PS2-1"]', host());
      await waitFor(function () { return center() === 'HS-PS2-1'; }, 3000, 'back to HS-PS2-1');
      expect(app.state.get().trail).toEqual(['HS-PS2-1', 'MS-PS2-2']);
      expect(q('.trail .crumb[aria-current="page"]', host()).getAttribute('data-code')).toBe('HS-PS2-1');
    });

    it('explores the connection to HS-PS2-3 (collision safety)', async function () {
      await tab('related');
      var card = cardFor('HS-PS2-3');
      expect(card.textContent).toContain('Forces in collision safety');
      expect(card.textContent).toContain('Engineering design application');
      expect(card.textContent).toContain('Documented');
      expect(panelText()).toContain('Momentum');
      await click(card.querySelector('.btn-primary'));
      await waitFor(function () { return center() === 'HS-PS2-3'; }, 3000, 'center HS-PS2-3');
      await tab('phenomena');
      expect(panelText()).toContain('Vehicle Crash Safety');
      await click('.detail [data-act="phen-more"][data-id="crash-safety"]', host());
      var more = await waitFor(function () { return q('#phen-crash-safety .more', host()); });
      expect(more.textContent).toContain('HS-PS2-2');
      expect(more.textContent).toContain('HS-ETS1-3');
      await click('.trail .crumb[data-code="HS-PS2-1"]', host());
      await waitFor(function () { return center() === 'HS-PS2-1'; });
    });

    it('clicks "Surprise Me" and sees a meaningful connection, then another', async function () {
      await click('[data-act="surprise"]', host());
      var card = await waitFor(function () { return q('.surprise', host()); });
      var h1 = card.querySelector('h3').textContent;
      expect(card.textContent).toMatch(/Documented|Suggested/);
      await click('.surprise [data-act="surprise-next"]', host());
      var h2 = (await waitFor(function () { return q('.surprise h3', host()); })).textContent;
      var t1 = q('.surprise .pe-link', host()).getAttribute('data-code');
      expect(h1 + t1 === h2 + 'x').toBe(false);
      await click('.surprise [data-act="surprise-close"]', host());
      expect(q('.surprise', host())).toBeFalsy();
    });

    it('bookmarks two standards and one phenomenon, and saves a note', async function () {
      await click('.work-head [data-act="bookmark-std"]', host());
      expect(app.state.isBookmarked('HS-PS2-1')).toBe(true);
      await tab('phenomena');
      await click('.detail [data-act="save-phen"][data-id="loaded-cart"]', host());
      expect(app.state.isPhenomenonSaved('loaded-cart')).toBe(true);
      await tab('standard');
      var ta = await waitFor(function () { return q('.detail textarea[data-note="HS-PS2-1"]', host()); });
      ta.value = 'Our cart lab could carry the evidence for this.'; ta.dispatchEvent(new Event('input', { bubbles: true }));
      await sleep(500);
      expect(app.state.note('HS-PS2-1')).toBe('Our cart lab could carry the evidence for this.');
      await click('.trail .crumb[data-code="MS-PS2-2"]', host());
      await waitFor(function () { return center() === 'MS-PS2-2'; });
      await click('.work-head [data-act="bookmark-std"]', host());
      expect(app.state.get().bookmarks.standards.length).toBe(2);
      expect(q('[data-act="exploration"] .count-badge', host()).textContent).toBe('3');
    });

    it('saves a reflection question without answering anything', async function () {
      await tab('standard');
      var btn = await waitFor(function () { return q('.detail .reflect [data-act="save-q"]', host()); });
      await click(btn);
      expect(app.state.get().bookmarks.questions.length).toBe(1);
      expect(qa('.detail .reflect textarea, .detail .reflect input', host()).length).toBe(0);
    });

    it('exports the exploration and imports it again', async function () {
      await click('[data-act="exploration"]', host());
      var dlg = await waitFor(function () { return q('dialog.se-dialog-exploration'); });
      expect(dlg.textContent).toContain('not a curriculum map');
      await click('[data-act="export"]', dlg);
      expect(app.downloads.length).toBe(1);
      var json = app.downloads[0].text;
      expect(app.downloads[0].name).toMatch(/^standards-exploration-\d{4}-\d{2}-\d{2}\.json$/);
      await click('[data-act="reset"]', dlg);
      await waitFor(function () { return q('.landing', host()); });
      expect(app.state.get().bookmarks.standards.length).toBe(0);
      var r = app.importText(json);
      expect(r.ok).toBe(true);
      await waitFor(function () { return center() === 'MS-PS2-2' && q('.work-head', host()); });
      expect(app.state.get().bookmarks.standards.length).toBe(2);
      expect(app.state.isPhenomenonSaved('loaded-cart')).toBe(true);
      expect(app.state.note('HS-PS2-1')).toContain('cart lab');
    });

    it('imports a saved file through the file picker', async function () {
      var json = app.state.exportJSON();
      app.state.reset();
      var input = app.pickFile();
      var dt = new DataTransfer(); dt.items.add(new File([json], 'mine.json', { type: 'application/json' }));
      input.files = dt.files; input.dispatchEvent(new Event('change'));
      await waitFor(function () { return app.state.get().bookmarks.standards.length === 2; }, 3000, 'file import');
    });

    it('prints a summary that separates teacher choices from suggestions', async function () {
      app.openExploration('overview');
      await click('dialog [data-act="print"]');
      expect(printed).toBe(1);
      var pr = document.getElementById('print-root').innerHTML;
      expect(pr).toContain('Teacher-selected'); expect(pr).toContain('HS-PS2-1'); expect(pr).toContain('Loaded Dynamics Cart');
      app.closeDialog();
    });

    it('offers a list view of the same connections', async function () {
      app.explore('HS-PS2-1');
      await waitFor(function () { return center() === 'HS-PS2-1'; });
      await click('.work-head [data-act="view"][data-view="list"]', host());
      var lv = await waitFor(function () { return q('.listview', host()); });
      expect(qa('.lv-branch', lv).length).toBe(5);
      expect(lv.textContent).toContain('K-PS2-1');
      await click('.work-head [data-act="view"][data-view="map"]', host());
      await waitFor(function () { return q('svg.graph', host()); });
    });

    it('collapses and expands a branch of the map', async function () {
      var hubSel = '.g-hub[data-branch="phenomena"]';
      await click(hubSel, host());
      await waitFor(function () { return !q('.g-phen', host()); }, 2000, 'phenomena collapsed');
      expect(q('.tabs [data-tab="phenomena"]', host()).getAttribute('aria-selected')).toBe('true');
      await click(hubSel, host());
      await waitFor(function () { return q('.g-phen', host()); }, 2000, 'phenomena expanded');
    });
  });

  describe('E2E · Biology and Chemistry pathways', function () {
    it('Biology: HS-LS1-7 connects to prior learning and to chemistry', async function () {
      mount();
      await click('.course-card[data-course="biology"]', host());
      await exploreVia('.starter[data-code="HS-LS1-7"]');
      expect(center()).toBe('HS-LS1-7');
      expect(panelText()).toContain('bonds of food molecules and oxygen molecules are broken');
      await tab('prior');
      var step = q('.detail .step[data-code="MS-LS1-7"]', host());
      expect(step.classList.contains('documented')).toBe(true);
      await tab('related');
      var card = cardFor('HS-PS1-4');
      expect(card.textContent).toContain('Interdisciplinary connection');
      expect(card.textContent).toContain('Suggested');
    });

    it('Chemistry: HS-PS1-7 shows conservation from grade 5 and a mathematical practice', async function () {
      app.go({ page: 'start', course: 'chemistry' });
      await exploreVia('.starter[data-code="HS-PS1-7"]');
      await tab('prior');
      expect(q('.detail .step[data-code="5-PS1-2"]', host()).classList.contains('documented')).toBe(true);
      expect(panelText()).toContain('High school does not introduce conservation of mass');
      await tab('threeD');
      expect(panelText()).toContain('Using Mathematics and Computational Thinking');
      expect(panelText()).toContain('What Might Evidence of This Learning Look Like?');
      await tab('phenomena');
      expect(panelText()).toContain('Burning Steel Wool Gains Mass');
    });

    it('An uncurated PE shows only verified information and labeled computed links', async function () {
      app.explore('HS-ESS2-1');
      await waitFor(function () { return center() === 'HS-ESS2-1'; });
      expect(panelText()).toContain('No curated interpretation has been written');
      await tab('related');
      expect(panelText()).toContain('Computed from shared foundations');
      await tab('phenomena');
      expect(panelText()).toContain('No curated phenomena');
    });

    it('A middle school PE shows where it leads', async function () {
      app.explore('MS-PS2-2');
      await waitFor(function () { return center() === 'MS-PS2-2'; });
      await tab('related');
      expect(panelText()).toContain('Where Does This Lead?');
      expect(panelText()).toContain('HS-PS2-1');
    });
  });

  describe('E2E · Topic bridge', function () {
    it('"I Teach This Topic" distinguishes direct, partial, and contextual connections', async function () {
      await click('[data-act="topics"]', host());
      await waitFor(function () { return q('.topic-view', host()); });
      await click('.topic-chip[data-topic="kinematics"]', host());
      var view = await waitFor(function () { return q('.topic-head', host()) && q('.topic-view', host()); });
      expect(view.textContent).toContain('No high school PE is about kinematics as such');
      expect(q('.fit-group .fit-partial', host()).parentNode.textContent).toContain('HS-PS2-1');
      expect(q('.gap-box', host()).textContent).toContain('Two-dimensional projectile motion');
      await click('.fit-row [data-code="HS-PS2-1"].btn-primary', host());
      await waitFor(function () { return center() === 'HS-PS2-1'; });
    });
  });
})();
