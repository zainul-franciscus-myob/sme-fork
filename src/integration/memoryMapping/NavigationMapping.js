import {
  LOAD_NAVIGATION_CONFIG,
} from '../../navigation/NavigationIntents';
import navigationConfig from '../data/navigation/navigationConfig.json';

const loadNavigationConfig = ({ onSuccess }) => onSuccess(navigationConfig);

const NavigationMapping = {
  [LOAD_NAVIGATION_CONFIG]: loadNavigationConfig,
};

export default NavigationMapping;
