import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { SET_BUSINESS_NAME, SET_LOADING_STATE } from './OnboardingIntents';
import LoadingState from '../../components/PageView/LoadingState';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  businessName: '',
  businessRole: '',
  industry: '',
  region: '',
  loadingState: LoadingState.LOADING,
});

const resetState = () => getDefaultState();

const setBusinessName = (state, { businessName }) => ({
  ...state,
  businessName,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_BUSINESS_NAME]: setBusinessName,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
};

const onboardingReducer = createReducer(getDefaultState(), handlers);

export default onboardingReducer;
