import dateFormat from 'dateformat';

import {
  LOAD_TRANSACTION_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_TRANSACTION_LIST,
  UPDATE_FILTER_OPTIONS,
} from './TransactionListIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../SystemIntents';
import createReducer from '../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');
const getDefaultDateRange = () => new Date().setMonth(new Date().getMonth() - 3);

const getDefaultState = () => ({
  entries: [],
  sourceJournalFilters: [],
  filterOptions: {
    sourceJournal: '',
    dateFrom: convertToDateString(getDefaultDateRange()),
    dateTo: convertToDateString(Date.now()),
    keywords: '',
  },
  appliedFilterOptions: {
    sourceJournal: '',
    dateFrom: convertToDateString(getDefaultDateRange()),
    dateTo: convertToDateString(Date.now()),
    keywords: '',
  },
  sortOrder: '',
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
  businessId: '',
  region: '',
});

const resetState = () => (getDefaultState());

const loadTransactionList = (state, action) => ({
  ...state,
  sourceJournalFilters: action.sourceJournalFilters,
  entries: action.entries,
  sortOrder: action.sortOrder,
  filterOptions: {
    ...state.filterOptions,
    sourceJournal: action.sourceJournal,
  },
  appliedFilterOptions: {
    ...state.appliedFilterOptions,
    sourceJournal: action.sourceJournal,
  },
});

const sortAndFilterTransactionList = (state, action) => ({
  ...state,
  entries: action.entries,
  sortOrder: action.sortOrder,
  appliedFilterOptions: action.isSort ? state.appliedFilterOptions : state.filterOptions,
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: action.value,
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

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
  filterOptions: {
    ...state.filterOptions,
    sourceJournal: action.sourceJournal,
  },
  appliedFilterOptions: {
    ...state.appliedFilterOptions,
    sourceJournal: action.sourceJournal,
  },
});

const handlers = {
  [LOAD_TRANSACTION_LIST]: loadTransactionList,
  [SORT_AND_FILTER_TRANSACTION_LIST]: sortAndFilterTransactionList,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
};

const transactionListReducer = createReducer(getDefaultState(), handlers);

export default transactionListReducer;
