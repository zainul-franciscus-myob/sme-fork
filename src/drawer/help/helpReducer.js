import {
  LOAD_HELP_CONTENT,
  LOAD_HELP_CONTENT_FAILURE,
  LOAD_HELP_USER_SETTINGS,
  SET_ACTIVE_STATE,
  SET_LOADING_STATE,
  SET_OPEN_STATE,
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

const setActiveState = (state, action) => ({
  ...state,
  isActive: action.isActive,
});

const setOpenState = (state, action) => ({
  ...state,
  isOpen: action.isOpen,
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
  [SET_ACTIVE_STATE]: setActiveState,
  [SET_OPEN_STATE]: setOpenState,
};

const helpReducer = createReducer(getDefaultState(), handlers);

export default helpReducer;
