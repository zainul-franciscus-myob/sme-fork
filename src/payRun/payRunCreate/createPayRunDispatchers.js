import {
  CLOSE_MODAL,
  NEXT_STEP,
  OPEN_MODAL,
  PREVIOUS_STEP,
  SET_ALERT,
  SET_EMPLOYEE_PAYMENTS,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TOTAL_NET_PAY,
  START_NEW_PAY_RUN,
} from './PayRunIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createPayRunDispatchers = store => ({
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

  openModal: ({ type }) => {
    const intent = OPEN_MODAL;
    store.dispatch({
      intent,
      modal: {
        type,
      },
    });
  },

  closeModal: () => {
    const intent = CLOSE_MODAL;
    store.dispatch({
      intent,
    });
  },

  setTotalNetPay: (totalNetPay) => {
    const intent = SET_TOTAL_NET_PAY;
    store.dispatch({
      intent,
      totalNetPay,
    });
  },

  setLoadingState: (isLoading) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setSubmittingState: (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;
    store.dispatch({ intent, isSubmitting });
  },

  startNewPayRun: (response) => {
    const intent = START_NEW_PAY_RUN;
    store.dispatch({ intent, ...response });
  },

  setEmployeePayments: (response) => {
    const intent = SET_EMPLOYEE_PAYMENTS;
    store.dispatch({ intent, response });
  },

  nextStep: () => {
    const intent = NEXT_STEP;
    store.dispatch({ intent });
  },

  previousStep: () => {
    const intent = PREVIOUS_STEP;
    store.dispatch({ intent });
  },
});

export default createPayRunDispatchers;
