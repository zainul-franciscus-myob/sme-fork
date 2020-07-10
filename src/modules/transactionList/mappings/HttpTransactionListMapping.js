import {
  LOAD_CREDITS_AND_DEBITS_LIST,
  LOAD_CREDITS_AND_DEBITS_NEXT_PAGE,
  LOAD_TRANSACTION_NEXT_PAGE,
  SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST,
  SORT_AND_FILTER_TRANSACTION_LIST,
} from '../TransactionListIntents';

const HttpTransactionListMapping = {
  [LOAD_CREDITS_AND_DEBITS_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/credits_and_debits/load_transaction_list`,
  },
  [SORT_AND_FILTER_CREDITS_AND_DEBITS_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/credits_and_debits/filter_transaction_list`,
  },
  [LOAD_CREDITS_AND_DEBITS_NEXT_PAGE]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/credits_and_debits/filter_transaction_list`,
  },
  [SORT_AND_FILTER_TRANSACTION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/journalTransactions/filter_transaction_list`,
  },
  [LOAD_TRANSACTION_NEXT_PAGE]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/journalTransactions/filter_transaction_list`,
  },
};

export default HttpTransactionListMapping;
