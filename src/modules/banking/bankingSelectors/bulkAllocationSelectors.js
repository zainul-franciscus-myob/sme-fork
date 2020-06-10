import { createSelector } from 'reselect';

import { getEntries } from './index';
import StatusTypes from '../BankTransactionStatusTypes';

export const getEntrySelectStatus = state => state.entries.map(entry => entry.selected);

const getSelectedCount = state => state.entries.filter(entry => entry.selected).length;
export const showBulkActionsSelector = state => getSelectedCount(state) > 0;
export const getBulkMessage = createSelector(
  getSelectedCount,
  selectedCount => `${selectedCount} transaction${selectedCount > 1 ? 's' : ''} selected (max 50)`,
);

export const getBulkSelectStatus = createSelector(
  getSelectedCount,
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
      description: entry.description,
    })),
  };
};

const getIsAllSelected = state => state.entries.every(entry => entry.selected);
export const BULK_LIMITATION = 50;
export const getRemainingAvailable = createSelector(
  getSelectedCount,
  selectedCount => Math.max(BULK_LIMITATION - selectedCount, 0),
);
export const getIsMaximumSelected = createSelector(
  getRemainingAvailable,
  remaining => remaining === 0,
);
export const getCanSelectMore = createSelector(
  getIsAllSelected,
  getIsMaximumSelected,
  (isAllSelected, isMaximumSelected) => !isAllSelected && !isMaximumSelected,
);

export const getIsBulkLoading = state => state.isBulkLoading;
export const getIsCheckboxDisabled = (state, index) => {
  const entries = getEntries(state);

  return getIsBulkLoading(state) || !(entries[index].selected || getCanSelectMore(state));
};

export const getIsEditedEntryInBulkSelection = state => (
  state.openPosition >= 0 && state.openEntry.isEdited && state.entries[state.openPosition].selected
);
