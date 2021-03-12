import {
  EXPORT_SAMPLE_PDF,
  LOAD_PURCHASE_SETTINGS,
  UPDATE_EMAIL_SETTINGS,
} from './purchaseSettingsIntents';
import { getBusinessId, getTabData } from './purchaseSettingsSelector';

const createPurchaseSettingsIntegrator = (store, integration) => ({
  loadPurchaseSettings: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_PURCHASE_SETTINGS;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadSamplePdf: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = EXPORT_SAMPLE_PDF;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.readFile({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  saveEmailSettings: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = UPDATE_EMAIL_SETTINGS;

    const content = getTabData(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createPurchaseSettingsIntegrator;
