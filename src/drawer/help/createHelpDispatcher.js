import {
  LOAD_HELP_CONTENT,
  LOAD_HELP_CONTENT_FAILURE,
  LOAD_HELP_USER_SETTINGS,
  SET_LOADING_STATE,
  UPDATE_SEARCH_VALUE,
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
  loadHelpUserSettings: (userHelpSettings) => {
    store.dispatch({
      intent: LOAD_HELP_USER_SETTINGS,
      userHelpSettings,
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
  updateSearchValue: (value) => {
    store.dispatch({
      intent: UPDATE_SEARCH_VALUE,
      value,
    });
  },
});
export default createHelpDispatcher;
