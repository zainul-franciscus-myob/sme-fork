import { LOAD_ONBOARDING, SAVE_ONBOARDING } from './OnboardingIntents';
import { getBusinessId, getSaveOnboardingContent } from './OnboardingSelectors';

const createOnboardingIntegrator = (store, integration) => ({
  loadOnboarding: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_ONBOARDING;
    const urlParams = { businessId: getBusinessId(state) };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  saveOnboarding: async ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = SAVE_ONBOARDING;
    const urlParams = { businessId: getBusinessId(state) };
    const content = getSaveOnboardingContent(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createOnboardingIntegrator;
