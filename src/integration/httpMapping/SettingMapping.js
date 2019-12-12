import { LOAD_SETTINGS, SAVE_SETTINGS } from '../../root/rootIntents';

const SettingMapping = {
  [LOAD_SETTINGS]: { method: 'GET', getPath: ({ businessId }) => `/${businessId}/settings` },
  [SAVE_SETTINGS]: { method: 'PUT', getPath: ({ businessId }) => `/${businessId}/settings` },
};

export default SettingMapping;
