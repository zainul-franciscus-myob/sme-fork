import * as BankingIntents from '../../banking/BankingIntents';
import transactionsAndAccounts from '../data/transactionsAndAccounts';

const readTransactionsAndAccounts = (onSuccess, onFailure) => {
  onSuccess(transactionsAndAccounts);
};

export default {
  [BankingIntents.LOAD_TRANSACTIONS_AND_ACCOUNTS]: readTransactionsAndAccounts
};
