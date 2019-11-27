import {
  LOAD_EMPLOYEE_PAY_DETAIL,
  LOAD_PAY_RUN_DETAILS,
} from '../../payRun/payRunDetail/payRunDetailIntents';
import loadEmployeePayDetail from '../data/payRunDetail/loadEmployeePayDetail';
import loadPayRunDetail from '../data/payRunDetail/loadPayRunDetail';

const PayRunDetailMapping = {
  [LOAD_PAY_RUN_DETAILS]: ({ onSuccess }) => onSuccess(loadPayRunDetail),
  [LOAD_EMPLOYEE_PAY_DETAIL]: ({ onSuccess }) => onSuccess(loadEmployeePayDetail),
};

export default PayRunDetailMapping;
