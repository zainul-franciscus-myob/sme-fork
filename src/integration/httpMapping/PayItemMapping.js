import {
  CREATE_SUPER_PAY_ITEM,
  DELETE_SUPER_PAY_ITEM,
  LOAD_DEDUCTIONS_LIST,
  LOAD_EXPENSES_LIST,
  LOAD_LEAVE_LIST,
  LOAD_NEW_SUPER_PAY_ITEM,
  LOAD_SUPERANNUATION_LIST,
  LOAD_SUPER_PAY_ITEM,
  LOAD_WAGES_LIST,
  SORT_DEDUCTIONS_LIST,
  SORT_EXPENSES_LIST,
  SORT_LEAVE_LIST,
  SORT_SUPERANNUATION_LIST,
  SORT_WAGES_LIST,
  UPDATE_SUPER_PAY_ITEM,
} from '../../payItem/PayItemIntents';

const PayItemListMapping = {
  [LOAD_WAGES_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/load_wage_pay_item_list`,
  },
  [SORT_WAGES_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/sort_wage_pay_item_list`,
  },
  [LOAD_SUPERANNUATION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/load_superannuation_pay_item_list`,
  },
  [SORT_SUPERANNUATION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/sort_superannuation_pay_item_list`,
  },
  [LOAD_LEAVE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/load_leave_pay_item_list`,
  },
  [SORT_LEAVE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/sort_leave_pay_item_list`,
  },
  [LOAD_DEDUCTIONS_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/load_deduction_pay_item_list`,
  },
  [SORT_DEDUCTIONS_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/sort_deduction_pay_item_list`,
  },
  [LOAD_EXPENSES_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/load_expense_pay_item_list`,
  },
  [SORT_EXPENSES_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/sort_expense_pay_item_list`,
  },
  [LOAD_NEW_SUPER_PAY_ITEM]: {
    method: 'GET',
    getPath: ({ businessId, customerReturnId }) => `/${businessId}/payItem/load_new_super_pay_item/${customerReturnId}`,
  },
  [LOAD_SUPER_PAY_ITEM]: {
    method: 'GET',
    getPath: ({ businessId, superPayItemId }) => `/${businessId}/payItem/load_super_pay_item/${superPayItemId}`,
  },
  [CREATE_SUPER_PAY_ITEM]: {
    method: 'POST',
    getPath: ({ businessId }) => (`/${businessId}/payItem/create_super_pay_item`),
  },
  [UPDATE_SUPER_PAY_ITEM]: {
    method: 'PUT',
    getPath: ({ businessId, superPayItemId }) => `/${businessId}/payItem/update_super_pay_item/${superPayItemId}`,
  },
  [DELETE_SUPER_PAY_ITEM]: {
    method: 'DELETE',
    getPath: ({ businessId, superPayItemId }) => `/${businessId}/payItem/delete_super_pay_item/${superPayItemId}`,
  },
};

export default PayItemListMapping;
