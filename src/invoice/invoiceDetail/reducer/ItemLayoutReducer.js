import getDefaultState from './getDefaultState';

const safeParseNumber = (number) => {
  const realNumber = Number(number);
  return Number.isNaN(realNumber) ? '0' : number;
};

export const addInvoiceItemLine = (state, action) => {
  const { id, ...partialLine } = action.line;

  return {
    ...state,
    isPageEdited: true,
    invoice: {
      ...state.invoice,
      lines: [
        ...state.invoice.lines,
        {
          ...state.newLine,
          ...partialLine,
        },
      ],
    },
  };
};

export const removeInvoiceItemLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.filter((_, index) => index !== action.index),
  },
});

export const updateInvoiceItemLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.map((line, index) => {
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

export const formatInvoiceItemLine = (state, action) => {
  const { index, key } = action;
  const parsedNumber = safeParseNumber(state.invoice.lines[index][key]);

  return {
    ...state,
    invoice: {
      ...state.invoice,
      lines: state.invoice.lines.map(
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

export const setInvoiceItemLineDirty = (state, action) => ({
  ...state,
  isLineAmountDirty: action.isLineAmountDirty,
});

export const setInvoiceItemSubmittingState = (state, action) => ({
  ...state,
  areLinesCalculating: action.areLinesCalculating,
});

export const getInvoiceItemCalculatedLines = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    isTaxInclusive: action.invoice.isTaxInclusive,
    lines: action.invoice.lines,
  },
  totals: {
    ...state.totals,
    ...action.totals,
  },
});

export const resetInvoiceItemTotals = state => ({
  ...state,
  totals: {
    ...getDefaultState().totals,
  },
});
