import {
  LOAD_HELP_CONTENT,
  LOAD_HELP_CONTENT_FAILURE,
  LOAD_HELP_USER_SETTINGS,
  SET_LOADING_STATE,
} from './HelpIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  userHelpSettings: undefined,
});

const setInitialState = (state, { currentRouteName, routeParams }) => ({
  ...state,
  document: undefined,
  answers: undefined,
  isLoading: false,
  businessId: routeParams.businessId,
  region: routeParams.region,
  currentRouteName,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const loadHelpUserSettings = (state, action) => ({
  ...state,
  userHelpSettings: action.userHelpSettings,
});

const loadHelpContent = (state, action) => ({
  ...state,
  document: action.entry,
  answers: action.linkedEntries,
});

const loadHelpContentFailure = state => ({
  ...state,
  document: undefined,
  answers: undefined,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_HELP_USER_SETTINGS]: loadHelpUserSettings,
  [LOAD_HELP_CONTENT]: loadHelpContent,
  [LOAD_HELP_CONTENT_FAILURE]: loadHelpContentFailure,
};

const helpReducer = createReducer(getDefaultState(), handlers);

export default helpReducer;
