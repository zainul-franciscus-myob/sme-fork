import { GET_IRD_NUMBER } from '../OnboardingIntents';

const PaydayFilingOnboardingNzMapping = {
  [GET_IRD_NUMBER]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/nz-payroll/paydayFiling/irdNumber`,
  },
};

export default PaydayFilingOnboardingNzMapping;
