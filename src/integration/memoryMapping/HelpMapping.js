import {
  LOAD_HELP_CONTENT,
  LOAD_HELP_USER_SETTINGS,
} from '../../drawer/help/HelpIntents';
import helpData from '../data/help/helpContent.json';
import helpUserSettings from '../data/help/helpUserSettings.json';

const loadHelpUserSettings = ({ onSuccess }) => onSuccess(helpUserSettings);
const loadHelpContent = ({ onSuccess }) => onSuccess(helpData);

const HelpMapping = {
  [LOAD_HELP_USER_SETTINGS]: loadHelpUserSettings,
  [LOAD_HELP_CONTENT]: loadHelpContent,
};

export default HelpMapping;
