import { allocateTransaction } from './index';
import { formatAmount } from '../bankingSelectors';
import { getAllocatedJournalLineId } from '../bankingSelectors/matchTransactionSelectors';
import { loadOpenEntry } from './openEntryHandlers';
import { tabIds } from '../tabItems';
import getDefaultState from './getDefaultState';

export const loadMatchTransactions = (state, action) => {
  const defaultState = getDefaultState();

  const match = {
    ...defaultState.openEntry.match,
    totalAmount: action.totalAmount,
    isCreating: !action.allocatedJournalLineId,
    selectedJournalLineId: action.allocatedJournalLineId,
    filterOptions: {
      ...defaultState.openEntry.match.filterOptions,
      accountId: action.accountId,
      allocatedJournalLineId: action.allocatedJournalLineId,
      isCredit: action.isCredit,
      dateFrom: action.dateFrom,
      dateTo: action.dateTo,
      amountFrom: formatAmount(action.amountFrom),
      amountTo: formatAmount(action.amountTo),
    },
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
    entries: action.entries,
  };

  return loadOpenEntry(state, action.index, tabIds.match, match);
};

export const sortAndFilterMatchTransactions = (state, action) => {
  const match = {
    ...state.openEntry.match,
    entries: action.entries,
  };

  return loadOpenEntry(state, action.index, tabIds.match, match);
};

export const saveMatchTransaction = (state, action) => {
  const defaultState = getDefaultState();

  return ({
    ...allocateTransaction(state, action),
    openPosition: defaultState.openPosition,
    openEntry: defaultState.openEntry,
  });
};

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

export const updateMatchTransactionSelection = (state, action) => {
  const { selectedJournalLineId } = action;
  const allocatedJournalLineId = getAllocatedJournalLineId(state);
  const isEdited = !allocatedJournalLineId || (allocatedJournalLineId !== selectedJournalLineId);

  return ({
    ...state,
    openEntry: {
      ...state.openEntry,
      isEdited,
      match: {
        ...state.openEntry.match,
        selectedJournalLineId,
      },
    },
  });
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
