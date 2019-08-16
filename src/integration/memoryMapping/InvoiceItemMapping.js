import {
  CALCULATE_LINE, CREATE_INVOICE_ITEM_DETAIL,
  LOAD_NEW_INVOICE_ITEM_DETAIL,
  LOAD_NEW_INVOICE_ITEM_DETAIL_FROM_QUOTE,
  REMOVE_LINE, UPDATE_INVOICE_ITEM_DETAIL,
  UPDATE_INVOICE_ITEM_TAX_INCLUSIVE,
  UPDATE_LINE_ITEM, UPDATE_LINE_TAX_CODE,
} from '../../invoice/invoiceDetail/invoiceItem/InvoiceItemIntents';
import invoiceItemChangeItem from '../data/invoice/itemLayout/invoiceItemChangeItem';
import invoiceItemNewDetail from '../data/invoice/itemLayout/invoiceItemNewDetail';
import invoiceItemNewDetailFromQuote from '../data/invoice/itemLayout/invoiceItemNewDetailFromQuote';
import successResponse from '../data/success';

const loadNewInvoiceItemDetail = ({ onSuccess }) => onSuccess(invoiceItemNewDetail);

const loadNewInvoiceItemDetailFromQuote = ({ onSuccess }) => onSuccess(
  invoiceItemNewDetailFromQuote,
);

const updateInvoiceItemTaxInclusive = ({ onSuccess }) => onSuccess(invoiceItemChangeItem);

const createInvoiceItemDetail = ({ onSuccess }) => onSuccess({
  ...successResponse,
  id: '2',
});

const updateInvoiceItemDetail = ({ onSuccess }) => onSuccess(successResponse);

const updateLineItem = ({ onSuccess }) => onSuccess(invoiceItemChangeItem);

const updateLineTaxCode = ({ onSuccess }) => onSuccess(invoiceItemChangeItem);

const removeLine = ({ onSuccess }) => onSuccess(invoiceItemChangeItem);

const calculateLine = ({ onSuccess }) => onSuccess(invoiceItemChangeItem);

const InvoiceItemMapping = {
  [LOAD_NEW_INVOICE_ITEM_DETAIL]: loadNewInvoiceItemDetail,
  [LOAD_NEW_INVOICE_ITEM_DETAIL_FROM_QUOTE]: loadNewInvoiceItemDetailFromQuote,
  [UPDATE_INVOICE_ITEM_TAX_INCLUSIVE]: updateInvoiceItemTaxInclusive,
  [CREATE_INVOICE_ITEM_DETAIL]: createInvoiceItemDetail,
  [UPDATE_INVOICE_ITEM_DETAIL]: updateInvoiceItemDetail,
  [UPDATE_LINE_ITEM]: updateLineItem,
  [UPDATE_LINE_TAX_CODE]: updateLineTaxCode,
  [REMOVE_LINE]: removeLine,
  [CALCULATE_LINE]: calculateLine,
};

export default InvoiceItemMapping;
