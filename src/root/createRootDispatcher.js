import {
  LOAD_SETTINGS, SAVE_SETTINGS, SET_BUSINESS_ID, SET_LOADING_STATE, SET_VIEW_DATA,
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

  setBusinessId: (businessId) => {
    const intent = SET_BUSINESS_ID;
    store.dispatch({ intent, businessId });
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
