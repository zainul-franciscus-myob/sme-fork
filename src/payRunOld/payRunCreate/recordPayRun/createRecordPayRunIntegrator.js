import { RECORD_PAYMENTS, RECORD_STP_DECLARATION } from '../PayRunIntents';
import { getBusinessId } from '../PayRunSelectors';
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
});

export default createRecordPayRunIntegrator;
