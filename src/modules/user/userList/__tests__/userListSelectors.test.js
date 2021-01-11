import { getShouldShowPractices } from '../userListSelectors';

describe('User List Selectors', () => {
  describe('getShouldShowPractices', () => {
    it('should return false when practices is empty', () => {
      const state = {
        practices: [],
        loadPracticesError: null,
      };

      const actual = getShouldShowPractices(state);

      expect(actual).toEqual(false);
    });

    it('should return false when loadPracticesError is not falsy', () => {
      const state = {
        practices: [{}, {}],
        loadPracticesError: 'error',
      };

      const actual = getShouldShowPractices(state);

      expect(actual).toEqual(false);
    });

    it('should return true when loadPracticesError is not falsy and practice is not empty', () => {
      const state = {
        practices: [{}, {}],
        loadPracticesError: null,
      };

      const actual = getShouldShowPractices(state);

      expect(actual).toEqual(true);
    });
  });
});
