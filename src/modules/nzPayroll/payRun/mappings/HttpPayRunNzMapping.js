import {
  CREATE_DRAFT_PAY_RUN,
  RECORD_PAYMENTS,
  START_NEW_PAY_RUN,
  UPDATE_EMPLOYEE_PAY,
} from '../payRunCreate/PayRunIntents';

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
  [RECORD_PAYMENTS]: {
    method: 'POST',
    getPath: ({ businessId, draftPayRunId }) =>
      `/${businessId}/nz-payroll/payRun/${draftPayRunId}`,
  },
};

export default PayRunMapping;
