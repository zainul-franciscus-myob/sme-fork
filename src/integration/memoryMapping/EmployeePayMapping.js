import { LOAD_EMPLOYEE_PAY_DETAIL } from '../../employeePay/employeeTransactionModal/EmployeeTransactionModalIntents';
import { SEND_PAY_SLIP_EMAIL } from '../../employeePay/emailPaySlipModal/EmailPaySlipModalIntents';
import loadEmployeePayDetail from '../data/employeeTransactionModal/loadEmployeePayDetail';

const EmployeePayMapping = {
  [LOAD_EMPLOYEE_PAY_DETAIL]: ({ onSuccess }) => onSuccess(loadEmployeePayDetail),
  [SEND_PAY_SLIP_EMAIL]: ({ onSuccess }) => onSuccess({}),
};

export default EmployeePayMapping;
