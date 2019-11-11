import { RECORD_PAYMENTS } from '../PayRunIntents';
import { getBusinessId } from '../PayRunSelectors';
import { getRecordPayContents } from './RecordPayRunSelectors';

const createRecordPayRunIntegrator = (store, integration) => ({
  recordPayments: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = RECORD_PAYMENTS;

    const businessId = getBusinessId(state);
    const content = getRecordPayContents(state);

    const urlParams = { businessId };

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createRecordPayRunIntegrator;
