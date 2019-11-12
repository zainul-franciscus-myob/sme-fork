import {
  LOAD_HELP_CONTENT,
  LOAD_HELP_CONTENT_FAILURE,
  LOAD_HELP_USER_SETTINGS,
  SET_LOADING_STATE,
  UPDATE_SEARCH_VALUE,
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
  searchValue: '',
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

const updateSearchValue = (state, action) => ({
  ...state,
  searchValue: action.value,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_HELP_USER_SETTINGS]: loadHelpUserSettings,
  [LOAD_HELP_CONTENT]: loadHelpContent,
  [LOAD_HELP_CONTENT_FAILURE]: loadHelpContentFailure,
  [UPDATE_SEARCH_VALUE]: updateSearchValue,
};

const helpReducer = createReducer(getDefaultState(), handlers);

export default helpReducer;
