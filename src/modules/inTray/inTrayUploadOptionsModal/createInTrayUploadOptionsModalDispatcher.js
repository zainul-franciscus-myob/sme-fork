import {
  GENERATE_IN_TRAY_EMAIL,
  SET_CONFIRMING_EMAIL_GENERATION,
  SET_UPLOAD_OPTIONS_ALERT,
  SET_UPLOAD_OPTIONS_LOADING_STATE,
} from '../InTrayIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createInTrayModalDispatcher = (store) => ({
  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  setUploadOptionsAlert: ({ message, type }) => {
    const intent = SET_UPLOAD_OPTIONS_ALERT;
    store.dispatch({
      intent,
      uploadOptionsAlert: { message, type },
    });
  },

  dismissUploadOptionsAlert: () => {
    const intent = SET_UPLOAD_OPTIONS_ALERT;
    store.dispatch({ intent, uploadOptionsAlert: undefined });
  },

  setConfirmingEmailGeneration: (isConfirmingEmailGeneration) => {
    const intent = SET_CONFIRMING_EMAIL_GENERATION;
    store.dispatch({ intent, isConfirmingEmailGeneration });
  },

  setUploadOptionsLoading: (isUploadOptionsLoading) => {
    const intent = SET_UPLOAD_OPTIONS_LOADING_STATE;
    store.dispatch({ intent, isUploadOptionsLoading });
  },

  generateNewEmail: (message, email) => {
    const intent = GENERATE_IN_TRAY_EMAIL;
    store.dispatch({ intent, message, email });
  },
});

export default createInTrayModalDispatcher;
