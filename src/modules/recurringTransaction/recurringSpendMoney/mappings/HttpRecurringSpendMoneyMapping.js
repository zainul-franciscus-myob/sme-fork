import {
  CREATE_RECURRING_SPEND_MONEY,
  DELETE_RECURRING_SPEND_MONEY,
  LOAD_ABN_FROM_CONTACT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_NEW_RECURRING_SPEND_MONEY,
  LOAD_RECURRING_SPEND_MONEY,
  UPDATE_RECURRING_SPEND_MONEY,
} from '../RecurringSpendMoneyIntents';

const HttpRecurringSpendMoneyMapping = {
  [LOAD_NEW_RECURRING_SPEND_MONEY]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/recurringTransaction/spendMoney/load_new_recurring_spend_money`,
  },
  [LOAD_RECURRING_SPEND_MONEY]: {
    method: 'GET',
    getPath: ({ businessId, recurringTransactionId }) =>
      `/${businessId}/recurringTransaction/spendMoney/load_recurring_spend_money/${recurringTransactionId}`,
  },
  [CREATE_RECURRING_SPEND_MONEY]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/recurringTransaction/spendMoney/create_recurring_spend_money`,
  },
  [UPDATE_RECURRING_SPEND_MONEY]: {
    method: 'PUT',
    getPath: ({ businessId, recurringTransactionId }) =>
      `/${businessId}/recurringTransaction/spendMoney/update_recurring_spend_money/${recurringTransactionId}`,
  },
  [DELETE_RECURRING_SPEND_MONEY]: {
    method: 'DELETE',
    getPath: ({ businessId, recurringTransactionId }) =>
      `/${businessId}/recurringTransaction/spendMoney/delete_recurring_spend_money/${recurringTransactionId}`,
  },
  [LOAD_ACCOUNT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) =>
      `/${businessId}/recurringTransaction/spendMoney/load_account/${accountId}`,
  },
  [LOAD_ABN_FROM_CONTACT]: {
    method: 'GET',
    getPath: ({ businessId, contactId }) =>
      `/${businessId}/recurringTransaction/spendMoney/load_abn/${contactId}`,
  },
};

export default HttpRecurringSpendMoneyMapping;
