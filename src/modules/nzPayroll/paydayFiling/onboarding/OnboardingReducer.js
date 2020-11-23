import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import { SET_CURRENT_STEP, SET_IRD_NUMBER } from './OnboardingIntents';
import Steps from './OnboardingSteps';
import createReducer from '../../../../store/createReducer';

const getDefaultState = () => ({
  currentStep: Steps.OVERVIEW,
  irdNumber: '',
  businessId: '',
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

const resetState = () => getDefaultState();

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_CURRENT_STEP]: setCurrentStep,
  [SET_IRD_NUMBER]: setIrdNumber,
};

const onboardingReducer = createReducer(getDefaultState(), handlers);

export default onboardingReducer;
