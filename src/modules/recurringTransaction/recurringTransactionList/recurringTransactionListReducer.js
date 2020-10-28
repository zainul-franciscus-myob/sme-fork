import {
  LOAD_RECURRING_TRANSACTION_LIST,
  RESET_FILTER_OPTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_RECURRING_TRANSACTION_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../RecurringTransactionIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import TransactionTypes from './TransationTypes';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  filterOptions: {
    type: 'All',
  },
  transactionTypeOptions: [],
  orderBy: '',
  sortOrder: '',
  entries: [],
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
  isFilteredList: false,
  businessId: '',
  region: '',
  isRecurringTransactionEnabled: '',
});

const resetState = () => getDefaultState();

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const isValidTransactionType = (type) => {
  const validNavTypes = Object.values(TransactionTypes).map((navType) =>
    navType.toLowerCase()
  );
  return validNavTypes.includes(type.toLowerCase());
};

const getValidTransactionType = (type) =>
  Object.values(TransactionTypes).find(
    (navType) => navType.toLowerCase() === type.toLowerCase()
  );

const setInitialState = (state, { context }) => ({
  ...state,
  isRecurringTransactionEnabled: context.isRecurringTransactionEnabled,
  businessId: context.businessId,
  region: context.region,
  filterOptions:
    context.type && isValidTransactionType(context.type)
      ? {
          ...state.filterOptions,
          type: getValidTransactionType(context.type),
        }
      : state.filterOptions,
});

const setSortOrder = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
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
  [SET_ALERT]: setAlert,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [LOAD_RECURRING_TRANSACTION_LIST]: loadRecurringTransactionList,
  [SORT_AND_FILTER_RECURRING_TRANSACTION_LIST]: sortAndFilterRecurringTransactionList,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [RESET_FILTER_OPTIONS]: resetFilterOptions,
  [SET_SORT_ORDER]: setSortOrder,
};

const recurringTransactionListReducer = createReducer(
  getDefaultState(),
  handlers
);

export default recurringTransactionListReducer;
