import { GET_BUSINESS_NAME } from './OnboardingIntents';
import { getBusinessId } from './OnboardingSelectors';

const onboardingIntegrator = (store, integration) => ({
  getBusinessName: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = GET_BUSINESS_NAME;
    const urlParams = { businessId: getBusinessId(state) };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default onboardingIntegrator;
