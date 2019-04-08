import {
  LOAD_QUOTE_LIST, LOAD_SERVICE_QUOTE_DETAIL,
  SORT_AND_FILTER_QUOTE_LIST,
} from '../../quote/QuoteIntents';

const QuoteListMapping = {
  [LOAD_SERVICE_QUOTE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, quoteId }) => `/${businessId}/quote/load_service_quote_detail/${quoteId}`,
  },
  [LOAD_QUOTE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/quote/load_sale_quote_list`,
  },
  [SORT_AND_FILTER_QUOTE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/quote/filter_sale_quote_list`,
  },
};

export default QuoteListMapping;
