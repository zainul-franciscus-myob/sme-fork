import {
  LOAD_HELP_CONTENT,
  LOAD_HELP_CONTENT_FAILURE,
  SET_LOADING_STATE,
} from './HelpIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';

const createHelpDispatcher = store => ({
  setInitialState: ({ routeParams, currentRouteName }) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      routeParams,
      currentRouteName,
    });
  },
  setLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },
  loadHelpContent: ({ entry, linkedEntries }) => {
    store.dispatch({
      intent: LOAD_HELP_CONTENT,
      entry,
      linkedEntries,
    });
  },
  loadHelpContentFailure: () => {
    store.dispatch({
      intent: LOAD_HELP_CONTENT_FAILURE,
    });
  },
});
export default createHelpDispatcher;
