import {
  LOAD_EMPLOYEE_PAYS,
  RECALCULATE_PAY,
  START_NEW_PAY_RUN,
} from '../payRunCreate/PayRunIntents';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: {
    method: 'GET',
    getPath: ({ businessId }) => `/nz/${businessId}/payRun/start_new_pay_run`,
  },
  [LOAD_EMPLOYEE_PAYS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/nz/${businessId}/payRun/load_employee_pays`,
  },
  [RECALCULATE_PAY]: {
    method: 'POST',
    getPath: ({ businessId }) => `/nz/${businessId}/payRun/recalculate_pay`,
  },
};

export default PayRunMapping;
