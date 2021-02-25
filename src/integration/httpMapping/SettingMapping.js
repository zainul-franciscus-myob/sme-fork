import { LOAD_SETTINGS } from '../../root/rootIntents';

const SettingMapping = {
  [LOAD_SETTINGS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/settings/load_onboarding_state`,
  },
};

export default SettingMapping;
