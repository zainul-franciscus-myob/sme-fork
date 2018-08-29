import { ALLOCATE_ACCOUNT_FOR_TRANSACTION, LOAD_TRANSACTIONS_AND_ACCOUNTS } from './BankingIntents';

export default (state = { transactions: [], accounts: [] }, action) => {
  switch (action.intent) {
    case LOAD_TRANSACTIONS_AND_ACCOUNTS:
      return {
        ...state,
        transactions: action.transactions,
        accounts: action.accounts,
      };

    case ALLOCATE_ACCOUNT_FOR_TRANSACTION: {
      const { allocatedTransaction } = action;
      return {
        ...state,
        transactions: state.transactions.map(transaction => (
          transaction.id === allocatedTransaction.id
            ? { ...transaction, ...allocatedTransaction }
            : transaction
        )),
      };
    }
    default:
      return state;
  }
};
