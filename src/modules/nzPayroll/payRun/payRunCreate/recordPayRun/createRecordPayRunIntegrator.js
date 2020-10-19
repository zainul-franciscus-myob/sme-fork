import { RECORD_PAYMENTS } from '../PayRunIntents';
import { getBusinessId, getDraftPayRunId } from '../PayRunSelectors';

const createRecordPayRunIntegrator = (store, integration) => ({
  recordPayments: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      draftPayRunId: getDraftPayRunId(state),
    };

    integration.write({
      intent: RECORD_PAYMENTS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createRecordPayRunIntegrator;
