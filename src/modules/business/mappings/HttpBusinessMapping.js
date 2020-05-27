import {
  LOAD_BUSINESS_DETAIL, LOAD_BUSINESS_LIST, START_NEW_FINANCIAL_YEAR, UPDATE_BUSINESS_DETAIL,
} from '../BusinessIntents';


const HttpBusinessMapping = {
  [LOAD_BUSINESS_LIST]: {
    method: 'GET',
    getPath: () => '/business/load_business_list',
  },
  [LOAD_BUSINESS_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/business/load_business_details`,
  },
  [UPDATE_BUSINESS_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/business/update_business_details`,
  },
  [START_NEW_FINANCIAL_YEAR]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/business/start_new_financial_year`,
  },
};

export default HttpBusinessMapping;
