import {
  CALCULATE_QUOTE_AMOUNT_CHANGE,
  CALCULATE_QUOTE_ITEM_CHANGE,
  CALCULATE_QUOTE_LINE_TOTALS,
  CALCULATE_QUOTE_TAX_INCLUSIVE_CHANGE,
  CREATE_QUOTE_DETAIL,
  DELETE_QUOTE_DETAIL,
  EXPORT_QUOTE_PDF,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_ITEM_AFTER_CREATE,
  LOAD_NEW_DUPLICATE_QUOTE_DETAIL,
  LOAD_NEW_QUOTE_DETAIL,
  LOAD_QUOTE_DETAIL,
  LOAD_QUOTE_LIST,
  SEND_EMAIL,
  SORT_AND_FILTER_QUOTE_LIST,
  UPDATE_QUOTE_DETAIL,
  UPLOAD_EMAIL_ATTACHMENT,
} from '../../modules/quote/QuoteIntents';
import customerAddress from '../data/quote/customerAddress';
import itemQuoteLoadItemOption from '../data/quote/itemLayout/itemQuoteLoadItemOption';
import itemQuoteUpdateLineAmountInputs from '../data/quote/itemLayout/itemQuoteUpdateLineAmountInputs';
import itemQuoteUpdateLineItem from '../data/quote/itemLayout/itemQuoteUpdateLineItem';
import itemQuoteUpdateLineTaxCode from '../data/quote/itemLayout/itemQuoteUpdateLineTaxCode';
import itemQuoteUpdateTaxInclusive from '../data/quote/itemLayout/itemQuoteUpdateTaxInclusive';
import loadAddedAccountResponse from '../data/invoice/serviceLayout/loadAddedAccountResponse';
import loadCustomerResponse from '../data/quote/loadCustomerResponse';
import loadDuplicateQuoteDetail from '../data/quote/loadDuplicateQuoteDetail';
import loadNewQuoteDetail from '../data/quote/loadNewQuoteDetail';
import loadQuoteDetail from '../data/quote/loadQuoteDetail';
import quoteListFilterResponse from '../data/quote/filterQuoteList';
import quoteListLoadResponse from '../data/quote/loadQuoteList';
import successResponse from '../data/success.json';
import uploadEmailAttachmentResponse from '../data/quote/uploadEmailAttachmentResponse';

const QuoteMapping = {
  [LOAD_QUOTE_LIST]: ({ onSuccess }) => onSuccess(quoteListLoadResponse),
  [SORT_AND_FILTER_QUOTE_LIST]: ({ onSuccess }) => onSuccess(quoteListFilterResponse),

  [LOAD_NEW_QUOTE_DETAIL]: ({ onSuccess }) => onSuccess(loadNewQuoteDetail),
  [LOAD_NEW_DUPLICATE_QUOTE_DETAIL]: ({ onSuccess }) => onSuccess(loadDuplicateQuoteDetail),
  [LOAD_QUOTE_DETAIL]: ({ onSuccess }) => onSuccess(loadQuoteDetail),
  [CREATE_QUOTE_DETAIL]: ({ onSuccess }) => onSuccess({ ...successResponse, id: '1' }),
  [UPDATE_QUOTE_DETAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [DELETE_QUOTE_DETAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [CALCULATE_QUOTE_LINE_TOTALS]: ({ onSuccess }) => onSuccess(itemQuoteUpdateLineTaxCode),
  [CALCULATE_QUOTE_ITEM_CHANGE]: ({ onSuccess }) => onSuccess(itemQuoteUpdateLineItem),
  [CALCULATE_QUOTE_TAX_INCLUSIVE_CHANGE]: ({ onSuccess }) => onSuccess(
    itemQuoteUpdateTaxInclusive,
  ),
  [CALCULATE_QUOTE_AMOUNT_CHANGE]: ({ onSuccess }) => onSuccess(
    itemQuoteUpdateLineAmountInputs,
  ),
  [LOAD_CONTACT_ADDRESS]: ({ onSuccess }) => onSuccess(customerAddress),
  [LOAD_CONTACT_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadCustomerResponse),
  [LOAD_ACCOUNT_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadAddedAccountResponse),
  [LOAD_ITEM_AFTER_CREATE]: ({ onSuccess }) => onSuccess(itemQuoteLoadItemOption),
  [EXPORT_QUOTE_PDF]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
  [SEND_EMAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [UPLOAD_EMAIL_ATTACHMENT]: ({ onSuccess }) => onSuccess(uploadEmailAttachmentResponse),
};

export default QuoteMapping;
