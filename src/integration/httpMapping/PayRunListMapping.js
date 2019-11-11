import {
  LOAD_PAY_RUN_LIST,
  SORT_AND_FILTER_PAY_RUN_LIST,
} from '../../payRun/payRunList/PayRunListIntents';

const PayRunListMapping = {
  [LOAD_PAY_RUN_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payRun/load_pay_run_list`,
  },

  [SORT_AND_FILTER_PAY_RUN_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payRun/filter_pay_run_list`,
  },
};

export default PayRunListMapping;
