import * as BankingIntents from '../../banking/BankingIntents';
import transactionsAndAccounts from '../data/transactionsAndAccounts';

const readTransactionsAndAccounts = (onSuccess, onFailure) => {
  onSuccess(transactionsAndAccounts);
};

const allocateAccountForTransaction = (params, onSuccess, onFailure) => {
  const { transaction, accountId } = params;
  onSuccess(
    {...transaction, 
    allocatedAccountId: accountId, 
    allocatedAccountDisplayName: 'Updated'}
  );
}

export default {
  [BankingIntents.LOAD_TRANSACTIONS_AND_ACCOUNTS]: readTransactionsAndAccounts,
  [BankingIntents.ALLOCATE_ACCOUNT_FOR_TRANSACTION]: allocateAccountForTransaction
};
