import {
  CLOSE_MODAL,
  LOAD_CREDITS_AND_DEBITS_LIST,
  LOAD_CREDITS_AND_DEBITS_NEXT_PAGE,
  LOAD_TRANSACTION_NEXT_PAGE,
  OPEN_MODAL,
  RESET_FILTER_OPTIONS,
  SET_ALERT,
  SET_LAST_LOADING_TAB,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_REDIRECT_URL,
  SET_SORT_ORDER,
  SET_SWITCH_TO_TAB,
  SET_TAB,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
  SORT_AND_FILTER_TRANSACTION_LIST,
  UPDATE_FILTER_OPTIONS,
  UPDATE_PERIOD_DATE_RANGE,
} from './TransactionListIntents';
import {
  DEBITS_AND_CREDITS,
  JOURNAL_TRANSACTIONS,
  defaultFilterOptions,
  getDefaultState,
} from './getDefaultState';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import LoadMoreButtonStatuses from '../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import Periods from '../../components/PeriodPicker/Periods';
import createReducer from '../../store/createReducer';
import getDateRangeByPeriodAndLastMonthInFY from '../../components/PeriodPicker/getDateRangeByPeriodAndLastMonthInFY';

const resetState = () => getDefaultState();

const setInitialState = (state, { context, settings, sourceJournal }) => {
  const period = settings.filterOptions.period || state.filterOptions.period;
  const filterDates =
    period !== Periods.custom
      ? getDateRangeByPeriodAndLastMonthInFY(
          state.lastMonthInFinancialYear,
          new Date(),
          period
        )
      : {};

  const filterOptions = {
    ...state.filterOptions,
    ...settings.filterOptions,
    ...filterDates,
    sourceJournal:
      sourceJournal ||
      settings.filterOptions.sourceJournal ||
      state.filterOptions.sourceJournal,
  };
  return {
    ...state,
    ...context,
    filterOptions,
    orderBy: settings.orderBy || state.orderBy,
    sortOrder: settings.sortOrder || state.sortOrder,
  };
};

const setTab = (state, action) => ({
  ...state,
  activeTab: action.tabId,
});

const setSwitchToTab = (state, { switchToTab }) => ({
  ...state,
  switchToTab,
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

const resetFilterOptions = (state) => ({
  ...state,
  filterOptions: defaultFilterOptions,
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

const getLoadMoreButtonStatus = (hasNextPage) =>
  hasNextPage ? LoadMoreButtonStatuses.SHOWN : LoadMoreButtonStatuses.HIDDEN;

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
  taxCodeList: action.taxCodeList,
  lastMonthInFinancialYear: action.lastMonthInFinancialYear,
  [DEBITS_AND_CREDITS]: {
    ...state[DEBITS_AND_CREDITS],
    entries: action.entries,
    pagination: action.pagination,
    loadMoreButtonStatus: getLoadMoreButtonStatus(
      action.pagination.hasNextPage
    ),
  },
});

const sortAndFilterCreditsAndDebitsList = (state, action) => ({
  ...state,
  [DEBITS_AND_CREDITS]: {
    ...state[DEBITS_AND_CREDITS],
    entries: action.entries,
    pagination: action.pagination,
    loadMoreButtonStatus: getLoadMoreButtonStatus(
      action.pagination.hasNextPage
    ),
  },
});

const loadCreditsAndDebitsNextPage = (state, action) => ({
  ...state,
  [DEBITS_AND_CREDITS]: {
    ...state[DEBITS_AND_CREDITS],
    entries: [...state[DEBITS_AND_CREDITS].entries, ...action.entries],
    pagination: action.pagination,
    loadMoreButtonStatus: getLoadMoreButtonStatus(
      action.pagination.hasNextPage
    ),
  },
});

const sortAndFilterTransactionList = (state, action) => ({
  ...state,
  lastMonthInFinancialYear: action.lastMonthInFinancialYear,
  [JOURNAL_TRANSACTIONS]: {
    ...state[JOURNAL_TRANSACTIONS],
    entries: action.entries,
    pagination: {
      hasNextPage: action.pagination.hasNextPage,
      offset: action.pagination.offset,
    },
    loadMoreButtonStatus: getLoadMoreButtonStatus(
      action.pagination.hasNextPage
    ),
  },
});

const loadTransactionNextPage = (state, action) => ({
  ...state,
  [JOURNAL_TRANSACTIONS]: {
    ...state[JOURNAL_TRANSACTIONS],
    entries: [...state[JOURNAL_TRANSACTIONS].entries, ...action.entries],
    pagination: action.pagination,
    loadMoreButtonStatus: getLoadMoreButtonStatus(
      action.pagination.hasNextPage
    ),
  },
});

const setRedirectUrl = (state, { redirectUrl }) => ({
  ...state,
  redirectUrl,
});

const closeModal = (state) => ({
  ...state,
  modalType: undefined,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_TAB]: setTab,
  [SET_ALERT]: setAlert,
  [SET_LAST_LOADING_TAB]: setLastLoadingTab,
  [SET_SWITCH_TO_TAB]: setSwitchToTab,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_NEXT_PAGE_LOADING_STATE]: setNextPageLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SORT_ORDER]: setSortOrder,
  [UPDATE_PERIOD_DATE_RANGE]: updatePeriodDateRange,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [RESET_FILTER_OPTIONS]: resetFilterOptions,
  [LOAD_CREDITS_AND_DEBITS_LIST]: loadCreditsAndDebitsList,
  [SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST]: sortAndFilterCreditsAndDebitsList,
  [LOAD_CREDITS_AND_DEBITS_NEXT_PAGE]: loadCreditsAndDebitsNextPage,
  [SORT_AND_FILTER_TRANSACTION_LIST]: sortAndFilterTransactionList,
  [LOAD_TRANSACTION_NEXT_PAGE]: loadTransactionNextPage,
  [SET_REDIRECT_URL]: setRedirectUrl,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
};

const transactionListReducer = createReducer(getDefaultState(), handlers);

export default transactionListReducer;
