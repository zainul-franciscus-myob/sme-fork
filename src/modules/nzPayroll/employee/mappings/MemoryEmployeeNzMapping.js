import * as intents from '../EmployeeNzIntents';
import employeeDetailResponse from './data/employeeDetailEntry';
import employeeListResponse from './data/employeeList';
import success from './data/success.json';
import updatedEmployeeDetailResponse from './data/updateEmployeeDetailResponse';

const loadEmployeeList = ({ onSuccess }) => onSuccess(employeeListResponse);
const loadEmployeeDetail = ({ onSuccess }) => onSuccess(employeeDetailResponse);
const updateEmployee = ({ onSuccess }) => { onSuccess(updatedEmployeeDetailResponse); };
const deleteEmployee = ({ onSuccess }) => { onSuccess(success); };

const EmployeeListNzMapping = {
  [intents.LOAD_EMPLOYEE_LIST]: loadEmployeeList,
  [intents.LOAD_EMPLOYEE_DETAIL]: loadEmployeeDetail,
  [intents.UPDATE_EMPLOYEE]: updateEmployee,
  [intents.DELETE_EMPLOYEE]: deleteEmployee,
};

export default EmployeeListNzMapping;
