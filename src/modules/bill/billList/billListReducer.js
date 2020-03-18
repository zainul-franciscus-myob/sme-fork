import { addMonths } from 'date-fns';

import {
  LOAD_BILL_LIST,
  LOAD_BILL_LIST_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BILL_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../BillIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { START_LOADING_MORE, STOP_LOADING_MORE } from '../billDetail/BillIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultDateRange = () => addMonths(new Date(), -3);

const defaultFilterOptions = {
  status: 'All',
  supplierId: undefined,
  dateFrom: formatIsoDate(getDefaultDateRange()),
  dateTo: formatIsoDate(new Date()),
  keywords: '',
};

const getDefaultState = () => ({
  settingsVersion: '84650621-cb7b-4405-8c69-a61e0be4b896',
  filterOptions: defaultFilterOptions,
  defaultFilterOptions,
  supplierFilters: [],
  statusFilters: [],
  sortOrder: 'desc',
  orderBy: 'DateOccurred',
  total: '',
  totalDue: '',
  totalOverdue: '',
  entries: [],
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  alert: undefined,
  isLoadingMore: false,
  pagination: {
    hasNextPage: false,
    offset: 0,
  },
});

const resetState = () => (getDefaultState());

const shouldSetInitialStateWithQueryParams = (context) => {
  const {
    dateFrom, dateTo, keywords, supplierId, status, orderBy, sortOrder,
  } = context;

  return status || dateFrom || dateTo || keywords || supplierId || orderBy || sortOrder;
};

const setInitialStateWithQueryParams = (context, initialState) => {
  const {
    dateFrom, dateTo, keywords, supplierId, status, orderBy, sortOrder,
  } = context;

  const updatedFilterOptions = {
    dateFrom: dateFrom || initialState.defaultFilterOptions.dateFrom,
    dateTo: dateTo || initialState.defaultFilterOptions.dateTo,
    keywords: keywords || initialState.defaultFilterOptions.keywords,
    supplierId: supplierId || initialState.defaultFilterOptions.supplierId,
    status: status || initialState.defaultFilterOptions.status,
  };

  return ({
    ...initialState,
    ...context,
    filterOptions: {
      ...initialState.filterOptions,
      ...updatedFilterOptions,
    },
    orderBy: orderBy || initialState.orderBy,
    sortOrder: sortOrder || initialState.sortOrder,
  });
};

const shouldSetInitialStateWithSettings = (settings, initialState) => (
  settings.settingsVersion === initialState.settingsVersion
);

const setInitialStateWithSettings = (context, settings, initialState) => ({
  ...initialState,
  ...context,
  filterOptions: settings.filterOptions,
  sortOrder: settings.sortOrder,
  orderBy: settings.orderBy,
});

const setInitialState = (_, {
  context,
  settings = {},
}) => {
  const initialState = getDefaultState();

  if (shouldSetInitialStateWithQueryParams(context)) {
    return setInitialStateWithQueryParams(context, initialState);
  }

  if (shouldSetInitialStateWithSettings(settings, initialState)) {
    return setInitialStateWithSettings(context, settings, initialState);
  }

  return {
    ...initialState,
    ...context,
  };
};

const loadBillList = (state, action) => ({
  ...state,
  entries: action.entries,
  total: action.total,
  totalDue: action.totalDue,
  totalOverdue: action.totalOverdue,
  supplierFilters: action.supplierFilters,
  statusFilters: action.statusFilters,
  pagination: action.pagination,
});

const loadBillListNextPage = (state, action) => {
  const allBillIds = state.entries.map(bill => bill.id);

  const entries = action.entries.filter(bill => !allBillIds.includes(bill.id));
  return ({
    ...state,
    entries: [
      ...state.entries,
      ...entries,
    ],
    pagination: {
      ...action.pagination,
    },
  });
};

const startLoadingMore = state => ({
  ...state,
  isLoadingMore: true,
});

const stopLoadingMore = state => ({
  ...state,
  isLoadingMore: false,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
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
  totalOverdue: action.totalOverdue,
  pagination: {
    ...action.pagination,
  },
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
  [LOAD_BILL_LIST_NEXT_PAGE]: loadBillListNextPage,
  [START_LOADING_MORE]: startLoadingMore,
  [STOP_LOADING_MORE]: stopLoadingMore,
};

const billListReducer = createReducer(getDefaultState(), handlers);

export default billListReducer;
