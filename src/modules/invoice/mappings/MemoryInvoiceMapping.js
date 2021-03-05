import {
  CREATE_INVOICE_DETAIL,
  CREATE_PRE_CONVERSION_INVOICE_DETAIL,
  DELETE_INVOICE_DETAIL,
  DELETE_PRE_CONVERSION_INVOIVE_DETAIL,
  EXPORT_INVOICE_PDF,
  LOAD_ABN_FROM_CUSTOMER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ACCOUNT_OPTIONS,
  LOAD_CUSTOMER,
  LOAD_CUSTOMER_QUOTES,
  LOAD_INVOICE_DETAIL,
  LOAD_INVOICE_HISTORY,
  LOAD_INVOICE_LIST,
  LOAD_ITEM_SELLING_DETAILS,
  LOAD_NEW_DUPLICATE_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL,
  LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE,
  LOAD_NEXT_PAGE,
  LOAD_PAYMENT_SETTINGS,
  LOAD_PAY_DIRECT,
  LOAD_PREFILL_FROM_RECURRING_INVOICE,
  SAVE_EMAIL_SETTINGS,
  SEND_EINVOICE,
  SEND_EMAIL,
  SORT_AND_FILTER_INVOICE_LIST,
  UPDATE_INVOICE_DETAIL,
  UPDATE_PAYMENT_OPTIONS,
  UPDATE_PRE_CONVERSION_INVOICE_DETAIL,
  UPLOAD_EMAIL_ATTACHMENT,
} from '../InvoiceIntents';
import customerAddress from './data/loadCustomer';
import duplicateInvoiceItemDetail from './data/itemLayout/duplicateInvoiceItemDetail';
import duplicateInvoiceServiceDetail from './data/serviceLayout/duplicateInvoiceServiceDetail';
import invoiceItemDetail from './data/itemLayout/invoiceItemDetail';
import invoiceItemDetailWithFreight from './data/itemLayout/invoiceItemDetailWithFreight';
import invoiceItemNewDetail from './data/itemLayout/invoiceItemNewDetail';
import invoiceItemNewDetailFromQuote from './data/itemLayout/invoiceItemNewDetailFromQuote';
import invoiceItemReadOnlyDetail from './data/itemLayout/invoiceItemReadOnlyDetail';
import invoiceListFilterResponse from './data/filterInvoiceList';
import invoiceListLoadResponse from './data/loadInvoiceList';
import invoiceServiceDetail from './data/serviceLayout/invoiceServiceDetail';
import invoiceServiceDetailWithFreight from './data/serviceLayout/invoiceServiceDetailWithFreight';
import invoiceServiceNewDetail from './data/serviceLayout/invoiceServiceNewDetail';
import invoiceServiceNewDetailFromQuote from './data/serviceLayout/invoiceServiceNewDetailFromQuote';
import invoiceServiceReadOnlyDetail from './data/serviceLayout/invoiceServiceReadOnlyDetail';
import loadAbnDetail from './data/loadAbn.json';
import loadAccountOptions from './data/loadAccountOptions';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
import loadCustomerQuotesResponse from './data/loadCustomerQuotesResponse';
import loadInvoiceHistory from './data/invoiceHistory.json';
import loadItemSellingDetailsResponse from './data/loadItemSellingDetailsResponse';
import loadPrefillFromRecurringInvoiceResponse from './data/loadPrefillFromRecurringInvoiceResponse';
import payDirect from './data/loadPayDirect';
import saveEmailSettingsSuccessResponse from './data/saveEmailSettingsSuccessResponse';
import successResponse from './data/success';
import uploadEmailAttachmentResponse from './data/uploadEmailAttachmentResponse';

const SERVICE_LAYOUT = 'service';

