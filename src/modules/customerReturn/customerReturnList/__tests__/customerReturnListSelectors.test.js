import {
  getTableBodyState,
  isDefaultFilters,
} from '../CustomerReturnListSelectors';
import TableBodyType from '../TableBodyType';

describe('customerReturnListSelectors', () => {
  describe('isDefaultFilters', () => {
    it('returns true when the given customerId matches the defaultFilterOptions.customerId and the keywords is empty', () => {
      const defaultFilterOptions = {
        customerId: '1',
        keywords: '',
      };

      const filters = {
        customerId: '1',
        keywords: '',
      };

      const actual = isDefaultFilters(filters, defaultFilterOptions);

      expect(actual).toEqual(true);
    });
    it('returns false when the given customerId and keywords does not match the defaultFilterOptions', () => {
      const defaultFilterOptions = {
        customerId: '1',
        keywords: '',
      };

      const filters = {
        customerId: 'a',
        keywords: '123',
      };

      const actual = isDefaultFilters(filters, defaultFilterOptions);

      expect(actual).toEqual(false);
    });
  });
  describe('getTableBodyState', () => {
    it('returns TableBodyType.TABLE when the length of entries array is more than 0', () => {
      const state = {
        entries: [
          {
            a: 'a',
          },
        ],
      };

      const actual = getTableBodyState(state);

      expect(actual).toEqual(TableBodyType.TABLE);
    });
    it('returns TableBodyType.EMPTY when there are no entries with default filters', () => {
      const state = {
        entries: [],
        defaultFilterOptions: {
          customerId: undefined,
          keywords: '',
        },
        filterOptions: {
          customerId: undefined,
          keywords: '',
        },
      };

      const actual = getTableBodyState(state);

      expect(actual).toEqual(TableBodyType.EMPTY);
    });
    it('returns TableBodyType.NO_RESULTS when there are no entries with filter options', () => {
      const state = {
        entries: [],
        defaultFilterOptions: {
          customerId: undefined,
          keywords: '',
        },
        filterOptions: {
          customerId: 'some customer',
          keywords: 'abc',
        },
      };

      const actual = getTableBodyState(state);

      expect(actual).toEqual(TableBodyType.NO_RESULTS);
    });
  });
});
