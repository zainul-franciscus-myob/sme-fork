import {
  LOAD_SETTINGS, SAVE_SETTINGS, SET_LOADING_STATE, SET_VIEW_DATA,
} from './rootIntents';
import { SET_INITIAL_STATE } from '../SystemIntents';

const createRootDispatcher = store => ({
  loadSettings: (settings) => {
    const intent = LOAD_SETTINGS;
    store.dispatch({ intent, settings });
  },

  saveSettings: (settings) => {
    const intent = SAVE_SETTINGS;
    store.dispatch({ intent, settings });
  },

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
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
