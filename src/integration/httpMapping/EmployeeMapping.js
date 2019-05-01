import { LOAD_EMPLOYEE_LIST, SORT_AND_FILTER_EMPLOYEE_LIST } from '../../employee/EmployeeIntents';

const EmployeeListMapping = {
  [LOAD_EMPLOYEE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employee/load_employee_list`,
  },
  [SORT_AND_FILTER_EMPLOYEE_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/employee/filter_employee_list`,
  },
};

export default EmployeeListMapping;
