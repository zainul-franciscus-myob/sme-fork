import { LOAD_EMPLOYEE_DETAIL, LOAD_EMPLOYEE_LIST } from '../EmployeeNzIntents';
import employeeDetailResponse from './data/employeeDetailEntry';
import employeeListResponse from './data/employeeList';

const loadEmployeeList = ({ onSuccess }) => onSuccess(employeeListResponse);
const loadEmployeeDetail = ({ onSuccess }) => onSuccess(employeeDetailResponse);

const EmployeeListNzMapping = {
  [LOAD_EMPLOYEE_LIST]: loadEmployeeList,
  [LOAD_EMPLOYEE_DETAIL]: loadEmployeeDetail,
};

export default EmployeeListNzMapping;
