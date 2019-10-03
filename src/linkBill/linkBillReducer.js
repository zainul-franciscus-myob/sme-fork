import {
  LOAD_LINK_BILL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BILL_LIST,
  UPDATE_BILL_SELECTION,
  UPDATE_FILTER_OPTIONS,
} from './LinkBillIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import createReducer from '../store/createReducer';

const getDefaultState = () => ({
  document: {},
  matchedSupplierId: 'All',
  supplierFilterOptions: [],
  bills: [],
  sortOrder: '',
  orderBy: '',
  filterOptions: {
    supplierId: '',
    showPaidBills: false,
  },
  appliedFilterOptions: {
    supplierId: '',
    showPaidBills: false,
  },
  alert: undefined,
  isLoading: false,
  isTableLoading: false,
  isSubmitting: false,
  region: '',
  businessId: '',
  documentId: '',
});

const loadLinkBill = (state, action) => ({
  ...state,
  document: action.document,
  matchedSupplierId: action.matchedSupplierId,
  supplierFilterOptions: action.supplierFilterOptions,
  filterOptions: {
    ...state.filterOptions,
    supplierId: action.matchedSupplierId,
  },
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
  bills: action.bills.map(bill => ({
    ...bill,
    isSelected: false,
  })),
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.key]: action.value,
  },
});

const updateBillSelection = (state, action) => ({
  ...state,
  bills: state.bills.map(bill => ({
    ...bill,
    isSelected: bill.id === action.id ? action.value : false,
  })),
});

const setSortOrder = (state, action) => ({
  ...state,
  orderBy: action.orderBy,
  sortOrder: action.sortOrder,
});

const sortAndFilterBillList = (state, action) => ({
  ...state,
  bills: action.bills,
  appliedFilterOptions: action.isSort ? state.appliedFilterOptions : state.filterOptions,
});

const resetState = () => getDefaultState();

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [LOAD_LINK_BILL]: loadLinkBill,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [UPDATE_BILL_SELECTION]: updateBillSelection,
  [SET_SORT_ORDER]: setSortOrder,
  [SORT_AND_FILTER_BILL_LIST]: sortAndFilterBillList,
};

const linkBillReducer = createReducer(getDefaultState(), handlers);

export default linkBillReducer;
