import {
  LOAD_INVOICE_LIST,
  SORT_AND_FILTER_INVOICE_LIST,
} from '../../invoice/InvoiceIntents';

const InvoiceListMapping = {
  [LOAD_INVOICE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/load_invoice_list`,
  },
  [SORT_AND_FILTER_INVOICE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/invoice/filter_invoice_list`,
  },
};

export default InvoiceListMapping;
