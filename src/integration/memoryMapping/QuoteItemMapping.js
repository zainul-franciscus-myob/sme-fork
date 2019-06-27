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
import itemQuoteDetailNewEntry from '../data/quote/itemQuoteDetailNewEntry';
import itemQuoteRemoveTableRow from '../data/quote/itemQuoteRemoveTableRow';
import itemQuoteUpdateLineAmountInputs from '../data/quote/itemQuoteUpdateLineAmountInputs';
import itemQuoteUpdateLineItem from '../data/quote/itemQuoteUpdateLineItem';
import itemQuoteUpdateLineTaxCode from '../data/quote/itemQuoteUpdateLineTaxCode';
import itemQuoteUpdateTaxInclusive from '../data/quote/itemQuoteUpdateTaxInclusive';
import successResponse from '../data/success.json';

const loadNewItemQuoteDetail = ({ onSuccess }) => onSuccess(itemQuoteDetailNewEntry);
const createItemQuoteDetail = ({ onSuccess }) => onSuccess(successResponse);
const updateItemQuoteDetail = ({ onSuccess }) => onSuccess(successResponse);
const updateLineItem = ({ onSuccess }) => onSuccess(itemQuoteUpdateLineItem);
const updateLineTaxCode = ({ onSuccess }) => onSuccess(itemQuoteUpdateLineTaxCode);
const updateTaxInclusive = ({ onSuccess }) => onSuccess(itemQuoteUpdateTaxInclusive);
const updateLineAmountInputs = ({ onSuccess }) => onSuccess(itemQuoteUpdateLineAmountInputs);
const removeTableRow = ({ onSuccess }) => onSuccess(itemQuoteRemoveTableRow);

const QuoteItemMapping = {
  [LOAD_NEW_ITEM_QUOTE]: loadNewItemQuoteDetail,
  [CREATE_ITEM_QUOTE]: createItemQuoteDetail,
  [UPDATE_ITEM_QUOTE]: updateItemQuoteDetail,
  [UPDATE_LINE_ITEM]: updateLineItem,
  [UPDATE_LINE_TAX_CODE]: updateLineTaxCode,
  [UPDATE_TAX_INCLUSIVE]: updateTaxInclusive,
  [UPDATE_LINE_AMOUNT_INPUTS]: updateLineAmountInputs,
  [REMOVE_TABLE_ROW]: removeTableRow,
};

export default QuoteItemMapping;
