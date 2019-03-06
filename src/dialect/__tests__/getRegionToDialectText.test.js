import getRegionToDialectText from '../getRegionToDialectText';

describe('dialect', () => {
  describe('getRegionToDialectText', () => {
    it('returns correct text for a specific region', () => {
      const expected = 'GST codes';
      const actual = getRegionToDialectText('nz')('Tax codes');

      expect(actual).toBe(expected);
    });
  });
});
