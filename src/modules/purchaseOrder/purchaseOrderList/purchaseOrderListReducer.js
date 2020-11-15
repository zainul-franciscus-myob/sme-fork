import { addMonths } from 'date-fns';

import {
  LOAD_PURCHASE_ORDER_LIST,
  LOAD_PURCHASE_ORDER_LIST_FAIL,
  LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE,
  LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE_FAIL,
  RESET_FILTER_OPTIONS,
  SET_ALERT,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_PURCHASE_ORDER_LIST,
  SORT_AND_FILTER_PURCHASE_ORDER_LIST_FAIL,
  START_LOADING_MORE,
  UPDATE_FILTER_OPTIONS,
  UPDATE_SORT_ORDER,
} from '../PurchaseOrderIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultDateRange = () => addMonths(new Date(), -3);

const defaultFilterOptions = {
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
  sortOrder: 'desc',
  orderBy: 'DateOccurred',
  total: '',
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

const resetState = () => getDefaultState();

const shouldSetInitialStateWithQueryParams = (context) => {
  const {
    dateFrom,
    dateTo,
    keywords,
    supplierId,
    orderBy,
    sortOrder,
  } = context;

  return dateFrom || dateTo || keywords || supplierId || orderBy || sortOrder;
};

const setInitialStateWithQueryParams = (context, initialState) => {
  const {
    dateFrom,
    dateTo,
    keywords,
    supplierId,
    orderBy,
    sortOrder,
  } = context;

  const updatedFilterOptions = {
    dateFrom: dateFrom || initialState.defaultFilterOptions.dateFrom,
    dateTo: dateTo || initialState.defaultFilterOptions.dateTo,
    keywords: keywords || initialState.defaultFilterOptions.keywords,
    supplierId: supplierId || initialState.defaultFilterOptions.supplierId,
  };

  return {
    ...initialState,
    ...context,
    filterOptions: {
      ...initialState.filterOptions,
      ...updatedFilterOptions,
    },
    orderBy: orderBy || initialState.orderBy,
    sortOrder: sortOrder || initialState.sortOrder,
  };
};

const shouldSetInitialStateWithSettings = (settings, initialState) =>
  settings.settingsVersion === initialState.settingsVersion;

const setInitialStateWithSettings = (context, settings, initialState) => ({
  ...initialState,
  ...context,
  filterOptions: settings.filterOptions,
  sortOrder: settings.sortOrder,
  orderBy: settings.orderBy,
});

const setInitialState = (_, { context, settings = {} }) => {
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

const loadPurchaseOrderListNextPage = (state, action) => {
  const allPurchaseOrderIds = state.entries.map(
    (purchaseOrder) => purchaseOrder.id
  );

  const entries = action.entries.filter(
    (purchaseOrder) => !allPurchaseOrderIds.includes(purchaseOrder.id)
  );
  return {
    ...state,
    isLoadingMore: false,
    entries: [...state.entries, ...entries],
    pagination: {
      ...action.pagination,
    },
  };
};

const loadPurchaseOrderListNextPageFail = (state, action) => {
  return {
    ...state,
    isLoadingMore: false,
    alert: { message: action.message, type: 'danger' },
  };
};

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
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

const startLoadingMore = (state) => ({
  ...state,
  isLoadingMore: true,
});

const sortAndFilterPurchaseOrderList = (state, action) => ({
  ...state,
  isTableLoading: false,
  entries: action.entries,
  total: action.total,
  pagination: {
    ...action.pagination,
  },
});

const sortAndFilterPurchaseOrderListFail = (state, action) => ({
  ...state,
  isTableLoading: false,
  alert: { message: action.message, type: 'danger' },
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const updateSortOrder = (state, action) => {
  const { orderBy, sortOrder } = state;
  const { orderBy: newOrderBy } = action;
  const flipSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
  const newSortOrder = newOrderBy === orderBy ? flipSortOrder : 'asc';

  return { ...state, sortOrder: newSortOrder, orderBy: newOrderBy };
};

const loadPurchaseOrderList = (state, action) => {
  return {
    ...state,
    loadingState: LoadingState.LOADING_SUCCESS,
    entries: action.entries,
    total: action.total,
    supplierFilters: action.supplierFilters,
    pagination: action.pagination,
  };
};

const loadPurchaseOrderListFail = (state) => {
  return {
    ...state,
    loadingState: LoadingState.LOADING_FAIL,
  };
};

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_PURCHASE_ORDER_LIST]: loadPurchaseOrderList,
  [LOAD_PURCHASE_ORDER_LIST_FAIL]: loadPurchaseOrderListFail,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [RESET_FILTER_OPTIONS]: resetFilterOptions,
  [SORT_AND_FILTER_PURCHASE_ORDER_LIST]: sortAndFilterPurchaseOrderList,
  [SORT_AND_FILTER_PURCHASE_ORDER_LIST_FAIL]: sortAndFilterPurchaseOrderListFail,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_ALERT]: setAlert,
  [LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE]: loadPurchaseOrderListNextPage,
  [LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE_FAIL]: loadPurchaseOrderListNextPageFail,
  [START_LOADING_MORE]: startLoadingMore,
  [UPDATE_SORT_ORDER]: updateSortOrder,
};

const purchaseOrderListReducer = createReducer(getDefaultState(), handlers);

export default purchaseOrderListReducer;
