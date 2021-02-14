import { GET_BUSINESS_NAME } from '../OnboardingIntents';

const HttpOnboardingMapping = {
  [GET_BUSINESS_NAME]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/onboarding/get_business_name`,
  },
};

export default HttpOnboardingMapping;
