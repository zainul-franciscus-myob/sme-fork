import {
  getBalancesForBulkResult,
} from '../bankingSelectors';
import { getIsAllSelected } from '../bankingSelectors/bulkAllocationSelectors';

export const selectTransaction = (state, action) => ({
  ...state,
  entries: state.entries.map(
    (entry, index) => (
      index === action.index
        ? {
          ...entry,
          selected: action.value,
        }
        : entry
    ),
  ),
});

export const selectAllTransactions = (state) => {
  const isAllSelected = getIsAllSelected(state);

  return {
    ...state,
    entries: state.entries.map(entry => ({
      ...entry,
      selected: !isAllSelected,
    })),
  };
};

export const unselectTransactions = state => ({
  ...state,
  entries: state.entries.map(entry => ({
    ...entry,
    selected: false,
  })),
});

const getDefaultTaxCodeId = (accountId, accounts) => {
  const account = accounts.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

const updatedOptions = (state, action) => {
  const options = {
    [action.key]: action.value,
  };

  if (action.key === 'accountId') {
    options.taxCodeId = getDefaultTaxCodeId(action.value, state.bulkAllocationAccounts);
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

const findEntryById = (entries, id) => entries.find(entry => entry.transactionId === id);

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
      };
    }


    return entry;
  }),
});

export const setBulkLoading = (state, action) => ({
  ...state,
  isBulkLoading: action.isLoading,
  entries: state.entries.map(entry => ({
    ...entry,
    isLoading: entry.selected ? action.isLoading : entry.isLoading,
  })),
});

export const resetBulkAllocation = state => ({
  ...state,
  bulkAllocationOptions: {
    accountId: '',
    taxCodeId: '',
  },
});
