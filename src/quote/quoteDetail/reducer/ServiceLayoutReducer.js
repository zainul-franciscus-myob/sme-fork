import { getDefaultTaxCodeId, getLineByIndex } from '../selectors/QuoteDetailSelectors';
import getDefaultState from './getDefaultState';

export const addQuoteServiceLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    lines: [
      ...state.quote.lines,
      {
        ...state.newLine,
        taxCodeId: getDefaultTaxCodeId({
          ...state.newLine,
          accountId: action.line.allocatedAccountId,
        }),
        ...action.line,
      },
    ],
  },
});

export const removeLine = (lines, index) => lines.filter((line, i) => i !== index);

export const removeQuoteServiceLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    lines: removeLine(state.quote.lines, action.index),
  },
});

const getUpdatedLines = (index, lines, newLine) => lines.map((line, lineIndex) => (
  lineIndex === index ? newLine : line
));

const isAccountLineItem = lineKey => lineKey === 'allocatedAccountId';

export const updateQuoteServiceLine = (state, action) => {
  const line = getLineByIndex(state, { index: action.index });
  const newLine = {
    ...line,
    taxCodeId: isAccountLineItem(action.key)
      ? getDefaultTaxCodeId({ accountId: action.value, accountOptions: line.accountOptions })
      : line.taxCodeId,
    [action.key]: action.value,
  };

  return ({
    ...state,
    isPageEdited: true,
    quote: {
      ...state.quote,
      lines: getUpdatedLines(action.index, state.quote.lines, newLine),
    },
  });
};

const formatLineAmount = (amount) => {
  const realNumber = Number(amount);
  return (Number.isNaN(realNumber) ? '' : parseFloat(amount).toFixed(2));
};

export const formatQuoteServiceLine = (state, action) => ({
  ...state,
  quote: {
    ...state.quote,
    lines: state.quote.lines.map(
      (line, lineIndex) => (lineIndex === action.index
        ? {
          ...line,
          amount: line.amount && formatLineAmount(line.amount),
        }
        : line),
    ),
  },
});

export const getQuoteServiceCalculatedTotals = (state, action) => ({
  ...state,
  totals: action.totals,
});

export const resetQuoteServiceTotals = state => ({
  ...state,
  totals: getDefaultState().totals,
});
