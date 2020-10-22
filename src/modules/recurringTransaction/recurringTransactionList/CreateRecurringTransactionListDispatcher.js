import {
  LOAD_RECURRING_TRANSACTION_LIST,
  RESET_FILTER_OPTIONS,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_RECURRING_TRANSACTION_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../RecurringTransactionIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  getFlipSortOrder,
  getOrderBy,
} from './recurringTransactionListSelectors';

const CreateRecurringTransactionListDispatcher = (store) => ({
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  setLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },
  setTableLoadingState: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },
  loadRecurringTransactionList: (response) => {
    store.dispatch({
      intent: LOAD_RECURRING_TRANSACTION_LIST,
      ...response,
    });
  },
  setSortOrder: (orderBy) => {
    const state = store.getState();
    const newSortOrder =
      orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';
    store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  },
  filterRecurringTransactionList: (response) => {
    store.dispatch({
      intent: SORT_AND_FILTER_RECURRING_TRANSACTION_LIST,
      ...response,
    });
  },
  updateFilterOptions: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      key,
      value,
    });
  },
  resetFilterOptions: () => {
    store.dispatch({
      intent: RESET_FILTER_OPTIONS,
    });
  },
});

export default CreateRecurringTransactionListDispatcher;
