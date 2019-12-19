import { LOAD_EMPLOYEE_PAY_DETAIL } from '../employeePayDetail/EmployeePayDetailIntents';
import { LOAD_EMPLOYEE_PAY_MODAL } from '../employeePayModal/EmployeePayModalIntents';
import { SEND_PAY_SLIP_EMAIL } from '../emailPaySlipModal/EmailPaySlipModalIntents';
import loadEmployeePayDetail from './data/loadEmployeePayDetail';

const MemoryEmployeePayMapping = {
  [LOAD_EMPLOYEE_PAY_MODAL]: ({ onSuccess }) => onSuccess(loadEmployeePayDetail),
  [LOAD_EMPLOYEE_PAY_DETAIL]: ({ onSuccess }) => onSuccess(loadEmployeePayDetail),
  [SEND_PAY_SLIP_EMAIL]: ({ onSuccess }) => onSuccess({}),
};

export default MemoryEmployeePayMapping;
