import { LOAD_SUPER_FUND_LIST, SORT_AND_FILTER_SUPER_FUND_LIST } from '../../payrollSettings/PayrollSettingsIntents';

const PayrollSettingsMapping = {
  [LOAD_SUPER_FUND_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payrollSettings/load_super_fund_list`,
  },
  [SORT_AND_FILTER_SUPER_FUND_LIST]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/payrollSettings/filter_super_fund_list`,
  },
};

export default PayrollSettingsMapping;
