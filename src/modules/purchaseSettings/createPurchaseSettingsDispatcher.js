import {
  LOAD_PURCHASE_SETTINGS,
  SET_ALERT,
  SET_LOADING_STATE,
  UPDATE_DEFAULT_REMITTANCE_ADVICE_EMAIL_FIELD,
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

  updateDefaultRemittanceAdviceEmailField: ({ key, value }) => {
    const intent = UPDATE_DEFAULT_REMITTANCE_ADVICE_EMAIL_FIELD;
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
});

export default createPurchaseSettingsDispatcher;
