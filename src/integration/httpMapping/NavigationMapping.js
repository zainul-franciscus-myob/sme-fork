import {
  LOAD_NAVIGATION_CONFIG,
} from '../../navigation/NavigationIntents';

export default {
  [LOAD_NAVIGATION_CONFIG]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/navigation/load_navigation_config`,
  },
};
