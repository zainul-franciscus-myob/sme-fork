import {
  LOAD_JOB_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_JOB_DETAILS,
} from '../JobIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createJobModalDispatcher = (store) => ({
  loadNewJob: (payload) => {
    store.dispatch({
      intent: LOAD_JOB_MODAL,
      ...payload,
    });
  },

  updateJobDetails: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_JOB_DETAILS,
      key,
      value,
    });
  },

  setLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },

  displayAlert: (errorMessage) => {
    store.dispatch({
      intent: SET_ALERT,
      alertMessage: errorMessage,
    });
  },

  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
      alertMessage: '',
    });
  },

  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },

  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  resetState() {
    const intent = RESET_STATE;
    store.dispatch({
      intent,
    });
  },
});

export default createJobModalDispatcher;
