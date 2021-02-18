import {
  CREATE_RECURRING_BILL,
  DELETE_RECURRING_BILL,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ITEM,
  LOAD_NEW_RECURRING_BILL,
  LOAD_RECURRING_BILL,
  LOAD_SUPPLIER,
  UPDATE_RECURRING_BILL,
} from '../RecurringBillIntents';

const HttpRecurringBillMapping = {
  [LOAD_NEW_RECURRING_BILL]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/recurringTransaction/bill/load_new_recurring_bill`,
  },
  [LOAD_RECURRING_BILL]: {
    method: 'GET',
    getPath: ({ businessId, recurringTransactionId }) =>
      `/${businessId}/recurringTransaction/bill/load_recurring_bill/${recurringTransactionId}`,
  },
  [CREATE_RECURRING_BILL]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/recurringTransaction/bill/create_recurring_bill`,
  },
  [UPDATE_RECURRING_BILL]: {
    method: 'PUT',
    getPath: ({ businessId, recurringTransactionId }) =>
      `/${businessId}/recurringTransaction/bill/update_recurring_bill/${recurringTransactionId}`,
  },
  [DELETE_RECURRING_BILL]: {
    method: 'DELETE',
    getPath: ({ businessId, recurringTransactionId }) =>
      `/${businessId}/recurringTransaction/bill/delete_recurring_bill/${recurringTransactionId}`,
  },
  [LOAD_SUPPLIER]: {
    method: 'GET',
    getPath: ({ businessId, supplierId }) =>
      `/${businessId}/recurringTransaction/bill/load_supplier/${supplierId}`,
  },
  [LOAD_ABN_FROM_SUPPLIER]: {
    method: 'GET',
    getPath: ({ businessId, supplierId }) =>
      `/${businessId}/recurringTransaction/bill/load_abn_from_supplier/${supplierId}`,
  },
  [LOAD_ACCOUNT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) =>
      `/${businessId}/recurringTransaction/bill/load_account/${accountId}`,
  },
  [LOAD_ITEM]: {
    method: 'GET',
    getPath: ({ businessId, itemId }) =>
      `/${businessId}/recurringTransaction/bill/load_item/${itemId}`,
  },
};

export default HttpRecurringBillMapping;
