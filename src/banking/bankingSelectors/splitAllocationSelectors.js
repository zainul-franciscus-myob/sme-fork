import { createSelector } from 'reselect';

import {
  formatAmount, getContacts, getEntries, getFilterOptions,
} from './index';

const getAllocate = state => state.openEntry.allocate;

export const getIsCreating = state => state.openEntry.allocate.isCreating;

const getIsSpendMoney = state => state.openEntry.allocate.isSpendMoney;

export const getTotalAmount = state => state.openEntry.allocate.totalAmount;

export const getNewLineData = state => state.openEntry.allocate.newLine;

const getContactId = state => state.openEntry.allocate.contactId;

const getIsReportable = state => state.openEntry.allocate.isReportable;

const getLines = state => state.openEntry.allocate.lines;

const getLinesLength = state => state.openEntry.allocate.lines.length;

export const getIndexOfLastLine = state => state.openEntry.allocate.lines.length - 1;

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
  getLines,
  getTotalAmount,
  (lines = [], total) => {
    const totalAllocated = lines.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue.amount),
      0,
    );
    const totalAllocatedPercent = ((totalAllocated / total) * 100);
    const totalUnallocated = (total - totalAllocated);
    const totalUnallocatedPercent = 100 - totalAllocatedPercent;

    return {
      totalAllocated: `$${formatAmount(totalAllocated)} (${formatAmount(totalAllocatedPercent)}%)`,
      totalUnallocated: `$${formatAmount(totalUnallocated)} (${formatAmount(totalUnallocatedPercent)}%)`,
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
