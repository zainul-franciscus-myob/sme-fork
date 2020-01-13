import {
  LOAD_SETTINGS, SAVE_SETTINGS, SET_BUSINESS_ID, SET_LOADING_STATE, SET_VIEW_DATA,
} from './rootIntents';
import createReducer from '../store/createReducer';
import shouldShowOnboarding from './services/shouldShowOnboarding';

const getDefaultState = () => ({
  settings: [],
  businessName: '',
  isLoading: false,
  areOnboardingSettingsLoaded: false,
});

const setBusinessId = (state, { businessId }) => ({
  ...state,
  businessId,
});

const setLoading = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setOnboarding = (state, action) => ({
  ...state,
  ...action.settings,
  shouldShowOnboarding: shouldShowOnboarding(action.settings),
  areOnboardingSettingsLoaded: true,
});

const setViewData = (state, action) => ({
  ...state,
  ...action.data,
});

const handlers = {
  [SET_LOADING_STATE]: setLoading,
  [LOAD_SETTINGS]: setOnboarding,
  [SAVE_SETTINGS]: setOnboarding,
  [SET_VIEW_DATA]: setViewData,
  [SET_BUSINESS_ID]: setBusinessId,
};

const onboardingReducer = createReducer(getDefaultState(), handlers);

export default onboardingReducer;
