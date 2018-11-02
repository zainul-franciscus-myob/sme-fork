import BankingIntents from './BankingIntents';
import SystemIntents from '../SystemIntents';

const initialState = { transactions: [], accounts: [] };

const bankingReducer = (state = initialState, action) => {
  switch (action.intent) {
    case SystemIntents.RESET_STATE:
      return {
        ...initialState,
      };
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
