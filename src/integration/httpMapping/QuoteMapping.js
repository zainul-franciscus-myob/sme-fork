import {
  DELETE_QUOTE_DETAIL,
  EXPORT_QUOTE_PDF,
  LOAD_CUSTOMER_ADDRESS,
  LOAD_CUSTOMER_AFTER_CREATE,
  LOAD_QUOTE_DETAIL,
  LOAD_QUOTE_LIST,
  SEND_EMAIL,
  SORT_AND_FILTER_QUOTE_LIST,
  UPLOAD_EMAIL_ATTACHMENT,
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
  [LOAD_CUSTOMER_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, customerId }) => `/${businessId}/quote/load_contact/${customerId}`,
  },
  [EXPORT_QUOTE_PDF]: {
    method: 'GET',
    getPath: ({ businessId, quoteId }) => `/${businessId}/quote/export_quote_pdf/${quoteId}`,
  },
  [UPLOAD_EMAIL_ATTACHMENT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/upload_email_attachment`,
  },
  [SEND_EMAIL]: {
    method: 'POST',
    getPath: ({ businessId, quoteId }) => `/${businessId}/quote/send_quote_email/${quoteId}`,
  },
};

export default QuoteMapping;
