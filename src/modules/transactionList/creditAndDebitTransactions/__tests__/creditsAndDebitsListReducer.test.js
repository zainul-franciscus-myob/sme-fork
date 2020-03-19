import { REPLACE_FILTER_OPTIONS, SET_INITIAL_STATE, UPDATE_FILTER_OPTIONS } from '../CreditsAndDebitsListIntents';
import LoadMoreButtonStatuses from '../../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import LoadingState from '../../../../components/PageView/LoadingState';
import Periods from '../../../../components/PeriodPicker/Periods';
import createReducer from '../../../../store/createReducer';
import getDateRangeByPeriodAndRegion from '../../../../components/PeriodPicker/getDateRangeByPeriodAndRegion';
import getDefaultState from '../getDefaultState';
import reducerHandlers from '../creditsAndDebitsListReducer';

jest.mock('../../../../components/PeriodPicker/getDateRangeByPeriodAndRegion');

describe('creditsAndDebitsListReducer', () => {
  getDateRangeByPeriodAndRegion.mockReturnValue({
    dateFrom: '2019-11-01',
    dateTo: '2019-11-30',
  });
  const creditsAndDebitsListReducer = createReducer(getDefaultState(), reducerHandlers);

  const { dateFrom, dateTo } = getDateRangeByPeriodAndRegion('au', new Date(), Periods.thisMonth);

  describe('set init state', () => {
    it('should use deep link param for sourceJournal if applicable', () => {
      const state = getDefaultState();

      const settings = {
        filterOptions: {
          sourceJournal: 'Foo',
        },
      };

      const sourceJournal = 'Bar';

      const context = {};

      const action = {
        intent: SET_INITIAL_STATE,
        settings,
        context,
        sourceJournal,
      };

      const filterOptions = {
        sourceJournal,
        accountId: undefined,
        dateFrom,
        dateTo,
        keywords: '',
        period: 'This month',
      };

      const expected = {
        accountList: [],
        entries: [],
        filterOptions,
        sourceJournalFilters: [],
        sortOrder: 'desc',
        orderBy: 'Date',
        loadingState: LoadingState.LOADING,
        isTableLoading: false,
        loadMoreButtonStatus: LoadMoreButtonStatuses.HIDDEN,
        pagination: {},
      };

      const actual = creditsAndDebitsListReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('should use settings for sourceJournal if applicable', () => {
      const state = getDefaultState();

      const settings = {
        filterOptions: {
          sourceJournal: 'Foo',
        },
      };

      const context = {};

      const action = {
        intent: SET_INITIAL_STATE,
        settings,
        context,
      };

      const filterOptions = {
        sourceJournal: 'Foo',
        accountId: undefined,
        dateFrom,
        dateTo,
        keywords: '',
        period: 'This month',
      };

      const expected = {
        accountList: [],
        entries: [],
        filterOptions,
        sourceJournalFilters: [],
        sortOrder: 'desc',
        orderBy: 'Date',
        loadingState: LoadingState.LOADING,
        isTableLoading: false,
        loadMoreButtonStatus: LoadMoreButtonStatuses.HIDDEN,
        pagination: {},
      };

      const actual = creditsAndDebitsListReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('update filter options', () => {
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

      const actual = creditsAndDebitsListReducer(state, action);

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

      const actual = creditsAndDebitsListReducer(state, action);
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
          accountId: undefined,
        },
      };

      const filterOptions = {
        period: 'Custom',
        sourceJournal: 'All',
        dateFrom: '2019-01-01',
        dateTo: '2019-01-05',
        keywords: 'new',
      };

      const expected = {
        ...filterOptions,
        accountId: undefined,
      };

      const action = { intent: REPLACE_FILTER_OPTIONS, filterOptions };

      const actual = creditsAndDebitsListReducer(state, action);

      expect(actual.filterOptions).toEqual(expected);
    });
  });
});
