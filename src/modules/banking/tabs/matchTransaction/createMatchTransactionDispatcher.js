import {
  ADD_MATCH_TRANSACTION_ADJUSTMENT,
  EXPAND_ADJUSTMENT_SECTION,
  LOAD_MATCH_TRANSACTIONS,
  REMOVE_MATCH_TRANSACTION_ADJUSTMENT,
  RESET_MATCH_TRANSACTION_OPTIONS,
  SAVE_MATCH_TRANSACTION,
  SET_MATCH_TRANSACTION_LOADING_STATE,
  SET_MATCH_TRANSACTION_SORT_ORDER,
  SHOW_SELECTED_MATCH_TRANSACTIONS,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
  TOGGLE_MATCH_TRANSACTION_SELECT_ALL_STATE,
  UPDATE_MATCH_TRANSACTION_ADJUSTMENT,
  UPDATE_MATCH_TRANSACTION_OPTIONS,
  UPDATE_MATCH_TRANSACTION_SELECTION,
  UPDATE_SELECTED_TRANSACTION_DETAILS,
} from '../../BankingIntents';

const createMatchTransactionDispatcher = (store) => ({
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

  sortAndFilterMatchTransactions: (index, payload) => {
    store.dispatch({
      intent: SORT_AND_FILTER_MATCH_TRANSACTIONS,
      index,
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

  toggleSelectAllState: (selected) => {
    store.dispatch({
      intent: TOGGLE_MATCH_TRANSACTION_SELECT_ALL_STATE,
      selected,
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

  saveMatchTransaction: (index, payload) => {
    store.dispatch({
      intent: SAVE_MATCH_TRANSACTION,
      index,
      ...payload,
    });
  },

  showSelectedMatchTransactions: () => {
    store.dispatch({
      intent: SHOW_SELECTED_MATCH_TRANSACTIONS,
    });
  },

  loadMatchTransaction: (index, filterOptions, payload, totalAmount) => {
    store.dispatch({
      intent: LOAD_MATCH_TRANSACTIONS,
      index,
      totalAmount,
      ...filterOptions,
      ...payload,
    });
  },
});

export default createMatchTransactionDispatcher;
