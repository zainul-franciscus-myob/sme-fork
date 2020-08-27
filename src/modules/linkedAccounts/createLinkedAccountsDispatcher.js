import {
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_LINKED_ACCOUNTS,
  SET_ALERT,
  SET_CREATED_ACCOUNT_LOADING_STATE,
  SET_IS_SUBMITTING,
  SET_LOADING_STATE,
  SET_SELECTED_TAB,
  UPDATE_ACCOUNT,
  UPDATE_HAS_ACCOUNT_OPTION,
} from './LinkedAccountsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createLinkedAccountsDispatcher = ({ store }) => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

  setSelectedTab: (selectedTab) => {
    store.dispatch({
      intent: SET_SELECTED_TAB,
      selectedTab,
    });
  },

  displayAlert: ({ message, type }) => {
    store.dispatch({
      intent: SET_ALERT,
      alert: {
        message,
        type,
      },
    });
  },

  setIsSubmitting: (isSubmitting) => {
    store.dispatch({
      intent: SET_IS_SUBMITTING,
      isSubmitting,
    });
  },

  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
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

  setCreatedAccountLoadingState: (isCreatedAccountLoading) => {
    store.dispatch({
      intent: SET_CREATED_ACCOUNT_LOADING_STATE,
      isCreatedAccountLoading,
    });
  },

  updateHasAccountOption: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_HAS_ACCOUNT_OPTION,
      key,
      value,
    });
  },

  updateAccount: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_ACCOUNT,
      key,
      value,
    });
  },

  loadLinkedAccounts: (response) => {
    store.dispatch({
      intent: LOAD_LINKED_ACCOUNTS,
      ...response,
    });
  },

  loadAccountAfterCreate: (payload) => {
    store.dispatch({
      intent: LOAD_ACCOUNT_AFTER_CREATE,
      ...payload,
    });
  },
});

export default createLinkedAccountsDispatcher;
