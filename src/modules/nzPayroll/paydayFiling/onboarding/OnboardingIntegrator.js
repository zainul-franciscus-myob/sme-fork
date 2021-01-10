import { GET_IRD_NUMBER, UPDATE_ONBOARD_USER } from './OnboardingIntents';
import { getBusinessId } from '../../payRun/payRunCreate/PayRunSelectors';

const onboardingIntegrator = (store, integration) => ({
  getIrdNumber: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = GET_IRD_NUMBER;
    const businessId = getBusinessId(state);
    const urlParams = { businessId };

    integration.read({
      intent,
      urlParams,
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
});

export default onboardingIntegrator;
