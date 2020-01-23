import { REPLACE_FILTER_OPTIONS, UPDATE_FILTER_OPTIONS } from '../JournalTransactionListIntents';
import createReducer from '../../../../store/createReducer';
import getDefaultState from '../getDefaultState';
import reducerHandlers from '../journalTransactionListReducer';


describe('transactionListReducer', () => {
  const journalTransactionListReducer = createReducer(getDefaultState(), reducerHandlers);

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
        value: '2019-01-10',
      };

      const expected = {
        a: 'a',
        filterOptions: {
          dateTo: '2019-01-10',
        },
      };

      const actual = journalTransactionListReducer(state, action);

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

      const actual = journalTransactionListReducer(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('REPLACE_FILTER_OPTIONS', () => {
    it('should replace filter options', () => {
      const state = {
        a: 'a',
        filterOptions: {
          period: 'Last month',
          sourceJournal: 'General',
          dateFrom: '2019-12-01',
          dateTo: '2019-12-31',
          keywords: 'keywords',
        },
      };

      const expected = {
        period: 'Custom',
        sourceJournal: 'All',
        dateFrom: '2019-01-01',
        dateTo: '2019-01-05',
        keywords: 'new',
      };

      const filterOptions = {
        ...expected,
        accountId: '1',
      };

      const action = { intent: REPLACE_FILTER_OPTIONS, filterOptions };

      const actual = journalTransactionListReducer(state, action);

      expect(actual.filterOptions).toEqual(expected);
    });
  });
});