const MemoryInvoiceMapping = {
  [LOAD_INVOICE_LIST]: ({ onSuccess }) => onSuccess(invoiceListLoadResponse),
  [SORT_AND_FILTER_INVOICE_LIST]: ({ onSuccess }) =>
    onSuccess(invoiceListFilterResponse),

  [LOAD_NEW_INVOICE_DETAIL]: ({ params = {}, onSuccess }) =>
    onSuccess(
      params.layout === SERVICE_LAYOUT
        ? invoiceServiceNewDetail
        : invoiceItemNewDetail
    ),
  [LOAD_NEW_INVOICE_DETAIL_FROM_QUOTE]: ({ params = {}, onSuccess }) =>
    onSuccess(
      params.layout === SERVICE_LAYOUT
        ? invoiceServiceNewDetailFromQuote
        : invoiceItemNewDetailFromQuote
    ),
  [LOAD_NEW_DUPLICATE_INVOICE_DETAIL]: ({ params = {}, onSuccess }) =>
    onSuccess(
      params.layout === SERVICE_LAYOUT
        ? duplicateInvoiceServiceDetail
        : duplicateInvoiceItemDetail
    ),
  [CREATE_INVOICE_DETAIL]: ({ onSuccess }) =>
    onSuccess({ ...successResponse, id: '1' }),
  [LOAD_INVOICE_DETAIL]: ({ urlParams = {}, onSuccess }) => {
    switch (urlParams.invoiceId) {
      case 'service-readonly-id':
        onSuccess(invoiceServiceReadOnlyDetail);
        break;
      case 'service-freight-id':
        onSuccess(invoiceServiceDetailWithFreight);
        break;
      case 'item-readonly-id':
        onSuccess(invoiceItemReadOnlyDetail);
        break;
      case 'item-freight-id':
        onSuccess(invoiceItemDetailWithFreight);
        break;
      case 'item-id':
        onSuccess(invoiceItemDetail);
        break;
      case 'pre-conversion-id':
        onSuccess({
          ...invoiceServiceDetail,
          invoice: {
            ...invoiceServiceDetail.invoice,
            issueDate: '2013-03-05',
            lines: [invoiceServiceDetail.invoice.lines[0]],
          },
          conversionDate: '2014-07-01',
        });
        break;
      case 'service-id':
      default:
        onSuccess(invoiceServiceDetail);
        break;
    }
  },
  [UPDATE_INVOICE_DETAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [DELETE_INVOICE_DETAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [LOAD_CUSTOMER]: ({ onSuccess }) => onSuccess(customerAddress),
  [LOAD_PAY_DIRECT]: ({ onSuccess }) => onSuccess(payDirect),
  [UPLOAD_EMAIL_ATTACHMENT]: ({ onSuccess }) =>
    onSuccess(uploadEmailAttachmentResponse),
  [SEND_EMAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [SAVE_EMAIL_SETTINGS]: ({ onSuccess }) =>
    onSuccess(saveEmailSettingsSuccessResponse),
  [SEND_EINVOICE]: ({ onSuccess }) => onSuccess(successResponse),
  [EXPORT_INVOICE_PDF]: ({ onSuccess }) =>
    onSuccess(new Blob([], { type: 'application/pdf' })),
  [LOAD_ACCOUNT_AFTER_CREATE]: ({ onSuccess }) =>
    onSuccess(loadAddedAccountResponse),
  [LOAD_INVOICE_HISTORY]: ({ onSuccess }) => onSuccess(loadInvoiceHistory),
  [LOAD_ACCOUNT_OPTIONS]: ({ onSuccess }) => onSuccess(loadAccountOptions),
  [LOAD_ITEM_SELLING_DETAILS]: ({ onSuccess }) =>
    onSuccess(loadItemSellingDetailsResponse),
  [LOAD_NEXT_PAGE]: ({ onSuccess }) => onSuccess(invoiceListFilterResponse),
  [CREATE_PRE_CONVERSION_INVOICE_DETAIL]: ({ onSuccess }) =>
    onSuccess({ ...successResponse, id: '1' }),
  [UPDATE_PRE_CONVERSION_INVOICE_DETAIL]: ({ onSuccess }) =>
    onSuccess(successResponse),
  [DELETE_PRE_CONVERSION_INVOIVE_DETAIL]: ({ onSuccess }) =>
    onSuccess(successResponse),
  [LOAD_ABN_FROM_CUSTOMER]: ({ onSuccess }) => onSuccess(loadAbnDetail),
  [LOAD_CUSTOMER_QUOTES]: ({ onSuccess }) =>
    onSuccess(loadCustomerQuotesResponse),
  [LOAD_PREFILL_FROM_RECURRING_INVOICE]: ({ onSuccess }) =>
    onSuccess(loadPrefillFromRecurringInvoiceResponse),
  [UPDATE_PAYMENT_OPTIONS]: ({ onSuccess }) => onSuccess(successResponse),
  [LOAD_PAYMENT_SETTINGS]: ({ onSuccess }) =>
    onSuccess({ hasUpdatedPaymentSettings: false }),
};

export default MemoryInvoiceMapping;
