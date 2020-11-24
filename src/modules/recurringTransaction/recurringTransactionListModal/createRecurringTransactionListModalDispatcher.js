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
import {
  getFlipSortOrder,
  getOrderBy,
} from '../recurringTransactionList/recurringTransactionListSelectors';

const createRecurringTransactionListModalDispatcher = (store) => ({
  setInitialState: (context) => {
    store.dispatch({ intent: SET_INITIAL_STATE, context });
  },
  resetState: () => {
    store.dispatch({ intent: RESET_STATE });
  },
  loadRecurringTransactionList: (response) => {
    store.dispatch({ intent: LOAD_RECURRING_TRANSACTION_LIST, ...response });
  },
  sortRecurringTransactionList: (response) => {
    store.dispatch({ intent: SORT_RECURRING_TRANSACTION_LIST, ...response });
  },
  setAlert: (alert) => {
    store.dispatch({ intent: SET_ALERT, alert });
  },
  dismissAlert: () => {
    store.dispatch({ intent: SET_ALERT, alert: undefined });
  },
  setLoadingState: (isLoading) => {
    store.dispatch({ intent: SET_LOADING_STATE, isLoading });
  },
  setTableLoadingState: (isTableLoading) => {
    store.dispatch({ intent: SET_TABLE_LOADING_STATE, isTableLoading });
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
  setRecurringTransactionId: (id) => {
    store.dispatch({ intent: SET_RECURRING_TRANSACTION_ID, id });
  },
});

export default createRecurringTransactionListModalDispatcher;
