import {
  CREATE_INVOICE_DETAIL,
  DELETE_INVOICE_DETAIL,
  EXPORT_INVOICE_PDF,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ACCOUNT_OPTIONS,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_CONTACT_OPTIONS,
  LOAD_INVOICE_DETAIL,
  LOAD_INVOICE_HISTORY,
  LOAD_INVOICE_LIST,
  LOAD_ITEM_OPTION,
  LOAD_ITEM_OPTIONS,
  LOAD_ITEM_SELLING_DETAILS,
  LOAD_NEW_DUPLICATE_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE,
  LOAD_NEXT_PAGE,
  LOAD_PAY_DIRECT,
  SAVE_EMAIL_SETTINGS,
  SEND_EMAIL,
  SORT_AND_FILTER_INVOICE_LIST,
  UPDATE_INVOICE_DETAIL,
  UPLOAD_EMAIL_ATTACHMENT,
} from '../InvoiceIntents';

const HttpInvoiceMapping = {
  [LOAD_INVOICE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/load_invoice_list`,
  },
  [SORT_AND_FILTER_INVOICE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/filter_invoice_list`,
  },
  [LOAD_NEXT_PAGE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/filter_invoice_list`,
  },
  [LOAD_NEW_INVOICE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/load_new_invoice_detail`,
  },
  [LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE]: {
    method: 'GET',
    getPath: ({ businessId, quoteId }) => `/${businessId}/invoice/load_new_invoice_detail_from_quote/${quoteId}`,
  },
  [LOAD_NEW_DUPLICATE_INVOICE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, duplicatedInvoiceId }) => `/${businessId}/invoice/load_new_duplicate_invoice_detail/${duplicatedInvoiceId}`,
  },
  [CREATE_INVOICE_DETAIL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/create_invoice_detail`,
  },
  [UPDATE_INVOICE_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId, invoiceId }) => `/${businessId}/invoice/update_invoice_detail/${invoiceId}`,
  },
  [LOAD_INVOICE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, invoiceId }) => `/${businessId}/invoice/load_invoice_detail/${invoiceId}`,
  },
  [DELETE_INVOICE_DETAIL]: {
    method: 'DELETE',
    getPath: ({ businessId, invoiceId }) => `/${businessId}/invoice/delete_invoice_detail/${invoiceId}`,
  },
  [LOAD_CONTACT_ADDRESS]: {
    method: 'GET',
    getPath: ({ businessId, contactId }) => `/${businessId}/invoice/load_contact_address/${contactId}`,
  },
  [LOAD_CONTACT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, contactId }) => `/${businessId}/invoice/load_contact/${contactId}`,
  },
  [LOAD_PAY_DIRECT]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/load_pay_direct`,
  },
  [UPLOAD_EMAIL_ATTACHMENT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/upload_email_attachment`,
  },
  [SEND_EMAIL]: {
    method: 'POST',
    getPath: ({ businessId, invoiceId }) => `/${businessId}/invoice/send_invoice_email/${invoiceId}`,
  },
  [SAVE_EMAIL_SETTINGS]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/invoice/save_email_settings`,
  },
  [EXPORT_INVOICE_PDF]: {
    method: 'GET',
    getPath: ({ businessId, invoiceId }) => `/${businessId}/invoice/export_invoice_pdf/${invoiceId}`,
  },
  [LOAD_ITEM_OPTION]: {
    method: 'GET',
    getPath: ({ businessId, itemId }) => `/${businessId}/invoice/load_item_option/${itemId}`,
  },
  [LOAD_ACCOUNT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) => `/${businessId}/invoice/load_account/${accountId}`,
  },
  [LOAD_INVOICE_HISTORY]: {
    method: 'GET',
    getPath: ({ businessId, invoiceId }) => `/${businessId}/invoice/load_invoice_history/${invoiceId}`,
  },
  [LOAD_ACCOUNT_OPTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/load_account_options`,
  },
  [LOAD_ITEM_OPTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/load_item_options`,
  },
  [LOAD_CONTACT_OPTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/load_contact_options`,
  },
  [LOAD_ITEM_SELLING_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId, itemId }) => `/${businessId}/invoice/load_item_selling_details/${itemId}`,
  },
};

export default HttpInvoiceMapping;
