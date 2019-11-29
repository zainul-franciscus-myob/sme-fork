import {
  LOAD_TRANSACTION_LIST,
  LOAD_TRANSACTION_LIST_NEXT_PAGE,
  SORT_AND_FILTER_TRANSACTION_LIST,
} from '../../transactionList/journalTransaction/JournalTransactionListIntents';

const JournalTransactionListMapping = {
  [SORT_AND_FILTER_TRANSACTION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/journalTransactions/filter_transaction_list`,
  },
  [LOAD_TRANSACTION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/journalTransactions/load_transaction_list`,
  },
  [LOAD_TRANSACTION_LIST_NEXT_PAGE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/journalTransactions/filter_transaction_list`,
  },
};

export default JournalTransactionListMapping;
