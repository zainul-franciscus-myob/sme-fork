import { LOAD_SETTINGS, SAVE_SETTINGS } from '../../root/rootIntents';

const SettingMapping = {
  [LOAD_SETTINGS]: { method: 'GET', getPath: ({ businessId }) => `/${businessId}/settings/load_settings` },
  [SAVE_SETTINGS]: { method: 'PUT', getPath: ({ businessId }) => `/${businessId}/settings/update_settings` },
};

export default SettingMapping;
