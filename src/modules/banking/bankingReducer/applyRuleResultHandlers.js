import { getBalancesForApplyRule } from '../bankingSelectors';

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
