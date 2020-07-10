import { RESET_STATE } from '../../../SystemIntents';
import {
  SET_ACCESS_TOKEN,
  SET_ALERT,
  SET_IS_OPEN,
  SET_OPENING_CONTEXT,
  UPDATE_AUTHORISATION_CODE,
  UPDATE_AUTHORISATION_INFORMATION,
} from './paySuperAuthorisationModalIntents';

const createPaySuperAuthorisationModalDispatcher = (store) => ({
  setInitialContext: (batchPaymentId, businessId) => {
    store.dispatch({
      intent: SET_OPENING_CONTEXT,
      context: { batchPaymentId, businessId },
    });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

  setIsOpen: (isOpen) => {
    store.dispatch({
      intent: SET_IS_OPEN,
      isOpen,
    });
  },

  setAccessToken: (accessToken) => {
    store.dispatch({
      intent: SET_ACCESS_TOKEN,
      accessToken,
    });
  },

  updateAuthInfo: (response) => {
    store.dispatch({
      intent: UPDATE_AUTHORISATION_INFORMATION,
      response,
    });
  },

  updateAuthorisationCode: ({ value }) => {
    store.dispatch({
      intent: UPDATE_AUTHORISATION_CODE,
      authorisationCode: value,
    });
  },

  setAlert: (alert) => {
    store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  },
});

export default createPaySuperAuthorisationModalDispatcher;
