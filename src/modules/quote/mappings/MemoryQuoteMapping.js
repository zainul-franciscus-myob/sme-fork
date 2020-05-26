import {
  CREATE_QUOTE_DETAIL,
  DELETE_QUOTE_DETAIL,
  EXPORT_QUOTE_PDF,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_ADDRESS,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_ITEM_AFTER_CREATE,
  LOAD_ITEM_SELLING_DETAILS,
  LOAD_JOB_AFTER_CREATE,
  LOAD_NEW_DUPLICATE_QUOTE_DETAIL,
  LOAD_NEW_QUOTE_DETAIL,
  LOAD_QUOTE_DETAIL,
  LOAD_QUOTE_LIST,
  LOAD_QUOTE_LIST_NEXT_PAGE,
  SEND_EMAIL,
  SORT_AND_FILTER_QUOTE_LIST,
  UPDATE_QUOTE_DETAIL,
  UPLOAD_EMAIL_ATTACHMENT,
} from '../QuoteIntents';
import customerAddress from './data/customerAddress';
import itemQuoteLoadItemOption from './data/itemQuoteLoadItemOption';
import loadAddedAccountResponse from './data/loadAddedAccountResponse';
import loadAddedJobResponse from './data/loadAddedJobResponse';
import loadCustomerResponse from './data/loadCustomerResponse';
import loadDuplicateQuoteDetail from './data/loadDuplicateQuoteDetail';
import loadItemSellingDetailsResponse from './data/loadItemSellingDetailsResponse';
import loadNewQuoteDetail from './data/loadNewQuoteDetail';
import loadQuoteDetail from './data/loadQuoteDetail';
import loadQuoteListNextPageResponse from './data/loadNextQuoteList';
import loadReadOnlyItemQuoteDetail from './data/loadReadOnlyItemQuoteDetail';
import loadReadOnlyServiceQuoteDetail from './data/loadReadOnlyServiceQuoteDetail';
import quoteListFilterResponse from './data/filterQuoteList';
import quoteListLoadResponse from './data/loadQuoteList';
import successResponse from './data/success.json';
import uploadEmailAttachmentResponse from './data/uploadEmailAttachmentResponse';

const MemoryQuoteMapping = {
  [LOAD_QUOTE_LIST]: ({ onSuccess }) => onSuccess(quoteListLoadResponse),
  [SORT_AND_FILTER_QUOTE_LIST]: ({ onSuccess }) => onSuccess(quoteListFilterResponse),
  [LOAD_QUOTE_LIST_NEXT_PAGE]: ({ onSuccess }) => onSuccess(loadQuoteListNextPageResponse),

  [LOAD_NEW_QUOTE_DETAIL]: ({ onSuccess }) => onSuccess(loadNewQuoteDetail),
  [LOAD_NEW_DUPLICATE_QUOTE_DETAIL]: ({ onSuccess }) => onSuccess(loadDuplicateQuoteDetail),
  [LOAD_QUOTE_DETAIL]: ({ urlParams = {}, onSuccess }) => {
    switch (urlParams.quoteId) {
      case 'service-readonly-id':
        onSuccess(loadReadOnlyServiceQuoteDetail);
        break;
      case 'item-readonly-id':
        onSuccess(loadReadOnlyItemQuoteDetail);
        break;
      default:
        onSuccess(loadQuoteDetail);
        break;
    }
  },
  [CREATE_QUOTE_DETAIL]: ({ onSuccess }) => onSuccess({ ...successResponse, id: '1' }),
  [UPDATE_QUOTE_DETAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [DELETE_QUOTE_DETAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [LOAD_CONTACT_ADDRESS]: ({ onSuccess }) => onSuccess(customerAddress),
  [LOAD_CONTACT_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadCustomerResponse),
  [LOAD_ACCOUNT_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadAddedAccountResponse),
  [LOAD_ITEM_AFTER_CREATE]: ({ onSuccess }) => onSuccess(itemQuoteLoadItemOption),
  [LOAD_JOB_AFTER_CREATE]: ({ onSuccess }) => onSuccess(loadAddedJobResponse),
  [EXPORT_QUOTE_PDF]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
  [SEND_EMAIL]: ({ onSuccess }) => onSuccess(successResponse),
  [UPLOAD_EMAIL_ATTACHMENT]: ({ onSuccess }) => onSuccess(uploadEmailAttachmentResponse),
  [LOAD_ITEM_SELLING_DETAILS]: ({ onSuccess }) => onSuccess(loadItemSellingDetailsResponse),
};

export default MemoryQuoteMapping;
