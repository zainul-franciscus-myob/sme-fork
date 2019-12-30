import { allocateTransaction } from './index';
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
    entries: action.entries,
    adjustments: [],
  };

  return loadOpenEntry(state, action.index, tabIds.match, match, isCreating);
};

export const sortAndFilterMatchTransactions = (state, action) => {
  const { isCreating } = state.openEntry;

  const match = {
    ...state.openEntry.match,
    entries: action.entries,
    adjustments: [],
  };

  return loadOpenEntry(state, action.index, tabIds.match, match, isCreating);
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

const updateMatchEntries = (state, entries) => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    isEdited: true,
    match: {
      ...state.openEntry.match,
      entries,
    },
  },
});

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
      return {
        ...entry,
        selected,
        matchAmount: selected ? entry.matchAmount : '',
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

export const addAdjustment = (state, action) => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    isEdited: true,
    match: {
      ...state.openEntry.match,
      adjustments: [
        ...state.openEntry.match.adjustments,
        {
          id: action.id,
          [action.key]: action.value,
        },
      ],
    },
  },
});

export const updateAdjustment = (state, action) => {
  const { key, value } = action;
  const adjustments = state.openEntry.match.adjustments.map((adjustment, index) => {
    if (index === action.index) {
      return {
        ...adjustment, [key]: value,
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
