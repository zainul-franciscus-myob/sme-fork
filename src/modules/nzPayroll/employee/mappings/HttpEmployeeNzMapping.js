import { LOAD_EMPLOYEE_LIST } from '../EmployeeNzIntents';

const HttpEmployeeNzMapping = {
  [LOAD_EMPLOYEE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employeeNz/load_employee_list`,
  },
};

export default HttpEmployeeNzMapping;
