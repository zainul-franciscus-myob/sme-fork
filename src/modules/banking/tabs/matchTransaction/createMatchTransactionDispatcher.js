import {
  ADD_MATCH_TRANSACTION_ADJUSTMENT,
  EXPAND_ADJUSTMENT_SECTION,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_JOB_AFTER_CREATE,
  LOAD_MATCH_TRANSACTIONS,
  REMOVE_MATCH_TRANSACTION_ADJUSTMENT,
  RESET_MATCH_TRANSACTION_OPTIONS,
  RESET_MATCH_TRANSACTION_STATE,
  SET_JOB_LOADING_STATE,
  SET_LOADING_SINGLE_ACCOUNT_STATE,
  SET_MATCH_TRANSACTION_INITIAL_STATE,
  SET_MATCH_TRANSACTION_LOADING_STATE,
  SET_MATCH_TRANSACTION_SORT_ORDER,
  SHOW_SELECTED_MATCH_TRANSACTIONS,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
  TOGGLE_MATCH_TRANSACTION_SELECT_ALL_STATE,
  UPDATE_MATCH_TRANSACTION_ADJUSTMENT,
  UPDATE_MATCH_TRANSACTION_OPTIONS,
  UPDATE_MATCH_TRANSACTION_SELECTION,
  UPDATE_SELECTED_TRANSACTION_DETAILS,
} from './MatchTransactionIntents';

const createMatchTransactionDispatcher = (store) => ({
  setInitialMatchTransactionState: (context) => {
    store.dispatch({
      intent: SET_MATCH_TRANSACTION_INITIAL_STATE,
      context,
    });
  },

  resetMatchTransactionState: () => {
    store.dispatch({
      intent: RESET_MATCH_TRANSACTION_STATE,
    });
  },

  updateMatchTransactionOptions: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_MATCH_TRANSACTION_OPTIONS,
      key,
      value,
    });
  },

  resetMatchTransactionOptions: () => {
    store.dispatch({
      intent: RESET_MATCH_TRANSACTION_OPTIONS,
    });
  },

  updateMatchTransactionSortOrder: (orderBy, sortOrder) => {
    store.dispatch({
      intent: SET_MATCH_TRANSACTION_SORT_ORDER,
      orderBy,
      sortOrder,
    });
  },

  sortAndFilterMatchTransactions: (payload) => {
    store.dispatch({
      intent: SORT_AND_FILTER_MATCH_TRANSACTIONS,
      ...payload,
    });
  },

  setMatchTransactionLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_MATCH_TRANSACTION_LOADING_STATE,
      isLoading,
    });
  },

  updateMatchTransactionSelection: ({ index, selected }) => {
    store.dispatch({
      intent: UPDATE_MATCH_TRANSACTION_SELECTION,
      index,
      selected,
    });
  },

  updateSelectedTransactionDetails: ({ index, key, value }) => {
    store.dispatch({
      intent: UPDATE_SELECTED_TRANSACTION_DETAILS,
      index,
      key,
      value,
    });
  },

  toggleSelectAllState: ({ value }) => {
    store.dispatch({
      intent: TOGGLE_MATCH_TRANSACTION_SELECT_ALL_STATE,
      selected: value,
    });
  },

  addMatchTransactionAdjustment: ({ id, key, value }) => {
    store.dispatch({
      intent: ADD_MATCH_TRANSACTION_ADJUSTMENT,
      id,
      key,
      value,
    });
  },

  updateMatchTransactionAdjustment: (index, { key, value }) => {
    store.dispatch({
      intent: UPDATE_MATCH_TRANSACTION_ADJUSTMENT,
      index,
      key,
      value,
    });
  },

  removeMatchTransactionAdjustment: (index) => {
    store.dispatch({
      intent: REMOVE_MATCH_TRANSACTION_ADJUSTMENT,
      index,
    });
  },

  expandAdjustmentSection: () => {
    store.dispatch({
      intent: EXPAND_ADJUSTMENT_SECTION,
    });
  },

  showSelectedMatchTransactions: () => {
    store.dispatch({
      intent: SHOW_SELECTED_MATCH_TRANSACTIONS,
    });
  },

  loadMatchTransactions: (payload) => {
    store.dispatch({
      intent: LOAD_MATCH_TRANSACTIONS,
      ...payload,
    });
  },

  loadAccountAfterCreate: (account) => {
    store.dispatch({
      intent: LOAD_ACCOUNT_AFTER_CREATE,
      account,
    });
  },

  setLoadingSingleAccountState: (isLoadingAccount) => {
    store.dispatch({
      intent: SET_LOADING_SINGLE_ACCOUNT_STATE,
      isLoadingAccount,
    });
  },

  loadJobAfterCreate: (jobId, payload) =>
    store.dispatch({
      intent: LOAD_JOB_AFTER_CREATE,
      jobId,
      ...payload,
    }),

  setJobLoadingState: (isJobLoading) =>
    store.dispatch({
      intent: SET_JOB_LOADING_STATE,
      isJobLoading,
    }),
});

export default createMatchTransactionDispatcher;
