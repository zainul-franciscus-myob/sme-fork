import { ONBOARD_USER } from '../../OnboardingIntents';
import {
  getBusinessId,
  getOnSuccessCallbackUrl,
} from '../../OnboardingSelectors';

const AuthorisationStepIntegrator = (store, integration) => ({
  onboardUser: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = ONBOARD_USER;
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
});

export default AuthorisationStepIntegrator;
