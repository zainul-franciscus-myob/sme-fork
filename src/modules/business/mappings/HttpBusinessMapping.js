import {
  LOAD_BUSINESS_LIST,
  LOAD_BUSINESS_SETTINGS,
  SAVE_BUSINESS_DETAILS,
  SAVE_GST_SETTINGS,
  START_NEW_FINANCIAL_YEAR,
} from '../BusinessIntents';

const HttpBusinessMapping = {
  [LOAD_BUSINESS_LIST]: {
    method: 'GET',
    getPath: () => '/business/load_business_list',
  },
  [LOAD_BUSINESS_SETTINGS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/business/load_business_settings`,
  },
  [SAVE_BUSINESS_DETAILS]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/business/update_business_details`,
  },
  [SAVE_GST_SETTINGS]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/business/update_gst_settings`,
  },
  [START_NEW_FINANCIAL_YEAR]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/business/start_new_financial_year`,
  },
};

export default HttpBusinessMapping;
