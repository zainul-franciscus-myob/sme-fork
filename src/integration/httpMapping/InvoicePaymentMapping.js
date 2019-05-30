import {
  CREATE_INVOICE_PAYMENT,
  DELETE_INVOICE_PAYMENT, LOAD_INVOICE_LIST,
  LOAD_INVOICE_PAYMENT_DETAIL,
  LOAD_NEW_INVOICE_PAYMENT_DETAIL,
  UPDATE_INVOICE_PAYMENT,
} from '../../invoicePayment/InvoicePaymentIntent';

const InvoicePaymentMapping = {
  [LOAD_NEW_INVOICE_PAYMENT_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoicePayment/load_new_invoice_payment`,
  },
  [LOAD_INVOICE_LIST]: {
    method: 'GET',
    getPath: ({ businessId, customerId }) => `/${businessId}/invoicePayment/load_invoice_list/${customerId}`,
  },
  [LOAD_INVOICE_PAYMENT_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, invoicePaymentId }) => `/${businessId}/invoicePayment/load_invoice_payment/${invoicePaymentId}`,
  },
  [CREATE_INVOICE_PAYMENT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/invoicePayment/create_invoice_payment`,
  },
  [UPDATE_INVOICE_PAYMENT]: {
    method: 'PUT',
    getPath: ({ businessId, invoicePaymentId }) => `/${businessId}/invoicePayment/update_invoice_payment/${invoicePaymentId}`,
  },
  [DELETE_INVOICE_PAYMENT]: {
    method: 'DELETE',
    getPath: ({ businessId, invoicePaymentId }) => `/${businessId}/invoicePayment/delete_invoice_payment/${invoicePaymentId}`,
  },
};

export default InvoicePaymentMapping;
