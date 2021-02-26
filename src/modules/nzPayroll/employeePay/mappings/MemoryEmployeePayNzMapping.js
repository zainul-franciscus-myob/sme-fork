import {
  DELETE_EMPLOYEE_PAY_DETAILS,
  LOAD_EMPLOYEE_PAY_DETAIL,
} from '../employeePayDetail/EmployeePayDetailIntents';
import loadEmployeePayDetail from './data/loadEmployeePayDetail';

const MemoryEmployeePayNzMapping = {
  [LOAD_EMPLOYEE_PAY_DETAIL]: ({ onSuccess }) =>
    onSuccess(loadEmployeePayDetail),
  [DELETE_EMPLOYEE_PAY_DETAILS]: ({ onSuccess }) => onSuccess(),
};

export default MemoryEmployeePayNzMapping;
