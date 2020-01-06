import {
  DELETE_PAY_RUN_DRAFT,
  LOAD_EMPLOYEE_PAYS,
  LOAD_STP_REGISTRATION_STATUS,
  RECALCULATE_PAY,
  RECORD_PAYMENTS,
  RECORD_STP_DECLARATION,
  SAVE_DRAFT,
  START_NEW_PAY_RUN,
  VALIDATE_ETP,
  VALIDATE_PAY_PERIOD_EMPLOYEE_LIMIT,
} from '../../payRun/payRunCreate/PayRunIntents';
import { EXPORT_TRANSACTION_PDF } from '../../payRun/payRunIntents';
import loadEmployeePayList from '../data/payRun/loadEmployeePayList';
import recalculatedEmployeePay from '../data/payRun/recalculatedEmployeePay';
import recordPayments from '../data/payRun/recordPayments';
import startNewPayRun from '../data/payRun/startNewPayRun';
import stpRegistrationStatus from '../data/payRun/stpRegistrationStatus';
import validateEtp from '../data/payRun/validateEtp';
import validatePayPeriodEmployeeLimit from '../data/payRun/validatePayPeriodEmployeeLimit';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: ({ onSuccess }) => onSuccess(startNewPayRun),
  [LOAD_EMPLOYEE_PAYS]: ({ onSuccess }) => onSuccess(loadEmployeePayList),
  [VALIDATE_ETP]: ({ onSuccess }) => onSuccess(validateEtp),
  [VALIDATE_PAY_PERIOD_EMPLOYEE_LIMIT]: ({ onSuccess }) => (
    onSuccess(validatePayPeriodEmployeeLimit)
  ),
  [RECALCULATE_PAY]: ({ onSuccess }) => onSuccess(recalculatedEmployeePay),
  [RECORD_PAYMENTS]: ({ onSuccess }) => onSuccess(recordPayments),
  [RECORD_STP_DECLARATION]: ({ onSuccess }) => onSuccess({}),
  [DELETE_PAY_RUN_DRAFT]: ({ onSuccess }) => onSuccess({}),
  [LOAD_STP_REGISTRATION_STATUS]: ({ onSuccess }) => onSuccess(stpRegistrationStatus),
  [EXPORT_TRANSACTION_PDF]: ({ onSuccess }) => onSuccess(new Blob([], { type: 'application/pdf' })),
  [SAVE_DRAFT]: ({ onSuccess }) => onSuccess({ message: 'Saved the draft successfully' }),
};

export default PayRunMapping;
