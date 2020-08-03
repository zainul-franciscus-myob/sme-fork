import {
  CLOSE_MODAL,
  LOAD_ACCOUNTS_AND_SUPER_PAYMENTS,
  OPEN_MODAL,
  RESET_FILTER_OPTIONS,
  SELECT_ALL_SUPER_PAYMENTS,
  SELECT_ITEM_SUPER_PAYMENT,
  SET_ACCESS_TOKEN,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_SUPER_PAYMENTS,
  UPDATE_BATCH_PAYMENT_ID,
  UPDATE_DETAIL_HEADER_FIELDS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_SELECTED_ACCOUNT_ID,
} from './paySuperCreateIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createPaySuperCreateDispatcher = (store) => ({
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setIsTableLoading: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },

  updateSelectedAccountId: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_SELECTED_ACCOUNT_ID,
      key,
      value,
    });
  },

  updateFilterBarOptions: ({ filterName, value }) => {
    store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      filterName,
      value,
    });
  },

  resetFilterBarOptions: () => {
    store.dispatch({
      intent: RESET_FILTER_OPTIONS,
    });
  },

  sortAndFilterPayments: (entries) => {
    store.dispatch({
      intent: SORT_AND_FILTER_SUPER_PAYMENTS,
      entries,
    });
  },

  loadAccountsAndPayments: (response) => {
    store.dispatch({
      intent: LOAD_ACCOUNTS_AND_SUPER_PAYMENTS,
      response,
    });
  },

  updateSelectedAccount: (firstAccountId) => {
    store.dispatch({
      intent: UPDATE_SELECTED_ACCOUNT_ID,
      value: firstAccountId,
    });
  },

  setSortOrder: (orderBy, newSortOrder) => {
    store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  },

  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  setAlert: (alert) => {
    store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  },

  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
      alert: null,
    });
  },

  selectAll: (isSelected) => {
    store.dispatch({
      intent: SELECT_ALL_SUPER_PAYMENTS,
      isSelected,
    });
  },

  selectItem: (item, isSelected) => {
    store.dispatch({
      intent: SELECT_ITEM_SUPER_PAYMENT,
      isSelected,
      item,
    });
  },

  updateInputField: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_DETAIL_HEADER_FIELDS,
      key,
      value,
    });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

  openModal: (modalType) => {
    store.dispatch({
      intent: OPEN_MODAL,
      modal: { type: modalType },
    });
  },

  closeModal: () => {
    store.dispatch({
      intent: CLOSE_MODAL,
    });
  },

  updateBatchPaymentId: (batchPaymentId) => {
    store.dispatch({
      intent: UPDATE_BATCH_PAYMENT_ID,
      batchPaymentId,
    });
  },

  setAccessToken: (accessToken) => {
    store.dispatch({
      intent: SET_ACCESS_TOKEN,
      accessToken,
    });
  },
});

export default createPaySuperCreateDispatcher;
