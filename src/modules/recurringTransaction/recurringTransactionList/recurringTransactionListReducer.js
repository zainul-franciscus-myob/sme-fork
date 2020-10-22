import {
  LOAD_RECURRING_TRANSACTION_LIST,
  RESET_FILTER_OPTIONS,
  SET_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_RECURRING_TRANSACTION_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../RecurringTransactionIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  filterOptions: {
    type: '',
  },
  transactionTypeOptions: [],
  orderBy: '',
  sortOrder: '',
  entries: [],
  isLoading: true,
  isTableLoading: false,
  isFilteredList: false,
  businessId: '',
  region: '',
  isRecurringTransactionEnabled: '',
});

const resetState = () => getDefaultState();

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const loadRecurringTransactionList = (state, action) => ({
  ...state,
  entries: action.entries,
  transactionTypeOptions: action.transactionTypeOptions,
  filterOptions: action.filterOptions,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const sortAndFilterRecurringTransactionList = (state, action) => ({
  ...state,
  entries: action.entries,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const updateFilterOptions = (state, action) => ({
  ...state,
  isFilteredList: true,
  filterOptions: {
    ...state.filterOptions,
    [action.key]: action.value,
  },
});

const resetFilterOptions = (state) => ({
  ...state,
  isFilteredList: false,
  filterOptions: getDefaultState().filterOptions,
});

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [LOAD_RECURRING_TRANSACTION_LIST]: loadRecurringTransactionList,
  [SORT_AND_FILTER_RECURRING_TRANSACTION_LIST]: sortAndFilterRecurringTransactionList,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [RESET_FILTER_OPTIONS]: resetFilterOptions,
};

const recurringTransactionListReducer = createReducer(
  getDefaultState(),
  handlers
);

export default recurringTransactionListReducer;
