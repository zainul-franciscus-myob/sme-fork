import {
  LOAD_NAVIGATION_CONFIG,
} from '../../navigation/NavigationIntents';
import navigationConfig from '../data/navigation/navigationConfig.json';
import navigationConfigNz from '../data/navigation/navigationConfigNz.json';

const NZ_BUSINESS_ID = 'c334b720-4775-4721-92dd-dadb1e0101df';

const loadNavigationConfig = ({ onSuccess, urlParams }) => {
  const navConfig = urlParams.businessId === NZ_BUSINESS_ID ? navigationConfigNz : navigationConfig;
  return onSuccess(navConfig);
};

const NavigationMapping = {
  [LOAD_NAVIGATION_CONFIG]: loadNavigationConfig,
};

export default NavigationMapping;
