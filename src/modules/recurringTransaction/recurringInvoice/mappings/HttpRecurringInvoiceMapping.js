import {
  CREATE_RECURRING_INVOICE,
  DELETE_RECURRING_INVOICE,
  LOAD_ABN_FROM_CUSTOMER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ACCOUNT_OPTIONS,
  LOAD_CUSTOMER,
  LOAD_ITEM,
  LOAD_NEW_RECURRING_INVOICE,
  LOAD_PAY_DIRECT,
  LOAD_RECURRING_INVOICE,
  UPDATE_RECURRING_INVOICE,
} from '../RecurringInvoiceIntents';

const HttpRecurringInvoiceMapping = {
  [LOAD_NEW_RECURRING_INVOICE]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/recurringTransaction/invoice/load_new_recurring_invoice`,
  },
  [LOAD_RECURRING_INVOICE]: {
    method: 'GET',
    getPath: ({ businessId, recurringTransactionId }) =>
      `/${businessId}/recurringTransaction/invoice/load_recurring_invoice/${recurringTransactionId}`,
  },
  [CREATE_RECURRING_INVOICE]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/recurringTransaction/invoice/create_recurring_invoice`,
  },
  [UPDATE_RECURRING_INVOICE]: {
    method: 'PUT',
    getPath: ({ businessId, recurringTransactionId }) =>
      `/${businessId}/recurringTransaction/invoice/update_recurring_invoice/${recurringTransactionId}`,
  },
  [DELETE_RECURRING_INVOICE]: {
    method: 'DELETE',
    getPath: ({ businessId, recurringTransactionId }) =>
      `/${businessId}/recurringTransaction/invoice/delete_recurring_invoice/${recurringTransactionId}`,
  },
  [LOAD_CUSTOMER]: {
    method: 'GET',
    getPath: ({ businessId, customerId }) =>
      `/${businessId}/recurringTransaction/invoice/load_customer/${customerId}`,
  },
  [LOAD_ABN_FROM_CUSTOMER]: {
    method: 'GET',
    getPath: ({ businessId, customerId }) =>
      `/${businessId}/recurringTransaction/invoice/load_abn_from_customer/${customerId}`,
  },
  [LOAD_ACCOUNT_OPTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/recurringTransaction/invoice/load_account_options`,
  },
  [LOAD_ACCOUNT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) =>
      `/${businessId}/recurringTransaction/invoice/load_account/${accountId}`,
  },
  [LOAD_ITEM]: {
    method: 'GET',
    getPath: ({ businessId, itemId }) =>
      `/${businessId}/recurringTransaction/invoice/load_item/${itemId}`,
  },
  [LOAD_PAY_DIRECT]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/recurringTransaction/invoice/load_pay_direct`,
  },
};

export default HttpRecurringInvoiceMapping;
