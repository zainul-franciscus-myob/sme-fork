import {
  LOAD_QUOTE_LIST,
  SORT_AND_FILTER_QUOTE_LIST,
} from '../../quote/QuoteIntents';

const QuoteListMapping = {
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
