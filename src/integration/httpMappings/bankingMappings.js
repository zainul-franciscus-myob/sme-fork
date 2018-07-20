import * as BankingIntents from '../../banking/BankingIntents';

export default {
  [BankingIntents.LOAD_TRANSACTIONS_AND_ACCOUNTS]: {
    method: 'GET',
    path: '/banking/load_transactions_and_accounts'
  }
}