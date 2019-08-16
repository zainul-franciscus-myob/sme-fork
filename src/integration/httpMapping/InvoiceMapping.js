import {
  DELETE_INVOICE_DETAIL,
  LOAD_CONTACT_ADDRESS,
  LOAD_INVOICE_DETAIL,
  LOAD_INVOICE_LIST,
  SEND_EMAIL,
  SORT_AND_FILTER_INVOICE_LIST,
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
  [SEND_EMAIL]: {
    method: 'POST',
    getPath: ({ businessId, invoiceId }) => `/${businessId}/invoice/send_invoice_email/${invoiceId}`,
  },
};

export default InvoiceMapping;
