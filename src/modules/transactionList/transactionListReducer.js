import { DEBITS_AND_CREDITS, JOURNAL_TRANSACTIONS, getDefaultState } from './getDefaultState';
import {
  LOAD_CREDITS_AND_DEBITS_LIST,
  LOAD_CREDITS_AND_DEBITS_NEXT_PAGE,
  LOAD_TRANSACTION_LIST,
  LOAD_TRANSACTION_NEXT_PAGE,
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
import LoadMoreButtonStatuses from '../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import createReducer from '../../store/createReducer';
import getDateRangeByPeriodAndRegion from '../../components/PeriodPicker/getDateRangeByPeriodAndRegion';

const resetState = () => (getDefaultState());

const setInitialState = (state, {
  context,
  settings,
  sourceJournal,
}) => {
  const filterOptions = {
    ...state.filterOptions,
    ...getDateRangeByPeriodAndRegion(context.region, new Date(), state.filterOptions.period),
    ...settings.filterOptions,
    sourceJournal: (
      sourceJournal || settings.filterOptions.sourceJournal || state.filterOptions.sourceJournal
    ),
  };
  return ({
    ...state,
    ...context,
    filterOptions,
    orderBy: settings.orderBy || state.orderBy,
    sortOrder: settings.sortOrder || state.sortOrder,
  });
};

const setTab = (state, action) => ({
  ...state,
  activeTab: action.tabId,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setLastLoadingTab = (state, { lastLoadingTab }) => ({
  ...state,
  lastLoadingTab,
});

const setSortOrder = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: action.value,
  },
});

const updatePeriodDateRange = (state, { period, dateFrom, dateTo }) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    period,
    dateFrom,
    dateTo,
  },
});

const setTableLoadingState = (state, { key, isTableLoading }) => ({
  ...state,
  [key]: {
    ...state[key],
    isTableLoading,
  },
});

const getLoadMoreButtonStatus = hasNextPage => (
  hasNextPage ? LoadMoreButtonStatuses.SHOWN : LoadMoreButtonStatuses.HIDDEN);

const setNextPageLoadingState = (state, { key, isNextPageLoading }) => ({
  ...state,
  [key]: {
    ...state[key],
    loadMoreButtonStatus: isNextPageLoading
      ? LoadMoreButtonStatuses.LOADING
      : getLoadMoreButtonStatus(state[key].pagination.hasNextPage),
  },
});

const setLoadingState = (state, { key, loadingState }) => ({
  ...state,
  [key]: {
    ...state[key],
    loadingState,
  },
});

const loadCreditsAndDebitsList = (state, action) => ({
  ...state,
  accountList: action.accountList,
  [DEBITS_AND_CREDITS]: {
    ...state[DEBITS_AND_CREDITS],
    entries: action.entries,
    pagination: action.pagination,
    loadMoreButtonStatus: getLoadMoreButtonStatus(action.pagination.hasNextPage),
  },
});

const sortAndFilterCreditsAndDebitsList = (state, action) => ({
  ...state,
  [DEBITS_AND_CREDITS]: {
    ...state[DEBITS_AND_CREDITS],
    entries: action.entries,
    pagination: action.pagination,
    loadMoreButtonStatus: getLoadMoreButtonStatus(action.pagination.hasNextPage),
  },
});

const loadCreditsAndDebitsNextPage = (state, action) => ({
  ...state,
  [DEBITS_AND_CREDITS]: {
    ...state[DEBITS_AND_CREDITS],
    entries: [
      ...state[DEBITS_AND_CREDITS].entries,
      ...action.entries,
    ],
    pagination: action.pagination,
    loadMoreButtonStatus: getLoadMoreButtonStatus(action.pagination.hasNextPage),
  },
});

const loadTransactionList = (state, action) => ({
  ...state,
  [JOURNAL_TRANSACTIONS]: {
    ...state[JOURNAL_TRANSACTIONS],
    entries: action.entries,
    pagination: {
      hasNextPage: action.pagination.hasNextPage,
      offset: action.pagination.offset,
    },
  },
});

const sortAndFilterTransactionList = (state, action) => ({
  ...state,
  [JOURNAL_TRANSACTIONS]: {
    ...state[JOURNAL_TRANSACTIONS],
    entries: action.entries,
    pagination: {
      hasNextPage: action.pagination.hasNextPage,
      offset: action.pagination.offset,
    },
  },
});

const loadTransactionNextPage = (state, action) => ({
  ...state,
  [JOURNAL_TRANSACTIONS]: {
    ...state[JOURNAL_TRANSACTIONS],
    entries: [
      ...state[JOURNAL_TRANSACTIONS].entries,
      ...action.entries,
    ],
    pagination: action.pagination,
    loadMoreButtonStatus: getLoadMoreButtonStatus(action.pagination.hasNextPage),
  },
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_TAB]: setTab,
  [SET_ALERT]: setAlert,
  [SET_LAST_LOADING_TAB]: setLastLoadingTab,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_NEXT_PAGE_LOADING_STATE]: setNextPageLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SORT_ORDER]: setSortOrder,
  [UPDATE_PERIOD_DATE_RANGE]: updatePeriodDateRange,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [LOAD_CREDITS_AND_DEBITS_LIST]: loadCreditsAndDebitsList,
  [SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST]: sortAndFilterCreditsAndDebitsList,
  [LOAD_CREDITS_AND_DEBITS_NEXT_PAGE]: loadCreditsAndDebitsNextPage,
  [LOAD_TRANSACTION_LIST]: loadTransactionList,
  [SORT_AND_FILTER_TRANSACTION_LIST]: sortAndFilterTransactionList,
  [LOAD_TRANSACTION_NEXT_PAGE]: loadTransactionNextPage,
};

const transactionListReducer = createReducer(getDefaultState(), handlers);

export default transactionListReducer;
