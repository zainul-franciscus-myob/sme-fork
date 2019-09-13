import {
  LOAD_EMPLOYEE_PAYS, RECALCULATE_PAY, RECORD_PAYMENTS, START_NEW_PAY_RUN,
} from '../../payRun/PayRunIntents';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: {
    method: 'GET',
    getPath: ({ businessId }) => (
      `/${businessId}/payRun/start_new_pay_run`
    ),
  },
  [LOAD_EMPLOYEE_PAYS]: {
    method: 'GET',
    getPath: ({ businessId }) => (
      `/${businessId}/payRun/load_employee_pays`
    ),
  },
  [RECALCULATE_PAY]: {
    method: 'POST',
    getPath: ({ businessId }) => (
      `/${businessId}/payRun/recalculate_pay`
    ),
  },
  [RECORD_PAYMENTS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/payRun/record_payments`,
  },
};

export default PayRunMapping;
