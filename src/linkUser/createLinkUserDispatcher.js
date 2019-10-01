import {
  DISMISS_ALERT,
  LOAD_BUSINESS_INFORMATION,
  SET_ALERT,
  SET_LOADING_STATE,
  UPDATE_USER_INFORMATION,
} from './LinkUserIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';

const createLinkUserDispatcher = store => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  setAlert: (message) => {
    const intent = SET_ALERT;
    store.dispatch({ intent, alertMessage: message });
  },

  dismissAlert: () => {
    const intent = DISMISS_ALERT;
    store.dispatch({ intent });
  },

  setLoadingState: (isLoading) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  loadBusinessInformation: (businessInformation) => {
    const intent = LOAD_BUSINESS_INFORMATION;
    store.dispatch({
      intent,
      businessInformation,
    });
  },

  updateUserInformation: ({ key, value }) => {
    const intent = UPDATE_USER_INFORMATION;
    store.dispatch({
      intent,
      key,
      value,
    });
  },
});

export default createLinkUserDispatcher;
