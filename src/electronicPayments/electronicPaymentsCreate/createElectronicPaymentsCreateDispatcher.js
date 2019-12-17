import {
  CLOSE_MODAL,
  LOAD_ACCOUNTS_AND_TRANSACTIONS,
  OPEN_MODAL,
  SELECT_ALL_TRANSACTIONS,
  SELECT_ITEM_TRANSACTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_TRANSACTIONS,
  UPDATE_APPLIED_FILTER_OPTIONS,
  UPDATE_BANK_FILE_DETAILS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_SELECTED_ACCOUNT_ID,
} from './ElectronicPaymentsCreateIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createElectronicPaymentsCreateDispatcher = store => ({
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

  setAlert: (alert) => {
    store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  },

  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
      alert: undefined,
    });
  },

  setIsLoading: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },

  setIsTableLoading: (isTableLoading) => {
    store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  },

  selectAll: (isSelected) => {
    store.dispatch({
      intent: SELECT_ALL_TRANSACTIONS,
      isSelected,
    });
  },

  selectItem: (item, isSelected) => {
    store.dispatch({
      intent: SELECT_ITEM_TRANSACTIONS,
      isSelected,
      item,
    });
  },

  updateInputField: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_BANK_FILE_DETAILS,
      key,
      value,
    });
  },

  updateFilterBarOptions: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      key,
      value,
    });
  },

  updateSelectedAccountId: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_SELECTED_ACCOUNT_ID,
      key,
      value,
    });
  },

  updateAppliedFilterOptions: (filterOptions) => {
    store.dispatch({
      intent: UPDATE_APPLIED_FILTER_OPTIONS,
      filterOptions,
    });
  },

  setSortOrder: (orderBy, newSortOrder) => {
    store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  },

  closeModal: () => {
    store.dispatch({
      intent: CLOSE_MODAL,
    });
  },

  openModal: (modalType) => {
    store.dispatch({
      intent: OPEN_MODAL,
      modal: { type: modalType },
    });
  },

  setAccountsAndTransaction: (response) => {
    store.dispatch({
      intent: LOAD_ACCOUNTS_AND_TRANSACTIONS,
      response,
    });
  },

  setTransactions: (response) => {
    store.dispatch({
      intent: SORT_AND_FILTER_TRANSACTIONS,
      response,
    });
  },
});

export default createElectronicPaymentsCreateDispatcher;
