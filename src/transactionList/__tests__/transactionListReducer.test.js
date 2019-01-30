import {
  UPDATE_FILTER_OPTIONS,
} from '../TransactionListIntents';
import transactionListReducer from '../transactionListReducer';

describe('transactionListReducer', () => {
  describe('filterOptions', () => {
    it('can update state with Date Strings when dates change in the filter options', () => {
      const state = {
        a: 'a',
        filterOptions: {
          dateTo: '2019-01-05',
        },
      };

      const action = {
        intent: UPDATE_FILTER_OPTIONS,
        filterName: 'dateTo',
        value: '1547078776000',
      };

      const expected = {
        a: 'a',
        filterOptions: {
          dateTo: '2019-01-10',
        },
      };

      const actual = transactionListReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('does not alter date strings when other fields in filter options change', () => {
      const state = {
        filterOptions: {
          keywords: 'before',
          dateTo: '2019-01-11',
          dateFrom: '2019-01-10',
        },
      };

      const action = {
        intent: UPDATE_FILTER_OPTIONS,
        filterName: 'keywords',
        value: 'after',
      };

      const expected = {
        filterOptions: {
          keywords: 'after',
          dateTo: '2019-01-11',
          dateFrom: '2019-01-10',
        },
      };

      const actual = transactionListReducer(state, action);
      expect(actual).toEqual(expected);
    });
  });
});
