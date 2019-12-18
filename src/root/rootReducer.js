import { LOAD_BUSINESS_DETAIL } from '../modules/business/BusinessIntents';
import { LOAD_SETTINGS, SAVE_SETTINGS, SET_LOADING_STATE } from './rootIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import { shouldShowOnboarding } from './services/shouldShowOnboarding';
import createReducer from '../store/createReducer';

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

const setBusinessDetails = (state, action) => {
  const { businessDetails } = action.businessDetails;

  return {
    ...state,
    businessName: businessDetails.organisationName,
  };
};

const setLoading = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setOnboarding = (state, action) => ({
  ...state,
  shouldShowOnboarding: shouldShowOnboarding(action.settings),
});

const handlers = {
  [SET_LOADING_STATE]: setLoading,
  [RESET_STATE]: resetState,
  [LOAD_SETTINGS]: setOnboarding,
  [SAVE_SETTINGS]: setOnboarding,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_BUSINESS_DETAIL]: setBusinessDetails,
};

const onboardingReducer = createReducer(getDefaultState(), handlers);

export default onboardingReducer;
