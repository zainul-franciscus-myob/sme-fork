import {
  SET_ACCOUNT_LIST_FILTER_OPTIONS,
  SET_ACCOUNT_LIST_TAB,
  SET_ACCOUNT_LIST_TABLE_LOADING_STATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SORT_AND_FILTER_ACCOUNT_LIST,
} from '../AccountIntents';

const createAccountListDispatcher = store => ({
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

  dismissAlert: () => {
    const intent = SET_ALERT;
    store.dispatch({
      intent,
      alert: undefined,
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

  setAccountListTab: (tabId) => {
    const intent = SET_ACCOUNT_LIST_TAB;
    store.dispatch({ intent, tabId });
  },

  setAccountListTableLoadingState: (isTableLoading) => {
    const intent = SET_ACCOUNT_LIST_TABLE_LOADING_STATE;
    store.dispatch({ intent, isTableLoading });
  },
});

export default createAccountListDispatcher;
