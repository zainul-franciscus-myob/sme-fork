import {
  LOAD_JOB_MODAL,
  SET_ALERT,
  SET_JOB_MODAL_DETAILS,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
} from '../JobIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createJobModalDispatcher = store => ({
  setInitialState: context => store.dispatch({ intent: SET_INITIAL_STATE, context }),

  resetState: () => store.dispatch({ intent: RESET_STATE }),

  setLoadingState: isLoading => store.dispatch({ intent: SET_LOADING_STATE, isLoading }),

  setSubmittingState: isSubmitting => store.dispatch({
    intent: SET_SUBMITTING_STATE, isSubmitting,
  }),

  setAlert: ({ type, message }) => store.dispatch({ intent: SET_ALERT, alert: { type, message } }),

  dismissAlert: () => store.dispatch({ intent: SET_ALERT }),

  loadJobModal: response => store.dispatch({ intent: LOAD_JOB_MODAL, ...response }),

  setJobModalDetails: ({ key, value }) => store.dispatch({
    intent: SET_JOB_MODAL_DETAILS, key, value,
  }),
});

export default createJobModalDispatcher;
