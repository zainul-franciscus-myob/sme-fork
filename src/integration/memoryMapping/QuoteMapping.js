import {
  CALCULATE_QUOTE_ITEM_AMOUNT_CHANGE,
  CALCULATE_QUOTE_ITEM_ITEM_CHANGE,
  CALCULATE_QUOTE_ITEM_TAX_CODE_CHANGE,
  CALCULATE_QUOTE_ITEM_TAX_INCLUSIVE_CHANGE,
  CREATE_QUOTE_DETAIL,
  DELETE_QUOTE_DETAIL,
  EXPORT_QUOTE_PDF,
  GET_QUOTE_SERVICE_CALCULATED_TOTALS,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_ITEM_AFTER_CREATE,
  LOAD_NEW_DUPLICATE_QUOTE_DETAIL,
  LOAD_NEW_QUOTE_DETAIL,
  LOAD_QUOTE_DETAIL,
  LOAD_QUOTE_LIST,
  REMOVE_QUOTE_ITEM_LINE,
  SEND_EMAIL,
  SORT_AND_FILTER_QUOTE_LIST,
  UPDATE_QUOTE_DETAIL,
  UPLOAD_EMAIL_ATTACHMENT,
} from '../../quote/QuoteIntents';
import QuoteLayout from '../../quote/quoteDetail/QuoteLayout';
import customerAddress from '../data/quote/customerAddress';
import duplicateItemQuoteResponse from '../data/quote/itemLayout/duplicateItemQuoteResponse';
import duplicateServiceQuoteResponse from '../data/quote/serviceLayout/duplicateServiceQuoteResponse';
import itemQuoteDetailNewEntry from '../data/quote/itemLayout/itemQuoteDetailNewEntry';
import itemQuoteLoadItemOption from '../data/quote/itemLayout/itemQuoteLoadItemOption';
import itemQuoteRemoveTableRow from '../data/quote/itemLayout/itemQuoteRemoveTableRow';
import itemQuoteUpdateLineAmountInputs from '../data/quote/itemLayout/itemQuoteUpdateLineAmountInputs';
import itemQuoteUpdateLineItem from '../data/quote/itemLayout/itemQuoteUpdateLineItem';
import itemQuoteUpdateLineTaxCode from '../data/quote/itemLayout/itemQuoteUpdateLineTaxCode';
import itemQuoteUpdateTaxInclusive from '../data/quote/itemLayout/itemQuoteUpdateTaxInclusive';
import loadAddedAccountResponse from '../data/invoice/serviceLayout/loadAddedAccountResponse';
import loadCustomerResponse from '../data/quote/loadCustomerResponse';
import newServiceQuoteResponse from '../data/quote/serviceLayout/serviceQuoteDetailNewEntry';
import quoteDetailEntry from '../data/quote/itemLayout/itemQuoteDetailEntry';
import quoteListFilterResponse from '../data/quote/filterQuoteList';
import quoteListLoadResponse from '../data/quote/loadQuoteList';
import successResponse from '../data/success.json';
import totalsResponse from '../data/quote/serviceLayout/totalsResponse';
import uploadEmailAttachmentResponse from '../data/quote/uploadEmailAttachmentResponse';

const QuoteMapping = {
  [LOAD_QUOTE_LIST]: ({ onSuccess }) => onSuccess(quoteListLoadResponse),
  [SORT_AND_FILTER_QUOTE_LIST]: ({ onSuccess }) => onSuccess(quoteListFilterResponse),

  [LOAD_NEW_QUOTE_DETAIL]: ({ params = {}, onSuccess }) => {
    if (params.layout === QuoteLayout.SERVICE) {
      onSuccess(newServiceQuoteResponse);
    } else {
      onSuccess(itemQuoteDetailNewEntry);
    }
  },
  [LOAD_NEW_DUPLICATE_QUOTE_DETAIL]: ({ params = {}, onSuccess }) => {
    if (params.layout === QuoteLayout.SERVICE) {
      onSuccess(duplicateServiceQuoteResponse);
    } else {
      onSuccess(duplicateItemQuoteResponse);
    }
  },
  [LOAD_QUOTE_DETAIL]: ({ onSuccess }) => onSuccess(quoteDetailEntry),
  [CREATE_QUOTE_DETAIL]: ({ onSuccess }) => onSuccess({ ...successResponse, id: '1' }),
  [UPDATE_QUOTE_DETAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [DELETE_QUOTE_DETAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [GET_QUOTE_SERVICE_CALCULATED_TOTALS]: ({ onSuccess }) => onSuccess(totalsResponse),
  [CALCULATE_QUOTE_ITEM_ITEM_CHANGE]: ({ onSuccess }) => onSuccess(itemQuoteUpdateLineItem),
  [CALCULATE_QUOTE_ITEM_TAX_CODE_CHANGE]: ({ onSuccess }) => onSuccess(itemQuoteUpdateLineTaxCode),
  [CALCULATE_QUOTE_ITEM_TAX_INCLUSIVE_CHANGE]: ({ onSuccess }) => onSuccess(
    itemQuoteUpdateTaxInclusive,
  ),
  [CALCULATE_QUOTE_ITEM_AMOUNT_CHANGE]: ({ onSuccess }) => onSuccess(
    itemQuoteUpdateLineAmountInputs,
  ),
  [REMOVE_QUOTE_ITEM_LINE]: ({ onSuccess }) => onSuccess(itemQuoteRemoveTableRow),
  [LOAD_CONTACT_ADDRESS]: ({ onSuccess }) => onSuccess(customerAddress),
  [LOAD_CONTACT_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadCustomerResponse),
  [LOAD_ACCOUNT_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadAddedAccountResponse),
  [LOAD_ITEM_AFTER_CREATE]: ({ onSuccess }) => onSuccess(itemQuoteLoadItemOption),
  [EXPORT_QUOTE_PDF]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
  [SEND_EMAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [UPLOAD_EMAIL_ATTACHMENT]: ({ onSuccess }) => onSuccess(uploadEmailAttachmentResponse),
};

export default QuoteMapping;
