import { createSelector } from 'reselect';

import {
  formatAmount, formatCurrency, getContacts, getEntries, getFilterOptions,
} from './index';

const getAllocate = state => state.openEntry.allocate;

const getIsSpendMoney = state => state.openEntry.allocate.isSpendMoney;

export const getTotalAmount = state => state.openEntry.allocate.totalAmount;

export const getNewLineData = state => state.openEntry.allocate.newLine;

const getContactId = state => state.openEntry.allocate.contactId;

const getIsReportable = state => state.openEntry.allocate.isReportable;

const getLines = state => state.openEntry.allocate.lines;

const getLinesLength = state => state.openEntry.allocate.lines.length;

export const getIndexOfLastLine = state => state.openEntry.allocate.lines.length - 1;

export const getTotalPercentageAmount = createSelector(
  getLines,
  (lines = []) => lines.reduce(
    (accumulator, currentValue) => accumulator + (Number(currentValue.amountPercent) || 0),
    0,
  ),
);

export const getTotalDollarAmount = createSelector(
  getLines,
  (lines = []) => lines.reduce(
    (accumulator, currentValue) => accumulator + (Number(currentValue.amount) || 0),
    0,
  ),
);

export const getDefaultTaxCodeId = ({ accountId, accounts }) => {
  const account = accounts.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

export const getTableData = createSelector(
  getLinesLength,
  len => Array(len).fill({}),
);

export const getLineDataByIndexSelector = () => createSelector(
  (state, props) => state.openEntry.allocate.lines[props.index],
  (line => line || {}),
);

export const getOptions = createSelector(
  getContacts,
  getContactId,
  getIsReportable,
  getIsSpendMoney,
  (contacts, contactId, isReportable, isSpendMoney) => ({
    contacts,
    contactId,
    isReportable,
    showIsReportable: isSpendMoney,
    contactLabel: isSpendMoney ? 'Payment to' : 'Payment from',
  }),
);

export const getTotals = createSelector(
  getTotalDollarAmount,
  getTotalAmount,
  (totalAllocated, total) => {
    const totalAllocatedPercent = total !== 0 ? ((totalAllocated / total) * 100) : 100;
    const totalUnallocated = (total - totalAllocated);
    const totalUnallocatedPercent = 100 - totalAllocatedPercent;

    return {
      totalAllocated: `${formatCurrency(totalAllocated)} (${formatAmount(totalAllocatedPercent)}%)`,
      totalUnallocated: `${formatCurrency(totalUnallocated)} (${formatAmount(totalUnallocatedPercent)}%)`,
    };
  },
);

export const getSplitAllocationPayload = (state, index) => {
  const entries = getEntries(state);
  const openedEntry = entries[index];
  const { transactionId } = openedEntry;

  const { bankAccount: bankAccountId } = getFilterOptions(state);

  const {
    isSpendMoney: isWithdrawal,
    date,
    contactId,
    isReportable,
    lines,
  } = getAllocate(state);

  return {
    bankAccountId,
    transactionId,
    isWithdrawal,
    contactId,
    isReportable: isWithdrawal ? isReportable : undefined,
    date,
    lines: lines.map(({
      accountId, amount, description, taxCodeId,
    }) => ({
      accountId, amount, description, taxCodeId,
    })),
  };
};
