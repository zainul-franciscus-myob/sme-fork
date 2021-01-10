import {
  CREATE_ONBOARD_USER,
  GET_IRD_NUMBER,
  UPDATE_ONBOARD_USER,
} from '../OnboardingIntents';

const PaydayFilingOnboardingNzMapping = {
  [GET_IRD_NUMBER]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/load_ird_number`,
  },

  [CREATE_ONBOARD_USER]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/create_onboard_user`,
  },

  [UPDATE_ONBOARD_USER]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/update_onboard_user`,
  },
};

export default PaydayFilingOnboardingNzMapping;
