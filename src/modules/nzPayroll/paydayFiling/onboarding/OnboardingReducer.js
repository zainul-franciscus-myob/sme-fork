import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SET_ALERT,
  SET_CURRENT_STEP,
  SET_IRD_NUMBER,
  SET_LOADING_STATE,
} from './OnboardingIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import Steps from './OnboardingSteps';
import createReducer from '../../../../store/createReducer';

const getDefaultState = () => ({
  currentStep: Steps.OVERVIEW,
  irdNumber: '',
  businessId: '',
  loadingState: LoadingState.LOADING,
  authorisation: '',
});

const setCurrentStep = (state, { currentStep }) => ({
  ...state,
  currentStep,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const setIrdNumber = (state, { irdNumber }) => ({
  ...state,
  irdNumber,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const resetState = () => getDefaultState();

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_CURRENT_STEP]: setCurrentStep,
  [SET_IRD_NUMBER]: setIrdNumber,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
};

const onboardingReducer = createReducer(getDefaultState(), handlers);

export default onboardingReducer;
