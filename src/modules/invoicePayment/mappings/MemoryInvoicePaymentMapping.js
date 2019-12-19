import {
  CREATE_INVOICE_PAYMENT,
  DELETE_INVOICE_PAYMENT,
  LOAD_INVOICE_LIST,
  LOAD_INVOICE_PAYMENT_DETAIL,
  LOAD_NEW_INVOICE_PAYMENT_DETAIL,
  UPDATE_INVOICE_PAYMENT,
} from '../InvoicePaymentIntent';
import invoiceList from './data/invoiceList';
import invoicePaymentDetail from './data/invoicePaymentDetail';
import newInvoicePaymentDetail from './data/invoicePaymentNewEntry';
import success from './data/success.json';

const loadInvoicePaymentDetail = ({ onSuccess }) => onSuccess(invoicePaymentDetail);
const loadNewInvoicePaymentDetail = ({ onSuccess }) => onSuccess(newInvoicePaymentDetail);
const loadInvoiceList = ({ onSuccess }) => onSuccess(invoiceList);
const createInvoicePaymentDetail = ({ onSuccess }) => onSuccess(success);
const updateInvoicePaymentDetail = ({ onSuccess }) => onSuccess(success);
const deleteInvoicePaymentDetail = ({ onSuccess }) => onSuccess(success);

const MemoryInvoicePaymentMapping = {
  [LOAD_NEW_INVOICE_PAYMENT_DETAIL]: loadNewInvoicePaymentDetail,
  [LOAD_INVOICE_PAYMENT_DETAIL]: loadInvoicePaymentDetail,
  [LOAD_INVOICE_LIST]: loadInvoiceList,
  [CREATE_INVOICE_PAYMENT]: createInvoicePaymentDetail,
  [UPDATE_INVOICE_PAYMENT]: updateInvoicePaymentDetail,
  [DELETE_INVOICE_PAYMENT]: deleteInvoicePaymentDetail,
};

export default MemoryInvoicePaymentMapping;
