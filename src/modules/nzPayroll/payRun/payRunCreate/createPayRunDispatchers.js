import {
  NEXT_STEP,
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
});

export default createPayRunDispatchers;
