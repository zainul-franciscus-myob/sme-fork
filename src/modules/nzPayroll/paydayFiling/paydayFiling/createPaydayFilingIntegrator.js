import { LOAD_BUSINESS_ONBOARDED_STATUS } from './PaydayFilingIntents';
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
});

export default createPaydayFilingIntegrator;
