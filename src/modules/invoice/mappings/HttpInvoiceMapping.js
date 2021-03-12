import {
  CREATE_INVOICE_DETAIL,
  CREATE_PRE_CONVERSION_INVOICE_DETAIL,
  DELETE_INVOICE_DETAIL,
  DELETE_PRE_CONVERSION_INVOIVE_DETAIL,
  EXPORT_INVOICE_PDF,
  LOAD_ABN_FROM_CUSTOMER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ACCOUNT_OPTIONS,
  LOAD_CUSTOMER,
  LOAD_CUSTOMER_QUOTES,
  LOAD_INVOICE_DETAIL,
  LOAD_INVOICE_HISTORY,
  LOAD_INVOICE_LIST,
  LOAD_ITEM_SELLING_DETAILS,
  LOAD_NEW_DUPLICATE_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE,
  LOAD_NEXT_PAGE,
  LOAD_PAYMENT_SETTINGS,
  LOAD_PAY_DIRECT,
  LOAD_PREFILL_FROM_RECURRING_INVOICE,
  SAVE_EMAIL_SETTINGS,
  SAVE_PAYMENT_OPTIONS,
  SEND_EINVOICE,
  SEND_EMAIL,
  SORT_AND_FILTER_INVOICE_LIST,
  UPDATE_INVOICE_DETAIL,
  UPDATE_PRE_CONVERSION_INVOICE_DETAIL,
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
    getPath: ({ businessId }) =>
      `/${businessId}/invoice/load_new_invoice_detail`,
  },
  [LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE]: {
    method: 'GET',
    getPath: ({ businessId, quoteId }) =>
      `/${businessId}/invoice/load_new_invoice_detail_from_quote/${quoteId}`,
  },
  [LOAD_NEW_DUPLICATE_INVOICE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, duplicateId }) =>
      `/${businessId}/invoice/load_new_duplicate_invoice_detail/${duplicateId}`,
  },
  [CREATE_INVOICE_DETAIL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/create_invoice_detail`,
  },
  [UPDATE_INVOICE_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId, invoiceId }) =>
      `/${businessId}/invoice/update_invoice_detail/${invoiceId}`,
  },
  [LOAD_INVOICE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, invoiceId }) =>
      `/${businessId}/invoice/load_invoice_detail/${invoiceId}`,
  },
  [DELETE_INVOICE_DETAIL]: {
    method: 'DELETE',
    getPath: ({ businessId, invoiceId }) =>
      `/${businessId}/invoice/delete_invoice_detail/${invoiceId}`,
  },
  [LOAD_CUSTOMER]: {
    method: 'GET',
    getPath: ({ businessId, customerId }) =>
      `/${businessId}/invoice/load_customer/${customerId}`,
  },
  [LOAD_PAY_DIRECT]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/load_pay_direct`,
  },
  [UPLOAD_EMAIL_ATTACHMENT]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/invoice/upload_email_attachment`,
  },
  [SEND_EMAIL]: {
    method: 'POST',
    getPath: ({ businessId, invoiceId }) =>
      `/${businessId}/invoice/send_invoice_email/${invoiceId}`,
  },
  [SAVE_EMAIL_SETTINGS]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/invoice/save_email_settings`,
  },
  [SEND_EINVOICE]: {
    method: 'POST',
    getPath: ({ businessId, invoiceId }) =>
      `/${businessId}/invoice/send_einvoice/${invoiceId}`,
  },
  [EXPORT_INVOICE_PDF]: {
    method: 'GET',
    getPath: ({ businessId, invoiceId }) =>
      `/${businessId}/invoice/export_invoice_pdf/${invoiceId}`,
  },
  [LOAD_ACCOUNT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) =>
      `/${businessId}/invoice/load_account/${accountId}`,
  },
  [LOAD_INVOICE_HISTORY]: {
    method: 'GET',
    getPath: ({ businessId, invoiceId }) =>
      `/${businessId}/invoice/load_invoice_history/${invoiceId}`,
  },
  [LOAD_ACCOUNT_OPTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/load_account_options`,
  },
  [LOAD_ITEM_SELLING_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId, itemId }) =>
      `/${businessId}/invoice/load_item_selling_details/${itemId}`,
  },
  [CREATE_PRE_CONVERSION_INVOICE_DETAIL]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/invoice/create_pre_conversion_invoice`,
  },
  [UPDATE_PRE_CONVERSION_INVOICE_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId, invoiceId }) =>
      `/${businessId}/invoice/update_pre_conversion_invoice/${invoiceId}`,
  },
  [DELETE_PRE_CONVERSION_INVOIVE_DETAIL]: {
    method: 'DELETE',
    getPath: ({ businessId, invoiceId }) =>
      `/${businessId}/invoice/delete_pre_conversion_invoice/${invoiceId}`,
  },
  [LOAD_ABN_FROM_CUSTOMER]: {
    method: 'GET',
    getPath: ({ businessId, customerId }) =>
      `/${businessId}/invoice/load_abn_from_customer/${customerId}`,
  },
  [LOAD_CUSTOMER_QUOTES]: {
    method: 'GET',
    getPath: ({ businessId, customerId }) =>
      `/${businessId}/invoice/load_customer_quotes/${customerId}`,
  },
  [LOAD_PREFILL_FROM_RECURRING_INVOICE]: {
    method: 'GET',
    getPath: ({ businessId, recurringTransactionId }) =>
      `/${businessId}/invoice/load_prefill_from_recurring_invoice/${recurringTransactionId}`,
  },
  [SAVE_PAYMENT_OPTIONS]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/invoice/update_payment_options`,
  },
  [LOAD_PAYMENT_SETTINGS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/load_payment_settings`,
  },
};

export default HttpInvoiceMapping;
