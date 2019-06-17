import {
  CREATE_INVOICE_SERVICE_DETAIL,
  GET_CALCULATED_INVOICE_DETAIL_TOTALS,
  LOAD_NEW_INVOICE_SERVICE_DETAIL,
  UPDATE_INVOICE_SERVICE_DETAIL,
} from '../../invoice/invoiceDetail/invoiceService/InvoiceServiceIntents';

const InvoiceServiceMapping = {
  [LOAD_NEW_INVOICE_SERVICE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/load_new_invoice_service_detail`,
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
