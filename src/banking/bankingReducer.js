import BankingIntents from './BankingIntents';

const bankingReducer = (state = { transactions: [], accounts: [] }, action) => {
  switch (action.intent) {
    case BankingIntents.LOAD_TRANSACTIONS_AND_ACCOUNTS:
      return {
        ...state,
        transactions: action.transactions,
        accounts: action.accounts,
      };
    case BankingIntents.ALLOCATE_ACCOUNT_FOR_TRANSACTION: {
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

export default bankingReducer;
