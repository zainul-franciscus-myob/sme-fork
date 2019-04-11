import {
  CREATE_SERVICE_QUOTE,
  DELETE_SERVICE_QUOTE,
  GET_CALCULATED_TOTALS,
  LOAD_CUSTOMER_ADDRESS,
  LOAD_NEW_SERVICE_QUOTE,
  LOAD_QUOTE_LIST,
  LOAD_SERVICE_QUOTE_DETAIL,
  SORT_AND_FILTER_QUOTE_LIST,
  UPDATE_SERVICE_QUOTE,
} from '../../quote/QuoteIntents';
import customerAddress from '../data/quote/customerAddress';
import newServiceQuoteResponse from '../data/quote/quoteDetailNewEntry';
import quoteListFilterResponse from '../data/quote/filterQuoteList';
import quoteListLoadResponse from '../data/quote/loadQuoteList';
import serviceQuoteDetailResponse from '../data/quote/quoteDetailEntry';
import successResponse from '../data/success.json';
import totalsResponse from '../data/quote/totalsResponse';

const sortAndFilterContactList = ({ onSuccess }) => onSuccess(quoteListFilterResponse);
const loadQuoteList = ({ onSuccess }) => onSuccess(quoteListLoadResponse);
const loadServiceQuoteDetail = ({ onSuccess }) => onSuccess(serviceQuoteDetailResponse);
const getCalculatedTotals = ({ onSuccess }) => onSuccess(totalsResponse);
const updateServiceQuote = ({ onSuccess }) => onSuccess(successResponse);
const deleteServiceQuote = ({ onSuccess }) => onSuccess(successResponse);
const loadNewServiceQuote = ({ onSuccess }) => onSuccess(newServiceQuoteResponse);
const loadCustomerAddress = ({ onSuccess }) => onSuccess(customerAddress);
const createServiceQuote = ({ onSuccess }) => onSuccess(successResponse);

const QuoteListMapping = {
  [LOAD_QUOTE_LIST]: loadQuoteList,
  [SORT_AND_FILTER_QUOTE_LIST]: sortAndFilterContactList,
  [LOAD_SERVICE_QUOTE_DETAIL]: loadServiceQuoteDetail,
  [GET_CALCULATED_TOTALS]: getCalculatedTotals,
  [UPDATE_SERVICE_QUOTE]: updateServiceQuote,
  [DELETE_SERVICE_QUOTE]: deleteServiceQuote,
  [LOAD_NEW_SERVICE_QUOTE]: loadNewServiceQuote,
  [LOAD_CUSTOMER_ADDRESS]: loadCustomerAddress,
  [CREATE_SERVICE_QUOTE]: createServiceQuote,
};

export default QuoteListMapping;
