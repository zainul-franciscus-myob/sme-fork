import {
  LOAD_CREDITS_AND_DEBITS_LIST,
  LOAD_CREDITS_AND_DEBITS_NEXT_PAGE,
  LOAD_TRANSACTION_NEXT_PAGE,
  RESET_FILTER_OPTIONS,
  SET_ALERT,
  SET_LAST_LOADING_TAB,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TAB,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
  SORT_AND_FILTER_TRANSACTION_LIST,
  UPDATE_FILTER_OPTIONS,
  UPDATE_PERIOD_DATE_RANGE,
} from './TransactionListIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createTransactionListDispatcher = (store) => ({
  setInitialState: (context, settings = { filterOptions: {} }) => {
    const intent = SET_INITIAL_STATE;
    const { sourceJournal, ...rest } = context;

    store.dispatch({
      intent,
      sourceJournal,
      settings,
      context: rest,
    });
  },

  sortAndFilterCreditsAndDebitsList: ({ entries, pagination }) => {
    const intent = SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST;

    store.dispatch({
      intent,
      entries,
      pagination,
    });
  },

  loadCreditsAndDebitsList: (response) => {
    const intent = LOAD_CREDITS_AND_DEBITS_LIST;
    store.dispatch({
      intent,
      ...response,
    });
  },

  loadCreditsAndDebitsNextPage: (response) => {
    const intent = LOAD_CREDITS_AND_DEBITS_NEXT_PAGE;
    store.dispatch({
      intent,
      ...response,
    });
  },

  sortAndFilterJournalTransactions: ({ entries, pagination }) => {
    const intent = SORT_AND_FILTER_TRANSACTION_LIST;

    store.dispatch({
      intent,
      entries,
      pagination,
    });
  },

  loadTransactionListNextPage: (response) => {
    const intent = LOAD_TRANSACTION_NEXT_PAGE;
    store.dispatch({
      intent,
      ...response,
    });
  },

  resetState: () => store.dispatch({ intent: RESET_STATE }),

  setTab: (tabId) => {
    store.dispatch({
      intent: SET_TAB,
      tabId,
    });
  },

  setLastLoadingTab: (tabId) =>
    store.dispatch({
      intent: SET_LAST_LOADING_TAB,
      lastLoadingTab: tabId,
    }),

  setLoadingState: (key, loadingState) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({
      intent,
      key,
      loadingState,
    });
  },

  setTableLoadingState: (key, isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    store.dispatch({
      intent,
      key,
      isTableLoading,
    });
  },

  setNextPageLoadingState: (key, isNextPageLoading) => {
    const intent = SET_NEXT_PAGE_LOADING_STATE;
    store.dispatch({
      intent,
      key,
      isNextPageLoading,
    });
  },

  setAlert: ({ message, type }) => {
    store.dispatch({
      intent: SET_ALERT,
      alert: {
        message,
        type,
      },
    });
  },

  dismissAlert: () =>
    store.dispatch({
      intent: SET_ALERT,
      alert: undefined,
    }),

  setSortOrder: (orderBy, newSortOrder) => {
    store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  },

  updateFilterOptions: (key, value) => {
    const intent = UPDATE_FILTER_OPTIONS;
    store.dispatch({
      intent,
      filterName: key,
      value,
    });
  },

  resetFilterOptions: () => {
    const intent = RESET_FILTER_OPTIONS;
    store.dispatch({
      intent,
    });
  },

  updatePeriodDateRange: ({ period, dateFrom, dateTo }) => {
    const intent = UPDATE_PERIOD_DATE_RANGE;
    store.dispatch({
      intent,
      period,
      dateFrom,
      dateTo,
    });
  },
});

export default createTransactionListDispatcher;
