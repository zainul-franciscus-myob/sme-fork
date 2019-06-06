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

const getDefaultState = () => ({
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
  filterOptions: {
    customerId: '',
    keywords: '',
  },
  sortOrder: '',
  orderBy: '',
  totalAmount: '',
  totalCreditAmount: '',
  entries: [],
  customerFilterOptions: [],
  businessId: '',
  region: '',
});

const loadCustomerReturnList = (state, { customerId, customerFilters, ...rest }) => ({
  ...state,
  ...rest,
  filterOptions: {
    ...state.filterOptions,
    customerId,
  },
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
    entries, totalAmount, totalCreditAmount,
  }) => ({
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

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setInitalState = (state, action) => ({
  ...state,
  ...action.context,
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
