import { allocateTransaction } from './allocateHandlers';
import {
  getActiveJobs,
  getContacts,
  getDepositAccounts,
  getWithdrawalAccounts,
} from '../bankingSelectors';
import {
  getDefaultTaxCodeId,
  getTotalAmount,
  getTotalDollarAmount,
  getTotalPercentageAmount,
} from '../bankingSelectors/splitAllocationSelectors';
import { loadOpenEntry } from './openEntryHandlers';
import TabItems from '../types/TabItems';
import getDefaultState from './getDefaultState';

const isAccountLineItem = (lineKey) => lineKey === 'accountId';

const isAmountLineItem = (lineKey) => lineKey === 'amount';

const isAmountPercentLineItem = (lineKey) => lineKey === 'amountPercent';

const calculateLineAmountPercent = (total, amount) =>
  ((amount / total) * 100).toFixed(2);

export const calculateLineAmount = (
  state,
  currentLine,
  updatedPercent,
  isNewLine
) => {
  const total = getTotalAmount(state);
  const {
    amount: lineAmount = '',
    amountPercent: lineAmountPercentage = '',
  } = currentLine;

  const currTotalPercentage = getTotalPercentageAmount(state);

  const existingAmountPercentage = isNewLine ? 0 : Number(lineAmountPercentage);
  const totalPercentage =
    currTotalPercentage + Number(updatedPercent) - existingAmountPercentage;

  const existingAmountDollar = isNewLine ? 0 : Number(lineAmount);

  if (totalPercentage === 100) {
    return (
      total -
      (getTotalDollarAmount(state) - existingAmountDollar)
    ).toFixed(2);
  }

  return ((Number(updatedPercent) / 100) * total).toFixed(2);
};

export const calculateSplitAllocationTax = (state, { taxCalculations }) => {
  return {
    ...state,
    openEntry: {
      ...state.openEntry,
      allocate: {
        ...state.openEntry.allocate,
        lines: state.openEntry.allocate.lines.map((line, i) => ({
          ...line,
          taxAmount: taxCalculations.lines[i].taxAmount.toString(),
        })),
      },
    },
  };
};

const getUpdatedLine = (state, line, { lineKey, lineValue }, isNewLine) => {
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
    const updatedAmount = calculateLineAmount(
      state,
      line,
      lineValue,
      isNewLine
    );

    return {
      ...updatedLine,
      amount: updatedAmount,
    };
  }

  return updatedLine;
};

const getContactReportable = (state, contactId) => {
  const contact = getContacts(state).find(({ id }) => id === contactId);
  if (!contact) return false;
  return contact.isReportable;
};

const updateSplitAllocationState = (state, propName, propValue) => {
  const isUpdatingContact = propName === 'contactId';
  const { isSpendMoney, isReportable } = state.openEntry.allocate;
  const prefillReportable = isUpdatingContact && isSpendMoney;
  return {
    ...state,
    openEntry: {
      ...state.openEntry,
      isEdited: true,
      allocate: {
        ...state.openEntry.allocate,
        isReportable: prefillReportable
          ? getContactReportable(state, propValue)
          : isReportable,
        [propName]: propValue,
      },
    },
  };
};

export const updateSplitAllocationHeader = (state, action) =>
  updateSplitAllocationState(state, action.key, action.value);

export const addSplitAllocationLine = (state, action) =>
  updateSplitAllocationState(state, 'lines', [
    ...state.openEntry.allocate.lines,
    getUpdatedLine(
      state,
      state.openEntry.allocate.newLine,
      { lineKey: action.key, lineValue: action.value },
      true
    ),
  ]);

export const updateSplitAllocationLine = (state, action) => {
  const lines = state.openEntry.allocate.lines.map((line, index) =>
    index === action.lineIndex ? getUpdatedLine(state, line, action) : line
  );

  return updateSplitAllocationState(state, 'lines', lines);
};

export const deleteSplitAllocationLine = (state, action) => {
  const updateState = updateSplitAllocationState(
    state,
    'lines',
    state.openEntry.allocate.lines.filter(
      (item, index) => index !== action.index
    )
  );
  return updateState;
};

