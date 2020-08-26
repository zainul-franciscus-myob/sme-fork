import {
  CLOSE_MODAL,
  DISMISS_ALERT,
  DISMISS_ALL_ALERTS,
  OPEN_MODAL,
  RESELECT_ACCOUNTS,
  RESET_ACCOUNT_LIST_FILTER_OPTIONS,
  SELECT_ACCOUNT,
  SELECT_ALL_ACCOUNTS,
  SET_ACCOUNT_LIST_FILTER_OPTIONS,
  SET_ACCOUNT_LIST_TAB,
  SET_ACCOUNT_LIST_TABLE_LOADING_STATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SORT_AND_FILTER_ACCOUNT_LIST,
} from '../AccountIntents';

const createAccountListDispatcher = (store) => ({
  setLoadingState: (loadingState) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, loadingState });
  },

  setAlert: ({ message, type }) => {
    const intent = SET_ALERT;
    store.dispatch({
      intent,
      alert: { message, type },
    });
  },

  dismissAlert: (id) => {
    const intent = DISMISS_ALERT;
    store.dispatch({ intent, id });
  },

  dismissAllAlerts: () => {
    const intent = DISMISS_ALL_ALERTS;
    store.dispatch({ intent });
  },

  filterAccountList: (response) => {
    const intent = SORT_AND_FILTER_ACCOUNT_LIST;
    store.dispatch({
      intent,
      ...response,
      isSort: false,
    });
  },

  setAccountListFilterOptions: ({ key, value }) => {
    const intent = SET_ACCOUNT_LIST_FILTER_OPTIONS;
    store.dispatch({
      intent,
      key,
      value,
    });
  },

  resetAccountListFilterOptions: () => {
    const intent = RESET_ACCOUNT_LIST_FILTER_OPTIONS;
    store.dispatch({ intent });
  },

  setAccountListTab: (tabId) => {
    const intent = SET_ACCOUNT_LIST_TAB;
    store.dispatch({ intent, tabId });
  },

  setAccountListTableLoadingState: (isTableLoading) => {
    const intent = SET_ACCOUNT_LIST_TABLE_LOADING_STATE;
    store.dispatch({ intent, isTableLoading });
  },

  selectAccount: ({ index, value }) => {
    const intent = SELECT_ACCOUNT;
    store.dispatch({ intent, index, value });
  },

  selectAllAccounts: (selected) => {
    const intent = SELECT_ALL_ACCOUNTS;
    store.dispatch({ intent, selected });
  },

  openBulkDeleteModel: () => {
    const intent = OPEN_MODAL;
    store.dispatch({ intent });
  },

  closeModal: () => {
    const intent = CLOSE_MODAL;
    store.dispatch({ intent });
  },

  reselectAccountsNotDeleted: (entries) => {
    const intent = RESELECT_ACCOUNTS;
    store.dispatch({ intent, entries });
  },
});

export default createAccountListDispatcher;
