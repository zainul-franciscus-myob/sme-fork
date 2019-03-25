import {
  LOAD_INVOICE_LIST,
  SORT_AND_FILTER_INVOICE_LIST,
} from '../../invoice/InvoiceIntents';
import invoiceListFilterResponse from '../data/invoice/filterInvoiceList';
import invoiceListLoadResponse from '../data/invoice/loadInvoiceList';

const loadInvoiceList = ({ onSuccess }) => {
  onSuccess(invoiceListLoadResponse);
};

const sortAndFilterInvoiceList = ({ onSuccess }) => {
  onSuccess(invoiceListFilterResponse);
};

const InvoiceListMapping = {
  [LOAD_INVOICE_LIST]: loadInvoiceList,
  [SORT_AND_FILTER_INVOICE_LIST]: sortAndFilterInvoiceList,
};

export default InvoiceListMapping;
