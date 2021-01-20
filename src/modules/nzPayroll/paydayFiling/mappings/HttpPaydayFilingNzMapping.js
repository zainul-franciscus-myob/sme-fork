import { LOAD_BUSINESS_ONBOARDED_STATUS } from '../paydayFiling/PaydayFilingIntents';

const PaydayFilingNzMapping = {
  [LOAD_BUSINESS_ONBOARDED_STATUS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/onboarded`,
  },
};

export default PaydayFilingNzMapping;
