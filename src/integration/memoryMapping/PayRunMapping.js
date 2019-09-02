import { LOAD_EMPLOYEE_PAYS, START_NEW_PAY_RUN } from '../../payRun/PayRunIntents';
import loadEmployeePayList from '../data/payRun/loadEmployeePayList';
import startNewPayRun from '../data/payRun/startNewPayRun';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: ({ onSuccess }) => onSuccess(startNewPayRun),
  [LOAD_EMPLOYEE_PAYS]: ({ onSuccess }) => onSuccess(loadEmployeePayList),
};

export default PayRunMapping;
