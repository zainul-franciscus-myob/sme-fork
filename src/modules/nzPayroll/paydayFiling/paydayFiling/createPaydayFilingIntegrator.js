import {
  DELETE_ONBOARD_USER,
  LOAD_BUSINESS_ONBOARDED_DETAILS,
  LOAD_PAYDAY_USER_SESSION,
} from './PaydayFilingIntents';
import { getBusinessId, getUserGuid } from './PaydayFilingSelectors';

const createPaydayFilingIntegrator = (store, integration) => ({
  loadBusinessOnboardedDetails: ({ onSuccess, onFailure }) => {
    const intent = LOAD_BUSINESS_ONBOARDED_DETAILS;
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadUserSession: ({ onSuccess, onFailure }) => {
    const intent = LOAD_PAYDAY_USER_SESSION;
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  removeUserAuthorisation: ({ onSuccess, onFailure }) => {
    const intent = DELETE_ONBOARD_USER;
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      userGuid: getUserGuid(state),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createPaydayFilingIntegrator;
