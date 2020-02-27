import { getCalculatedAllocatedBalances, getCalculatedUnallocatedBalances } from '../bankingSelectors';

export const allocateTransaction = (state, action) => ({
  ...state,
  balances: getCalculatedAllocatedBalances(state, action.index),
  entries: state.entries.map(
    (entry, index) => (
      index === action.index
        ? {
          ...entry,
          isReportable: action.isReportable,
          allocateOrMatch: action.allocateOrMatch,
          journalId: action.journalId,
          journalLineId: action.journalLineId,
          sourceJournal: action.sourceJournal,
          type: action.type,
          taxCode: action.taxCode,
          selectedAccountId: action.selectedAccount ? action.selectedAccount.id : undefined,
        }
        : entry
    ),
  ),
});

export const unallocateTransaction = (state, action) => ({
  ...state,
  balances: getCalculatedUnallocatedBalances(state, action.index),
  entries: state.entries.map(
    (entry, index) => (
      index === action.index
        ? {
          ...entry,
          allocateOrMatch: action.allocateOrMatch,
          journalId: '',
          journalLineId: '',
          sourceJournal: '',
          type: action.type,
          taxCode: '',
        }
        : entry
    ),
  ),
});
