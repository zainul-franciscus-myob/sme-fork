import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SET_ALERT, SET_LOADING_STATE, SET_TAB } from './ReportingCentreIntents';

const createReportingCentreDispatcher = store => ({
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  setLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },

  setAlert: (alert) => {
    store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  },

  clearAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
      alert: null,
    });
  },

  setTab: (tab) => {
    store.dispatch({
      intent: SET_TAB,
      tab,
    });
  },
});

export default createReportingCentreDispatcher;
