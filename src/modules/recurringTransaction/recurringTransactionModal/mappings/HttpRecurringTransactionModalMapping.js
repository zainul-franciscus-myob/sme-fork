import {
  CREATE_RECURRING_TRANSACTION,
  LOAD_NEW_RECURRING_TRANSACTION,
} from '../RecurringTransactionModalIntents';

const HttpRecurringTransactionModalMapping = {
  [LOAD_NEW_RECURRING_TRANSACTION]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/recurringTransaction/load_new_recurring_transaction`,
  },
  [CREATE_RECURRING_TRANSACTION]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/recurringTransaction/create_recurring_transaction`,
  },
};

export default HttpRecurringTransactionModalMapping;
