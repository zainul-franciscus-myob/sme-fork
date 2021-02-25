import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  SET_ALERT,
  SET_BUSINESS_NAME,
  SET_BUSINESS_ROLE,
  SET_INDUSTRY,
  SET_LOADING_STATE,
  SET_ONBOARDING_DETAILS,
  SET_USING_COMPETITOR_PRODUCT,
} from './OnboardingIntents';

const createOnboardingDispatcher = (store) => ({
  dismissAlert: () => {
    store.dispatch({ intent: SET_ALERT, alert: undefined });
  },
  setAlert: (alert) => {
    store.dispatch({ intent: SET_ALERT, alert });
  },
  resetState: () => {
    store.dispatch({ intent: RESET_STATE });
  },
  setOnboardingDetails: (onboardingDetails) => {
    store.dispatch({ intent: SET_ONBOARDING_DETAILS, onboardingDetails });
  },
  setBusinessName: (businessName) => {
    store.dispatch({ intent: SET_BUSINESS_NAME, businessName });
  },
  setBusinessRole: (businessRole) => {
    store.dispatch({ intent: SET_BUSINESS_ROLE, businessRole });
  },
  setIndustry: (industryId) => {
    store.dispatch({ intent: SET_INDUSTRY, industryId });
  },
  setUsingCompetitorProduct: (usingCompetitorProduct) => {
    store.dispatch({
      intent: SET_USING_COMPETITOR_PRODUCT,
      usingCompetitorProduct,
    });
  },
  setInitialState: (context) => {
    store.dispatch({ intent: SET_INITIAL_STATE, context });
  },
  setLoadingState: (loadingState) => {
    store.dispatch({ intent: SET_LOADING_STATE, loadingState });
  },
});

export default createOnboardingDispatcher;
