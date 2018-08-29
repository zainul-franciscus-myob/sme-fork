import * as BankingIntents from '../../banking/BankingIntents';

export default {
  [BankingIntents.LOAD_TRANSACTIONS_AND_ACCOUNTS]: {
    method: 'GET',
    path: '/banking/load_transactions_and_accounts',
  },
  [BankingIntents.ALLOCATE_ACCOUNT_FOR_TRANSACTION]: {
    method: 'PUT',
    path: '/banking/allocate_transaction',
  },
};
