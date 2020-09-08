import {
  getIsMaximumSelected,
  getRemainingAvailable,
} from '../bankingSelectors/bulkActionSelectors';
import { isStatusUnapproved } from '../types/BankTransactionStatusTypes';
import calculateBalance from '../common/calculateBalances';

const getBalancesForBulkResult = (state, allocatedEntries, isAllocate) => {
  const {
    balances,
    bankAccounts,
    filterOptions: { bankAccount },
    entries,
  } = state;

  const allocatedIds = allocatedEntries.map(
    (allocatedEntry) => allocatedEntry.transactionId
  );

  const amount = entries
    .filter((entry) => {
      // Remove the entries (for only bulk allocation) that are approved transaction types
      if (isAllocate && !isStatusUnapproved(entry.type)) {
        return false;
      }
      return allocatedIds.includes(entry.transactionId);
    })
    .reduce((total, entry) => {
      const { withdrawal, deposit } = entry;
      const entryAmount = isAllocate
        ? withdrawal || -deposit
        : -withdrawal || deposit;

      return total + entryAmount;
    }, 0);

  return calculateBalance({
    balances,
    amount,
    bankAccounts,
    selectedBankAccountId: bankAccount,
  });
};

export const selectTransaction = (state, action) => {
  if (getIsMaximumSelected(state) && action.value) {
    return state;
  }

  return {
    ...state,
    entries: state.entries.map((entry, index) =>
      index === action.index
        ? {
            ...entry,
            selected: action.value,
          }
        : entry
    ),
  };
};

export const unselectTransactions = (state) => ({
  ...state,
  entries: state.entries.map((entry) => ({
    ...entry,
    selected: false,
  })),
});

export const selectAllTransactions = (state) => {
  const entryIdsToSelect = state.entries
    .filter((entry) => !entry.selected)
    .map((entry) => entry.transactionId)
    .slice(0, getRemainingAvailable(state));

  if (entryIdsToSelect.length > 0) {
    return {
      ...state,
      entries: state.entries.map((entry) =>
        entryIdsToSelect.includes(entry.transactionId)
          ? { ...entry, selected: true }
          : entry
      ),
    };
  }

  return unselectTransactions(state);
};

const getDefaultTaxCodeId = (accountId, accounts) => {
  const account = accounts.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const updatedOptions = (state, action) => {
  const options = {
    [action.key]: action.value,
  };

  if (action.key === 'accountId') {
    options.taxCodeId = getDefaultTaxCodeId(
      action.value,
      state.bulkAllocationAccounts
    );
  }

  return options;
};

export const updateBulkAllocationOptions = (state, action) => ({
  ...state,
  bulkAllocationOptions: {
    ...state.bulkAllocationOptions,
    ...updatedOptions(state, action),
  },
});

const findEntryById = (entries, id) =>
  entries.find((entry) => entry.transactionId === id);

export const bulkAllocateTransactions = (state, action) => ({
  ...state,
  balances: getBalancesForBulkResult(state, action.entries, true),
  entries: state.entries.map((entry) => {
    const allocation = findEntryById(action.entries, entry.transactionId);

    if (allocation) {
      return {
        ...entry,
        isReportable: allocation.isReportable,
        allocateOrMatch: allocation.allocateOrMatch,
        journals: allocation.journals,
        type: allocation.type,
        taxCode: allocation.taxCode,
        selectedAccountId: allocation.selectedAccountId,
      };
    }

    return entry;
  }),
});

export const unallocateTransactions = (state, action) => ({
  ...state,
  balances: getBalancesForBulkResult(state, action.entries, false),
  entries: state.entries.map((entry) => {
    const allocation = findEntryById(action.entries, entry.transactionId);

    if (allocation) {
      return {
        ...entry,
        allocateOrMatch: allocation.allocateOrMatch,
        journals: [],
        type: allocation.type,
        taxCode: '',
        selectedAccountId: '',
      };
    }

    return entry;
  }),
});

export const setBulkLoading = (state, action) => ({
  ...state,
  isBulkLoading: action.isLoading,
  entries: state.entries.map((entry) => ({
    ...entry,
    isLoading: entry.selected ? action.isLoading : entry.isLoading,
  })),
});

export const resetBulkAllocation = (state) => ({
  ...state,
  bulkAllocationOptions: {
    accountId: '',
    taxCodeId: '',
  },
});

export const openBulkAllocation = (state) => ({
  ...state,
  isBulkOpen: true,
});

export const closeBulkAllocation = (state) => ({
  ...state,
  isBulkOpen: false,
});
