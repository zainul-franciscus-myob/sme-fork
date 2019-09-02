import { START_NEW_PAY_RUN } from './PayRunIntents';
import { getBusinessId } from './PayRunSelectors';

const createPayRunIntegrator = (store, integration) => ({
  startNewPayRun: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = START_NEW_PAY_RUN;

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

export default createPayRunIntegrator;
