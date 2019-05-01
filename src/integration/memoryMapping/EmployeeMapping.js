import { LOAD_EMPLOYEE_LIST, SORT_AND_FILTER_EMPLOYEE_LIST } from '../../employee/EmployeeIntents';
import employeeListFilterResponse from '../data/employee/filterEmployeeList';
import employeeListResponse from '../data/employee/employeeList';

const loadEmployeeList = ({ onSuccess }) => { onSuccess(employeeListResponse); };

const sortAndFilterEmployeeList = ({ onSuccess }) => { onSuccess(employeeListFilterResponse); };

const EmployeeListMapping = {
  [LOAD_EMPLOYEE_LIST]: loadEmployeeList,
  [SORT_AND_FILTER_EMPLOYEE_LIST]: sortAndFilterEmployeeList,
};

export default EmployeeListMapping;
