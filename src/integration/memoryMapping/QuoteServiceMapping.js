import {
  CREATE_SERVICE_QUOTE,
  GET_SERVICE_QUOTE_CALCULATED_TOTALS,
  LOAD_NEW_SERVICE_QUOTE,
  UPDATE_SERVICE_QUOTE,
} from '../../quote/quoteDetail/serviceQuote/ServiceQuoteIntents';
import newServiceQuoteResponse from '../data/quote/quoteDetailNewEntry';
import successResponse from '../data/success.json';
import totalsResponse from '../data/quote/totalsResponse';

const updateServiceQuote = ({ onSuccess }) => onSuccess(successResponse);
const loadNewServiceQuote = ({ onSuccess }) => onSuccess(newServiceQuoteResponse);
const createServiceQuote = ({ onSuccess }) => onSuccess(successResponse);
const getCalculatedTotals = ({ onSuccess }) => onSuccess(totalsResponse);

const QuoteServiceMapping = {
  [UPDATE_SERVICE_QUOTE]: updateServiceQuote,
  [LOAD_NEW_SERVICE_QUOTE]: loadNewServiceQuote,
  [CREATE_SERVICE_QUOTE]: createServiceQuote,
  [GET_SERVICE_QUOTE_CALCULATED_TOTALS]: getCalculatedTotals,
};

export default QuoteServiceMapping;
