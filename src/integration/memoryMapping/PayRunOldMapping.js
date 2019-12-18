import { EXPORT_TRANSACTION_PDF } from '../../payRunOld/payRunIntents';
import {
  LOAD_EMPLOYEE_PAYS,
  RECALCULATE_PAY,
  RECORD_PAYMENTS,
  RECORD_STP_DECLARATION,
  START_NEW_PAY_RUN,
  VALIDATE_ETP,
} from '../../payRunOld/payRunCreate/PayRunIntents';
import loadEmployeePayList from '../data/payRunOld/loadEmployeePayList';
import recalculatedEmployeePay from '../data/payRunOld/recalculatedEmployeePay';
import recordPayments from '../data/payRunOld/recordPayments';
import startNewPayRun from '../data/payRunOld/startNewPayRun';
import validateEtp from '../data/payRunOld/validateEtp';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: ({ onSuccess }) => onSuccess(startNewPayRun),
  [LOAD_EMPLOYEE_PAYS]: ({ onSuccess }) => onSuccess(loadEmployeePayList),
  [VALIDATE_ETP]: ({ onSuccess }) => onSuccess(validateEtp),
  [RECALCULATE_PAY]: ({ onSuccess }) => onSuccess(recalculatedEmployeePay),
  [RECORD_PAYMENTS]: ({ onSuccess }) => onSuccess(recordPayments),
  [RECORD_STP_DECLARATION]: ({ onSuccess }) => onSuccess({}),
  [EXPORT_TRANSACTION_PDF]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
};

export default PayRunMapping;
