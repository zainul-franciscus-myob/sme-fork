import {
  CREATE_DRAFT_PAY_RUN,
  RECORD_PAYMENTS,
  START_NEW_PAY_RUN,
  UPDATE_EMPLOYEE_PAY,
} from '../payRunCreate/PayRunIntents';
import createDraftPayRun from './data/payRun/createDraftPayRun';
import startNewPayRun from './data/payRun/startNewPayRun';
import updatedEmployeePay from './data/payRun/updatedEmployeePay';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: ({ onSuccess }) => onSuccess(startNewPayRun),
  [CREATE_DRAFT_PAY_RUN]: ({ onSuccess }) => onSuccess(createDraftPayRun),
  [UPDATE_EMPLOYEE_PAY]: ({ onSuccess }) => onSuccess(updatedEmployeePay),
  [RECORD_PAYMENTS]: ({ onSuccess }) => onSuccess({}),
};

export default PayRunMapping;
