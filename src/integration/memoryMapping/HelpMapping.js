import { LOAD_HELP_CONTENT } from '../../drawer/help/HelpIntents';
import data from '../data/help/helpContent.json';

const loadHelpContent = ({ onSuccess }) => onSuccess(data);

const HelpMapping = {
  [LOAD_HELP_CONTENT]: loadHelpContent,
};

export default HelpMapping;
