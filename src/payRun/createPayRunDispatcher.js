import {
  NEXT_STEP,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PAY_PERIOD_DETAILS,
  START_NEW_PAY_RUN,
} from './PayRunIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';

const createPayRunDispatcher = store => ({
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

  setLoadingState: (isLoading) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  startNewPayRun: (response) => {
    const intent = START_NEW_PAY_RUN;
    store.dispatch({ intent, ...response });
  },

  setPayPeriodDetails: ({ key, value }) => {
    const intent = SET_PAY_PERIOD_DETAILS;
    store.dispatch({ intent, key, value });
  },

  nextStep: () => {
    const intent = NEXT_STEP;
    store.dispatch({ intent });
  },
});

export default createPayRunDispatcher;
