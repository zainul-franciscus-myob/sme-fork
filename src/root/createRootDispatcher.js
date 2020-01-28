import {
  GET_TASKS_LIST, LOAD_SETTINGS, SAVE_SETTINGS,
  SET_BUSINESS_ID, SET_LOADING_STATE, SET_REGION,
  SET_VIEW_DATA, UPDATE_TASKS,
} from './rootIntents';

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
});

export default createRootDispatcher;
