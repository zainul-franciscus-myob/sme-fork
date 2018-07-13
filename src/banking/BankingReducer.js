import { LOAD_TRANSACTIONS } from './BankingIntents';

export default (state = { transactions: [] }, action) => {
  switch (action.intent) {
    case LOAD_TRANSACTIONS:
      return { ...state, transactions: action.transactions };

    default:
      return state;
  }
}