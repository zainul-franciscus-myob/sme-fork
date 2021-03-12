import {
  CLOSE_MODAL,
  LOAD_PURCHASE_SETTINGS,
  OPEN_MODAL,
  SAVE_TAB_DATA,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PENDING_TAB,
  SET_REDIRECT_URL,
  SET_TAB,
  UPDATE_EMAIL_SETTINGS_FIELD,
} from './purchaseSettingsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createPurchaseSettingsDispatcher = (store) => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({
      intent,
      context,
    });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  setLoadingState: (loadingState) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, loadingState });
  },

  loadPurchaseSettings: (payload) => {
    const intent = LOAD_PURCHASE_SETTINGS;
    store.dispatch({ intent, ...payload });
  },

  updateEmailSettingsField: ({ key, value }) => {
    const intent = UPDATE_EMAIL_SETTINGS_FIELD;
    store.dispatch({
      intent,
      key,
      value,
    });
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
      alert: {},
    });
  },
  openModal: (modalType) => {
    store.dispatch({
      intent: OPEN_MODAL,
      modalType,
    });
  },
  closeModal: () => {
    store.dispatch({
      intent: CLOSE_MODAL,
    });
  },

  setRedirectUrl: (redirectUrl) => {
    store.dispatch({
      intent: SET_REDIRECT_URL,
      redirectUrl,
    });
  },

  saveDataTab: () => {
    store.dispatch({
      intent: SAVE_TAB_DATA,
    });
  },

  setTab: (selectedTab) => {
    store.dispatch({
      intent: SET_TAB,
      selectedTab,
    });
  },

  setPendingTab: (pendingTab) => {
    store.dispatch({
      intent: SET_PENDING_TAB,
      pendingTab,
    });
  },
});

export default createPurchaseSettingsDispatcher;
