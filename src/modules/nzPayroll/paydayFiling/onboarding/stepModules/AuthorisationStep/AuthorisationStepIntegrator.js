import { ONBOARD_USER } from '../../OnboardingIntents';
import {
  getBusinessId,
  getOnboardUserContent,
} from '../../OnboardingSelectors';

const AuthorisationStepIntegrator = (store, integration) => ({
  onboardUser: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = ONBOARD_USER;
    const businessId = getBusinessId(state);
    const urlParams = { businessId };
    const content = getOnboardUserContent(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default AuthorisationStepIntegrator;
