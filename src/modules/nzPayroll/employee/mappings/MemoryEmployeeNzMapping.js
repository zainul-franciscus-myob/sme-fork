import { LOAD_EMPLOYEE_LIST } from '../EmployeeNzIntents';
import employeeListResponse from './data/employeeList';

const loadEmployeeList = ({ onSuccess }) => onSuccess(employeeListResponse);

const EmployeeListNzMapping = { [LOAD_EMPLOYEE_LIST]: loadEmployeeList };

export default EmployeeListNzMapping;
