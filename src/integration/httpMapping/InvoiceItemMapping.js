import {
  CALCULATE_LINE,
  CREATE_INVOICE_ITEM_DETAIL,
  LOAD_DUPLICATE_INVOICE_ITEM_DETAIL,
  LOAD_NEW_INVOICE_ITEM_DETAIL,
  LOAD_NEW_INVOICE_ITEM_DETAIL_FROM_QUOTE,
  REMOVE_LINE,
  UPDATE_INVOICE_ITEM_DETAIL,
  UPDATE_INVOICE_ITEM_TAX_INCLUSIVE,
  UPDATE_LINE_ITEM,
  UPDATE_LINE_TAX_CODE,
} from '../../invoice/invoiceDetail/invoiceItem/InvoiceItemIntents';

const InvoiceItemMapping = {
  [LOAD_NEW_INVOICE_ITEM_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/load_new_invoice_item_detail`,
  },
  [LOAD_NEW_INVOICE_ITEM_DETAIL_FROM_QUOTE]: {
    method: 'GET',
    getPath: ({ businessId, quoteId }) => `/${businessId}/invoice/load_new_invoice_item_detail_from_quote/${quoteId}`,
  },
  [LOAD_DUPLICATE_INVOICE_ITEM_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, duplicatedInvoiceId }) => `/${businessId}/invoice/load_new_duplicate_invoice_item_detail/${duplicatedInvoiceId}`,
  },
  [UPDATE_INVOICE_ITEM_TAX_INCLUSIVE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/calculate_invoice_item_totals/change_tax_inclusive`,
  },
  [CREATE_INVOICE_ITEM_DETAIL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/create_invoice_item_detail`,
  },
  [UPDATE_INVOICE_ITEM_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId, invoiceId }) => `/${businessId}/invoice/update_invoice_item_detail/${invoiceId}`,
  },
  [UPDATE_LINE_ITEM]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/calculate_invoice_item_totals/change_line_item`,
  },
  [UPDATE_LINE_TAX_CODE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/calculate_invoice_item_totals/change_line_tax_code`,
  },
  [REMOVE_LINE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/calculate_invoice_item_totals/remove_line`,
  },
  [CALCULATE_LINE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/calculate_invoice_item_totals/change_line_amount`,
  },
};

export default InvoiceItemMapping;
