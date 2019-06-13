import {
  CREATE_INVOICE_SERVICE_DETAIL,
  GET_CALCULATED_INVOICE_DETAIL_TOTALS,
  LOAD_NEW_INVOICE_SERVICE_DETAIL,
  UPDATE_INVOICE_SERVICE_DETAIL,
} from '../../invoice/invoiceService/InvoiceServiceIntents';
import invoiceServiceNewDetail from '../data/invoice/invoiceServiceNewDetail';
import successMessage from '../data/success';
import totalsResponse from '../data/invoice/totalsResponse';


const loadNewInvoiceServiceDetail = ({ onSuccess }) => {
  onSuccess(invoiceServiceNewDetail);
};

const createInvoiceServiceDetail = ({ onSuccess }) => {
  onSuccess(successMessage);
};

const updateInvoiceServiceDetail = ({ onSuccess }) => {
  onSuccess(successMessage);
};


const getCalculatedTotals = ({ onSuccess }) => onSuccess(totalsResponse);

const InvoiceServiceMapping = {
  [LOAD_NEW_INVOICE_SERVICE_DETAIL]: loadNewInvoiceServiceDetail,
  [GET_CALCULATED_INVOICE_DETAIL_TOTALS]: getCalculatedTotals,
  [CREATE_INVOICE_SERVICE_DETAIL]: createInvoiceServiceDetail,
  [UPDATE_INVOICE_SERVICE_DETAIL]: updateInvoiceServiceDetail,
};

export default InvoiceServiceMapping;
