import {
  CALCULATE_QUOTE_AMOUNT_CHANGE,
  CALCULATE_QUOTE_ITEM_CHANGE,
  CALCULATE_QUOTE_LINE_TOTALS,
  CALCULATE_QUOTE_TAX_INCLUSIVE_CHANGE,
  CREATE_QUOTE_DETAIL,
  DELETE_QUOTE_DETAIL,
  EXPORT_QUOTE_PDF,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_ITEM_AFTER_CREATE,
  LOAD_NEW_DUPLICATE_QUOTE_DETAIL,
  LOAD_NEW_QUOTE_DETAIL,
  LOAD_QUOTE_DETAIL,
  LOAD_QUOTE_LIST,
  SEND_EMAIL,
  SORT_AND_FILTER_QUOTE_LIST,
  UPDATE_QUOTE_DETAIL,
  UPLOAD_EMAIL_ATTACHMENT,
} from '../QuoteIntents';

const HttpQuoteMapping = {
  [LOAD_QUOTE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/quote/load_sale_quote_list`,
  },
  [SORT_AND_FILTER_QUOTE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/quote/filter_sale_quote_list`,
  },

  [LOAD_NEW_QUOTE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/quote/load_new_quote_detail`,
  },
  [LOAD_NEW_DUPLICATE_QUOTE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, duplicatedQuoteId }) => `/${businessId}/quote/load_duplicate_quote_detail/${duplicatedQuoteId}`,
  },
  [LOAD_QUOTE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, quoteId }) => `/${businessId}/quote/load_quote_detail/${quoteId}`,
  },
  [CREATE_QUOTE_DETAIL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/create_quote_detail`,
  },
  [UPDATE_QUOTE_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId, quoteId }) => `/${businessId}/quote/update_quote_detail/${quoteId}`,
  },
  [DELETE_QUOTE_DETAIL]: {
    method: 'DELETE',
    getPath: ({ businessId, quoteId }) => `/${businessId}/quote/delete_quote_detail/${quoteId}`,
  },
  [CALCULATE_QUOTE_ITEM_CHANGE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/calculate_item_quote_totals/update_line_item`,
  },
  [CALCULATE_QUOTE_TAX_INCLUSIVE_CHANGE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/calculate_item_quote_totals/update_tax_inclusive`,
  },
  [CALCULATE_QUOTE_AMOUNT_CHANGE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/calculate_item_quote_totals/update_line_amounts`,
  },
  [CALCULATE_QUOTE_LINE_TOTALS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/calculate_line_totals`,
  },
  [LOAD_CONTACT_ADDRESS]: {
    method: 'GET',
    getPath: ({ businessId, contactId }) => `/${businessId}/quote/load_contact_address/${contactId}`,
  },
  [LOAD_CONTACT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, contactId }) => `/${businessId}/quote/load_contact/${contactId}`,
  },
  [LOAD_ACCOUNT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) => `/${businessId}/quote/load_account/${accountId}`,
  },
  [LOAD_ITEM_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, itemId }) => `/${businessId}/quote/load_item_option/${itemId}`,
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

export default HttpQuoteMapping;
