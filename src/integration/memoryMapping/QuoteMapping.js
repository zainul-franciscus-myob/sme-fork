import {
  LOAD_QUOTE_LIST, LOAD_SERVICE_QUOTE_DETAIL,
  SORT_AND_FILTER_QUOTE_LIST,
} from '../../quote/QuoteIntents';
import quoteListFilterResponse from '../data/quote/filterQuoteList';
import quoteListLoadResponse from '../data/quote/loadQuoteList';
import serviceQuoteDetailResponse from '../data/quote/quoteDetailEntry';

const sortAndFilterContactList = ({ onSuccess }) => onSuccess(quoteListFilterResponse);
const loadContactList = ({ onSuccess }) => onSuccess(quoteListLoadResponse);
const loadServiceQuoteDetail = ({ onSuccess }) => onSuccess(serviceQuoteDetailResponse);

const QuoteListMapping = {
  [LOAD_QUOTE_LIST]: loadContactList,
  [SORT_AND_FILTER_QUOTE_LIST]: sortAndFilterContactList,
  [LOAD_SERVICE_QUOTE_DETAIL]: loadServiceQuoteDetail,
};

export default QuoteListMapping;
