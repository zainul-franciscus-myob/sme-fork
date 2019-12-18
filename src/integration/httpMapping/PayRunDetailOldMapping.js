import { LOAD_PAY_RUN_DETAILS } from '../../payRunOld/payRunDetail/payRunDetailIntents';

const PayRunDetailMapping = {
  [LOAD_PAY_RUN_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId, payRunId }) => `/${businessId}/payRunOld/load_pay_run_detail/${payRunId}`,
  },
};

export default PayRunDetailMapping;
