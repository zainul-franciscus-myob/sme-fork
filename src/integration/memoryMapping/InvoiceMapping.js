import {
  DELETE_INVOICE_DETAIL,
  LOAD_CONTACT_ADDRESS,
  LOAD_INVOICE_DETAIL,
  LOAD_INVOICE_LIST,
  SORT_AND_FILTER_INVOICE_LIST,
} from '../../invoice/InvoiceIntents';
import contactAddress from '../data/invoice/contactAddress';
import invoiceItemDetail from '../data/invoice/itemLayout/invoiceItemDetail';
import invoiceListFilterResponse from '../data/invoice/filterInvoiceList';
import invoiceListLoadResponse from '../data/invoice/loadInvoiceList';
import invoiceServiceDetail from '../data/invoice/serviceLayout/invoiceServiceDetail';
import successMessage from '../data/success';

const loadInvoiceList = ({ onSuccess }) => onSuccess(invoiceListLoadResponse);

const sortAndFilterInvoiceList = ({ onSuccess }) => onSuccess(invoiceListFilterResponse);

const loadInvoiceDetail = ({ onSuccess, urlParams }) => (
  urlParams.invoiceId === 'item'
    ? onSuccess(invoiceItemDetail)
    : onSuccess(invoiceServiceDetail)
);

const deleteInvoiceDetail = ({ onSuccess }) => onSuccess(successMessage);

const loadContactAddress = ({ onSuccess }) => onSuccess(contactAddress);

const InvoiceMapping = {
  [LOAD_INVOICE_LIST]: loadInvoiceList,
  [SORT_AND_FILTER_INVOICE_LIST]: sortAndFilterInvoiceList,
  [LOAD_INVOICE_DETAIL]: loadInvoiceDetail,
  [DELETE_INVOICE_DETAIL]: deleteInvoiceDetail,
  [LOAD_CONTACT_ADDRESS]: loadContactAddress,
};

export default InvoiceMapping;
