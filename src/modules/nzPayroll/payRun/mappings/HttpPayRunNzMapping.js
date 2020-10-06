import {
  CREATE_DRAFT_PAY_RUN,
  RECALCULATE_PAY,
  RECORD_PAYMENTS,
  START_NEW_PAY_RUN,
} from '../payRunCreate/PayRunIntents';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: {
    method: 'GET',
    getPath: ({ businessId }) => `/nz/${businessId}/payRun/start_new_pay_run`,
  },
  [CREATE_DRAFT_PAY_RUN]: {
    method: 'POST',
    getPath: ({ businessId }) => `/nz/${businessId}/payRun/draft`,
  },
  [RECALCULATE_PAY]: {
    method: 'POST',
    getPath: ({ businessId }) => `/nz/${businessId}/payRun/recalculate_pay`,
  },
  [RECORD_PAYMENTS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/nz/${businessId}/payRun/record_payments`,
  },
};

export default PayRunMapping;
