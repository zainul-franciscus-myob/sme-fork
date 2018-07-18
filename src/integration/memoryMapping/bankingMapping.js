import * as BankingIntents from '../../banking/BankingIntents';
import transactions from '../data/transactionsAndAccounts';

const readTransactions = (onSuccess, onFailure) => {
  onSuccess(transactions);
};

export default {
  [BankingIntents.LOAD_TRANSACTIONS]: readTransactions
};
