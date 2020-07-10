import {
  LOAD_BUSINESS_DETAIL,
  UPDATE_BUSINESS_DETAIL,
} from '../invoiceBusinessIntents';

const HttpInvoiceBusinessMapping = {
  [LOAD_BUSINESS_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/business/load_business_details`,
  },
  [UPDATE_BUSINESS_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/business/update_business_details`,
  },
};

export default HttpInvoiceBusinessMapping;
