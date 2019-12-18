import { EXPORT_TRANSACTION_PDF } from '../../payRunOld/payRunIntents';
import {
  LOAD_EMPLOYEE_PAYS,
  RECALCULATE_PAY,
  RECORD_PAYMENTS,
  RECORD_STP_DECLARATION,
  START_NEW_PAY_RUN,
  VALIDATE_ETP,
} from '../../payRunOld/payRunCreate/PayRunIntents';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payRunOld/start_new_pay_run`,
  },
  [LOAD_EMPLOYEE_PAYS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payRunOld/load_employee_pays`,
  },
  [RECALCULATE_PAY]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/payRunOld/recalculate_pay`,
  },
  [RECORD_PAYMENTS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/payRunOld/record_payments`,
  },
  [RECORD_STP_DECLARATION]: {
    method: 'POST',
    getPath: ({ businessId, payRunId }) => `/${businessId}/stp/${payRunId}/declaration`,
  },
  [VALIDATE_ETP]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/payRunOld/validate_etp`,
  },
  [EXPORT_TRANSACTION_PDF]: {
    method: 'GET',
    getPath: ({ businessId, transactionId }) => (
      `/${businessId}/employeePay/load_employee_pay_pdf/${transactionId}`
    ),
  },
};

export default PayRunMapping;
