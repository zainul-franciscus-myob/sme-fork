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
  const amount = (withdrawal || -deposit);

  return calculateBalance({
    balances,
    amount,
    bankAccounts,
    selectedBankAccountId: bankAccount,
  });
};

// eslint-disable-next-line import/prefer-default-export
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
