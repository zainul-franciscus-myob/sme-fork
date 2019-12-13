import {
  LOAD_CUSTOMER_RETURN_LIST,
  SET_ALERT,
  SET_LOADING_STATE, SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CUSTOMER_RETURN_LIST,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../CustomerReturnIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const defaultFilterOptions = {
  customerId: 'All',
  keywords: '',
};

const defaultSortingOption = {
  sortOrder: 'asc',
  orderBy: 'name',
};

const getDefaultState = () => ({
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
  filterOptions: defaultFilterOptions,
  defaultFilterOptions,
  appliedFilterOptions: defaultFilterOptions,
  sortOrder: '',
  orderBy: '',
  totalAmount: '',
  totalCreditAmount: '',
  entries: [],
  customerFilterOptions: [],
  businessId: '',
  region: '',
});

const loadCustomerReturnList = (state, {
  customerId, customerFilters, ...rest
}) => ({
  ...state,
  ...rest,
  filterOptions: {
    ...state.filterOptions,
    customerId: state.filterOptions.customerId || customerFilters[0].value,
  },
  appliedFilterOptions: {
    ...state.appliedFilterOptions,
    customerId: state.appliedFilterOptions.customerId || customerFilters[0].value,
  },
  sortOrder: state.sortOrder || defaultSortingOption.sortOrder,
  orderBy: state.orderBy || defaultSortingOption.orderBy,
  customerFilterOptions: customerFilters,
});

const updateFilterBarOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.key]: action.value,
  },
});

const sortAndFilterCustomerReturnList = (state,
  {
    entries, totalAmount, totalCreditAmount, isSort,
  }) => ({
  ...state,
  entries,
  totalAmount,
  totalCreditAmount,
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

const setInitalState = (state, {
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

const resetState = () => (getDefaultState());

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitalState,
  [RESET_STATE]: resetState,
  [LOAD_CUSTOMER_RETURN_LIST]: loadCustomerReturnList,
  [UPDATE_FILTER_BAR_OPTIONS]: updateFilterBarOptions,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SORT_AND_FILTER_CUSTOMER_RETURN_LIST]: sortAndFilterCustomerReturnList,
  [SET_ALERT]: setAlert,
  [SET_SORT_ORDER]: setSortOrder,
};

const customerReturnListReducer = createReducer(getDefaultState(), handlers);

export default customerReturnListReducer;
