import { GET_IRD_NUMBER } from '../../OnboardingIntents';
import { getBusinessId } from '../../OnboardingSelectors';

const OverviewStepIntegrator = (store, integration) => ({
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
});

export default OverviewStepIntegrator;
