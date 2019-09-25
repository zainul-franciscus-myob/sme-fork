import {
  DELETE_QUOTE_DETAIL,
  EXPORT_QUOTE_PDF,
  LOAD_CUSTOMER_ADDRESS,
  LOAD_QUOTE_DETAIL,
  LOAD_QUOTE_LIST,
  SORT_AND_FILTER_QUOTE_LIST,
} from '../../quote/QuoteIntents';

const QuoteMapping = {
  [LOAD_QUOTE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/quote/load_sale_quote_list`,
  },
  [SORT_AND_FILTER_QUOTE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/quote/filter_sale_quote_list`,
  },
  [LOAD_QUOTE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, quoteId }) => `/${businessId}/quote/load_quote_detail/${quoteId}`,
  },
  [DELETE_QUOTE_DETAIL]: {
    method: 'DELETE',
    getPath: ({ businessId, quoteId }) => `/${businessId}/quote/delete_quote_detail/${quoteId}`,
  },
  [LOAD_CUSTOMER_ADDRESS]: {
    method: 'GET',
    getPath: ({ businessId, customerId }) => `/${businessId}/quote/load_contact_address/${customerId}`,
  },
  [EXPORT_QUOTE_PDF]: {
    method: 'GET',
    getPath: ({ businessId, quoteId }) => `/${businessId}/quote/export_quote_pdf/${quoteId}`,
  },
};

export default QuoteMapping;