const buildLineJobOptions = ({ state, jobId }) =>
  state.jobs
    ? state.jobs.filter((job) => job.isActive || job.id === jobId)
    : [];

export const loadSplitAllocation = (state, action) => {
  const openedEntry = state.entries[action.index];

  const { isSpendMoney, lines } = action.allocate;

  const totalAmount = Number(openedEntry.withdrawal || openedEntry.deposit);

  const accounts = isSpendMoney
    ? getWithdrawalAccounts(state)
    : getDepositAccounts(state);

  const newLine = {
    ...getDefaultState().openEntry.allocate.newLine,
    accounts,
    taxCodes: state.taxCodes,
    lineJobOptions: getActiveJobs(state),
  };

  const updatedLines = lines.map((line) => {
    const lineJobOptions = buildLineJobOptions({ state, jobId: line.jobId });

    return {
      ...line,
      amountPercent: calculateLineAmountPercent(totalAmount, line.amount),
      lineJobOptions,
    };
  });

  const allocate = {
    ...action.allocate,
    totalAmount,
    lines: updatedLines,
    newLine,
  };

  return {
    ...loadOpenEntry(state, action.index, TabItems.allocate, allocate, false),
    contacts: action.allocate.contacts,
  };
};

export const loadNewSplitAllocation = (state, action) => {
  const defaultState = getDefaultState();

  const openedEntry = state.entries[action.index];

  const isSpendMoney = !!openedEntry.withdrawal;

  const totalAmount = Number(openedEntry.withdrawal || openedEntry.deposit);

  const accounts = isSpendMoney
    ? getWithdrawalAccounts(state)
    : getDepositAccounts(state);

  const description = openedEntry.note || openedEntry.description;

  const newLine = {
    ...defaultState.openEntry.allocate.newLine,
    accounts,
    taxCodes: state.taxCodes,
    lineJobOptions: getActiveJobs(state),
  };

  const allocate = {
    ...defaultState.openEntry.allocate,
    isSpendMoney,
    totalAmount,
    description,
    date: openedEntry.date,
    lines: [
      {
        ...newLine,
        amount: totalAmount,
        amountPercent: 100,
      },
    ],
    newLine,
  };

  return loadOpenEntry(state, action.index, TabItems.allocate, allocate, true);
};

export const saveSplitAllocation = (state, action) => ({
  ...allocateTransaction(state, action),
});

export const appendAccountToAllocateTable = (state, { account }) => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    allocate: {
      ...state.openEntry.allocate,
      lines: state.openEntry.allocate.lines.map((line) => ({
        ...line,
        accounts: [account, ...line.accounts],
      })),
      newLine: {
        ...state.openEntry.allocate.newLine,
        accounts: [account, ...state.openEntry.allocate.newLine.accounts],
      },
    },
  },
});

export const populateRemainingAmount = (state, { index }) => {
  const { lines } = state.openEntry.allocate;
  const isANewLine = !lines[index];
  const lineAmount = isANewLine ? 0 : lines[index].amount;

  const totalAmount = getTotalAmount(state);
  const totalAmountInLines = getTotalDollarAmount(state) - Number(lineAmount);
  const amountToBeAdded = Number(totalAmount) - totalAmountInLines;
  const propName = 'lines';

  const keyAndValue = {
    lineKey: 'amount',
    lineValue: amountToBeAdded,
  };

  if (isANewLine) {
    const updatedLines = [
      ...state.openEntry.allocate.lines,
      getUpdatedLine(
        state,
        state.openEntry.allocate.newLine,
        keyAndValue,
        isANewLine
      ),
    ];

    return updateSplitAllocationState(state, propName, updatedLines);
  }

  const updatedLines = state.openEntry.allocate.lines.map((line, i) => {
    return index === i
      ? getUpdatedLine(state, line, keyAndValue, isANewLine)
      : line;
  });

  return updateSplitAllocationState(state, propName, updatedLines);
};
