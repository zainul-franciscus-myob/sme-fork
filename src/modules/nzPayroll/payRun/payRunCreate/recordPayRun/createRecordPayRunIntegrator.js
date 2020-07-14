import { RECORD_PAYMENTS } from '../PayRunIntents';
import { getBusinessId } from '../PayRunSelectors';
import { getRecordPayContents } from './RecordPayRunSelectors';

const createRecordPayRunIntegrator = (store, integration) => ({
  recordPayments: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = { businessId: getBusinessId(state) };
    const content = getRecordPayContents(state);

    integration.write({
      intent: RECORD_PAYMENTS,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createRecordPayRunIntegrator;
