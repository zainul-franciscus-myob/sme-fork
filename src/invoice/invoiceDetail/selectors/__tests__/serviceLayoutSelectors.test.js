import {
  getIsAccountComboboxDisabled,
} from '../serviceLayoutSelectors';

describe('serviceLayoutSelectors', () => {
  describe('getIsAccountComboboxDisabled', () => {
    it('returns true when account is loading', () => {
      const state = {
        isAccountLoading: true,
      };

      const actual = getIsAccountComboboxDisabled(state);

      expect(actual).toEqual(true);
    });
    it('returns false when account is not loading', () => {
      const state = {
        isAccountLoading: false,
      };

      const actual = getIsAccountComboboxDisabled(state);

      expect(actual).toEqual(false);
    });
  });
});
