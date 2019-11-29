import { addMonths } from 'date-fns';

import {
  LOAD_INVOICE_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_INVOICE_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../InvoiceIntents';
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';
import formatIsoDate from '../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultDateRange = () => addMonths(new Date(), -3);

const defaultFilterOptions = {
  dateFrom: formatIsoDate(getDefaultDateRange()),
  dateTo: formatIsoDate(new Date()),
  keywords: '',
  customerId: 'All',
  status: 'All',
};

const getInitialState = () => ({
  defaultFilterOptions,
  filterOptions: defaultFilterOptions,
  appliedFilterOptions: defaultFilterOptions,
  customerFilterOptions: [],
  statusFilterOptions: [],
  total: '',
  totalDue: '',
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
  entries: [],
});

const resetState = () => (getInitialState());

const setInitialState = (state, {
  context,
  settings = { filterOptions: defaultFilterOptions, sortOrder: '', orderBy: '' },
}) => ({
  ...state,
  ...context,
  filterOptions: {
    ...state.filterOptions,
    ...settings.filterOptions,
  },
  appliedFilterOptions: {
    ...state.appliedFilterOptions,
    ...settings.filterOptions,
  },
  sortOrder: settings.sortOrder,
  orderBy: settings.orderBy,
});

const loadInvoiceList = (state, action) => ({
  ...state,
  entries: action.entries,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
  filterOptions: {
    ...state.filterOptions,
    customerId: action.customerId,
    status: action.status,
  },
  appliedFilterOptions: {
    ...state.filterOptions,
    customerId: action.customerId,
    status: action.status,
  },
  total: action.total,
  totalDue: action.totalDue,
  customerFilterOptions: action.customerFilters,
  statusFilterOptions: action.statusFilters,
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: action.value,
  },
});

const setSortOrder = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const sortAndFilterInvoiceList = (state, action) => ({
  ...state,
  appliedFilterOptions: action.filterOptions,
  entries: action.entries,
  total: action.total,
  totalDue: action.totalDue,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isLoading,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const handlers = {
  [LOAD_INVOICE_LIST]: loadInvoiceList,
  [SORT_AND_FILTER_INVOICE_LIST]: sortAndFilterInvoiceList,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_ALERT]: setAlert,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
};

const invoiceListReducer = createReducer(getInitialState(), handlers);

export default invoiceListReducer;
