import {
  CREATE_DEDUCTION_PAY_ITEM_MODAL,
  CREATE_EMPLOYEE,
  DELETE_EMPLOYEE,
  LOAD_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_EMPLOYEE_DETAIL,
  LOAD_EMPLOYEE_LIST,
  LOAD_NEW_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_NEW_EMPLOYEE_DETAIL,
  LOAD_TAX_PAY_ITEM_MODAL,
  SORT_AND_FILTER_EMPLOYEE_LIST,
  UPDATE_DEDUCTION_PAY_ITEM_MODAL,
  UPDATE_EMPLOYEE,
  UPDATE_TAX_PAY_ITEM_MODAL,
} from '../../employee/EmployeeIntents';

const EmployeeListMapping = {
  [LOAD_EMPLOYEE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employee/load_employee_list`,
  },
  [SORT_AND_FILTER_EMPLOYEE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employee/filter_employee_list`,
  },
  [LOAD_EMPLOYEE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, employeeId }) => `/${businessId}/employee/load_employee/${employeeId}`,
  },
  [UPDATE_EMPLOYEE]: {
    method: 'PUT',
    getPath: ({ businessId, employeeId }) => `/${businessId}/employee/update_employee/${employeeId}`,
  },
  [LOAD_NEW_EMPLOYEE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employee/load_new_employee`,
  },
  [CREATE_EMPLOYEE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/employee/create_employee`,
  },
  [DELETE_EMPLOYEE]: {
    method: 'DELETE',
    getPath: ({ businessId, employeeId }) => `/${businessId}/employee/delete_employee/${employeeId}`,
  },
  [LOAD_TAX_PAY_ITEM_MODAL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/taxPayItem/load_tax_pay_item`,
  },
  [UPDATE_TAX_PAY_ITEM_MODAL]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/taxPayItem/update_tax_pay_item`,
  },
  [LOAD_DEDUCTION_PAY_ITEM_MODAL]: {
    method: 'GET',
    getPath: ({ businessId, payItemId }) => `/${businessId}/employee/load_deduction_pay_item/${payItemId}`,
  },
  [LOAD_NEW_DEDUCTION_PAY_ITEM_MODAL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employee/load_new_deduction_pay_item`,
  },
  [CREATE_DEDUCTION_PAY_ITEM_MODAL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/employee/create_new_deduction_pay_item`,
  },
  [UPDATE_DEDUCTION_PAY_ITEM_MODAL]: {
    method: 'PUT',
    getPath: ({ businessId, payItemId }) => `/${businessId}/employee/update_deduction_pay_item/${payItemId}`,
  },
};

export default EmployeeListMapping;
