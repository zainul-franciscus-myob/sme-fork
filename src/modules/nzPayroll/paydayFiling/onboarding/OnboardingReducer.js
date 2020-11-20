import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import { SET_CURRENT_STEP } from './OnboardingIntents';
import Steps from './OnboardingSteps';
import createReducer from '../../../../store/createReducer';

const getDefaultState = () => ({
  currentStep: Steps.OVERVIEW,
});

const setCurrentStep = (state, { currentStep }) => ({
  ...state,
  currentStep,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const resetState = () => getDefaultState();

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_CURRENT_STEP]: setCurrentStep,
};

const onboardingReducer = createReducer(getDefaultState(), handlers);

export default onboardingReducer;
