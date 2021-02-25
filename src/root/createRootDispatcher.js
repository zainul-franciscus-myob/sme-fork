import {
  DISMISS_TASK,
  GET_TASKS_LIST,
  GET_TASKS_LIST_FAILURE,
  LOAD_SETTINGS,
  LOAD_SETTINGS_FAILURE,
  LOAD_SHARED_INFO,
  LOAD_SUBSCRIPTION,
  SET_BROWSER_ALERT,
  SET_BUSINESS_ID,
  SET_HAS_CHECKED_BROWSER_ALERT,
  SET_LOADING_STATE,
  SET_REGION,
  SET_VIEW_DATA,
  UPDATE_TASKS,
  UPDATE_TASKS_FAILURE,
} from './rootIntents';
import { LOAD_GLOBAL_BUSINESS_DETAILS } from './services/businessDetails/BusinessDetailsIntents';
import { SET_INITIAL_STATE } from '../SystemIntents';

const createRootDispatcher = (store) => ({
  loadSettings: (settings) => {
    const intent = LOAD_SETTINGS;
    store.dispatch({ intent, settings });
  },

  loadSettingsFailure: () => {
    const intent = LOAD_SETTINGS_FAILURE;
    store.dispatch({ intent });
  },

  loadTasks: (payload) => {
    const intent = GET_TASKS_LIST;
    store.dispatch({ intent, payload });
  },

  loadTasksFailure: () => {
    const intent = GET_TASKS_LIST_FAILURE;
    store.dispatch({ intent, getTasksListFailure: true });
  },

  updateTasks: (tasks) => {
    const intent = UPDATE_TASKS;
    store.dispatch({ intent, tasks });
  },

  updateTasksFailure: () => {
    const intent = UPDATE_TASKS_FAILURE;
    store.dispatch({ intent, updateTasksFailure: true });
  },

  dismissTask: (taskKey) => {
    const intent = DISMISS_TASK;
    store.dispatch({ intent, taskKey });
  },

  loadBusinessDetails: ({ businessDetails }) => {
    const intent = LOAD_GLOBAL_BUSINESS_DETAILS;
    store.dispatch({ intent, businessDetails });
  },

  setBusinessId: (businessId) => {
    const intent = SET_BUSINESS_ID;
    store.dispatch({ intent, businessId });
  },

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  setRegion: (region) => {
    const intent = SET_REGION;
    store.dispatch({ intent, region });
  },

  setLoadingState: (isLoading) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setViewData: (data) => {
    const intent = SET_VIEW_DATA;
    store.dispatch({ intent, data });
  },

  loadSharedInfo: (sharedInfo) => {
    const intent = LOAD_SHARED_INFO;
    store.dispatch({ intent, sharedInfo });
  },

  loadSubscription: (subscription) => {
    const intent = LOAD_SUBSCRIPTION;
    store.dispatch({ intent, subscription });
  },

  setBrowserAlert: (alert) => {
    const intent = SET_BROWSER_ALERT;
    store.dispatch({ intent, alert });
  },

  setHasCheckedBrowserAlert: () => {
    const intent = SET_HAS_CHECKED_BROWSER_ALERT;
    store.dispatch({ intent });
  },
});

export default createRootDispatcher;
