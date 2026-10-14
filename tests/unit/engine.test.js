/* Unit tests: relationship engine and classification. */
(function () {
  var describe = T.describe, it = T.it, expect = T.expect, E = SE.engine, S = SE.store;

  describe('Prior learning (K-12 progressions)', function () {
    it('shows the HS-PS2-1 progression from kindergarten to middle school', function () {
      var p = E.priorLearning('HS-PS2-1');
      var codes = p.steps.map(function (s) { return s.code; });
      ['K-PS2-1', '3-PS2-1', 'MS-PS2-2'].forEach(function (c) { expect(codes).toContain(c); });
      expect(p.byBand['K-2'].length).toBeGreaterThan(0);
      expect(p.byBand['3-5'].length).toBeGreaterThan(0);
      expect(p.byBand['6-8'].length).toBeGreaterThan(0);
      expect(p.narrative.ideaDevelops).toContain('kindergarten');
    });
    it('labels steps documented only when the progression table supports them', function () {
      var p = E.priorLearning('HS-PS2-1');
      var st = {}; p.steps.forEach(function (s) { st[s.code] = s.status; });
      expect(st['MS-PS2-2']).toBe('documented');
      expect(st['MS-PS3-1']).toBe('suggested');
      expect(st['5-PS2-1']).toBe('suggested');
    });
    it('uses "expected to" language, never claims mastery', function () {
      ['HS-PS2-1', 'HS-LS1-5', 'HS-PS1-7'].forEach(function (c) {
        E.priorLearning(c).steps.forEach(function (s) { if (/\bmastered\b/i.test(s.role)) throw new Error('Mastery claim in ' + c + ' / ' + s.code); });
      });
      var auto = E.priorLearning('HS-ESS2-1').steps[0];
      expect(auto.role).toContain('Students were expected to');
    });
    it('derives documented prior learning for a PE without curated content', function () {
      var p = E.priorLearning('HS-ESS2-1');
      expect(p.curated).toBe(false);
      expect(p.steps.length).toBeGreaterThan(2);
      p.steps.forEach(function (s) { expect(s.status).toBe('documented'); });
    });
    it('shows later learning for a middle school PE', function () {
      var later = E.laterLearning('MS-PS2-2').map(function (x) { return x.code; });
      expect(later).toContain('HS-PS2-1');
    });
    it('does not force a predecessor where none is documented', function () {
      var p = E.priorLearning('HS-PS1-8');
      expect(p.steps.length).toBe(0);
    });
  });

  describe('Related high school standards (classification)', function () {
    it('ranks curated HS-PS2-1 connections to momentum, collision design, energy, and engineering', function () {
      var rel = E.related('HS-PS2-1'), codes = rel.map(function (r) { return r.code; });
      ['HS-PS2-2', 'HS-PS2-3', 'HS-PS3-1', 'HS-ESS1-4'].forEach(function (c) { expect(codes).toContain(c); });
      expect(rel[0].curated).toBe(true);
      expect(codes.indexOf('HS-PS2-2')).toBeLessThan(codes.indexOf('HS-ETS1-3') < 0 ? 999 : codes.indexOf('HS-ETS1-3'));
    });
    it('distinguishes documented from suggested relationships', function () {
      var rel = E.related('HS-PS2-1');
      var by = {}; rel.forEach(function (r) { by[r.code] = r; });
      expect(by['HS-PS2-2'].status).toBe('documented');
      expect(by['HS-PS3-1'].status).toBe('suggested');
      expect(by['HS-PS2-3'].category).toBe('engineering');
    });
    it('never labels a computed shared-DCI link as a prerequisite', function () {
      var rel = E.related('HS-ESS2-1').filter(function (r) { return !r.curated; });
      expect(rel.length).toBeGreaterThan(0);
      rel.forEach(function (r) {
        expect(r.why).toMatch(/does not (by itself make one|make either one) a prerequisite/);
      });
    });
    it('labels computed relationships by their evidence (shared DCI or model unit)', function () {
      E.related('HS-PS3-5').filter(function (r) { return !r.curated; }).forEach(function (r) {
        if (r.computed === 'dci') expect(r.shared.dci.length).toBeGreaterThan(0);
        if (r.computed === 'unit') expect(r.shared.units.length).toBeGreaterThan(0);
      });
    });
    it('places cross-discipline and engineering links on the interdisciplinary branch', function () {
      var rel = E.related('HS-PS1-4'), ls = rel.filter(function (r) { return r.code === 'HS-LS1-7'; })[0];
      expect(ls.branch).toBe('interdisciplinary');
    });
    it('finds relationships between two standards in either direction', function () {
      expect(E.relationship('HS-PS2-1', 'HS-PS2-3').type).toBe('related');
      expect(E.relationship('HS-PS2-1', 'MS-PS2-2').type).toBe('prior');
      expect(E.relationship('MS-PS2-2', 'HS-PS2-1').type).toBe('prior');
    });
  });

  describe('Network model, 3D, phenomena, reflections, surprises', function () {
    it('builds five branches for a HS PE', function () {
      var n = E.network('HS-PS2-1');
      expect(n.branches.map(function (b) { return b.id; })).toEqual(['prior', 'related', 'interdisciplinary', 'threeD', 'phenomena']);
    });
    it('lists the official 3D foundation and integrated performance', function () {
      var td = E.threeD('HS-PS2-1');
      expect(td.dci[0].id).toBe('PS2.A'); expect(td.sep[0].name).toBe('Analyzing and Interpreting Data'); expect(td.ccc[0].name).toBe('Cause and Effect');
      expect(td.integrated).toBeTruthy(); expect(td.evidence.length).toBeGreaterThan(1);
    });
    it('does not invent a CCC where the foundation lists none', function () {
      expect(E.threeD('HS-ETS1-2').ccc.length).toBe(0);
    });
    it('offers about three phenomena for HS-PS2-1, direct ones first', function () {
      var ph = E.phenomenaFor('HS-PS2-1');
      expect(ph.length).toBeGreaterThan(2);
      expect(ph[0].alignment).toBe('direct');
      var rocket = ph.filter(function (p) { return p.item.id === 'rocket-acceleration'; })[0];
      expect(rocket.alignment).toBe('extension');
    });
    it('selects context-sensitive reflection questions', function () {
      expect(E.reflections('HS-PS2-1', 'standard')[0].text).toContain('kinematics');
      expect(E.reflections('HS-PS2-1', 'prior')[0].text).toContain('middle school');
      expect(E.reflections('HS-ESS2-1', 'related')[0].specific).toBe(false);
    });
    it('surprises favor meaningful, unexplored connections and change after being seen', function () {
      var c1 = E.surpriseCandidates('HS-PS2-1', { visited: {}, seen: {} });
      expect(c1.length).toBeGreaterThan(2);
      var seen = {}; seen[c1[0].id] = true;
      var c2 = E.surpriseCandidates('HS-PS2-1', { visited: {}, seen: seen });
      expect(c2[0].id === c1[0].id).toBe(false);
      c1.forEach(function (c) { expect(['documented', 'suggested']).toContain(c.status); });
    });
  });
})();
