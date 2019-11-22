export const addQuoteItemLine = (state, action) => {
  const { id, ...partialLine } = action.row;

  return {
    ...state,
    isPageEdited: true,
    quote: {
      ...state.quote,
      lines: [
        ...state.quote.lines,
        {
          ...state.newLine,
          ...partialLine,
        },
      ],
    },
  };
};

export const removeQuoteItemLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    lines: state.quote.lines.filter((_, index) => index !== action.index),
  },
});

export const updateQuoteItemLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  quote: {
    ...state.quote,
    lines: state.quote.lines.map((line, index) => {
      if (index === action.index) {
        return {
          ...line,
          [action.key]: action.value,
          displayDiscount: action.key === 'discount' ? action.value : line.displayDiscount,
          displayAmount: action.key === 'amount' ? action.value : line.displayAmount,
        };
      }
      return line;
    }),
  },
});

const safeParseNumber = (number) => {
  const realNumber = Number(number);
  return Number.isNaN(realNumber) ? '0' : number;
};

export const formatQuoteItemLine = (state, action) => {
  const { index, key } = action;
  const parsedNumber = safeParseNumber(state.quote.lines[index][key]);

  return {
    ...state,
    quote: {
      ...state.quote,
      lines: state.quote.lines.map(
        (line, lineIndex) => (lineIndex === index
          ? {
            ...line,
            [key]: parsedNumber,
          }
          : line),
      ),
    },
  };
};

export const setQuoteItemSubmittingState = (state, action) => ({
  ...state,
  isCalculating: action.isCalculating,
});

export const setQuoteItemLineDirty = (state, action) => ({
  ...state,
  isLineAmountInputDirty: action.isLineAmountInputDirty,
});

export const setQuoteItemCalculatedLines = (state, action) => ({
  ...state,
  quote: {
    ...state.quote,
    lines: action.quote.lines,
  },
  totals: action.totals,
});
