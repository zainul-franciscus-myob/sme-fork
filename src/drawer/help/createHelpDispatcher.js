import {
  LOAD_HELP_CONTENT,
  LOAD_HELP_CONTENT_FAILURE,
  LOAD_HELP_USER_SETTINGS,
  SET_ACTIVE_STATE,
  SET_CUSTOM_HELP_PAGE_ROUTE,
  SET_LOADING_STATE,
  SET_OPEN_STATE,
  UPDATE_SEARCH_VALUE,
} from './HelpIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';

const createHelpDispatcher = (store) => ({
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
  setActiveState: (isActive) => {
    store.dispatch({
      intent: SET_ACTIVE_STATE,
      isActive,
    });
  },
  setOpenState: (isOpen) => {
    store.dispatch({
      intent: SET_OPEN_STATE,
      isOpen,
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
  setCustomHelpPageRoute: (helpPageRoute) => {
    store.dispatch({
      intent: SET_CUSTOM_HELP_PAGE_ROUTE,
      helpPageRoute,
    });
  },
});
export default createHelpDispatcher;
