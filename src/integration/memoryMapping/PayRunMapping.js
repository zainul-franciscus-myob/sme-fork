import {
  LOAD_EMPLOYEE_PAYS, RECALCULATE_PAY, RECORD_PAYMENTS, START_NEW_PAY_RUN,
} from '../../payRun/PayRunIntents';
import loadEmployeePayList from '../data/payRun/loadEmployeePayList';
import recalculatedEmployeePay from '../data/payRun/recalculatedEmployeePay';
import startNewPayRun from '../data/payRun/startNewPayRun';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: ({ onSuccess }) => onSuccess(startNewPayRun),
  [LOAD_EMPLOYEE_PAYS]: ({ onSuccess }) => onSuccess(loadEmployeePayList),
  [RECALCULATE_PAY]: ({ onSuccess }) => onSuccess(recalculatedEmployeePay),
  [RECORD_PAYMENTS]: ({ onSuccess }) => onSuccess({}),
};

export default PayRunMapping;
