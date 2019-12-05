import { LOAD_SETTINGS, SAVE_SETTINGS, SET_LOADING_STATE } from './rootIntents';
import { SET_INITIAL_STATE } from '../SystemIntents';

const createOnboardingDispatcher = store => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  setLoadingState: (isLoading) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  loadSettings: (settings) => {
    const intent = LOAD_SETTINGS;
    store.dispatch({ intent, settings });
  },

  saveSettings: (settings) => {
    const intent = SAVE_SETTINGS;
    store.dispatch({ intent, settings });
  },
});

export default createOnboardingDispatcher;
