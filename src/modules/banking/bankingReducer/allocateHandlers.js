import { isStatusUnapproved } from '../types/BankTransactionStatusTypes';
import calculateBalance from '../common/calculateBalances';

const getCalculatedAllocatedBalances = (state, index) => {
  const {
    balances,
    bankAccounts,
    filterOptions: { bankAccount },
    entries,
  } = state;

  const line = entries[index];
  const { withdrawal, deposit } = line;
  const amount = withdrawal || -deposit;

  return calculateBalance({
    balances,
    amount,
    bankAccounts,
    selectedBankAccountId: bankAccount,
  });
};

// eslint-disable-next-line import/prefer-default-export
export const allocateTransaction = (state, action) => {
  const entryIsUnapproved = isStatusUnapproved(
    state.entries[action.index].type
  );

  return {
    ...state,
    balances: entryIsUnapproved
      ? getCalculatedAllocatedBalances(state, action.index)
      : state.balances,
    entries: state.entries.map((entry, index) =>
      index === action.index
        ? {
            ...entry,
            appliedRule: action.appliedRule,
            isReportable: action.isReportable,
            allocateOrMatch: action.allocateOrMatch,
            journals: action.journals,
            type: action.type,
            taxCode: action.taxCode,
            selectedAccountId: action.selectedAccountId,
            isRuleApplied: !!action.appliedRule,
          }
        : entry
    ),
  };
};

export const setLastAllocatedAccount = (state, action) => ({
  ...state,
  lastAllocatedAccount: action.selectedAccount,
});
