import {
  DELETE_PAY_RUN_DRAFT,
  LOAD_EMPLOYEE_PAYS,
  LOAD_STP_REGISTRATION_STATUS,
  LOAD_TIMESHEETS,
  PREVIEW_PAY_DETAILS,
  PREVIEW_PAY_RUN_ACTIVITY,
  RECALCULATE_PAY,
  RECORD_PAYMENTS,
  SAVE_DRAFT,
  START_NEW_PAY_RUN,
  VALIDATE_ETP,
  VALIDATE_PAY_PERIOD_EMPLOYEE_LIMIT,
} from '../payRunCreate/PayRunIntents';
import { EXPORT_TRANSACTION_PDF } from '../payRunIntents';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payRun/start_new_pay_run`,
  },
  [DELETE_PAY_RUN_DRAFT]: {
    method: 'DELETE',
    getPath: ({ businessId }) => `/${businessId}/payRun/delete_pay_run_draft`,
  },
  [LOAD_EMPLOYEE_PAYS]: {
    method: 'POST',
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
  [SAVE_DRAFT]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/payRun/save_pay_run_draft`,
  },
  [LOAD_STP_REGISTRATION_STATUS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payRun/load_stp_registration_status`,
  },
  [LOAD_TIMESHEETS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payRun/timesheets`,
  },
  [PREVIEW_PAY_RUN_ACTIVITY]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payRun/preview_pay_run_activity`,
  },
  [PREVIEW_PAY_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payRun/preview_pay_details`,
  },
};

export default PayRunMapping;
