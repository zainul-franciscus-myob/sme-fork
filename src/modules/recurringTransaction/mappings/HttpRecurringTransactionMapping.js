import {
  LOAD_RECURRING_TRANSACTION_LIST,
  SORT_AND_FILTER_RECURRING_TRANSACTION_LIST,
} from '../RecurringTransactionIntents';

const HttpRecurringTransactionMapping = {
  [LOAD_RECURRING_TRANSACTION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/recurringTransaction/load_recurring_transaction_list`,
  },
  [SORT_AND_FILTER_RECURRING_TRANSACTION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/recurringTransaction/filter_recurring_transaction_list`,
  },
};

export default HttpRecurringTransactionMapping;
