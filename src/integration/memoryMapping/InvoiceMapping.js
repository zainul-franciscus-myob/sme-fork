import {
  CALCULATE_LINE_TOTALS,
  CALCULATE_LINE_TOTALS_ON_AMOUNT_CHANGE,
  CALCULATE_LINE_TOTALS_ON_ITEM_CHANGE,
  CALCULATE_LINE_TOTALS_ON_TAX_INCLUSIVE_CHANGE,
  CREATE_INVOICE_DETAIL,
  DELETE_INVOICE_DETAIL,
  EXPORT_INVOICE_PDF,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_INVOICE_DETAIL,
  LOAD_INVOICE_LIST,
  LOAD_ITEM_OPTION,
  LOAD_NEW_DUPLICATE_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE,
  LOAD_PAY_DIRECT,
  SEND_EMAIL,
  SORT_AND_FILTER_INVOICE_LIST,
  UPDATE_INVOICE_DETAIL,
  UPLOAD_EMAIL_ATTACHMENT,
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
import loadAddedAccountResponse from '../data/invoice/serviceLayout/loadAddedAccountResponse';
import loadAddedContactResponse from '../data/invoice/loadAddedContactResponse';
import loadItemOption from '../data/invoice/loadItemOption';
import payDirect from '../data/invoice/loadPayDirect';
import successResponse from '../data/success';
import uploadEmailAttachmentResponse from '../data/invoice/uploadEmailAttachmentResponse';

const SERVICE_LAYOUT = 'service';

const InvoiceMapping = {
  [LOAD_INVOICE_LIST]: ({ onSuccess }) => onSuccess(invoiceListLoadResponse),
  [SORT_AND_FILTER_INVOICE_LIST]: ({ onSuccess }) => onSuccess(invoiceListFilterResponse),

  [LOAD_NEW_INVOICE_DETAIL]: ({ params = {}, onSuccess }) => onSuccess(
    params.layout === SERVICE_LAYOUT
      ? invoiceServiceNewDetail
      : invoiceItemNewDetail,
  ),
  [LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE]: ({ params = {}, onSuccess }) => onSuccess(
    params.layout === SERVICE_LAYOUT
      ? invoiceServiceNewDetailFromQuote
      : invoiceItemNewDetailFromQuote,
  ),
  [LOAD_NEW_DUPLICATE_INVOICE_DETAIL]: ({ params = {}, onSuccess }) => onSuccess(
    params.layout === SERVICE_LAYOUT
      ? duplicateInvoiceServiceDetail
      : duplicateInvoiceItemDetail,
  ),
  [CREATE_INVOICE_DETAIL]: ({ onSuccess }) => onSuccess({ ...successResponse, id: '1' }),
  [LOAD_INVOICE_DETAIL]: ({ onSuccess }) => onSuccess(invoiceServiceDetail),
  [UPDATE_INVOICE_DETAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [DELETE_INVOICE_DETAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [LOAD_CONTACT_ADDRESS]: ({ onSuccess }) => onSuccess(contactAddress),
  [LOAD_CONTACT_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadAddedContactResponse),
  [LOAD_PAY_DIRECT]: ({ onSuccess }) => onSuccess(payDirect),
  [CALCULATE_LINE_TOTALS_ON_TAX_INCLUSIVE_CHANGE]: ({ onSuccess }) => onSuccess(
    invoiceItemChangeItem,
  ),
  [CALCULATE_LINE_TOTALS_ON_ITEM_CHANGE]: ({ onSuccess }) => onSuccess(invoiceItemChangeItem),
  [CALCULATE_LINE_TOTALS]: ({ onSuccess }) => onSuccess(invoiceItemChangeItem),
  [CALCULATE_LINE_TOTALS_ON_AMOUNT_CHANGE]: ({ onSuccess }) => onSuccess(invoiceItemChangeItem),
  [UPLOAD_EMAIL_ATTACHMENT]: ({ onSuccess }) => onSuccess(uploadEmailAttachmentResponse),
  [SEND_EMAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [EXPORT_INVOICE_PDF]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
  [LOAD_ACCOUNT_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadAddedAccountResponse),
  [LOAD_ITEM_OPTION]: ({ onSuccess }) => onSuccess(loadItemOption),
};

export default InvoiceMapping;
