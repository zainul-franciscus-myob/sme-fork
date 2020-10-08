import {
  CREATE_DRAFT_PAY_RUN,
  RECALCULATE_PAY,
  RECORD_PAYMENTS,
  START_NEW_PAY_RUN,
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
  [RECALCULATE_PAY]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/payRun/recalculate_pay`,
  },
  [RECORD_PAYMENTS]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/payRun/record_payments`,
  },
};

export default PayRunMapping;
