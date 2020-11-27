import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SET_CURRENT_STEP,
  SET_IRD_NUMBER,
  SET_LOADING_STATE,
} from './OnboardingIntents';

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

  setLoadingState: (loadingState) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, loadingState });
  },

  setIrdNumber: (irdNumber) => {
    const intent = SET_IRD_NUMBER;
    store.dispatch({ intent, irdNumber });
  },
});

export default onboardingDispatchers;
