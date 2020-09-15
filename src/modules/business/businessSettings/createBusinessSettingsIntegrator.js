import {
  LOAD_BUSINESS_SETTINGS,
  SAVE_BUSINESS_DETAILS,
  SAVE_GST_SETTINGS,
  START_NEW_FINANCIAL_YEAR,
} from '../BusinessIntents';
import {
  getBusinessDetailsForUpdate,
  getBusinessId,
  getGstSettingsForUpdate,
  getLastMonthInNewFinancialYear,
} from './businessSettingsSelectors';

const createBusinessSettingsIntegrator = (store, integration) => ({
  saveBusinessDetails: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: SAVE_BUSINESS_DETAILS,
      urlParams: {
        businessId: getBusinessId(state),
      },
      content: getBusinessDetailsForUpdate(state),
      onSuccess,
      onFailure,
    });
  },
  saveGstSettings: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: SAVE_GST_SETTINGS,
      urlParams: {
        businessId: getBusinessId(state),
      },
      content: getGstSettingsForUpdate(state),
      onSuccess,
      onFailure,
    });
  },
  loadBusinessSettings: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_BUSINESS_SETTINGS,
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },
  startNewFinancialYear: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: START_NEW_FINANCIAL_YEAR,
      urlParams: {
        businessId: getBusinessId(state),
      },
      content: {
        lastMonthInFinancialYear: getLastMonthInNewFinancialYear(state),
      },
      onSuccess,
      onFailure,
    });
  },
});

export default createBusinessSettingsIntegrator;
