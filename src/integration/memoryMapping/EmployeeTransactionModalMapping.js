
import { LOAD_EMPLOYEE_PAY_DETAIL } from '../../sharedSubModules/employeeTransactionModal/EmployeeTransactionModalIntents';
import loadEmployeePayDetail from '../data/employeeTransactionModal/loadEmployeePayDetail';

const EmployeeTransactionModalMapping = {
  [LOAD_EMPLOYEE_PAY_DETAIL]: ({ onSuccess }) => onSuccess(loadEmployeePayDetail),
};

export default EmployeeTransactionModalMapping;
