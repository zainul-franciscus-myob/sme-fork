import {
  LOAD_EMPLOYEE_PAYS,
  RECALCULATE_PAY,
  START_NEW_PAY_RUN,
} from '../payRunCreate/PayRunIntents';
import loadEmployeePayList from './data/payRun/loadEmployeePayList';
import recalculatedEmployeePay from './data/payRun/recalculatedEmployeePay';
import startNewPayRun from './data/payRun/startNewPayRun';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: ({ onSuccess }) => onSuccess(startNewPayRun),
  [LOAD_EMPLOYEE_PAYS]: ({ onSuccess }) => onSuccess(loadEmployeePayList),
  [RECALCULATE_PAY]: ({ onSuccess }) => onSuccess(recalculatedEmployeePay),
};

export default PayRunMapping;
