import {
  LOAD_PURCHASE_SETTINGS,
  UPDATE_EMAIL_SETTINGS,
} from './purchaseSettingsIntents';
import {
  getBusinessId,
  getDefaultRemittanceAdviceEmailSettings,
} from './purchaseSettingsSelector';

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

  saveEmailSettings: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = UPDATE_EMAIL_SETTINGS;

    const content = getDefaultRemittanceAdviceEmailSettings(state);

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
