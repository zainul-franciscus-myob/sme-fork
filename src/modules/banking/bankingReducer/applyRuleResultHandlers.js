import StatusTypes from '../BankTransactionStatusTypes';
import calculateBalance from '../common/calculateBalances';

const getBalancesForApplyRule = (state, applyResults) => {
  const {
    balances,
    bankAccounts,
    filterOptions: { bankAccount },
    entries,
  } = state;

  const allocatedIds = applyResults
    .filter(({ type }) => [
      StatusTypes.singleAllocation,
      StatusTypes.splitAllocation,
    ].includes(type))
    .map(allocatedEntry => allocatedEntry.transactionId);
  const amount = entries
    .filter(entry => allocatedIds.includes(entry.transactionId))
    .reduce((total, entry) => {
      const { withdrawal, deposit } = entry;
      const entryAmount = -withdrawal || deposit;
      return total + entryAmount;
    }, 0);

  return calculateBalance({
    balances,
    amount,
    bankAccounts,
    selectedBankAccountId: bankAccount,
  });
};

const findEntryById = (entries, id) => entries.find(entry => entry.transactionId === id);

// eslint-disable-next-line import/prefer-default-export
export const appliedTransactions = (state, action) => ({
  ...state,
  balances: getBalancesForApplyRule(state, action.entries),
  entries: state.entries.map((entry) => {
    const appliedResult = findEntryById(action.entries, entry.transactionId);
    if (appliedResult) {
      return {
        ...entry,
        ...appliedResult,
      };
    }
    return entry;
  }),
});
