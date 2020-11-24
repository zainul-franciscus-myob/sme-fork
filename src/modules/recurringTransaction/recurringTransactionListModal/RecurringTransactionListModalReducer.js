import {
  LOAD_RECURRING_TRANSACTION_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_RECURRING_TRANSACTION_ID,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_RECURRING_TRANSACTION_LIST,
} from './RecurringTransactionListModalIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import RecurringTransactionListModalTransactionType from './types/RecurringTransactionListModalTransactionType';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  recurringTransactionId: '',
  filterOptions: {
    type: 'All',
  },
  entries: [],
  orderBy: '',
  sortOrder: '',
  isOpen: false,
  isLoading: true,
  isTableLoading: false,
});

const setInitialState = (state, { context }) => {
  const defaultState = getDefaultState();

  return {
    ...defaultState,
    businessId: context.businessId,
    isOpen: true,
    filterOptions: {
      ...defaultState.filterOptions,
      type: context.transactionType || defaultState.filterOptions.type,
    },
    showTransactionType:
      !context.transactionType ||
      context.transactionType ===
        RecurringTransactionListModalTransactionType.ALL,
  };
};

const resetState = () => getDefaultState();

const loadRecurringTransactionList = (state, action) => ({
  ...state,
  entries: action.entries,
  filterOptions: action.filterOptions,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const sortRecurringTransactionList = (state, action) => {
  const defaultState = getDefaultState();

  return {
    ...state,
    entries: action.entries,
    recurringTransactionId: defaultState.recurringTransactionId,
  };
};

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setSortOrder = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

const setRecurringTransactionId = (state, action) => ({
  ...state,
  recurringTransactionId: action.id,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [LOAD_RECURRING_TRANSACTION_LIST]: loadRecurringTransactionList,
  [SORT_RECURRING_TRANSACTION_LIST]: sortRecurringTransactionList,
  [SET_ALERT]: setAlert,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_RECURRING_TRANSACTION_ID]: setRecurringTransactionId,
};

export default createReducer(getDefaultState(), handlers);
