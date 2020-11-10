import * as intents from '../EmployeeNzIntents';

const HttpEmployeeNzMapping = {
  [intents.LOAD_EMPLOYEE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/employee/load_employee_list`,
  },
  [intents.LOAD_EMPLOYEE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, employeeId }) =>
      `/${businessId}/nz-payroll/employee/load_employee/${employeeId}`,
  },
  [intents.UPDATE_EMPLOYEE]: {
    method: 'PUT',
    getPath: ({ businessId, employeeId }) =>
      `/${businessId}/nz-payroll/employee/update_employee/${employeeId}`,
  },
  [intents.DELETE_EMPLOYEE]: {
    method: 'DELETE',
    getPath: ({ businessId, employeeId }) =>
      `/${businessId}/nz-payroll/employee/delete_employee/${employeeId}`,
  },
  [intents.LOAD_NEW_EMPLOYEE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/employee/load_new_employee/`,
  },
  [intents.CREATE_EMPLOYEE]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/employee/create_employee/`,
  },
  [intents.SORT_AND_FILTER_EMPLOYEE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/employee/filter_employee_list`,
  },
};

export default HttpEmployeeNzMapping;
