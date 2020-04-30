import * as intents from '../EmployeeNzIntents';

const HttpEmployeeNzMapping = {
  [intents.LOAD_EMPLOYEE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employeeNz/load_employee_list`,
  },
  [intents.LOAD_EMPLOYEE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, employeeId }) => `/${businessId}/employeeNz/load_employee/${employeeId}`,
  },
  [intents.UPDATE_EMPLOYEE]: {
    method: 'PUT',
    getPath: ({ businessId, employeeId }) => `/${businessId}/employeeNz/update_employee/${employeeId}`,
  },
  [intents.DELETE_EMPLOYEE]: {
    method: 'DELETE',
    getPath: ({ businessId, employeeId }) => `/${businessId}/employeeNz/delete_employee/${employeeId}`,
  },
  [intents.LOAD_NEW_EMPLOYEE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employeeNz/load_new_employee/`,
  },
  [intents.CREATE_EMPLOYEE]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/employeeNz/create_employee/`,
  },
};

export default HttpEmployeeNzMapping;
