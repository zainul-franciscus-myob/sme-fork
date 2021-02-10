import {
  CREATE_ONBOARD_USER,
  DELETE_ONBOARD_USER,
  LOAD_BUSINESS_ONBOARDED_DETAILS,
  LOAD_PAYDAY_USER_SESSION,
  UPDATE_ONBOARD_USER,
} from './PaydayFilingIntents';
import {
  getBusinessId,
  getOnSuccessCallbackUrl,
  getUserGuid,
} from './PaydayFilingSelectors';

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

  createOnboardUser: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = CREATE_ONBOARD_USER;
    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    integration.write({
      intent,
      urlParams,
      params: {
        successUrl: getOnSuccessCallbackUrl(state),
      },
      onSuccess,
      onFailure,
    });
  },

  updateOnboardUser: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = UPDATE_ONBOARD_USER;

    const businessId = getBusinessId(state);

    const urlParams = { businessId };

    integration.write({
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

    integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createPaydayFilingIntegrator;
