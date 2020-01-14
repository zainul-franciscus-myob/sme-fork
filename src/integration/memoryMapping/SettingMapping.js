import { LOAD_SETTINGS, SAVE_SETTINGS } from '../../root/rootIntents';
import settings from '../data/settings/settingsList';

const ROBS_CUPCAKES = '000e39e6-5415-4bc0-ac0d-21d0992dfae8';

const onboardingCompleteSettings = { ...settings, onboardingComplete: true };

const loadSettingsList = ({ onSuccess, urlParams }) => {
  const { businessId } = urlParams;

  if (businessId === ROBS_CUPCAKES) return onSuccess(settings);

  return onSuccess(onboardingCompleteSettings);
};

const SettingMapping = {
  [LOAD_SETTINGS]: loadSettingsList,
  [SAVE_SETTINGS]: ({ onSuccess }) => onSuccess(onboardingCompleteSettings),
};

export default SettingMapping;
