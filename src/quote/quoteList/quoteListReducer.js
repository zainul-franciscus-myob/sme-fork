import dateFormat from 'dateformat';

import {
  LOAD_QUOTE_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_QUOTE_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../QuoteIntents';
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');

const getDefaultDateRange = () => new Date().setMonth(new Date().getMonth() - 3);

const getDefaultState = () => ({
  filterOptions: {
    customerId: 'All',
    dateFrom: convertToDateString(getDefaultDateRange()),
    dateTo: convertToDateString(Date.now()),
    keywords: '',
  },
  appliedFilterOptions: {
    customerId: 'All',
    dateFrom: convertToDateString(getDefaultDateRange()),
    dateTo: convertToDateString(Date.now()),
    keywords: '',
  },
  customerFilters: [],
  entries: [],
  total: '',
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
});

const loadQuoteList = (state, action) => ({
  ...state,
  entries: action.entries,
  customerFilters: action.customerFilters,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
  total: action.total,
  filterOptions: {
    ...state.filterOptions,
    customerId: action.customerId,
  },
  appliedFilterOptions: {
    ...state.appliedFilterOptions,
    customerId: action.customerId,
  },
});

const resetState = () => (getDefaultState());

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setSortOrder = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const sortAndFilterQuoteList = (state, action) => ({
  ...state,
  entries: action.entries,
  total: action.total,
  appliedFilterOptions: action.isSort ? state.appliedFilterOptions : state.filterOptions,
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: action.value,
  },
});

const handlers = {
  [LOAD_QUOTE_LIST]: loadQuoteList,
  [RESET_STATE]: resetState,
  [SET_ALERT]: setAlert,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_SORT_ORDER]: setSortOrder,
  [SORT_AND_FILTER_QUOTE_LIST]: sortAndFilterQuoteList,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
};

const quoteListReducer = createReducer(getDefaultState(), handlers);

export default quoteListReducer;
