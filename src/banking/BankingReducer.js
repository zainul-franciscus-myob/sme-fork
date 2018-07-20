import { LOAD_TRANSACTIONS_AND_ACCOUNTS } from './BankingIntents';

export default (state = { transactions: [], accounts: [] }, action) => {
  switch (action.intent) {
    case LOAD_TRANSACTIONS_AND_ACCOUNTS:
      return {
        ...state,
        transactions: action.transactions,
        accounts: action.accounts
      };

    default:
      return state;
  }
}