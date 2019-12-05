import { GET_BUSINESS_ROLES, GET_INDUSTRIES } from '../../onboarding/onboardingIntents';
import { LOAD_SETTINGS, SAVE_SETTINGS } from '../../root/rootIntents';

const SettingMapping = {
  [LOAD_SETTINGS]: { method: 'GET', getPath: ({ businessId }) => `/${businessId}/settings` },
  [SAVE_SETTINGS]: { method: 'PATCH', getPath: ({ businessId }) => `/${businessId}/settings` },
  [GET_BUSINESS_ROLES]: { method: 'GET', getPath: ({ businessId }) => `/${businessId}/businessRoles` },
  [GET_INDUSTRIES]: { method: 'GET', getPath: ({ businessId }) => `/${businessId}/industries` },
};

export default SettingMapping;
