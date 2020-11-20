import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import { SET_CURRENT_STEP } from './OnboardingIntents';

const onboardingDispatchers = (store) => ({
  setStep: (step) => {
    store.dispatch({
      intent: SET_CURRENT_STEP,
      currentStep: step,
    });
  },

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },
});

export default onboardingDispatchers;
