import {
  CREATE_INVOICE_SERVICE_DETAIL,
  GET_CALCULATED_INVOICE_DETAIL_TOTALS,
  LOAD_DUPLICATE_INVOICE_SERVICE_DETAIL,
  LOAD_NEW_INVOICE_SERVICE_DETAIL,
  LOAD_NEW_INVOICE_SERVICE_DETAIL_FROM_QUOTE,
  UPDATE_INVOICE_SERVICE_DETAIL,
} from '../../invoice/invoiceDetail/invoiceService/InvoiceServiceIntents';
import duplicateInvoiceServiceDetail from '../data/invoice/serviceLayout/duplicateInvoiceServiceDetail';
import invoiceServiceNewDetail from '../data/invoice/serviceLayout/invoiceServiceNewDetail';
import invoiceServiceNewDetailFromQuote from '../data/invoice/serviceLayout/invoiceServiceNewDetailFromQuote';
import successMessage from '../data/success';
import totalsResponse from '../data/invoice/serviceLayout/totalsResponse';


const loadNewInvoiceServiceDetail = ({ onSuccess }) => {
  onSuccess(invoiceServiceNewDetail);
};

const loadNewInvoiceServiceDetailFromQuote = ({ onSuccess }) => {
  onSuccess(invoiceServiceNewDetailFromQuote);
};

const loadDuplicateInvoiceServiceDetail = ({ onSuccess }) => {
  onSuccess(duplicateInvoiceServiceDetail);
};

const createInvoiceServiceDetail = ({ onSuccess }) => {
  onSuccess({ ...successMessage, id: '1' });
};

const updateInvoiceServiceDetail = ({ onSuccess }) => {
  onSuccess(successMessage);
};

const getCalculatedTotals = ({ onSuccess }) => onSuccess(totalsResponse);

const InvoiceServiceMapping = {
  [LOAD_NEW_INVOICE_SERVICE_DETAIL]: loadNewInvoiceServiceDetail,
  [LOAD_NEW_INVOICE_SERVICE_DETAIL_FROM_QUOTE]: loadNewInvoiceServiceDetailFromQuote,
  [LOAD_DUPLICATE_INVOICE_SERVICE_DETAIL]: loadDuplicateInvoiceServiceDetail,
  [GET_CALCULATED_INVOICE_DETAIL_TOTALS]: getCalculatedTotals,
  [CREATE_INVOICE_SERVICE_DETAIL]: createInvoiceServiceDetail,
  [UPDATE_INVOICE_SERVICE_DETAIL]: updateInvoiceServiceDetail,
};

export default InvoiceServiceMapping;
