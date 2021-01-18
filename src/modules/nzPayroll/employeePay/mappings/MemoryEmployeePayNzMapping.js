import { LOAD_EMPLOYEE_PAY_DETAIL } from '../employeePayDetail/EmployeePayDetailIntents';
import loadEmployeePayDetail from './data/loadEmployeePayDetail';

const MemoryEmployeePayNzMapping = {
  [LOAD_EMPLOYEE_PAY_DETAIL]: ({ onSuccess }) =>
    onSuccess(loadEmployeePayDetail),
};

export default MemoryEmployeePayNzMapping;
