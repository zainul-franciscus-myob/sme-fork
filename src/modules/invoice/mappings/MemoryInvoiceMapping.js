import {
  CALCULATE_LINE_TOTALS,
  CALCULATE_LINE_TOTALS_ON_AMOUNT_CHANGE,
  CALCULATE_LINE_TOTALS_ON_ITEM_CHANGE,
  CALCULATE_LINE_TOTALS_ON_TAX_INCLUSIVE_CHANGE,
  CREATE_INVOICE_DETAIL,
  DELETE_INVOICE_DETAIL,
  EXPORT_INVOICE_PDF,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ACCOUNT_OPTIONS,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_CONTACT_OPTIONS,
  LOAD_INVOICE_DETAIL,
  LOAD_INVOICE_HISTORY,
  LOAD_INVOICE_LIST,
  LOAD_ITEM_OPTION,
  LOAD_ITEM_OPTIONS,
  LOAD_ITEM_SELLING_DETAILS,
  LOAD_NEW_DUPLICATE_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE,
  LOAD_NEXT_PAGE,
  LOAD_PAY_DIRECT,
  SEND_EMAIL,
  SORT_AND_FILTER_INVOICE_LIST,
  UPDATE_INVOICE_DETAIL,
  UPLOAD_EMAIL_ATTACHMENT,
} from '../InvoiceIntents';
import contactAddress from './data/contactAddress';
import duplicateInvoiceItemDetail from './data/itemLayout/duplicateInvoiceItemDetail';
import duplicateInvoiceServiceDetail from './data/serviceLayout/duplicateInvoiceServiceDetail';
import invoiceItemChangeItem from './data/itemLayout/invoiceItemChangeItem';
import invoiceItemNewDetail from './data/itemLayout/invoiceItemNewDetail';
import invoiceItemNewDetailFromQuote from './data/itemLayout/invoiceItemNewDetailFromQuote';
import invoiceListFilterResponse from './data/filterInvoiceList';
import invoiceListLoadResponse from './data/loadInvoiceList';
import invoiceServiceDetail from './data/serviceLayout/invoiceServiceDetail';
import invoiceServiceNewDetail from './data/serviceLayout/invoiceServiceNewDetail';
import invoiceServiceNewDetailFromQuote from './data/serviceLayout/invoiceServiceNewDetailFromQuote';
import loadAccountOptions from './data/loadAccountOptions';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
import loadAddedContactResponse from './data/loadAddedContactResponse';
import loadContactOptions from './data/loadContactOptions';
import loadInvoiceHistory from './data/invoiceHistory.json';
import loadItemOption from './data/loadItemOption';
import loadItemOptions from './data/loadItemOptions';
import loadItemSellingDetailsResponse from './data/loadItemSellingDetailsResponse';
import payDirect from './data/loadPayDirect';
import successResponse from './data/success';
import uploadEmailAttachmentResponse from './data/uploadEmailAttachmentResponse';

const SERVICE_LAYOUT = 'service';

const MemoryInvoiceMapping = {
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
  [LOAD_INVOICE_HISTORY]: ({ onSuccess }) => onSuccess(loadInvoiceHistory),
  [LOAD_ACCOUNT_OPTIONS]: ({ onSuccess }) => onSuccess(loadAccountOptions),
  [LOAD_ITEM_OPTIONS]: ({ onSuccess }) => onSuccess(loadItemOptions),
  [LOAD_CONTACT_OPTIONS]: ({ onSuccess }) => onSuccess(loadContactOptions),
  [LOAD_ITEM_SELLING_DETAILS]: ({ onSuccess }) => onSuccess(loadItemSellingDetailsResponse),
  [LOAD_NEXT_PAGE]: ({ onSuccess }) => onSuccess(invoiceListFilterResponse),
};

export default MemoryInvoiceMapping;
