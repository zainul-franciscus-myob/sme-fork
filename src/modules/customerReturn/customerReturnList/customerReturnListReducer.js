import {
  LOAD_CUSTOMER_RETURN_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CUSTOMER_RETURN_LIST,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../CustomerReturnIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const defaultFilterOptions = {
  customerId: undefined,
  keywords: '',
};

const defaultSortingOption = {
  sortOrder: 'asc',
  orderBy: 'DateOccurred',
};

const getDefaultState = () => ({
  alert: undefined,
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  filterOptions: defaultFilterOptions,
  defaultFilterOptions,
  sortOrder: '',
  orderBy: '',
  totalAmount: '',
  totalCreditAmount: '',
  entries: [],
  customerFilterOptions: [],
  businessId: '',
  region: '',
});

const loadCustomerReturnList = (
  state,
  { customerId, customerFilters, ...rest }
) => ({
  ...state,
  ...rest,
  filterOptions: {
    ...state.filterOptions,
    customerId: state.filterOptions.customerId,
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

const sortAndFilterCustomerReturnList = (
  state,
  { entries, totalAmount, totalCreditAmount }
) => ({
  ...state,
  entries,
  totalAmount,
  totalCreditAmount,
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

const setInitalState = (
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

const resetState = () => getDefaultState();

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
