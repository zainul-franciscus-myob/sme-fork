import {
  LOAD_PAYDAY_USER_SESSION,
  SET_ALERT,
  SET_IS_BUSINESS_ONBOARDED,
  SET_LOADING_STATE,
  SET_TAB,
} from './PaydayFilingIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';

const createPaydayFilingDispatcher = (store) => ({
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

  clearAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
      alert: null,
    });
  },

  setTab: (tab) => {
    store.dispatch({
      intent: SET_TAB,
      tab,
    });
  },

  loadUserSession: (response) => {
    store.dispatch({
      intent: LOAD_PAYDAY_USER_SESSION,
      userSession: response,
    });
  },

  setIsBusinessOnboarded: (isBusinessOnboarded) => {
    store.dispatch({
      intent: SET_IS_BUSINESS_ONBOARDED,
      isBusinessOnboarded,
    });
  },
});

export default createPaydayFilingDispatcher;
