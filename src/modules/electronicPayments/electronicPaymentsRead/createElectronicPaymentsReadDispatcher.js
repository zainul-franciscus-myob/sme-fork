import {
  LOAD_ELECTRONIC_PAYMENT_DETAILS,
  SET_ALERT,
  SET_DELETE_MODAL_OPEN_STATE,
  SET_LOADING_STATE,
} from './ElectronicPaymentsReadIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createElectronicPaymentsReadDispatcher = store => ({
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

  setLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },

  setAlertMessage: (alertMessage) => {
    store.dispatch({
      intent: SET_ALERT,
      message: alertMessage,
    });
  },

  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
      message: '',
    });
  },

  openDeleteModal: () => {
    store.dispatch({
      intent: SET_DELETE_MODAL_OPEN_STATE,
      isOpen: true,
    });
  },

  closeDeleteModal: () => {
    store.dispatch({
      intent: SET_DELETE_MODAL_OPEN_STATE,
      isOpen: false,
    });
  },

  setElectronicPayment: (response) => {
    store.dispatch({
      intent: LOAD_ELECTRONIC_PAYMENT_DETAILS,
      response,
    });
  },
});

export default createElectronicPaymentsReadDispatcher;
