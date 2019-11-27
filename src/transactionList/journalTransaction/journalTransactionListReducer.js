import {
  LOAD_TRANSACTION_LIST,
  SET_INITIAL_STATE,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_TRANSACTION_LIST,
  UPDATE_FILTER_OPTIONS,
} from './JournalTransactionListIntents';

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

const loadTransactionList = (state, action) => ({
  ...state,
  sourceJournalFilters: action.sourceJournalFilters,
  entries: action.entries,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
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
  appliedFilterOptions: action.isSort ? state.appliedFilterOptions : state.filterOptions,
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

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const handlers = {
  [LOAD_TRANSACTION_LIST]: loadTransactionList,
  [SORT_AND_FILTER_TRANSACTION_LIST]: sortAndFilterTransactionList,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_INITIAL_STATE]: setInitialState,
};

export default handlers;
