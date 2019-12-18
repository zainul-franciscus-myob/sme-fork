import { LOAD_EMPLOYEE_PAY_DETAIL } from '../../modules/employeePay/employeePayDetail/EmployeePayDetailIntents';
import { LOAD_EMPLOYEE_PAY_MODAL } from '../../modules/employeePay/employeePayModal/EmployeePayModalIntents';
import { SEND_PAY_SLIP_EMAIL } from '../../modules/employeePay/emailPaySlipModal/EmailPaySlipModalIntents';
import loadEmployeePayDetail from '../data/employeePay/loadEmployeePayDetail';

const EmployeePayMapping = {
  [LOAD_EMPLOYEE_PAY_MODAL]: ({ onSuccess }) => onSuccess(loadEmployeePayDetail),
  [LOAD_EMPLOYEE_PAY_DETAIL]: ({ onSuccess }) => onSuccess(loadEmployeePayDetail),
  [SEND_PAY_SLIP_EMAIL]: ({ onSuccess }) => onSuccess({}),
};

export default EmployeePayMapping;
