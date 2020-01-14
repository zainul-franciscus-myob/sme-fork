import { allocateTransaction } from './index';
import { getAccounts, getPrefilledEntries } from '../bankingSelectors/matchTransactionSelectors';
import { loadOpenEntry } from './openEntryHandlers';
import { tabIds } from '../tabItems';
import formatAmount from '../../common/valueFormatters/formatAmount';
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
    adjustments: [],
  };

  return loadOpenEntry(state, action.index, tabIds.match, match, isCreating);
};

export const sortAndFilterMatchTransactions = (state, action) => {
  const { isCreating } = state.openEntry;

  const match = {
    ...state.openEntry.match,
    entries: getPrefilledEntries(state, action.entries),
    adjustments: [],
  };

  return loadOpenEntry(state, action.index, tabIds.match, match, isCreating);
};

export const showSelectedMatchTransactions = state => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    match: {
      ...state.openEntry.match,
      entries: state.openEntry.match.entries.filter(({ selected }) => selected),
    },
  },
});

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
  const selectedEntries = entries.reduce((acc, entry) => (
    entry.selected ? { ...acc, [entry.journalId]: entry } : acc
  ), {});

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

export const updateMatchTransactionSelection = (state, action) => {
  const { journalId, selected } = action;
  const entries = state.openEntry.match.entries.map((entry) => {
    if (journalId === entry.journalId) {
      const balanceOwed = Number(entry.totalAmount) - Number(entry.discountAmount || 0);
      return {
        ...entry,
        selected,
        matchAmount: selected ? formatAmount(balanceOwed) : '',
      };
    }
    return entry;
  });

  return updateMatchEntries(state, entries);
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
    [key]: value,
    taxCodeId,
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
        ...adjustment, [key]: value, taxCodeId,
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
