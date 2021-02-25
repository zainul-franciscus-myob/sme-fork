import { LOAD_ONBOARDING } from '../OnboardingIntents';
import loadOnboardingResponse from './data/loadOnboardingResponse.json';

const MemoryOnboardingMapping = {
  [LOAD_ONBOARDING]: ({ onSuccess }) => onSuccess(loadOnboardingResponse),
};

export default MemoryOnboardingMapping;
