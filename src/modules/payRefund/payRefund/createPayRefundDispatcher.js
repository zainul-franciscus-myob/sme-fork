import {
  CLOSE_MODAL,
  LOAD_PAY_REFUND,
  LOAD_REFERENCE_ID,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PAY_REFUND_DETAIL,
  SET_SUBMITTING_STATE,
} from '../PayRefundIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createPayRefundDispatcher = (store) => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  setAlert: ({ type, message }) => {
    const intent = SET_ALERT;
    store.dispatch({ intent, alert: { type, message } });
  },

  dismissAlert: () => {
    const intent = SET_ALERT;
    store.dispatch({ intent, alert: undefined });
  },

  openModal: (modalType) => {
    const intent = OPEN_MODAL;
    store.dispatch({ intent, modalType });
  },

  closeModal: () => {
    const intent = CLOSE_MODAL;
    store.dispatch({ intent });
  },

  setLoadingState: (loadingState) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, loadingState });
  },

  setSubmittingState: (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;
    store.dispatch({ intent, isSubmitting });
  },

  loadRefund: (response) => {
    const intent = LOAD_PAY_REFUND;
    store.dispatch({ intent, ...response });
  },

  setRefundDetail: ({ key, value }) => {
    const intent = SET_PAY_REFUND_DETAIL;
    store.dispatch({ intent, key, value });
  },

  loadReferenceId: (referenceId) => {
    const intent = LOAD_REFERENCE_ID;
    store.dispatch({ intent, referenceId });
  },
});

export default createPayRefundDispatcher;
