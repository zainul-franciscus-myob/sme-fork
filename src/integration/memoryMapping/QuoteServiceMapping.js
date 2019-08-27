import {
  CREATE_SERVICE_QUOTE,
  GET_SERVICE_QUOTE_CALCULATED_TOTALS,
  LOAD_DUPLICATE_SERVICE_QUOTE,
  LOAD_NEW_SERVICE_QUOTE,
  UPDATE_SERVICE_QUOTE,
} from '../../quote/quoteDetail/serviceQuote/ServiceQuoteIntents';
import duplicateServiceQuoteResponse from '../data/quote/serviceLayout/duplicateServiceQuoteResponse';
import newServiceQuoteResponse from '../data/quote/serviceLayout/serviceQuoteDetailNewEntry';
import successResponse from '../data/success.json';
import totalsResponse from '../data/quote/serviceLayout/totalsResponse';

const updateServiceQuote = ({ onSuccess }) => onSuccess(successResponse);
const loadNewServiceQuote = ({ onSuccess }) => onSuccess(newServiceQuoteResponse);
const loadDuplicateServiceQuote = ({ onSuccess }) => onSuccess(duplicateServiceQuoteResponse);
const createServiceQuote = ({ onSuccess }) => onSuccess({ ...successResponse, id: '1' });
const getCalculatedTotals = ({ onSuccess }) => onSuccess(totalsResponse);

const QuoteServiceMapping = {
  [UPDATE_SERVICE_QUOTE]: updateServiceQuote,
  [LOAD_NEW_SERVICE_QUOTE]: loadNewServiceQuote,
  [LOAD_DUPLICATE_SERVICE_QUOTE]: loadDuplicateServiceQuote,
  [CREATE_SERVICE_QUOTE]: createServiceQuote,
  [GET_SERVICE_QUOTE_CALCULATED_TOTALS]: getCalculatedTotals,
};

export default QuoteServiceMapping;
