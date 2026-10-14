/* Unit tests: standards data, lookup, practices, search. */
(function () {
  var describe = T.describe, it = T.it, expect = T.expect, S = SE.store, D = SE.data;

  describe('Standards dataset (official information)', function () {
    it('contains all 208 PEs and 71 high school PEs', function () {
      expect(D.standards.length).toBe(208);
      expect(S.highSchool().length).toBe(71);
    });
    it('passes the full data validator with no errors', function () {
      var r = SE.validate();
      if (r.errors.length) throw new Error(r.errors.join('\n'));
      expect(r.errors.length).toBe(0);
    });
    it('uses the revised 2026 wording for HS-ESS3-2', function () {
      var t = S.get('HS-ESS3-2').text;
      expect(t).toContain('developing, conserving, managing, and utilizing');
      expect(t).toContain('economic, social, environmental, and geopolitical costs and risks, as well as benefits');
      expect(t).notToContain('cost-benefit ratios');
    });
    it('uses the revised 2026 wording for the three other revised PEs', function () {
      expect(S.get('K-ESS3-3').text).notToContain('climate change');
      expect(S.get('K-2-ETS1-1').text).notToContain('climate change');
      expect(S.get('3-ESS3-1').text).toBe('Make a claim about the merit of a design solution that reduces the impacts of a weather-related hazard.');
    });
    it('stores HS-PS2-1 verbatim with its NGSS foundations', function () {
      var s = S.get('HS-PS2-1');
      expect(s.text).toBe('Analyze data to support the claim that Newton’s second law of motion describes the mathematical relationship among the net force on a macroscopic object, its mass, and its acceleration.');
      expect(s.dci).toEqual(['PS2.A']); expect(s.sep).toEqual(['SEP4']); expect(s.ccc).toEqual(['CCC2']);
      expect(s.modelPlacement[0].unit).toBe('P.3');
    });
    it('marks NJDOE climate-symbol PEs and strips the symbol from the wording', function () {
      expect(S.get('HS-ESS3-5').climate).toBe(true);
      expect(S.get('HS-PS2-1').climate).toBe(false);
      expect(S.get('HS-ESS3-5').text).notToContain('🌱');
    });
    it('looks up model-curriculum units by code', function () {
      var u = S.unitsFor('HS-PS2-1');
      expect(u.length).toBe(1); expect(u[0].unit).toBe('P.3'); expect(u[0].title).toBe('Collisions and Momentum');
      expect(S.unitsFor('HS-ETS1-3').length).toBeGreaterThan(3);
    });
    it('links every PE to an official source page', function () {
      D.standards.forEach(function (s) { var l = S.sourceLinks(s.code); if (!l.length || !/^https:\/\//.test(l[0])) throw new Error('No source for ' + s.code); });
    });
    it('normalizes typed codes', function () {
      expect(SE.util.normalizeCode('hs ps2 1')).toBe('HS-PS2-1');
      expect(SE.util.normalizeCode('MS-PS2-2')).toBe('MS-PS2-2');
      expect(SE.util.normalizeCode('k-2-ets1-3')).toBe('K-2-ETS1-3');
      expect(SE.util.normalizeCode('forces')).toBe(null);
    });
  });

  describe('Practice language highlighting', function () {
    it('finds the performance phrase of HS-PS2-1 and maps it to the official SEP', function () {
      var segs = SE.practices.segments('HS-PS2-1').filter(function (s) { return s.dim; });
      expect(segs[0].text).toBe('Analyze data'); expect(segs[0].ref).toBe('SEP4');
    });
    it('highlights curated DCI and CCC phrases verbatim', function () {
      var segs = SE.practices.segments('HS-PS2-1').filter(function (s) { return s.dim; });
      var dims = segs.map(function (s) { return s.dim; });
      expect(dims).toContain('DCI'); expect(dims).toContain('CCC');
      var joined = SE.practices.segments('HS-PS2-1').map(function (s) { return s.text; }).join('');
      expect(joined).toBe(S.get('HS-PS2-1').text);
    });
    it('reads practice families from K-8 wording', function () {
      expect(SE.practices.leadPhrase(S.get('MS-PS2-2').text).text).toBe('Plan an investigation');
      expect(SE.practices.leadPhrase(S.get('K-PS2-1').text).sep).toBe('SEP3');
    });
  });

  describe('Search', function () {
    it('finds an exact code', function () { expect(SE.search.search('hs-ps2-1').exact).toBe('HS-PS2-1'); });
    it('finds scientific ideas', function () {
      var codes = SE.search.search('forces').codes.map(function (x) { return x.code; });
      expect(codes).toContain('HS-PS2-1');
    });
    it('maps a familiar topic without equating it to one PE', function () {
      var r = SE.search.search('kinematics');
      expect(r.topics[0].id).toBe('kinematics');
      var fit = r.topics[0].connections.filter(function (c) { return c.code === 'HS-PS2-1'; })[0].fit;
      expect(fit).toBe('partial');
    });
    it('finds practices', function () {
      var r = SE.search.search('modeling');
      expect(r.practices[0].id).toBe('SEP2');
      expect(r.practices[0].codes).toContain('HS-PS1-1');
    });
    it('gives course priority without hiding other disciplines', function () {
      var r = SE.search.search('energy', { course: 'biology' });
      var codes = r.codes.map(function (x) { return x.code; });
      expect(codes.some(function (c) { return /LS/.test(c); })).toBe(true);
      expect(codes.some(function (c) { return /PS3/.test(c); })).toBe(true);
    });
    it('finds topics like stoichiometry, genetics, and cellular respiration', function () {
      expect(SE.search.search('stoichiometry').topics[0].id).toBe('stoichiometry');
      expect(SE.search.search('genetics').topics[0].id).toBe('genetics');
      expect(SE.search.search('cellular respiration').topics[0].id).toBe('respiration-photosynthesis');
    });
  });
})();
