import {
  LOAD_QUOTE_LIST,
  SORT_AND_FILTER_QUOTE_LIST,
} from '../../quote/QuoteIntents';
import quoteListFilterResponse from '../data/quote/filterQuoteList';
import quoteListLoadResponse from '../data/quote/loadQuoteList';

const sortAndFilterContactList = ({ onSuccess }) => onSuccess(quoteListFilterResponse);
const loadContactList = ({ onSuccess }) => onSuccess(quoteListLoadResponse);

const QuoteListMapping = {
  [LOAD_QUOTE_LIST]: loadContactList,
  [SORT_AND_FILTER_QUOTE_LIST]: sortAndFilterContactList,
};

export default QuoteListMapping;
