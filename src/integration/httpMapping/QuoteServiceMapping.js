import {
  CREATE_SERVICE_QUOTE,
  GET_SERVICE_QUOTE_CALCULATED_TOTALS,
  LOAD_NEW_SERVICE_QUOTE,
  UPDATE_SERVICE_QUOTE,
} from '../../quote/quoteDetail/serviceQuote/ServiceQuoteIntents';

const QuoteServiceMapping = {
  [LOAD_NEW_SERVICE_QUOTE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/quote/load_new_service_quote`,
  },
  [CREATE_SERVICE_QUOTE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/create_service_quote`,
  },
  [GET_SERVICE_QUOTE_CALCULATED_TOTALS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/calculate_service_quote_detail_totals`,
  },
  [UPDATE_SERVICE_QUOTE]: {
    method: 'PUT',
    getPath: ({ businessId, quoteId }) => `/${businessId}/quote/update_service_quote_detail/${quoteId}`,
  },
};

export default QuoteServiceMapping;
