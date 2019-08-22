import { LOAD_EMPLOYEE_PAYS, START_NEW_PAY_RUN } from '../../payRun/PayRunIntents';
import startNewPayRun from '../data/payRun/startNewPayRun';
import successResponse from '../data/success';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: ({ onSuccess }) => onSuccess(startNewPayRun),
  [LOAD_EMPLOYEE_PAYS]: ({ onSuccess }) => onSuccess(successResponse),
};

export default PayRunMapping;
