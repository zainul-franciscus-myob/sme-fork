import TransactionListIntents from '../../transactionList/TransactionListIntents';

const TransactionListMapping = {
  [TransactionListIntents.SORT_AND_FILTER_TRANSACTION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/transactions/filter_transaction_list`,
  },
  [TransactionListIntents.LOAD_TRANSACTION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/transactions/load_transaction_list`,
  },
};

export default TransactionListMapping;
