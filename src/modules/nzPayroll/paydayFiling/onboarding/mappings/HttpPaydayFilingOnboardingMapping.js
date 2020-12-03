import { GET_IRD_NUMBER, ONBOARD_USER } from '../OnboardingIntents';

const PaydayFilingOnboardingNzMapping = {
  [GET_IRD_NUMBER]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/load_ird_number`,
  },

  [ONBOARD_USER]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/create_onboard_user`,
  },
};

export default PaydayFilingOnboardingNzMapping;
