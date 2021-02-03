import {
  DELETE_ONBOARD_USER,
  LOAD_BUSINESS_ONBOARDED_DETAILS,
  LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS,
  LOAD_PAYDAY_USER_SESSION,
} from '../PaydayFilingIntents';

const PaydayFilingMapping = {
  [LOAD_PAYDAY_USER_SESSION]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/user_session`,
  },

  [LOAD_BUSINESS_ONBOARDED_DETAILS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/load_business_onboarded_details`,
  },

  [DELETE_ONBOARD_USER]: {
    method: 'DELETE',
    getPath: ({ businessId, userGuid }) =>
      `/${businessId}/nz-payroll/paydayFiling/remove_onboard_user/${userGuid}`,
  },

  [LOAD_INITIAL_EI_SUBMISSIONS_AND_PAYROLL_OPTIONS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/load_ei_submissions_initial`,
  },
};

export default PaydayFilingMapping;
