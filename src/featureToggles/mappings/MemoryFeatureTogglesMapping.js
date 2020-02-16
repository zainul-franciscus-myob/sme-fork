import { LOAD_FEATURE_TOGGLES_CONFIG } from '../FeatureTogglesIntents';
import loadFeatures from './data/featureToggles';

const MemoryFeatureTogglesMapping = {
  [LOAD_FEATURE_TOGGLES_CONFIG]: ({ onSuccess }) => onSuccess(loadFeatures),
};

export default MemoryFeatureTogglesMapping;
