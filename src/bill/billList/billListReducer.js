import { addMonths } from 'date-fns';

import {
  LOAD_BILL_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BILL_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../BillIntents';
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';
import formatIsoDate from '../../valueFormatters/formatDate/formatIsoDate';

const getDefaultDateRange = () => addMonths(new Date(), -3);

const getDefaultState = () => ({
  filterOptions: {
    status: '',
    supplierId: '',
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
    keywords: '',
  },
  supplierFilters: [],
  statusFilters: [],
  sortOrder: '',
  orderBy: '',
  total: '',
  totalDue: '',
  entries: [],
  isLoading: true,
  isTableLoading: false,
  alert: undefined,
});

const resetState = () => (getDefaultState());

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const loadBillList = (state, { status, supplierId, ...action }) => ({
  ...state,
  ...action,
  filterOptions: {
    ...state.filterOptions,
    status,
    supplierId,
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

const sortAndFilterBillList = (state, action) => ({
  ...state,
  entries: action.entries,
  total: action.total,
  totalDue: action.totalDue,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_BILL_LIST]: loadBillList,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [SORT_AND_FILTER_BILL_LIST]: sortAndFilterBillList,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_ALERT]: setAlert,
};

const billListReducer = createReducer(getDefaultState(), handlers);

export default billListReducer;
