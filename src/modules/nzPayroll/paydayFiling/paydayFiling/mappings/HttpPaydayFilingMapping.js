import {
  LOAD_BUSINESS_ONBOARDED_STATUS,
  LOAD_PAYDAY_USER_SESSION,
} from '../PaydayFilingIntents';

const PaydayFilingMapping = {
  [LOAD_PAYDAY_USER_SESSION]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/user_session`,
  },

  [LOAD_BUSINESS_ONBOARDED_STATUS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/onboarded`,
  },
};

export default PaydayFilingMapping;
