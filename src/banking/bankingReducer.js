import {
  RESET_STATE,
} from '../SystemIntents';
import BankingIntents from './BankingIntents';

const initialState = { transactions: [], accounts: [] };

const bankingReducer = (state = initialState, action) => {
  switch (action.intent) {
    case RESET_STATE:
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
