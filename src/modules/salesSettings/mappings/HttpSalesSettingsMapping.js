import {
  LOAD_SALES_SETTINGS,
  SAVE_EMAIL_SETTINGS,
  SORT_TEMPLATE_LIST,
  UPDATE_SALES_SETTINGS,
} from '../SalesSettingsIntents';

const HttpSalesSettingsMapping = {
  [LOAD_SALES_SETTINGS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/salesSettings/load_sales_settings`,
  },
  [SORT_TEMPLATE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/salesSettings/sort_template_list`,
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

export default HttpSalesSettingsMapping;
