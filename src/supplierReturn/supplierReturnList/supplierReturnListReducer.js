import {
  LOAD_SUPPLIER_RETURN_LIST,
  LOAD_SUPPLIER_RETURN_LIST_NEXT_PAGE,
  SET_ALERT, SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
  START_LOADING_MORE,
  STOP_LOADING_MORE,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../SupplierReturnIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const defaultFilterOptions = {
  supplierId: 'All',
  keywords: '',
};

const defaultSortingOption = {
  orderBy: 'DateOccurred',
  sortOrder: 'asc',
};

const getDefaultState = () => ({
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
  defaultFilterOptions,
  filterOptions: defaultFilterOptions,
  appliedFilterOptions: defaultFilterOptions,
  totalAmount: '',
  totalDebitAmount: '',
  entries: [],
  supplierFilterOptions: [],
  businessId: '',
  region: '',
  isLoadingMore: false,
  pagination: {
    hasNextPage: false,
    offset: 0,
  },
  ...defaultSortingOption,
});

const setInitialState = (state, {
  context,
  settings = {
    filterOptions: defaultFilterOptions,
    sortOrder: defaultSortingOption.sortOrder,
    orderBy: defaultSortingOption.orderBy,
  },
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

const loadSupplierReturnList = (state, {
  intent, supplierFilters, ...rest
}) => {
  const supplierFilterOptions = supplierFilters.map(filter => ({
    displayName: filter.name,
    id: filter.value,
  }));

  return ({
    ...state,
    ...rest,
    supplierFilterOptions,
  });
};

const updateFilterBarOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.key]: action.value,
  },
});

const sortAndFilterSupplierReturnList = (state,
  {
    intent, isSort, ...rest
  }) => ({
  ...state,
  ...rest,
  appliedFilterOptions: isSort ? state.appliedFilterOptions : state.filterOptions,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setSortOrder = (state, action) => ({
  ...state,
  orderBy: action.orderBy,
  sortOrder: action.sortOrder,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const loadSupplierReturnListNextPage = (state, action) => {
  const allSupplierReturnIds = state.entries.map(entry => entry.id);

  const entries = action.entries.filter(entry => !allSupplierReturnIds.includes(entry.id));
  return ({
    ...state,
    entries: [
      ...state.entries,
      ...entries,
    ],
    pagination: {
      ...action.pagination,
    },
    totalAmount: action.totalAmount,
    totalDebitAmount: action.totalDebitAmount,
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

const resetState = () => (getDefaultState());

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [LOAD_SUPPLIER_RETURN_LIST]: loadSupplierReturnList,
  [UPDATE_FILTER_BAR_OPTIONS]: updateFilterBarOptions,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SORT_AND_FILTER_SUPPLIER_RETURN_LIST]: sortAndFilterSupplierReturnList,
  [SET_ALERT]: setAlert,
  [SET_SORT_ORDER]: setSortOrder,
  [LOAD_SUPPLIER_RETURN_LIST_NEXT_PAGE]: loadSupplierReturnListNextPage,
  [START_LOADING_MORE]: startLoadingMore,
  [STOP_LOADING_MORE]: stopLoadingMore,
};

const supplierReturnListReducer = createReducer(getDefaultState(), handlers);

export default supplierReturnListReducer;
