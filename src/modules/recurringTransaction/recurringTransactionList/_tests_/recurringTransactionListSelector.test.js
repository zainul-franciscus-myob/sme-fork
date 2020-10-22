import { getFlipSortOrder } from '../recurringTransactionListSelectors';

describe('recurringTransactionListSelector', () => {
  describe('getFlipSortOrder', () => {
    it('should be asc when current order is desc', () => {
      const state = { sortOrder: 'desc' };
      const expected = 'asc';
      const actual = getFlipSortOrder(state);

      expect(actual).toEqual(expected);
    });
    it('should be desc when current order is asc', () => {
      const state = { sortOrder: 'asc' };
      const expected = 'desc';
      const actual = getFlipSortOrder(state);

      expect(actual).toEqual(expected);
    });
  });
});
