import {
  LOAD_HELP_CONTENT,
} from '../../drawer/help/HelpIntents';

const HelpMapping = {
  [LOAD_HELP_CONTENT]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/help/get_help`,
  },
};

export default HelpMapping;
