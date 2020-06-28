import {
  START_NEW_PAY_RUN,
} from '../payRunCreate/PayRunIntents';

const PayRunMapping = {
  [START_NEW_PAY_RUN]: {
    method: 'GET',
    getPath: ({ businessId }) => `/nz/${businessId}/payRun/start_new_pay_run`,
  },
};

export default PayRunMapping;
