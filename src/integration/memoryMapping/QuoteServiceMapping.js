import {
  CREATE_SERVICE_QUOTE,
  GET_SERVICE_QUOTE_CALCULATED_TOTALS,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_DUPLICATE_SERVICE_QUOTE,
  LOAD_NEW_SERVICE_QUOTE,
  UPDATE_SERVICE_QUOTE,
} from '../../quote/quoteDetail/serviceQuote/ServiceQuoteIntents';
import duplicateServiceQuoteResponse from '../data/quote/serviceLayout/duplicateServiceQuoteResponse';
import loadAddedAccountResponse from '../data/invoice/serviceLayout/loadAddedAccountResponse';
import newServiceQuoteResponse from '../data/quote/serviceLayout/serviceQuoteDetailNewEntry';
import successResponse from '../data/success.json';
import totalsResponse from '../data/quote/serviceLayout/totalsResponse';


const updateServiceQuote = ({ onSuccess }) => onSuccess(successResponse);
const loadNewServiceQuote = ({ onSuccess }) => onSuccess(newServiceQuoteResponse);
const loadDuplicateServiceQuote = ({ onSuccess }) => onSuccess(duplicateServiceQuoteResponse);
const createServiceQuote = ({ onSuccess }) => onSuccess({ ...successResponse, id: '1' });
const getCalculatedTotals = ({ onSuccess }) => onSuccess(totalsResponse);
const loadAccountAfterCreate = ({ onSuccess }) => onSuccess(loadAddedAccountResponse);

const QuoteServiceMapping = {
  [UPDATE_SERVICE_QUOTE]: updateServiceQuote,
  [LOAD_NEW_SERVICE_QUOTE]: loadNewServiceQuote,
  [LOAD_DUPLICATE_SERVICE_QUOTE]: loadDuplicateServiceQuote,
  [CREATE_SERVICE_QUOTE]: createServiceQuote,
  [GET_SERVICE_QUOTE_CALCULATED_TOTALS]: getCalculatedTotals,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
};

export default QuoteServiceMapping;
