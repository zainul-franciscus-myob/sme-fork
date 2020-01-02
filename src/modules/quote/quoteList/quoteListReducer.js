import { addMonths } from 'date-fns';

import {
  LOAD_QUOTE_LIST,
  LOAD_QUOTE_LIST_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_QUOTE_LIST,
  START_LOADING_MORE,
  STOP_LOADING_MORE,
  UPDATE_FILTER_OPTIONS,
} from '../QuoteIntents';
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultDateRange = () => addMonths(new Date(), -3);

const getDefaultState = () => ({
  filterOptions: {
    customerId: 'All',
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
    keywords: '',
  },
  appliedFilterOptions: {
    customerId: 'All',
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
    keywords: '',
  },
  customerFilters: [],
  entries: [],
  total: '',
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
  isLoadingMore: false,
  pagination: {
    hasNextPage: false,
    offset: 0,
  },
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
  pagination: action.pagination,
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

const startLoadingMore = state => ({
  ...state,
  isLoadingMore: true,
});

const stopLoadingMore = state => ({
  ...state,
  isLoadingMore: false,
});

const loadQuoteListNextPage = (state, action) => {
  const entryIds = state.entries.map(customer => customer.id);
  const entries = action.entries.filter(customer => !entryIds.includes(customer.id));
  return ({
    ...state,
    entries: [
      ...state.entries,
      ...entries,
    ],
    pagination: action.pagination,
  });
};

const sortAndFilterQuoteList = (state, action) => ({
  ...state,
  entries: action.entries,
  total: action.total,
  appliedFilterOptions: action.isSort ? state.appliedFilterOptions : state.filterOptions,
  pagination: action.pagination,
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
  [LOAD_QUOTE_LIST_NEXT_PAGE]: loadQuoteListNextPage,
  [START_LOADING_MORE]: startLoadingMore,
  [STOP_LOADING_MORE]: stopLoadingMore,
};

const quoteListReducer = createReducer(getDefaultState(), handlers);

export default quoteListReducer;
