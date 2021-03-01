import { LOAD_ONBOARDING, SAVE_ONBOARDING } from '../OnboardingIntents';
import loadOnboardingResponse from './data/loadOnboardingResponse.json';
import saveOnboardingResponse from './data/saveOnboardingResponse.json';

const MemoryOnboardingMapping = {
  [LOAD_ONBOARDING]: ({ onSuccess }) => onSuccess(loadOnboardingResponse),
  [SAVE_ONBOARDING]: ({ onSuccess }) => onSuccess(saveOnboardingResponse),
};

export default MemoryOnboardingMapping;
