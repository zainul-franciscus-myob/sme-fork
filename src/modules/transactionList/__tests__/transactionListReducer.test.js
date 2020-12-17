import {
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_ALERT,
  SET_LAST_LOADING_TAB,
  SET_SORT_ORDER,
  SET_SWITCH_TO_TAB,
  SET_TAB,
  UPDATE_FILTER_OPTIONS,
  UPDATE_PERIOD_DATE_RANGE,
} from '../TransactionListIntents';
import {
  DEBITS_AND_CREDITS,
  JOURNAL_TRANSACTIONS,
  getDefaultState,
} from '../getDefaultState';
import { SET_INITIAL_STATE } from '../../../SystemIntents';
import ModalType from '../findAndRecode/types/ModalType';
import Periods from '../../../components/PeriodPicker/Periods';
import getDateRangeByPeriodAndLastMonthInFY from '../../../components/PeriodPicker/getDateRangeByPeriodAndLastMonthInFY';
import transactionListReducer from '../transactionListReducer';

jest.mock(
  '../../../components/PeriodPicker/getDateRangeByPeriodAndLastMonthInFY'
);

describe('transactionListReducer', () => {
  describe('SET_INITIAL_STATE', () => {
    getDateRangeByPeriodAndLastMonthInFY.mockReturnValue({
      dateFrom: '2019-11-01',
      dateTo: '2019-11-30',
    });

    const { dateFrom, dateTo } = getDateRangeByPeriodAndLastMonthInFY(
      6,
      new Date(),
      Periods.thisMonth
    );

    it('should use deep link param for sourceJournal if applicable', () => {
      const state = getDefaultState();

      const settings = {
        orderBy: 'Date',
        sortOrder: 'asc',
        filterOptions: {
          sourceJournal: 'Foo',
        },
      };

      const sourceJournal = 'Bar';

      const action = {
        intent: SET_INITIAL_STATE,
        settings,
        context: {},
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

      const actual = transactionListReducer(state, action);

      expect(actual.filterOptions).toEqual(filterOptions);
      expect(actual.orderBy).toEqual(settings.orderBy);
      expect(actual.sortOrder).toEqual(settings.sortOrder);
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

      const actual = transactionListReducer(state, action);

      expect(actual.filterOptions).toEqual(filterOptions);
    });

    it('should use settings for start & end date if period is custom', () => {
      const state = getDefaultState();

      const settings = {
        filterOptions: {
          period: Periods.custom,
          dateFrom: '2020-03-01',
          dateTo: '2020-04-01',
        },
      };

      const context = {};

      const action = {
        intent: SET_INITIAL_STATE,
        settings,
        context,
      };

      const filterOptions = {
        dateFrom: '2020-03-01',
        dateTo: '2020-04-01',
        keywords: '',
        period: Periods.custom,
        sourceJournal: 'All',
      };

      const actual = transactionListReducer(state, action);

      expect(actual.filterOptions).toEqual(filterOptions);
    });

    it('should ignore start & end date in settings if period is not custom', () => {
      const state = getDefaultState();

      const settings = {
        filterOptions: {
          period: Periods.thisMonth,
          dateFrom: '2020-03-01',
          dateTo: '2020-04-01',
        },
      };

      const context = {};

      const action = {
        intent: SET_INITIAL_STATE,
        settings,
        context,
      };

      const filterOptions = {
        dateFrom,
        dateTo,
        keywords: '',
        period: Periods.thisMonth,
        sourceJournal: 'All',
      };

      const actual = transactionListReducer(state, action);

      expect(actual.filterOptions).toEqual(filterOptions);
    });

    it('should set correct initial state when no filterOptions in settings', () => {
      const state = getDefaultState();

      const settings = { filterOptions: {} };

      const context = {};

      const action = {
        intent: SET_INITIAL_STATE,
        settings,
        context,
      };

      const filterOptions = {
        dateFrom,
        dateTo,
        keywords: '',
        period: Periods.thisMonth,
        sourceJournal: 'All',
      };

      const actual = transactionListReducer(state, action);

      expect(actual.filterOptions).toEqual(filterOptions);
    });
  });

  describe('SET_TAB', () => {
    it('should update the selected tab', () => {
      const state = {
        activeTab: DEBITS_AND_CREDITS,
      };

      const action = {
        intent: SET_TAB,
        tabId: JOURNAL_TRANSACTIONS,
      };

      const actual = transactionListReducer(state, action);

      expect(actual.activeTab).toEqual(JOURNAL_TRANSACTIONS);
    });
  });

  describe('SET_ALERT', () => {
    it('should update the alert', () => {
      const state = {
        alert: {
          type: 'danger',
          message: 'hello',
        },
      };

      const alert = {
        type: 'success',
        message: 'sup',
      };

      const action = {
        intent: SET_ALERT,
        alert,
      };

      const actual = transactionListReducer(state, action);

      expect(actual.alert).toEqual(alert);
    });
  });

  describe('SET_LAST_LOADING_TAB', () => {
    it('should update the last loaded tab', () => {
      const state = {
        lastLoadingTab: DEBITS_AND_CREDITS,
      };

      const action = {
        intent: SET_LAST_LOADING_TAB,
        lastLoadingTab: JOURNAL_TRANSACTIONS,
      };

      const actual = transactionListReducer(state, action);

      expect(actual.lastLoadingTab).toEqual(JOURNAL_TRANSACTIONS);
    });
  });

  describe('SET_SWITCH_TO_TAB', () => {
    it('should update switch to tab', () => {
      const state = {
        switchToTab: '',
      };

      const action = {
        intent: SET_SWITCH_TO_TAB,
        switchToTab: JOURNAL_TRANSACTIONS,
      };

      const actual = transactionListReducer(state, action);

      expect(actual.switchToTab).toEqual(JOURNAL_TRANSACTIONS);
    });
  });

  describe('OPEN_MODAL', () => {
    it('should open modal', () => {
      const state = {
        modalType: undefined,
      };

      const action = {
        intent: OPEN_MODAL,
        modalType: ModalType.TerminateModal,
      };

      const actual = transactionListReducer(state, action);

      expect(actual.modalType).toEqual(ModalType.TerminateModal);
    });
    it('should close modal', () => {
      const state = {
        modalType: ModalType.TerminateModal,
      };

      const action = {
        intent: CLOSE_MODAL,
      };

      const actual = transactionListReducer(state, action);

      expect(actual.modalType).toEqual(undefined);
    });
  });

  describe('SET_SORT_ORDER', () => {
    it('should update the sort order', () => {
      const state = {
        sortOrder: 'asc',
        orderBy: 'Date',
      };

      const sortOrder = 'desc';
      const orderBy = 'Description';

      const action = {
        intent: SET_SORT_ORDER,
        sortOrder,
        orderBy,
      };

      const actual = transactionListReducer(state, action);

      expect(actual.sortOrder).toEqual(sortOrder);
      expect(actual.orderBy).toEqual(orderBy);
    });
  });

  describe('UPDATE_FILTER_OPTIONS', () => {
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

  describe('UPDATE_PERIOD_DATE_RANGE', () => {
    it('should update the selected tab', () => {
      const state = {
        filterOptions: {
          period: Periods.thisMonth,
          dateFrom: '',
          dateTo: '',
        },
      };

      const period = Periods.thisMonth;
      const dateFrom = '21/02/2019';
      const dateTo = '21/03/2019';

      const action = {
        intent: UPDATE_PERIOD_DATE_RANGE,
        period,
        dateFrom,
        dateTo,
      };

      const actual = transactionListReducer(state, action);

      expect(actual.filterOptions.period).toEqual(period);
      expect(actual.filterOptions.dateFrom).toEqual(dateFrom);
      expect(actual.filterOptions.dateTo).toEqual(dateTo);
    });
  });
});
