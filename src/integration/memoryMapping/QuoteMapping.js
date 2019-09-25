import {
  DELETE_QUOTE_DETAIL,
  EXPORT_QUOTE_PDF,
  LOAD_CUSTOMER_ADDRESS,
  LOAD_QUOTE_DETAIL,
  LOAD_QUOTE_LIST,
  SORT_AND_FILTER_QUOTE_LIST,
} from '../../quote/QuoteIntents';
import customerAddress from '../data/quote/customerAddress';
import quoteDetailEntry from '../data/quote/itemLayout/itemQuoteDetailEntry';
import quoteListFilterResponse from '../data/quote/filterQuoteList';
import quoteListLoadResponse from '../data/quote/loadQuoteList';
import successResponse from '../data/success.json';

const sortAndFilterContactList = ({ onSuccess }) => onSuccess(quoteListFilterResponse);
const loadQuoteList = ({ onSuccess }) => onSuccess(quoteListLoadResponse);
const loadQuoteDetail = ({ onSuccess }) => onSuccess(quoteDetailEntry);
const loadCustomerAddress = ({ onSuccess }) => onSuccess(customerAddress);
const deleteQuoteDetail = ({ onSuccess }) => onSuccess(successResponse);
const exportQuotePdf = ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' }));

const QuoteMapping = {
  [LOAD_QUOTE_LIST]: loadQuoteList,
  [SORT_AND_FILTER_QUOTE_LIST]: sortAndFilterContactList,
  [LOAD_QUOTE_DETAIL]: loadQuoteDetail,
  [DELETE_QUOTE_DETAIL]: deleteQuoteDetail,
  [LOAD_CUSTOMER_ADDRESS]: loadCustomerAddress,
  [EXPORT_QUOTE_PDF]: exportQuotePdf,
};

export default QuoteMapping;
