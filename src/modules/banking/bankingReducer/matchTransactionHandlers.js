import { allocateTransaction } from './index';
import { getAccounts, getIsAllowCustomAmount, getPrefilledEntries } from '../bankingSelectors/matchTransactionSelectors';
import { loadOpenEntry } from './openEntryHandlers';
import { tabIds } from '../tabItems';
import getDefaultState from './getDefaultState';

export const loadMatchTransactions = (state, action) => {
  const defaultState = getDefaultState();

  const { isCreating } = action;

  const match = {
    ...defaultState.openEntry.match,
    totalAmount: action.totalAmount,
    filterOptions: {
      ...defaultState.openEntry.match.filterOptions,
      showType: action.showType,
      contactId: action.contactId,
      accountId: action.accountId,
      isCredit: action.isCredit,
    },
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
    entries: getPrefilledEntries(state, action.entries),
  };

  return loadOpenEntry(state, action.index, tabIds.match, match, isCreating);
};

export const sortAndFilterMatchTransactions = (state, action) => {
  const { isCreating } = state.openEntry;

  const match = {
    ...state.openEntry.match,
    entries: getPrefilledEntries(state, action.entries),
  };

  return loadOpenEntry(state, action.index, tabIds.match, match, isCreating);
};

export const showSelectedMatchTransactions = (state) => {
  const selectedEntries = state.openEntry.match.entries.filter(({ selected }) => selected);
  const entries = selectedEntries.reduce((acc, entry) => (
    { ...acc, [`${entry.journalId}-${entry.journalLineId}`]: entry }
  ), state.openEntry.match.selectedEntries);

  return ({
    ...state,
    openEntry: {
      ...state.openEntry,
      match: {
        ...state.openEntry.match,
        entries: Object.values(entries),
      },
    },
  });
};

export const saveMatchTransaction = (state, action) => ({
  ...allocateTransaction(state, action),
});

export const updateMatchTransactionOptions = (state, action) => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    match: {
      ...state.openEntry.match,
      filterOptions: {
        ...state.openEntry.match.filterOptions,
        [action.key]: action.value,
      },
    },
  },
});

export const setMatchTransactionSortOrder = (state, action) => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    match: {
      ...state.openEntry.match,
      orderBy: action.orderBy,
      sortOrder: action.sortOrder,
    },
  },
});

const updateMatchEntries = (state, entries) => {
  const selectedEntries = entries.reduce((acc, entry) => {
    if (!entry.selected) {
      const { [`${entry.journalId}-${entry.journalLineId}`]: unselectedEntry, ...otherEntries } = acc;
      return otherEntries;
    }
    return { ...acc, [`${entry.journalId}-${entry.journalLineId}`]: entry };
  }, state.openEntry.match.selectedEntries);
  return ({
    ...state,
    openEntry: {
      ...state.openEntry,
      match: {
        ...state.openEntry.match,
        entries,
        selectedEntries,
      },
    },
  });
};

export const updateSelectedTransactionDetails = (state, action) => {
  const { key, value } = action;
  const entries = state.openEntry.match.entries.map((entry, index) => {
    if (index === action.index) {
      const selected = key === 'matchAmount' ? true : entry.selected;
      return { ...entry, [key]: value, selected };
    }
    return entry;
  });

  return updateMatchEntries(state, entries);
};

const getMatchAmount = (totalAmount, availableAmount, entry) => {
  // Case: Not allow alteration of the match amount.
  // Return bank transaction total amount.
  const isAllowCustomAmount = getIsAllowCustomAmount(entry);
  if (!isAllowCustomAmount) return totalAmount;

  // Case: No available amount left or in negative.
  if (availableAmount <= 0) return 0;

  // Case: Enough available amount to fulfil transaction (and more).
  // Return full transaction due amount.
  const { totalAmount: entryTotalAmount, discountAmount: entryDiscountAmount } = entry;
  const entryDueAmount = Number(entryTotalAmount) - Number(entryDiscountAmount || 0);
  if (availableAmount >= entryDueAmount) return entryDueAmount;

  // Case: Not enough available amount to fulfil transaction.
  // Return whatever left of the available amount
  return availableAmount;
};

export const updateMatchTransactionSelection = (state, action) => {
  const { index, selected } = action;
  const { totalAmount, entries } = state.openEntry.match;

  // Case: Unselected. Clear out matchAmount
  if (!selected) {
    const updatedEntries = entries.map((entry, currentIndex) => (currentIndex === index
      ? { ...entry, selected, matchAmount: '' }
      : entry));

    return updateMatchEntries(state, updatedEntries);
  }

  // Case: Selected. Calculate suitable matchAmount
  const sum = entries
    .reduce((accumulator, { matchAmount }) => accumulator + Number(matchAmount || 0), 0);
  const availableAmount = totalAmount - sum;
  const updatedEntries = entries.map((entry, currentIndex) => (index === currentIndex
    ? { ...entry, selected, matchAmount: getMatchAmount(totalAmount, availableAmount, entry) }
    : entry));

  return updateMatchEntries(state, updatedEntries);
};

export const toggleMatchTransactionSelectAllState = (state, action) => {
  const entries = state.openEntry.match.entries.map(entry => (
    { ...entry, selected: action.selected }
  ));
  return updateMatchEntries(state, entries);
};

export const setMatchTransactionLoadingState = (state, action) => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    match: {
      ...state.openEntry.match,
      isTableLoading: action.isLoading,
    },
  },
});

const getTaxCodeId = (state, accountId) => {
  const accounts = getAccounts(state);
  const account = accounts.find(({ id }) => id === accountId);
  return account && account.taxCodeId;
};

export const addAdjustment = (state, action) => {
  const { key, value } = action;

  const taxCodeId = (
    key === 'accountId' ? getTaxCodeId(state, value) : undefined
  );

  const adjustment = {
    id: action.id,
    taxCodeId,
    [key]: value,
  };

  return ({
    ...state,
    openEntry: {
      ...state.openEntry,
      isEdited: true,
      match: {
        ...state.openEntry.match,
        adjustments: [
          ...state.openEntry.match.adjustments,
          adjustment,
        ],
      },
    },
  });
};

export const updateAdjustment = (state, action) => {
  const { key, value } = action;

  const adjustments = state.openEntry.match.adjustments.map((adjustment, index) => {
    if (index === action.index) {
      const taxCodeId = (
        key === 'accountId' ? getTaxCodeId(state, value) : adjustment.taxCodeId
      );

      return {
        ...adjustment, taxCodeId, [key]: value,
      };
    }
    return adjustment;
  });

  return {
    ...state,
    openEntry: {
      ...state.openEntry,
      isEdited: true,
      match: {
        ...state.openEntry.match,
        adjustments,
      },
    },
  };
};

export const removeAdjustment = (state, action) => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    isEdited: true,
    match: {
      ...state.openEntry.match,
      adjustments: state.openEntry.match.adjustments.filter(
        (adjustment, index) => index !== action.index,
      ),
    },
  },
});

export const expandAdjustmentSection = state => (
  {
    ...state,
    openEntry: {
      ...state.openEntry,
      match: {
        ...state.openEntry.match,
        showAdjustmentTable: true,
      },
    },
  }
);
