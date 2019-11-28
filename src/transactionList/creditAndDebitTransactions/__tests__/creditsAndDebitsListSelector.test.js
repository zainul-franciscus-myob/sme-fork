import { getIsDefaultFilters, getNewSortOrder } from '../creditsAndDebitsListSelectors';
import getDefaultState from '../getDefaultState';

describe('creditsAndDebitsListSelectors', () => {
  describe('getIsDefaultFilters', () => {
    it('should return false when default filters arent applied', () => {
      const state = {
        creditsAndDebitsTransactions: {
          filterOptions: { keywords: 'not', type: 'abc' },
          appliedFilterOptions: { keywords: 'the same', type: 'abc' },
        },
      };
      const expected = false;
      const actual = getIsDefaultFilters(state);

      expect(actual).toEqual(expected);
    });
    it('should return true when default filters are applied', () => {
      const { filterOptions } = getDefaultState();
      const state = {
        creditsAndDebitsTransactions: {
          filterOptions,
          appliedFilterOptions: filterOptions,
        },
      };
      const expected = true;
      const actual = getIsDefaultFilters(state);

      expect(actual).toEqual(expected);
    });
  });
  describe('getNewSortOrder', () => {
    it('should flip sort order when new order by column is same with old order by column', () => {
      const state = {
        creditsAndDebitsTransactions: {
          orderBy: 'columnA',
          sortOrder: 'asc',
        },
      };
      const actual = getNewSortOrder(state, 'columnA');
      expect(actual).toEqual('desc');
    });
    it('should flip sort order when new order by column is not same with old order by column', () => {
      const state = {
        creditsAndDebitsTransactions: {
          orderBy: 'columnA',
          sortOrder: 'asc',
        },
      };
      const actual = getNewSortOrder(state, 'columnB');
      expect(actual).toEqual('asc');
    });
  });
});
