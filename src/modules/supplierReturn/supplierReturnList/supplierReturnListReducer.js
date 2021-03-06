import {
  LOAD_SUPPLIER_RETURN_LIST,
  RESET_FILTER_BAR_OPTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../SupplierReturnIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const defaultFilterOptions = {
  supplierId: undefined,
  keywords: '',
};

const defaultSortingOption = {
  orderBy: 'DateOccurred',
  sortOrder: 'asc',
};

const getDefaultState = () => ({
  alert: undefined,
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  defaultFilterOptions,
  filterOptions: defaultFilterOptions,
  totalAmount: '',
  totalDebitAmount: '',
  entries: [],
  supplierFilterOptions: [],
  businessId: '',
  region: '',
  isLoadingMore: false,
  ...defaultSortingOption,
});

const setInitialState = (
  state,
  {
    context,
    settings = {
      filterOptions: defaultFilterOptions,
      sortOrder: defaultSortingOption.sortOrder,
      orderBy: defaultSortingOption.orderBy,
    },
  }
) => ({
  ...state,
  ...context,
  filterOptions: {
    ...state.filterOptions,
    ...settings.filterOptions,
  },
  sortOrder: settings.sortOrder,
  orderBy: settings.orderBy,
});

const loadSupplierReturnList = (
  state,
  { intent, supplierFilters, ...rest }
) => {
  const supplierFilterOptions = supplierFilters.map((filter) => ({
    displayName: filter.name,
    id: filter.value,
  }));

  return {
    ...state,
    ...rest,
    supplierFilterOptions,
  };
};

const updateFilterBarOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.key]: action.value,
  },
});

const resetFilterBarOptions = (state) => ({
  ...state,
  filterOptions: defaultFilterOptions,
});

const sortAndFilterSupplierReturnList = (
  state,
  { intent, isSort, ...rest }
) => ({
  ...state,
  ...rest,
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

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const resetState = () => getDefaultState();

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [LOAD_SUPPLIER_RETURN_LIST]: loadSupplierReturnList,
  [UPDATE_FILTER_BAR_OPTIONS]: updateFilterBarOptions,
  [RESET_FILTER_BAR_OPTIONS]: resetFilterBarOptions,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SORT_AND_FILTER_SUPPLIER_RETURN_LIST]: sortAndFilterSupplierReturnList,
  [SET_ALERT]: setAlert,
  [SET_SORT_ORDER]: setSortOrder,
};

const supplierReturnListReducer = createReducer(getDefaultState(), handlers);

export default supplierReturnListReducer;
