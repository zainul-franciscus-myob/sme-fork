import {
  CLOSE_PREVIOUS_STEP_MODAL,
  LOAD_PAYROLL_VERIFICATION_REPORT,
  LOAD_PAYROLL_VERIFICATION_REPORT_FAILED,
  LOAD_PAYROLL_VERIFICATION_REPORT_SUCCESS,
  NEXT_STEP,
  OPEN_PREVIOUS_STEP_MODAL,
  PREVIOUS_STEP,
  RESTART_PAY_RUN,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TOTAL_TAKE_HOME_PAY,
  START_NEW_PAY_RUN,
} from './PayRunIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';

const createPayRunDispatchers = (store) => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  dismissAlert: () => {
    const intent = SET_ALERT;
    store.dispatch({ intent, alert: undefined });
  },

  setAlert: ({ type, message }) => {
    const intent = SET_ALERT;
    store.dispatch({ intent, alert: { type, message } });
  },

  setLoadingState: (loadingState) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, loadingState });
  },

  startNewPayRun: (response) => {
    const intent = START_NEW_PAY_RUN;
    store.dispatch({ intent, ...response });
  },

  nextStep: () => {
    const intent = NEXT_STEP;
    store.dispatch({ intent });
  },

  previousStep: () => {
    const intent = PREVIOUS_STEP;
    store.dispatch({ intent });
  },

  setTotalTakeHomePay: (totalTakeHomePay) => {
    const intent = SET_TOTAL_TAKE_HOME_PAY;
    store.dispatch({
      intent,
      totalTakeHomePay,
    });
  },

  setSubmittingState: (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;
    store.dispatch({ intent, isSubmitting });
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

  restartPayRun: () => {
    const intent = RESTART_PAY_RUN;
    store.dispatch({
      intent,
    });
  },

  loadPayrollVerificationReport: () => {
    const intent = LOAD_PAYROLL_VERIFICATION_REPORT;
    store.dispatch({
      intent,
    });
  },

  loadPayrollVerificationReportSuccess: () => {
    const intent = LOAD_PAYROLL_VERIFICATION_REPORT_SUCCESS;
    store.dispatch({
      intent,
    });
  },

  loadPayrollVerificationReportFailed: () => {
    const intent = LOAD_PAYROLL_VERIFICATION_REPORT_FAILED;
    store.dispatch({
      intent,
    });
  },
});

export default createPayRunDispatchers;
