import { addMonths } from 'date-fns';

import {
  LOAD_QUOTE_LIST,
  LOAD_QUOTE_LIST_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_QUOTE_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../QuoteIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultDateRange = () => addMonths(new Date(), -3);

const defaultFilterOptions = {
  customerId: undefined,
  dateFrom: formatIsoDate(getDefaultDateRange()),
  dateTo: formatIsoDate(new Date()),
  keywords: '',
};

const defaultSortOptions = {
  sortOrder: 'desc',
  orderBy: 'DateOccurred',
};

const getDefaultState = () => ({
  settingsVersion: '24264afc-07b6-4993-8aa6-693dd1378d57',
  defaultFilterOptions,
  filterOptions: defaultFilterOptions,
  ...defaultSortOptions,
  customerFilters: [],
  entries: [],
  total: '',
  alert: undefined,
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  isNextPageLoading: false,
  pagination: {
    hasNextPage: false,
    offset: 0,
  },
});

const setInitialState = (state, {
  context,
  settings = {
    filterOptions: defaultFilterOptions,
    sortOrder: defaultSortOptions.sortOrder,
    orderBy: defaultSortOptions.orderBy,
  },
}) => {
  const isExpiredSettings = state.settingsVersion !== settings.settingsVersion;

  if (isExpiredSettings) {
    return {
      ...state,
      ...context,
    };
  }

  return {
    ...state,
    ...context,
    filterOptions: settings.filterOptions,
    sortOrder: settings.sortOrder,
    orderBy: settings.orderBy,
  };
};

const loadQuoteList = (state, action) => ({
  ...state,
  entries: action.entries,
  customerFilters: action.customerFilters,
  total: action.total,
  pagination: action.pagination,
});

const resetState = () => (getDefaultState());

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
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

const setNextPageLoadingState = (state, action) => ({
  ...state,
  isNextPageLoading: action.isNextPageLoading,
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
  [SET_NEXT_PAGE_LOADING_STATE]: setNextPageLoadingState,
};

const quoteListReducer = createReducer(getDefaultState(), handlers);

export default quoteListReducer;
