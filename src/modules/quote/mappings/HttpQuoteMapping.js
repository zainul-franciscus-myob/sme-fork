import {
  CREATE_QUOTE_DETAIL,
  DELETE_QUOTE_DETAIL,
  EXPORT_QUOTE_PDF,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_ADDRESS,
  LOAD_ITEM_SELLING_DETAILS,
  LOAD_JOB_AFTER_CREATE,
  LOAD_NEW_DUPLICATE_QUOTE_DETAIL,
  LOAD_NEW_QUOTE_DETAIL,
  LOAD_QUOTE_DETAIL,
  LOAD_QUOTE_LIST,
  LOAD_QUOTE_LIST_NEXT_PAGE,
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
  [LOAD_QUOTE_LIST_NEXT_PAGE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/quote/filter_sale_quote_list`,
  },

  [LOAD_NEW_QUOTE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/quote/load_new_quote_detail`,
  },
  [LOAD_NEW_DUPLICATE_QUOTE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, duplicateId }) =>
      `/${businessId}/quote/load_duplicate_quote_detail/${duplicateId}`,
  },
  [LOAD_QUOTE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, quoteId }) =>
      `/${businessId}/quote/load_quote_detail/${quoteId}`,
  },
  [CREATE_QUOTE_DETAIL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/create_quote_detail`,
  },
  [UPDATE_QUOTE_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId, quoteId }) =>
      `/${businessId}/quote/update_quote_detail/${quoteId}`,
  },
  [DELETE_QUOTE_DETAIL]: {
    method: 'DELETE',
    getPath: ({ businessId, quoteId }) =>
      `/${businessId}/quote/delete_quote_detail/${quoteId}`,
  },
  [LOAD_CONTACT_ADDRESS]: {
    method: 'GET',
    getPath: ({ businessId, contactId }) =>
      `/${businessId}/quote/load_contact_address/${contactId}`,
  },
  [LOAD_ACCOUNT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) =>
      `/${businessId}/quote/load_account/${accountId}`,
  },
  [LOAD_JOB_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, jobId }) => `/${businessId}/bill/load_job/${jobId}`,
  },
  [EXPORT_QUOTE_PDF]: {
    method: 'GET',
    getPath: ({ businessId, quoteId }) =>
      `/${businessId}/quote/export_quote_pdf/${quoteId}`,
  },
  [UPLOAD_EMAIL_ATTACHMENT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/upload_email_attachment`,
  },
  [SEND_EMAIL]: {
    method: 'POST',
    getPath: ({ businessId, quoteId }) =>
      `/${businessId}/quote/send_quote_email/${quoteId}`,
  },
  [LOAD_ITEM_SELLING_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId, itemId }) =>
      `/${businessId}/quote/load_item_selling_details/${itemId}`,
  },
};

export default HttpQuoteMapping;
