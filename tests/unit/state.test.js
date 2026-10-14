/* Unit tests: saving, restoration, export, import, report. */
(function () {
  var describe = T.describe, it = T.it, expect = T.expect, F = SE.stateFactory;

  describe('Exploration state, saving, and restoration', function () {
    it('starts empty and requires nothing from the teacher', function () {
      var st = F.create({ storage: F.memoryStorage() }).get();
      expect(st.history.length).toBe(0); expect(st.course).toBe(null);
      expect(Object.keys(st).indexOf('teacherName')).toBe(-1);
    });
    it('saves automatically and restores from the same storage', function () {
      var mem = F.memoryStorage();
      var a = F.create({ storage: mem, key: 'k' });
      a.setCourse('physics'); a.visit('HS-PS2-1'); a.toggleStandard('HS-PS2-1'); a.setNote('HS-PS2-1', 'Check the cart lab');
      var b = F.create({ storage: mem, key: 'k' });
      expect(b.get().course).toBe('physics'); expect(b.get().center).toBe('HS-PS2-1');
      expect(b.isBookmarked('HS-PS2-1')).toBe(true); expect(b.note('HS-PS2-1')).toBe('Check the cart lab');
    });
    it('keeps a trail and lets the teacher move back along it', function () {
      var a = F.create({ storage: F.memoryStorage() });
      a.visit('HS-PS2-1'); a.visit('MS-PS2-2'); a.visit('HS-PS2-1', { trailIndex: 0 });
      expect(a.get().trail).toEqual(['HS-PS2-1', 'MS-PS2-2']);
      expect(a.get().trailPos).toBe(0);
      a.visit('HS-PS2-3');
      expect(a.get().trail).toEqual(['HS-PS2-1', 'MS-PS2-2', 'HS-PS2-3']);
    });
    it('toggles bookmarks for standards, relationships, phenomena, and questions', function () {
      var a = F.create({ storage: F.memoryStorage() });
      expect(a.toggleRelationship('HS-PS2-1', 'HS-PS2-3', 'Forces in collision safety')).toBe(true);
      expect(a.isRelationshipSaved('HS-PS2-3', 'HS-PS2-1')).toBe(true);
      expect(a.togglePhenomenon('crash-safety', 'HS-PS2-1')).toBe(true);
      expect(a.toggleQuestion('Q?', 'standard', 'HS-PS2-1')).toBe(true);
      expect(a.toggleQuestion('Q?')).toBe(false);
    });
    it('keeps working (in memory) when browser storage is blocked', function () {
      var a = F.create({ storage: null });
      a.visit('HS-PS2-1');
      expect(a.get().center).toBe('HS-PS2-1'); expect(a.isPersistent()).toBe(false);
    });
  });

  describe('Export and import', function () {
    it('exports a versioned JSON file that describes itself honestly', function () {
      var a = F.create({ storage: F.memoryStorage() });
      a.setCourse('chemistry'); a.visit('HS-PS1-7'); a.toggleStandard('HS-PS1-7');
      var obj = JSON.parse(a.exportJSON());
      expect(obj.format).toBe('standards-explorer-exploration'); expect(obj.formatVersion).toBe(1);
      expect(obj.standardsVersion).toContain('2026');
      expect(obj.note).toContain('Not a curriculum');
      expect(obj.exploration.bookmarks.standards[0].code).toBe('HS-PS1-7');
    });
    it('round-trips an exploration through export and import', function () {
      var a = F.create({ storage: F.memoryStorage() });
      a.setCourse('biology'); a.visit('HS-LS1-7'); a.toggleStandard('HS-LS1-7'); a.togglePhenomenon('exercise-mass'); a.setGeneralNote('Talk to chemistry');
      var json = a.exportJSON();
      var b = F.create({ storage: F.memoryStorage() });
      var r = b.importJSON(json);
      expect(r.ok).toBe(true);
      expect(b.get().course).toBe('biology'); expect(b.isBookmarked('HS-LS1-7')).toBe(true);
      expect(b.isPhenomenonSaved('exercise-mass')).toBe(true); expect(b.get().notes.general).toBe('Talk to chemistry');
    });
    it('rejects files that are not explorations', function () {
      var b = F.create({ storage: F.memoryStorage() });
      expect(b.importJSON('not json').ok).toBe(false);
      expect(b.importJSON('{"format":"something-else"}').ok).toBe(false);
      expect(b.importJSON('{"format":"standards-explorer-exploration","formatVersion":99}').ok).toBe(false);
    });
    it('drops unknown codes instead of importing invented standards', function () {
      var b = F.create({ storage: F.memoryStorage() });
      var r = b.importJSON(JSON.stringify({ format: 'standards-explorer-exploration', formatVersion: 1,
        exploration: { bookmarks: { standards: [{ code: 'HS-PS9-9' }, { code: 'HS-PS2-1' }], relationships: [], phenomena: [{ id: 'nope' }], questions: [] }, history: [] } }));
      expect(r.ok).toBe(true); expect(r.dropped).toBe(2);
      expect(b.get().bookmarks.standards.length).toBe(1);
    });
  });

  describe('Printable summary', function () {
    it('separates teacher-selected items from suggestions and disclaims being a curriculum', function () {
      var st = F.create({ storage: F.memoryStorage() });
      st.setCourse('physics'); st.visit('HS-PS2-1'); st.toggleStandard('HS-PS2-1'); st.toggleRelationship('HS-PS2-1', 'HS-PS2-3', 'Forces in collision safety');
      st.togglePhenomenon('crash-safety'); st.toggleQuestion('Which parts of your kinematics unit…'); st.setNote('HS-PS2-1', 'Cart lab');
      var html = SE.exploration.report({ state: st });
      ['Standards Exploration Summary', 'Physics', '2026 NJSLS-Science', 'not</b> a curriculum', 'Teacher-selected', 'Suggested by Standards Explorer',
        'Important Prior-Grade Connections', 'MS-PS2-2', 'Related High School Standards', 'Vehicle Crash Safety', 'Cart lab', '<svg'].forEach(function (s) { expect(html).toContain(s); });
    });
  });
})();
