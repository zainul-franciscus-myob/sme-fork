import { GET_BUSINESS_ROLES, GET_INDUSTRIES, SET_LOADING_STATE } from './onboardingIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';

const createOnboardingDispatcher = store => ({
  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  setLoadingState: (isLoading) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  loadBusinessRoles: (businessRoles) => {
    const intent = GET_BUSINESS_ROLES;
    store.dispatch({ intent, businessRoles });
  },

  loadIndustries: (industries) => {
    const intent = GET_INDUSTRIES;
    store.dispatch({ intent, industries });
  },
});

export default createOnboardingDispatcher;
