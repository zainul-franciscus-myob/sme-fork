import {
  LOAD_BUSINESS_ONBOARDED_STATUS,
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
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
      `/${businessId}/nz-payroll/paydayFiling/load_business_onboarded_status`,
  },

  [LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/load_ei_submissions_initial`,
  },
};

export default PaydayFilingMapping;
