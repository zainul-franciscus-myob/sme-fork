import {
  CREATE_DRAFT_PAY_RUN,
  RECALCULATE_PAY,
  RECORD_PAYMENTS,
  START_NEW_PAY_RUN,
} from '../payRunCreate/PayRunIntents';
import createDraftPayRun from './data/payRun/createDraftPayRun';
import recalculatedEmployeePay from './data/payRun/recalculatedEmployeePay';
import recordPayments from './data/payRun/recordPayments';
import startNewPayRun from './data/payRun/startNewPayRun';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: ({ onSuccess }) => onSuccess(startNewPayRun),
  [CREATE_DRAFT_PAY_RUN]: ({ onSuccess }) => onSuccess(createDraftPayRun),
  [RECALCULATE_PAY]: ({ onSuccess }) => onSuccess(recalculatedEmployeePay),
  [RECORD_PAYMENTS]: ({ onSuccess }) => onSuccess(recordPayments),
};

export default PayRunMapping;
