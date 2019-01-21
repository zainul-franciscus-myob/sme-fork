import dateFormat from 'dateformat';

import SystemIntents from '../SystemIntents';
import TransactionListIntents from './TransactionListIntents';
import createReducer from '../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');
const getDefaultDateRange = () => new Date().setMonth(new Date().getMonth() - 3);

const getInitialState = () => ({
  entries: [],
  sourceJournalFilters: [],
  filterOptions: {
    sourceJournal: '',
    dateFrom: convertToDateString(getDefaultDateRange()),
    dateTo: convertToDateString(Date.now()),
    keywords: '',
  },
  sortOrder: '',
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
});

const resetState = () => (getInitialState());

const loadTransactionList = (state, action) => ({
  ...state,
  sourceJournalFilters: action.sourceJournalFilters,
  entries: action.entries,
  sortOrder: action.sortOrder,
  isLoading: action.isLoading,
});

const isDateFilterChange = filterName => filterName === 'dateTo' || filterName === 'dateFrom';

const sortAndFilterTransactionList = (state, action) => ({
  ...state,
  entries: action.entries,
  sortOrder: action.sortOrder,
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: isDateFilterChange(action.filterName)
      ? convertToDateString(action.value)
      : action.value,
  },
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const handlers = {
  [TransactionListIntents.LOAD_TRANSACTION_LIST]: loadTransactionList,
  [TransactionListIntents.SORT_AND_FILTER_TRANSACTION_LIST]: sortAndFilterTransactionList,
  [TransactionListIntents.UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [TransactionListIntents.SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [TransactionListIntents.SET_LOADING_STATE]: setLoadingState,
  [TransactionListIntents.SET_ALERT]: setAlert,
  [SystemIntents.RESET_STATE]: resetState,
};

const transactionListReducer = createReducer(getInitialState(), handlers);

export default transactionListReducer;
