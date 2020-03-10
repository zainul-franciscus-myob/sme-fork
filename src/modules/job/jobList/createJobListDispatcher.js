import {
  FILTER_JOB_LIST,
  LOAD_JOB_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
  UPDATE_FILTER_OPTIONS,
} from '../JobIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createJobListDispatcher = store => ({
  setInitialState: (context) => {
    store.dispatch({ intent: SET_INITIAL_STATE, context });
  },
  resetState: () => {
    store.dispatch({ intent: RESET_STATE });
  },
  setAlert: ({ message, type }) => {
    store.dispatch({ intent: SET_ALERT, alert: { message, type } });
  },
  dismissAlert: () => {
    store.dispatch({ intent: SET_ALERT, alert: undefined });
  },
  setLoadingState: (loadingState) => {
    store.dispatch({ intent: SET_LOADING_STATE, loadingState });
  },
  setTableLoadingState: (isTableLoading) => {
    store.dispatch({ intent: SET_TABLE_LOADING_STATE, isTableLoading });
  },
  updateFilterOptions: ({ key, value }) => {
    store.dispatch({ intent: UPDATE_FILTER_OPTIONS, key, value });
  },
  loadJobList: (payload) => {
    store.dispatch({ intent: LOAD_JOB_LIST, ...payload });
  },
  filterJobList: ({ entries }) => {
    store.dispatch({
      intent: FILTER_JOB_LIST, entries,
    });
  },
});

export default createJobListDispatcher;
