import {
  CLOSE_PREVIOUS_STEP_MODAL,
  DELETE_PAY_RUN_DRAFT,
  NEXT_STEP,
  OPEN_PREVIOUS_STEP_MODAL,
  PREVIOUS_STEP,
  SET_ALERT,
  SET_EMPLOYEE_PAYMENTS,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TOTAL_NET_PAY,
  START_NEW_PAY_RUN,
} from './PayRunIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createPayRunDispatchers = store => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  deleteDraft: () => {
    store.dispatch({ intent: DELETE_PAY_RUN_DRAFT });
  },

  setAlert: ({ type, message }) => {
    const intent = SET_ALERT;
    store.dispatch({ intent, alert: { type, message } });
  },

  dismissAlert: () => {
    const intent = SET_ALERT;
    store.dispatch({ intent, alert: undefined });
  },

  openPreviousStepModal: () => {
    const intent = OPEN_PREVIOUS_STEP_MODAL;
    store.dispatch({
      intent,
    });
  },

  closePreviousStepModal: () => {
    const intent = CLOSE_PREVIOUS_STEP_MODAL;
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

  setLoadingState: (loadingState) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, loadingState });
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
