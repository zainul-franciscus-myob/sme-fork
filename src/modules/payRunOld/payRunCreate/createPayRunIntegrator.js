import { DELETE_PAY_RUN_DRAFT, START_NEW_PAY_RUN } from './PayRunIntents';
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
  deleteDraft: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = DELETE_PAY_RUN_DRAFT;

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

export default createPayRunIntegrator;
