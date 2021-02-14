import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { SET_BUSINESS_NAME, SET_LOADING_STATE } from './OnboardingIntents';

const onboardingDispatcher = (store) => ({
  resetState: () => {
    store.dispatch({ intent: RESET_STATE });
  },
  setBusinessName: (businessName) => {
    store.dispatch({ intent: SET_BUSINESS_NAME, businessName });
  },
  setInitialState: (context) => {
    store.dispatch({ intent: SET_INITIAL_STATE, context });
  },
  setLoadingState: (loadingState) => {
    store.dispatch({ intent: SET_LOADING_STATE, loadingState });
  },
});

export default onboardingDispatcher;
