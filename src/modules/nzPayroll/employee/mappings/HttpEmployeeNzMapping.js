import { LOAD_EMPLOYEE_DETAIL, LOAD_EMPLOYEE_LIST } from '../EmployeeNzIntents';

const HttpEmployeeNzMapping = {
  [LOAD_EMPLOYEE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employeeNz/load_employee_list`,
  },
  [LOAD_EMPLOYEE_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, employeeId }) => `/${businessId}/employeeNz/load_employee/${employeeId}`,
  },
};

export default HttpEmployeeNzMapping;
