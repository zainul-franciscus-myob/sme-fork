import { LOAD_ONLINETAX_CONFIG, SET_LOADING_STATE } from './onlineTaxIntent';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createOnlineTaxDispatcher = (store) => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  setOnlineTaxState: (config) => {
    store.dispatch({
      ...config,
      intent: LOAD_ONLINETAX_CONFIG,
    });
  },

  setLoadingState: (loadingState) => {
    store.dispatch({ intent: SET_LOADING_STATE, loadingState });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
});

export default createOnlineTaxDispatcher;
