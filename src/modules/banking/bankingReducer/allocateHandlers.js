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
          journals: action.journals,
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
          journals: [],
          type: action.type,
          taxCode: '',
        }
        : entry
    ),
  ),
});
