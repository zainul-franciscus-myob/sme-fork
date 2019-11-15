import { getDefaultTaxCodeId } from '../selectors/invoiceDetailSelectors';
import { getLineByIndex } from '../selectors/serviceLayoutSelectors';
import getDefaultState from './getDefaultState';

const isAccountLineItem = lineKey => lineKey === 'allocatedAccountId';

const getUpdatedLines = (index, lines, newLine) => lines.map((line, lineIndex) => (
  lineIndex === index ? newLine : line
));

const removeLine = (lines, index) => lines.filter((line, i) => i !== index);

const formatLineAmount = amount => (Number(amount) ? parseFloat(amount).toFixed(2) : '');

export const addInvoiceServiceLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: [
      ...state.invoice.lines,
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

export const loadAccountAfterCreate = (state, { intent, ...account }) => ({
  ...state,
  invoice: {
    ...state.invoice,
    lines: state.invoice.lines.map(line => ({
      ...line,
      accountOptions: [account, ...line.accountOptions],
    })),
  },
  newLine: {
    ...state.newLine,
    accountOptions: [account, ...state.newLine.accountOptions],
  },
  isPageEdited: true,
});

export const setAccountLoadingState = (state, { isAccountLoading }) => (
  { ...state, isAccountLoading }
);

export const removeInvoiceServiceLine = (state, action) => ({
  ...state,
  isPageEdited: true,
  invoice: {
    ...state.invoice,
    lines: removeLine(state.invoice.lines, action.index),
  },
});

export const updateInvoiceServiceLine = (state, action) => {
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
    invoice: {
      ...state.invoice,
      lines: getUpdatedLines(action.index, state.invoice.lines, newLine),
    },
  });
};

export const formatInvoiceServiceLine = (state, action) => {
  const line = getLineByIndex(state, { index: action.index });
  if (line) {
    const newLine = {
      ...line,
      amount: line.amount && formatLineAmount(line.amount),
    };

    return {
      ...state,
      invoice: {
        ...state.invoice,
        lines: getUpdatedLines(action.index, state.invoice.lines, newLine),
      },
    };
  }

  return state;
};

export const getInvoiceServiceCalculatedTotals = (state, action) => ({
  ...state,
  totals: action.totals,
});

export const resetInvoiceServiceTotals = state => ({
  ...state,
  totals: getDefaultState().totals,
});
