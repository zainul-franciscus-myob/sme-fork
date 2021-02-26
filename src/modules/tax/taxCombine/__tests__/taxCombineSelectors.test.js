import {
  getModalTitle,
  getPageTitle,
  getTaxCodeToDeleteLabel,
} from '../taxCombineSelectors';

describe('taxCombineSelectors', () => {
  describe('getPageTitle', () => {
    it('GST when nz region', () => {
      const state = { region: 'nz' };
      const expected = 'Combine GST codes';
      const actual = getPageTitle(state);

      expect(actual).toEqual(expected);
    });
    it('Tax when au region', () => {
      const state = { region: 'au' };
      const expected = 'Combine tax codes';
      const actual = getPageTitle(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTaxCodeToDeleteLabel', () => {
    it('GST when nz region', () => {
      const state = { region: 'nz' };
      const expected = 'Delete this GST code';
      const actual = getTaxCodeToDeleteLabel(state);

      expect(actual).toEqual(expected);
    });
    it('Tax when au region', () => {
      const state = { region: 'au' };
      const expected = 'Delete this tax code';
      const actual = getTaxCodeToDeleteLabel(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getModalTitle', () => {
    it('GST when nz region', () => {
      const state = { region: 'nz' };
      const expected = 'Combine GST codes?';
      const actual = getModalTitle(state);

      expect(actual).toEqual(expected);
    });
    it('Tax when au region', () => {
      const state = { region: 'au' };
      const expected = 'Combine tax codes?';
      const actual = getModalTitle(state);

      expect(actual).toEqual(expected);
    });
  });
});
