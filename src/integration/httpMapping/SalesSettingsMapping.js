import {
  LOAD_SALES_SETTINGS,
  SAVE_EMAIL_SETTINGS,
  UPDATE_SALES_SETTINGS,
} from '../../salesSettings/SalesSettingsIntents';

const SalesSettingsMapping = {
  [LOAD_SALES_SETTINGS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/salesSettings/load_sales_settings`,
  },
  [UPDATE_SALES_SETTINGS]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/salesSettings/update_sales_settings`,
  },
  [SAVE_EMAIL_SETTINGS]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/salesSettings/update_email_settings`,
  },
};

export default SalesSettingsMapping;
