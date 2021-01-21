import {
  LOAD_BUSINESS_ONBOARDED_STATUS,
  LOAD_PAYDAY_USER_SESSION,
} from './PaydayFilingIntents';
import { getBusinessId } from './PaydayFilingSelectors';

const createPaydayFilingIntegrator = (store, integration) => ({
  loadBusinessOnboardedStatus: ({ onSuccess, onFailure }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent: LOAD_BUSINESS_ONBOARDED_STATUS,
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
});

export default createPaydayFilingIntegrator;
