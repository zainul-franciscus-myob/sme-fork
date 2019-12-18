import {
  SORT_AND_FILTER_PAY_RUN_LIST,
} from '../../payRunOld/payRunList/PayRunListIntents';

const PayRunListMapping = {
  [SORT_AND_FILTER_PAY_RUN_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payRunOld/filter_pay_run_list`,
  },
};

export default PayRunListMapping;
