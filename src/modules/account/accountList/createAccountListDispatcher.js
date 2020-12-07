import {
  CLOSE_MODAL,
  DISMISS_ALERT,
  DISMISS_ALL_ALERTS,
  LOAD_ACCOUNT_LIST,
  OPEN_MODAL,
  RESELECT_ACCOUNTS,
  RESET_ACCOUNT_LIST_FILTER_OPTIONS,
  SELECT_ACCOUNTS,
  SELECT_ALL_ACCOUNTS,
  SET_ACCOUNT_DETAILS,
  SET_ACCOUNT_LIST_FILTER_OPTIONS,
  SET_ACCOUNT_LIST_TAB,
  SET_ACCOUNT_LIST_TABLE_LOADING_STATE,
  SET_ALERT,
  SET_EDIT_MODE,
  SET_HOVERED_ROW,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  SET_MOVE_TO_DISABLED,
  SET_REDIRECT_URL,
  SET_REMAINING_HISTORICAL_BALANCE,
  SET_SELECTED_TAX_CODE,
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

  loadAccountList: (response) => {
    const intent = LOAD_ACCOUNT_LIST;
    store.dispatch({
      intent,
      ...response,
      isSort: false,
    });
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

  selectAccounts: (updatedAccountsMap) => {
    const intent = SELECT_ACCOUNTS;
    store.dispatch({ intent, updatedAccountsMap });
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

  setEditMode: (editingMode) => {
    const intent = SET_EDIT_MODE;
    store.dispatch({ intent, editingMode });
  },

  setAccountDetails: ({ index, key, value }) => {
    const intent = SET_ACCOUNT_DETAILS;
    store.dispatch({ intent, index, key, value });
  },

  setModalType: (modalType) => {
    const intent = SET_MODAL_TYPE;
    store.dispatch({ intent, modalType });
  },

  setRedirectUrl: (redirectUrl) => {
    const intent = SET_REDIRECT_URL;
    store.dispatch({ intent, redirectUrl });
  },

  setRemainingHistoricalBalance: (remainingHistoricalBalance) => {
    const intent = SET_REMAINING_HISTORICAL_BALANCE;
    store.dispatch({ intent, remainingHistoricalBalance });
  },

  setHoveredRow: (index) => {
    const intent = SET_HOVERED_ROW;
    store.dispatch({ intent, index });
  },

  setSelectedTaxCode: (taxCode) => {
    const intent = SET_SELECTED_TAX_CODE;
    store.dispatch({ intent, taxCode });
  },

  setMoveToDisabled: (disabled) => {
    const intent = SET_MOVE_TO_DISABLED;
    store.dispatch({ intent, disabled });
  },
});

export default createAccountListDispatcher;
