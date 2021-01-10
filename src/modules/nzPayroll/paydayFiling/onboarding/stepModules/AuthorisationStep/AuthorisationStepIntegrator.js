import { CREATE_ONBOARD_USER } from '../../OnboardingIntents';
import {
  getBusinessId,
  getOnSuccessCallbackUrl,
} from '../../OnboardingSelectors';

const AuthorisationStepIntegrator = (store, integration) => ({
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
});

export default AuthorisationStepIntegrator;
