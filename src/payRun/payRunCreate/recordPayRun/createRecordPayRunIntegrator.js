import { RECORD_PAYMENTS, RECORD_STP_DECLARATION, SAVE_DRAFT } from '../PayRunIntents';
import { getBusinessId, getSaveDraftContent } from '../PayRunSelectors';
import {
  getPayRunId,
  getRecordPayContents,
  getRecordStpDeclarationContents,
} from './RecordPayRunSelectors';

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

  recordStpDeclaration: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = RECORD_STP_DECLARATION;

    const businessId = getBusinessId(state);
    const payRunId = getPayRunId(state);
    const content = getRecordStpDeclarationContents(state);

    const urlParams = { businessId, payRunId };

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },


  saveDraft: ({
    onSuccess, onFailure,
  }) => {
    const state = store.getState();
    const intent = SAVE_DRAFT;
    const businessId = getBusinessId(state);
    const urlParams = {
      businessId,
    };

    const content = getSaveDraftContent(state);

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
