import { GET_BUSINESS_ROLES, GET_INDUSTRIES } from '../../onboarding/onboardingIntents';
import { LOAD_SETTINGS, SAVE_SETTINGS } from '../../root/rootIntents';
import businessRoles from '../data/settings/businessRoles';
import businesses from '../data/businessList.json';
import industries from '../data/settings/industries';
import settings from '../data/settings/settingsList';

const loadSettingsList = ({ urlParams, onSuccess }) => {
  const testBusiness = businesses.find(business => business.businessName === "Rob's Cupcakes");
  return urlParams.businessId === testBusiness.id ? onSuccess([]) : onSuccess(settings);
};

const SettingMapping = {
  [LOAD_SETTINGS]: loadSettingsList,
  [SAVE_SETTINGS]: ({ onSuccess }) => onSuccess(settings),
  [GET_INDUSTRIES]: ({ onSuccess }) => onSuccess(industries),
  [GET_BUSINESS_ROLES]: ({ onSuccess }) => onSuccess(businessRoles),
};

export default SettingMapping;
