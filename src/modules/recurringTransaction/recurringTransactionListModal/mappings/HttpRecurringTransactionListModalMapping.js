import {
  LOAD_RECURRING_TRANSACTION_LIST,
  SORT_RECURRING_TRANSACTION_LIST,
} from '../RecurringTransactionListModalIntents';

const HttpRecurringTransactionListModalMapping = {
  [LOAD_RECURRING_TRANSACTION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/recurringTransaction/load_recurring_transaction_list_modal`,
  },
  [SORT_RECURRING_TRANSACTION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/recurringTransaction/filter_recurring_transaction_list_modal`,
  },
};

export default HttpRecurringTransactionListModalMapping;
