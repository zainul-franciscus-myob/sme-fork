import {
  LOAD_SETTINGS, SAVE_SETTINGS, SET_LOADING_STATE, SET_VIEW_DATA,
} from './rootIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import createReducer from '../store/createReducer';
import shouldShowOnboarding from './services/shouldShowOnboarding';

const getDefaultState = () => ({
  settings: [],
  businessName: '',
  isLoading: false,
});

const setInitialState = (state, action) => ({
  ...getDefaultState(),
  ...action.context,
});

const resetState = () => (getDefaultState());

const setLoading = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setOnboarding = (state, action) => ({
  ...state,
  ...action.settings,
  shouldShowOnboarding: shouldShowOnboarding(action.settings),
});

const setViewData = (state, action) => ({
  ...state,
  ...action.data,
});

const handlers = {
  [SET_LOADING_STATE]: setLoading,
  [RESET_STATE]: resetState,
  [LOAD_SETTINGS]: setOnboarding,
  [SAVE_SETTINGS]: setOnboarding,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_VIEW_DATA]: setViewData,
};

const onboardingReducer = createReducer(getDefaultState(), handlers);

export default onboardingReducer;
