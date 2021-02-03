import {
  CREATE_DRAFT_PAY_RUN,
  DELETE_DRAFT_PAY_RUN,
  LOAD_BUSINESS_ONBOARDED_STATUS,
  LOAD_PAYROLL_VERIFICATION_REPORT,
  RECORD_PAYMENTS,
  START_NEW_PAY_RUN,
  UPDATE_DRAFT_PAY_RUN,
  UPDATE_EMPLOYEE_PAY,
} from '../payRunCreate/PayRunIntents';
import { SORT_AND_FILTER_PAY_RUN_LIST } from '../payRunList/PayRunListIntents';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/nz-payroll/payRun/start`,
  },
  [CREATE_DRAFT_PAY_RUN]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/nz-payroll/payRun/draft`,
  },
  [UPDATE_EMPLOYEE_PAY]: {
    method: 'PUT',
    getPath: ({ businessId, draftPayRunId, employeePayId }) =>
      `/${businessId}/nz-payroll/payRun/draft/${draftPayRunId}/employeePays/${employeePayId}`,
  },
  [UPDATE_DRAFT_PAY_RUN]: {
    method: 'PUT',
    getPath: ({ businessId, draftPayRunId }) =>
      `/${businessId}/nz-payroll/payRun/draft/${draftPayRunId}`,
  },
  [DELETE_DRAFT_PAY_RUN]: {
    method: 'DELETE',
    getPath: ({ businessId, draftPayRunId }) =>
      `/${businessId}/nz-payroll/payRun/draft/${draftPayRunId}`,
  },
  [RECORD_PAYMENTS]: {
    method: 'POST',
    getPath: ({ businessId, draftPayRunId }) =>
      `/${businessId}/nz-payroll/payRun/${draftPayRunId}`,
  },
  [LOAD_PAYROLL_VERIFICATION_REPORT]: {
    method: 'GET',
    getPath: ({ businessId, draftPayRunId }) =>
      `/${businessId}/nz-payroll/payRun/payrollVerificationReport/${draftPayRunId}`,
  },
  [SORT_AND_FILTER_PAY_RUN_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/payRun/filter_pay_run_list`,
  },
  [LOAD_BUSINESS_ONBOARDED_STATUS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/load_business_onboarded_status`,
  },
};

export default PayRunMapping;
