import {
  CREATE_ITEM_QUOTE,
  LOAD_NEW_ITEM_QUOTE,
  REMOVE_TABLE_ROW,
  UPDATE_ITEM_QUOTE,
  UPDATE_LINE_AMOUNT_INPUTS,
  UPDATE_LINE_ITEM,
  UPDATE_LINE_TAX_CODE,
  UPDATE_TAX_INCLUSIVE,
} from '../../quote/quoteDetail/itemQuote/ItemQuoteIntents';

const QuoteItemMapping = {
  [LOAD_NEW_ITEM_QUOTE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/quote/load_new_item_quote`,
  },
  [CREATE_ITEM_QUOTE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/create_item_quote`,
  },
  [UPDATE_ITEM_QUOTE]: {
    method: 'PUT',
    getPath: ({ businessId, quoteId }) => `/${businessId}/quote/update_item_quote/${quoteId}`,
  },
  [UPDATE_LINE_ITEM]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/calculate_item_quote_totals/update_line_item`,
  },
  [UPDATE_LINE_TAX_CODE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/calculate_item_quote_totals/update_line_tax_code`,
  },
  [UPDATE_TAX_INCLUSIVE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/calculate_item_quote_totals/update_tax_inclusive`,
  },
  [UPDATE_LINE_AMOUNT_INPUTS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/calculate_item_quote_totals/update_line_amounts`,
  },
  [REMOVE_TABLE_ROW]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/quote/calculate_item_quote_totals/remove_line`,
  },
};

export default QuoteItemMapping;
