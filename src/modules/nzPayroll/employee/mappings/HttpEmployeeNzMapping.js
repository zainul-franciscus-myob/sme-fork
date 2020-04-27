import {
  DELETE_EMPLOYEE, LOAD_EMPLOYEE_DETAIL, LOAD_EMPLOYEE_LIST, UPDATE_EMPLOYEE,
} from '../EmployeeNzIntents';

const HttpEmployeeNzMapping = {
  [LOAD_EMPLOYEE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employeeNz/load_employee_list`,
  },
  [LOAD_EMPLOYEE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, employeeId }) => `/${businessId}/employeeNz/load_employee/${employeeId}`,
  },
  [UPDATE_EMPLOYEE]: {
    method: 'PUT',
    getPath: ({ businessId, employeeId }) => `/${businessId}/employeeNz/update_employee/${employeeId}`,
  },
  [DELETE_EMPLOYEE]: {
    method: 'DELETE',
    getPath: ({ businessId, employeeId }) => `/${businessId}/employeeNz/delete_employee/${employeeId}`,
  },
};

export default HttpEmployeeNzMapping;
