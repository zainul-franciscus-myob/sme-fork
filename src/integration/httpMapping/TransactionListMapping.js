import {
  LOAD_TRANSACTION_LIST,
  SORT_AND_FILTER_TRANSACTION_LIST,
} from '../../transactionList/journalTransaction/JournalTransactionListIntents';

const TransactionListMapping = {
  [SORT_AND_FILTER_TRANSACTION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/transactions/filter_transaction_list`,
  },
  [LOAD_TRANSACTION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/transactions/load_transaction_list`,
  },
};

export default TransactionListMapping;
