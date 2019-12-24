import { EXPORT_TRANSACTION_PDF } from '../../payRun/payRunIntents';
import {
  LOAD_EMPLOYEE_PAYS,
  RECALCULATE_PAY,
  RECORD_PAYMENTS,
  RECORD_STP_DECLARATION,
  START_NEW_PAY_RUN,
  VALIDATE_ETP,
  VALIDATE_PAY_PERIOD_EMPLOYEE_LIMIT,
} from '../../payRun/payRunCreate/PayRunIntents';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payRun/start_new_pay_run`,
  },
  [LOAD_EMPLOYEE_PAYS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payRun/load_employee_pays`,
  },
  [RECALCULATE_PAY]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/payRun/recalculate_pay`,
  },
  [RECORD_PAYMENTS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/payRun/record_payments`,
  },
  [RECORD_STP_DECLARATION]: {
    method: 'POST',
    getPath: ({ businessId, payRunId }) => `/${businessId}/stp/${payRunId}/declaration`,
  },
  [VALIDATE_ETP]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/payRun/validate_etp`,
  },
  [VALIDATE_PAY_PERIOD_EMPLOYEE_LIMIT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/payRun/validate_pay_period_employee_limit`,
  },
  [EXPORT_TRANSACTION_PDF]: {
    method: 'GET',
    getPath: ({ businessId, transactionId }) => (
      `/${businessId}/employeePay/load_employee_pay_pdf/${transactionId}`
    ),
  },
};

export default PayRunMapping;
