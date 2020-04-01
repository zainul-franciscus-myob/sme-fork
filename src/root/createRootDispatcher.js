import {
  DISMISS_TASK, GET_TASKS_LIST,
  LOAD_SETTINGS, LOAD_SHARED_INFO, LOAD_SUBSCRIPTION, SAVE_SETTINGS, SET_BUSINESS_ID,
  SET_LOADING_STATE, SET_REGION, SET_VIEW_DATA, UPDATE_TASKS,
} from './rootIntents';
import { LOAD_GLOBAL_BUSINESS_DETAILS } from './services/businessDetails/BusinessDetailsIntents';

const createRootDispatcher = store => ({
  loadSettings: (settings) => {
    const intent = LOAD_SETTINGS;
    store.dispatch({ intent, settings });
  },

  saveSettings: (settings) => {
    const intent = SAVE_SETTINGS;
    store.dispatch({ intent, settings });
  },

  loadTasks: (payload) => {
    const intent = GET_TASKS_LIST;
    store.dispatch({ intent, payload });
  },

  updateTasks: (tasks) => {
    const intent = UPDATE_TASKS;
    store.dispatch({ intent, tasks });
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
});

export default createRootDispatcher;
