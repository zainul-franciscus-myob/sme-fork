const BankingIntents = {
  LOAD_TRANSACTIONS_AND_ACCOUNTS: Symbol('Load all transaction and account data'),
  ALLOCATE_ACCOUNT_FOR_TRANSACTION: Symbol('Allocate a transaction to an account'),
};

export default BankingIntents;
