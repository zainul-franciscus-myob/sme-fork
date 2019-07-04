import {
  LOAD_DEDUCTIONS_LIST,
  LOAD_EXPENSES_LIST,
  LOAD_LEAVE_LIST,
  LOAD_SUPERANNUATION_LIST,
  LOAD_WAGES_LIST,
  SORT_DEDUCTIONS_LIST,
  SORT_EXPENSES_LIST,
  SORT_LEAVE_LIST,
  SORT_SUPERANNUATION_LIST,
  SORT_WAGES_LIST,
} from '../../payItem/PayItemIntents';

const PayItemListMapping = {
  [LOAD_WAGES_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/load_wage_list`,
  },
  [SORT_WAGES_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/sort_wage_list`,
  },
  [LOAD_SUPERANNUATION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/load_superannuation_list`,
  },
  [SORT_SUPERANNUATION_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/sort_superannuation_list`,
  },
  [LOAD_LEAVE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/load_leave_list`,
  },
  [SORT_LEAVE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/sort_leave_list`,
  },
  [LOAD_DEDUCTIONS_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/load_deduction_list`,
  },
  [SORT_DEDUCTIONS_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/sort_deduction_list`,
  },
  [LOAD_EXPENSES_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/load_expense_list`,
  },
  [SORT_EXPENSES_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payItem/sort_expense_list`,
  },
};

export default PayItemListMapping;
