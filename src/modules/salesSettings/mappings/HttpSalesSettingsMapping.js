import {
  DELETE_TEMPLATE,
  LOAD_PAY_DIRECT_SETTINGS,
  LOAD_SALES_SETTINGS,
  SAVE_EMAIL_SETTINGS,
  SORT_TEMPLATE_LIST,
  UPDATE_SALES_SETTINGS,
} from '../SalesSettingsIntents';

const HttpSalesSettingsMapping = {
  [LOAD_SALES_SETTINGS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/salesSettings/load_sales_settings`,
  },
  [SORT_TEMPLATE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/salesSettings/sort_template_list`,
  },
  [DELETE_TEMPLATE]: {
    method: 'DELETE',
    getPath: ({ businessId, templateName }) =>
      `/${businessId}/salesSettings/delete_sale_template/${templateName}`,
  },
  [UPDATE_SALES_SETTINGS]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/salesSettings/update_sales_settings`,
  },
  [SAVE_EMAIL_SETTINGS]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/salesSettings/update_email_settings`,
  },
  [LOAD_PAY_DIRECT_SETTINGS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/salesSettings/load_pay_direct_settings`,
  },
};

export default HttpSalesSettingsMapping;
