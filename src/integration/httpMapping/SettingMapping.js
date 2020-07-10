import { LOAD_SETTINGS, SAVE_SETTINGS } from '../../root/rootIntents';

const SettingMapping = {
  [LOAD_SETTINGS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/settings/load_onboarding_state`,
  },
  [SAVE_SETTINGS]: {
    method: 'PUT',
    getPath: ({ businessId }) =>
      `/${businessId}/settings/update_onboarding_state`,
  },
};

export default SettingMapping;
