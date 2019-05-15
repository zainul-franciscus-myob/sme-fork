import { allocateTransaction } from './singleAllocationHandlers';
import { getDefaultTaxCodeId, getTotalAmount } from '../bankingSelectors/splitAllocationSelectors';
import {
  getDepositAccounts,
  getWithdrawalAccounts,
} from '../bankingSelectors';
import { loadOpenEntry } from './openEntryHandlers';
import { tabIds } from '../tabItems';
import getDefaultState from './getDefaultState';

const isAccountLineItem = lineKey => lineKey === 'accountId';

const isAmountLineItem = lineKey => lineKey === 'amount';

const isAmountPercentLineItem = lineKey => lineKey === 'amountPercent';

const calculateLineAmountPercent = (total, amount) => ((amount / total) * 100).toFixed(2);

const calculateLineAmount = (total, percent) => ((percent / 100) * total).toFixed(2);

const getUpdatedLine = (state, line, { lineKey, lineValue }) => {
  const updatedLine = {
    ...line,
    [lineKey]: lineValue,
  };

  const { accounts } = line;
  if (isAccountLineItem(lineKey)) {
    return {
      ...updatedLine,
      taxCodeId: getDefaultTaxCodeId({ accountId: lineValue, accounts }),
    };
  }

  if (isAmountLineItem(lineKey)) {
    const total = getTotalAmount(state);
    const amountPercent = calculateLineAmountPercent(total, lineValue);

    return {
      ...updatedLine,
      amountPercent,
    };
  }

  if (isAmountPercentLineItem(lineKey)) {
    const total = getTotalAmount(state);
    const amount = calculateLineAmount(total, lineValue);

    return {
      ...updatedLine,
      amount,
    };
  }

  return updatedLine;
};

const updateSplitAllocationState = (state, propName, propValue) => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    isEdited: true,
    allocate: {
      ...state.openEntry.allocate,
      [propName]: propValue,
    },
  },
});

export const updateSplitAllocationHeader = (state, action) => updateSplitAllocationState(
  state,
  action.key,
  action.value,
);

export const addSplitAllocationLine = (state, action) => updateSplitAllocationState(
  state,
  'lines',
  [
    ...state.openEntry.allocate.lines,
    {
      ...state.openEntry.allocate.newLine,
      ...action.line,
      taxCodeId: getDefaultTaxCodeId({ ...state.openEntry.allocate.newLine, ...action.line }),
    },
  ],
);

export const updateSplitAllocationLine = (state, action) => {
  const lines = state.openEntry.allocate.lines.map((line, index) => (
    index === action.lineIndex ? getUpdatedLine(state, line, action) : line
  ));

  return updateSplitAllocationState(state, 'lines', lines);
};

export const deleteSplitAllocationLine = (state, action) => updateSplitAllocationState(
  state,
  'lines',
  state.openEntry.allocate.lines.filter((item, index) => index !== action.index),
);

export const loadSplitAllocation = (state, action) => {
  const openedEntry = state.entries[action.index];

  const { isSpendMoney, lines } = action.allocate;

  const totalAmount = Number(openedEntry.withdrawal || openedEntry.deposit);

  const accounts = isSpendMoney ? getWithdrawalAccounts(state) : getDepositAccounts(state);

  const newLine = {
    ...getDefaultState().openEntry.allocate.newLine,
    accounts,
    taxCodes: state.taxCodes,
  };

  const updatedLines = lines.map(line => ({
    ...line,
    amountPercent: calculateLineAmountPercent(totalAmount, line.amount),
  }));

  const allocate = {
    ...action.allocate,
    totalAmount,
    lines: updatedLines,
    newLine,
    isCreating: false,
  };

  return loadOpenEntry(state, action.index, tabIds.allocate, allocate);
};

export const loadNewSplitAllocation = (state, action) => {
  const defaultState = getDefaultState();

  const openedEntry = state.entries[action.index];

  const isSpendMoney = !!openedEntry.withdrawal;

  const totalAmount = Number(openedEntry.withdrawal || openedEntry.deposit);

  const accounts = isSpendMoney ? getWithdrawalAccounts(state) : getDepositAccounts(state);

  const newLine = {
    ...defaultState.openEntry.allocate.newLine,
    accounts,
    taxCodes: state.taxCodes,
  };

  const allocate = {
    ...defaultState.openEntry.allocate,
    isSpendMoney,
    totalAmount,
    date: openedEntry.date,
    lines: [
      {
        ...newLine,
        amount: totalAmount,
        amountPercent: 100,
      },
    ],
    newLine,
    isCreating: true,
  };

  return loadOpenEntry(state, action.index, tabIds.allocate, allocate);
};

export const saveSplitAllocation = (state, action) => {
  const defaultState = getDefaultState();

  return ({
    ...allocateTransaction(state, action),
    openPosition: defaultState.openPosition,
    openEntry: defaultState.openEntry,
  });
};

export const unallocateSplitAllocation = (state, action) => {
  const defaultState = getDefaultState();

  return ({
    ...state,
    entries: state.entries.map(
      (entry, index) => (
        index === action.index
          ? {
            ...entry,
            allocateOrMatch: action.allocateOrMatch,
            journalLineId: '',
            type: action.type,
            taxCode: '',
          }
          : entry
      ),
    ),
    openPosition: defaultState.openPosition,
    openEntry: defaultState.openEntry,
  });
};
