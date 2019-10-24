import {
  CALCULATE_INVOICE_ITEM_LINES_CHANGE,
  CALCULATE_INVOICE_ITEM_LINE_INPUT_CHANGE,
  CALCULATE_INVOICE_ITEM_LINE_TAX_CODE_CHANGE,
  CALCULATE_INVOICE_ITEM_TAX_INCLUSIVE_CHANGE,
  CREATE_INVOICE_DETAIL,
  DELETE_INVOICE_DETAIL,
  GET_INVOICE_SERVICE_CALCULATED_TOTALS,
  LOAD_CONTACT_ADDRESS,
  LOAD_INVOICE_DETAIL,
  LOAD_INVOICE_LIST,
  LOAD_NEW_DUPLICATE_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE,
  LOAD_PAY_DIRECT,
  REMOVE_INVOICE_ITEM_LINE,
  SEND_EMAIL,
  SORT_AND_FILTER_INVOICE_LIST,
  UPDATE_INVOICE_DETAIL,
} from '../../invoice/InvoiceIntents';
import contactAddress from '../data/invoice/contactAddress';
import duplicateInvoiceItemDetail from '../data/invoice/itemLayout/duplicateInvoiceItemDetail';
import duplicateInvoiceServiceDetail from '../data/invoice/serviceLayout/duplicateInvoiceServiceDetail';
import invoiceItemChangeItem from '../data/invoice/itemLayout/invoiceItemChangeItem';
import invoiceItemNewDetail from '../data/invoice/itemLayout/invoiceItemNewDetail';
import invoiceItemNewDetailFromQuote from '../data/invoice/itemLayout/invoiceItemNewDetailFromQuote';
import invoiceListFilterResponse from '../data/invoice/filterInvoiceList';
import invoiceListLoadResponse from '../data/invoice/loadInvoiceList';
import invoiceServiceDetail from '../data/invoice/serviceLayout/invoiceServiceDetail';
import invoiceServiceNewDetail from '../data/invoice/serviceLayout/invoiceServiceNewDetail';
import invoiceServiceNewDetailFromQuote from '../data/invoice/serviceLayout/invoiceServiceNewDetailFromQuote';
import invoiceServiceTotals from '../data/invoice/serviceLayout/totalsResponse';
import payDirect from '../data/invoice/loadPayDirect';
import successResponse from '../data/success';

const SERVICE_LAYOUT = 'service';

const InvoiceMapping = {
  [LOAD_INVOICE_LIST]: ({ onSuccess }) => onSuccess(invoiceListLoadResponse),
  [SORT_AND_FILTER_INVOICE_LIST]: ({ onSuccess }) => onSuccess(invoiceListFilterResponse),

  [LOAD_NEW_INVOICE_DETAIL]: ({ params = {}, onSuccess }) => onSuccess(
    params.layout === SERVICE_LAYOUT ? invoiceServiceNewDetail : invoiceItemNewDetail,
  ),
  [LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE]: ({ params = {}, onSuccess }) => onSuccess(
    params.layout === SERVICE_LAYOUT
      ? invoiceServiceNewDetailFromQuote : invoiceItemNewDetailFromQuote,
  ),
  [LOAD_NEW_DUPLICATE_INVOICE_DETAIL]: ({ params = {}, onSuccess }) => onSuccess(
    params.layout === SERVICE_LAYOUT
      ? duplicateInvoiceServiceDetail : duplicateInvoiceItemDetail,
  ),
  [CREATE_INVOICE_DETAIL]: ({ onSuccess }) => onSuccess({ ...successResponse, id: '1' }),
  [LOAD_INVOICE_DETAIL]: ({ onSuccess }) => onSuccess(invoiceServiceDetail),
  [UPDATE_INVOICE_DETAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [DELETE_INVOICE_DETAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [LOAD_CONTACT_ADDRESS]: ({ onSuccess }) => onSuccess(contactAddress),
  [LOAD_PAY_DIRECT]: ({ onSuccess }) => onSuccess(payDirect),
  [GET_INVOICE_SERVICE_CALCULATED_TOTALS]: ({ onSuccess }) => onSuccess(invoiceServiceTotals),
  [REMOVE_INVOICE_ITEM_LINE]: ({ onSuccess }) => onSuccess(invoiceItemChangeItem),
  [CALCULATE_INVOICE_ITEM_TAX_INCLUSIVE_CHANGE]: ({ onSuccess }) => onSuccess(
    invoiceItemChangeItem,
  ),
  [CALCULATE_INVOICE_ITEM_LINES_CHANGE]: ({ onSuccess }) => onSuccess(invoiceItemChangeItem),
  [CALCULATE_INVOICE_ITEM_LINE_TAX_CODE_CHANGE]: ({ onSuccess }) => onSuccess(
    invoiceItemChangeItem,
  ),
  [CALCULATE_INVOICE_ITEM_LINE_INPUT_CHANGE]: ({ onSuccess }) => onSuccess(invoiceItemChangeItem),
  [SEND_EMAIL]: ({ onSuccess }) => onSuccess(successResponse),
};

export default InvoiceMapping;
