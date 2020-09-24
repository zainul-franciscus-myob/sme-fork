import {
  LOAD_JOB_COMBOBOX_OPTIONS,
  LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS,
  LOAD_JOB_COMBOBOX_OPTION_BY_ID,
  SET_JOB_COMBOBOX_LOADING_STATE,
  SET_JOB_COMBOBOX_OPTIONS_LOADING_STATE,
  UPDATE_JOB_COMBOBOX_OPTIONS,
} from '../JobIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createJobComboboxDispatcher = ({ store }) => ({
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
  setJobLoadingState: (isLoading) =>
    store.dispatch({
      intent: SET_JOB_COMBOBOX_LOADING_STATE,
      isLoading,
    }),
  setJobOptionsLoadingState: (isLoading) =>
    store.dispatch({
      intent: SET_JOB_COMBOBOX_OPTIONS_LOADING_STATE,
      isLoading,
    }),
  loadJobOptions: (payload) =>
    store.dispatch({
      intent: LOAD_JOB_COMBOBOX_OPTIONS,
      ...payload,
    }),
  loadJobOptionsByIds: (jobs) =>
    store.dispatch({
      intent: LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS,
      jobs,
    }),
  loadJobOptionById: (job) =>
    store.dispatch({
      intent: LOAD_JOB_COMBOBOX_OPTION_BY_ID,
      job,
    }),
  updateJobOptions: (job) =>
    store.dispatch({
      intent: UPDATE_JOB_COMBOBOX_OPTIONS,
      job,
    }),
});

export default createJobComboboxDispatcher;
