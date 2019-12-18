import {
  CREATE_DEDUCTION_PAY_ITEM_MODAL,
  CREATE_EMPLOYEE, CREATE_EXPENSE_PAY_ITEM_MODAL,
  CREATE_LEAVE_PAY_ITEM,
  CREATE_SUPER_FUND,
  CREATE_SUPER_PAY_ITEM_MODAL,
  CREATE_WAGE_PAY_ITEM_MODAL,
  DELETE_EMPLOYEE,
  LOAD_ABN_DETAIL,
  LOAD_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_EMPLOYEE_DETAIL,
  LOAD_EMPLOYEE_LIST,
  LOAD_EMPLOYEE_LIST_NEXT_PAGE,
  LOAD_EXPENSE_PAY_ITEM_MODAL,
  LOAD_LEAVE_PAY_ITEM,
  LOAD_NEW_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_NEW_EMPLOYEE_DETAIL,
  LOAD_NEW_EXPENSE_PAY_ITEM_MODAL,
  LOAD_NEW_LEAVE_PAY_ITEM,
  LOAD_NEW_SUPER_FUND,
  LOAD_NEW_SUPER_PAY_ITEM_MODAL,
  LOAD_NEW_WAGE_PAY_ITEM_MODAL,
  LOAD_PAYROLL_STANDARD_PAY_WAGE_AMOUNT_RULE,
  LOAD_SUPER_PAY_ITEM_MODAL,
  LOAD_TAX_PAY_ITEM_MODAL,
  LOAD_WAGE_PAY_ITEM_MODAL,
  SORT_AND_FILTER_EMPLOYEE_LIST,
  UPDATE_DEDUCTION_PAY_ITEM_MODAL, UPDATE_EMPLOYEE,
  UPDATE_EXPENSE_PAY_ITEM_MODAL,
  UPDATE_LEAVE_PAY_ITEM,
  UPDATE_SUPER_PAY_ITEM_MODAL,
  UPDATE_TAX_PAY_ITEM_MODAL,
  UPDATE_WAGE_PAY_ITEM_MODAL,
} from '../../modules/employee/EmployeeIntents';

const EmployeeListMapping = {
  [LOAD_EMPLOYEE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employee/load_employee_list`,
  },
  [LOAD_EMPLOYEE_LIST_NEXT_PAGE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employee/filter_employee_list`,
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
  [LOAD_PAYROLL_STANDARD_PAY_WAGE_AMOUNT_RULE]: {
    method: 'GET',
    getPath: ({ businessId, payItemId }) => `/${businessId}/employee/load_standard_pay_wage_amount_rule/${payItemId}`,
  },
  [LOAD_TAX_PAY_ITEM_MODAL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/taxPayItem/load_tax_pay_item`,
  },
  [UPDATE_TAX_PAY_ITEM_MODAL]: {
    method: 'PUT',
    getPath: ({ businessId }) => `/${businessId}/taxPayItem/update_tax_pay_item`,
  },
  [LOAD_EXPENSE_PAY_ITEM_MODAL]: {
    method: 'GET',
    getPath: ({ businessId, payItemId }) => `/${businessId}/employee/load_expense_pay_item/${payItemId}`,
  },
  [LOAD_NEW_EXPENSE_PAY_ITEM_MODAL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employee/load_new_expense_pay_item`,
  },
  [CREATE_EXPENSE_PAY_ITEM_MODAL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/employee/create_new_expense_pay_item`,
  },
  [UPDATE_EXPENSE_PAY_ITEM_MODAL]: {
    method: 'PUT',
    getPath: ({ businessId, payItemId }) => `/${businessId}/employee/update_expense_pay_item/${payItemId}`,
  },
  [LOAD_WAGE_PAY_ITEM_MODAL]: {
    method: 'GET',
    getPath: ({ businessId, payItemId }) => `/${businessId}/employee/load_wage_pay_item/${payItemId}`,
  },
  [LOAD_NEW_WAGE_PAY_ITEM_MODAL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employee/load_new_wage_pay_item`,
  },
  [CREATE_WAGE_PAY_ITEM_MODAL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/employee/create_new_wage_pay_item`,
  },
  [UPDATE_WAGE_PAY_ITEM_MODAL]: {
    method: 'PUT',
    getPath: ({ businessId, payItemId }) => `/${businessId}/employee/update_wage_pay_item/${payItemId}`,
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
  [LOAD_NEW_SUPER_FUND]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employee/load_new_super_fund`,
  },
  [LOAD_ABN_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, abn }) => `/${businessId}/employee/load_abn/${abn}`,
  },
  [CREATE_SUPER_FUND]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/employee/create_super_fund`,
  },
  [LOAD_NEW_SUPER_PAY_ITEM_MODAL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employee/load_new_super_pay_item_detail`,
  },
  [LOAD_SUPER_PAY_ITEM_MODAL]: {
    method: 'GET',
    getPath: ({ businessId, superPayItemId }) => `/${businessId}/employee/load_super_pay_item_detail/${superPayItemId}`,
  },
  [CREATE_SUPER_PAY_ITEM_MODAL]: {
    method: 'POST',
    getPath: ({ businessId }) => (`/${businessId}/employee/create_super_pay_item_detail`),
  },
  [UPDATE_SUPER_PAY_ITEM_MODAL]: {
    method: 'PUT',
    getPath: ({ businessId, superPayItemId }) => `/${businessId}/employee/update_super_pay_item_detail/${superPayItemId}`,
  },
  [LOAD_NEW_LEAVE_PAY_ITEM]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employee/load_new_leave_pay_item`,
  },
  [LOAD_LEAVE_PAY_ITEM]: {
    method: 'GET',
    getPath: ({ businessId, leavePayItemId }) => `/${businessId}/employee/load_leave_pay_item/${leavePayItemId}`,
  },
  [CREATE_LEAVE_PAY_ITEM]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/employee/create_new_leave_pay_item`,
  },
  [UPDATE_LEAVE_PAY_ITEM]: {
    method: 'PUT',
    getPath: ({ businessId, leavePayItemId }) => `/${businessId}/employee/update_leave_pay_item/${leavePayItemId}`,
  },
};

export default EmployeeListMapping;
