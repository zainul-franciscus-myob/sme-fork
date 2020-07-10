import { SORT_AND_FILTER_PAY_RUN_LIST } from '../payRunList/PayRunListIntents';

const PayRunListMapping = {
  [SORT_AND_FILTER_PAY_RUN_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payRun/filter_pay_run_list`,
  },
};

export default PayRunListMapping;
