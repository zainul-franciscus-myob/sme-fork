import {
  CREATE_INVOICE_SERVICE_DETAIL,
  GET_CALCULATED_INVOICE_DETAIL_TOTALS,
  LOAD_DUPLICATE_INVOICE_SERVICE_DETAIL,
  LOAD_NEW_INVOICE_SERVICE_DETAIL,
  LOAD_NEW_INVOICE_SERVICE_DETAIL_FROM_QUOTE,
  UPDATE_INVOICE_SERVICE_DETAIL,
} from '../../invoice/invoiceDetail/invoiceService/InvoiceServiceIntents';

const InvoiceServiceMapping = {
  [LOAD_NEW_INVOICE_SERVICE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/load_new_invoice_service_detail`,
  },
  [LOAD_NEW_INVOICE_SERVICE_DETAIL_FROM_QUOTE]: {
    method: 'GET',
    getPath: ({ businessId, quoteId }) => `/${businessId}/invoice/load_new_invoice_service_detail_from_quote/${quoteId}`,
  },
  [LOAD_DUPLICATE_INVOICE_SERVICE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, duplicatedInvoiceId }) => `/${businessId}/invoice/load_new_duplicate_invoice_service_detail/${duplicatedInvoiceId}`,
  },
  [CREATE_INVOICE_SERVICE_DETAIL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/create_invoice_service_detail`,
  },
  [UPDATE_INVOICE_SERVICE_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId, invoiceId }) => `/${businessId}/invoice/update_invoice_service_detail/${invoiceId}`,
  },
  [GET_CALCULATED_INVOICE_DETAIL_TOTALS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoice/calculate_invoice_service_detail_totals`,
  },
};

export default InvoiceServiceMapping;
