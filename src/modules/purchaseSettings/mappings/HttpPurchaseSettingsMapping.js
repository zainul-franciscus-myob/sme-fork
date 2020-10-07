import {
  LOAD_PURCHASE_SETTINGS,
  UPDATE_EMAIL_SETTINGS,
} from '../purchaseSettingsIntents';

const HttpPurchaseSettingsMapping = {
  [LOAD_PURCHASE_SETTINGS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/purchaseSettings/load_purchase_settings`,
  },
  [UPDATE_EMAIL_SETTINGS]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/purchaseSettings/update_remittance_advice_settings`,
  },
};

export default HttpPurchaseSettingsMapping;
