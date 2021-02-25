import { LOAD_ONBOARDING, SAVE_ONBOARDING } from '../OnboardingIntents';

const HttpOnboardingMapping = {
  [LOAD_ONBOARDING]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/settings/load_onboarding`,
  },
  [SAVE_ONBOARDING]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/settings/update_onboarding_state`,
  },
};

export default HttpOnboardingMapping;
