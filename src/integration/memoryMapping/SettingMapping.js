import { LOAD_SETTINGS, SAVE_SETTINGS } from '../../root/rootIntents';
import businesses from '../data/businessList.json';
import settings from '../data/settings/settingsList';

const loadSettingsList = ({ urlParams, onSuccess }) => {
  const testBusiness = businesses.find(business => business.businessName === "Rob's Cupcakes");

  return urlParams.businessId === testBusiness.id ? onSuccess([]) : onSuccess(settings);
};

const SettingMapping = {
  [LOAD_SETTINGS]: loadSettingsList,
  [SAVE_SETTINGS]: ({ onSuccess }) => onSuccess(settings),
};

export default SettingMapping;
