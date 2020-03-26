import {
  CLOSE_MODAL,
  LOAD_JOB_DETAIL,
  LOAD_NEW_JOB,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_JOB_DETAILS,
} from '../JobIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createJobDetailDispatcher = store => ({
  setInitialState: context => store.dispatch({ intent: SET_INITIAL_STATE, context }),

  resetState: () => store.dispatch({ intent: RESET_STATE }),

  openModal: modal => store.dispatch({ intent: OPEN_MODAL, modal }),

  closeModal: () => store.dispatch({ intent: CLOSE_MODAL }),

  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },

  dismissAlert: () => store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: '',
  }),

  displayAlert: errorMessage => store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: errorMessage,
  }),

  loadJobDetail: content => store.dispatch({
    intent: LOAD_JOB_DETAIL,
    ...content,
  }),

  loadNewJob: content => store.dispatch({
    intent: LOAD_NEW_JOB,
    ...content,
  }),

  updateJobDetails: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_JOB_DETAILS,
      key,
      value,
    });
  },
});

export default createJobDetailDispatcher;
