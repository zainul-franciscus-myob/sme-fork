import { LOAD_PAY_RUN_DETAILS } from '../../payRun/payRunDetail/payRunDetailIntents';

const PayRunDetailMapping = {
  [LOAD_PAY_RUN_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId, payRunId }) => `/${businessId}/payrun/${payRunId}/load_pay_run_details`,
  },
};

export default PayRunDetailMapping;
