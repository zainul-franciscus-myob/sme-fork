import {
  CALCULATE_INVOICE_ITEM_LINES_CHANGE,
  CALCULATE_INVOICE_ITEM_LINE_INPUT_CHANGE,
  CALCULATE_INVOICE_ITEM_LINE_TAX_CODE_CHANGE,
  CALCULATE_INVOICE_ITEM_TAX_INCLUSIVE_CHANGE,
  CREATE_INVOICE_DETAIL,
  DELETE_INVOICE_DETAIL,
  GET_INVOICE_SERVICE_CALCULATED_TOTALS,
  LOAD_CONTACT_ADDRESS,
  LOAD_INVOICE_DETAIL,
  LOAD_INVOICE_LIST,
  LOAD_NEW_DUPLICATE_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE,
  LOAD_PAY_DIRECT,
  REMOVE_INVOICE_ITEM_LINE,
  SEND_EMAIL,
  SORT_AND_FILTER_INVOICE_LIST,
  UPDATE_INVOICE_DETAIL,
} from '../../invoice/InvoiceIntents';

const InvoiceMapping = {
  [LOAD_INVOICE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/load_invoice_list`,
  },
  [SORT_AND_FILTER_INVOICE_LIST]: {
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
  [LOAD_PAY_DIRECT]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/load_pay_direct`,
  },
  [GET_INVOICE_SERVICE_CALCULATED_TOTALS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/calculate_invoice_service_detail_totals`,
  },
  [REMOVE_INVOICE_ITEM_LINE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/calculate_invoice_item_totals/remove_line`,
  },
  [CALCULATE_INVOICE_ITEM_TAX_INCLUSIVE_CHANGE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/calculate_invoice_item_totals/change_tax_inclusive`,
  },
  [CALCULATE_INVOICE_ITEM_LINES_CHANGE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/calculate_invoice_item_totals/change_line_item`,
  },
  [CALCULATE_INVOICE_ITEM_LINE_TAX_CODE_CHANGE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/calculate_invoice_item_totals/change_line_tax_code`,
  },
  [CALCULATE_INVOICE_ITEM_LINE_INPUT_CHANGE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/calculate_invoice_item_totals/change_line_amount`,
  },
  [SEND_EMAIL]: {
    method: 'POST',
    getPath: ({ businessId, invoiceId }) => `/${businessId}/invoice/send_invoice_email/${invoiceId}`,
  },
};

export default InvoiceMapping;
