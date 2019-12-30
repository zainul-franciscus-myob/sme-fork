import { createSelector } from 'reselect';

import StatusTypes from '../BankTransactionStatusTypes';

export const getEntrySelectStatus = state => state.entries.map(entry => entry.selected);

export const selectedCountSelector = state => state.entries.filter(entry => entry.selected).length;
export const showBulkActionsSelector = state => selectedCountSelector(state) > 0;

export const getBulkSelectStatus = createSelector(
  selectedCountSelector,
  state => state.entries.length,
  (selectedCount, entryCount) => {
    if (selectedCount === entryCount) {
      return 'checked';
    }

    if (selectedCount > 0) {
      return 'indeterminate';
    }

    return '';
  },
);

export const getTaxCodes = state => state.taxCodes;
export const getBulkAllocationAccounts = state => state.bulkAllocationAccounts;
export const getBulkAllocationOptions = state => state.bulkAllocationOptions;

const eligibleBulkAllocationTypes = [
  StatusTypes.unmatched,
  StatusTypes.matched,
  StatusTypes.singleAllocation,
  StatusTypes.splitAllocation,
];
const filterBulkAllocationEntries = entries => entries.filter(
  entry => eligibleBulkAllocationTypes.includes(entry.type) && entry.selected,
);
export const getBulkAllocationPayload = ({ entries, filterOptions, bulkAllocationOptions }) => {
  const filteredEntries = filterBulkAllocationEntries(entries);
  const { bankAccount: bankAccountId } = filterOptions;

  return {
    bankAccountId,
    bulkAllocationOptions,
    entries: filteredEntries.map(entry => ({
      transactionId: entry.transactionId,
      deposit: entry.deposit,
      withdrawal: entry.withdrawal,
      date: entry.date,
    })),
  };
};

const ineligibleBulkUnallocationTypes = [
  StatusTypes.unmatched, StatusTypes.matched,
];
const filterBulkUnallocationEntries = entries => entries.filter(
  entry => !ineligibleBulkUnallocationTypes.includes(entry.type) && entry.selected,
);
export const getBulkUnallocationPayload = ({ entries, filterOptions }) => {
  const filteredEntries = filterBulkUnallocationEntries(entries);
  const { bankAccount: bankAccountId } = filterOptions;

  return {
    bankAccountId,
    entries: filteredEntries.map(entry => ({
      transactionId: entry.transactionId,
      journalLineId: entry.journalLineId,
    })),
  };
};

export const getIsAllSelected = state => state.entries.every(entry => entry.selected);
export const getIsBulkLoading = state => state.isBulkLoading;

export const getIsEditedEntryInBulkSelection = state => (
  state.openPosition >= 0 && state.openEntry.isEdited && state.entries[state.openPosition].selected
);
