import {
  CREATE_SERVICE_QUOTE,
  DELETE_SERVICE_QUOTE,
  GET_CALCULATED_TOTALS,
  LOAD_CUSTOMER_ADDRESS,
  LOAD_NEW_SERVICE_QUOTE,
  LOAD_QUOTE_LIST,
  LOAD_SERVICE_QUOTE_DETAIL,
  SORT_AND_FILTER_QUOTE_LIST,
  UPDATE_SERVICE_QUOTE,
} from '../../quote/QuoteIntents';

const QuoteListMapping = {
  [LOAD_QUOTE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/quote/load_sale_quote_list`,
  },
  [SORT_AND_FILTER_QUOTE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/quote/filter_sale_quote_list`,
  },
  [LOAD_SERVICE_QUOTE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, quoteId }) => `/${businessId}/quote/load_service_quote_detail/${quoteId}`,
  },
  [GET_CALCULATED_TOTALS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/calculate_totals`,
  },
  [UPDATE_SERVICE_QUOTE]: {
    method: 'PUT',
    getPath: ({ businessId, quoteId }) => `/${businessId}/quote/update_service_quote_detail/${quoteId}`,
  },
  [DELETE_SERVICE_QUOTE]: {
    method: 'DELETE',
    getPath: ({ businessId, quoteId }) => `/${businessId}/quote/delete_service_quote/${quoteId}`,
  },
  [LOAD_NEW_SERVICE_QUOTE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/quote/load_new_service_quote`,
  },
  [LOAD_CUSTOMER_ADDRESS]: {
    method: 'GET',
    getPath: ({ businessId, customerId }) => `/${businessId}/quote/load_contact_address/${customerId}`,
  },
  [CREATE_SERVICE_QUOTE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/create_service_quote`,
  },
};

export default QuoteListMapping;
