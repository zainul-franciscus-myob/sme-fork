import { RECORD_PAYMENTS, SAVE_DRAFT } from '../PayRunIntents';
import { getBusinessId, getSaveDraftContent } from '../PayRunSelectors';
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

  saveDraft: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = { businessId: getBusinessId(state) };
    const content = getSaveDraftContent(state);

    integration.write({
      intent: SAVE_DRAFT,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createRecordPayRunIntegrator;
