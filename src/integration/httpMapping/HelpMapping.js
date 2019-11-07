import {
  LOAD_HELP_CONTENT, LOAD_HELP_USER_SETTINGS,
} from '../../drawer/help/HelpIntents';

const HelpMapping = {
  [LOAD_HELP_USER_SETTINGS]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/help/load_help_user_settings`,
  },
  [LOAD_HELP_CONTENT]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/help/load_help_content`,
  },
};

export default HelpMapping;
