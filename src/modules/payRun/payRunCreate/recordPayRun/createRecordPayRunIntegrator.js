import {
  PREVIEW_PAY_DETAILS,
  PREVIEW_PAY_RUN_ACTIVITY,
  RECORD_PAYMENTS,
  SAVE_DRAFT,
} from '../PayRunIntents';
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

  saveDraft: ({ onSuccess, onFailure, isAllowNegativesInPayRuns }) => {
    const state = store.getState();
    const urlParams = { businessId: getBusinessId(state) };
    const content = getSaveDraftContent(state, isAllowNegativesInPayRuns);

    integration.write({
      intent: SAVE_DRAFT,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  previewPayDetails: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = { businessId: getBusinessId(state) };

    integration.readFile({
      intent: PREVIEW_PAY_DETAILS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  previewPayRunActivity: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = { businessId: getBusinessId(state) };

    integration.readFile({
      intent: PREVIEW_PAY_RUN_ACTIVITY,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createRecordPayRunIntegrator;
