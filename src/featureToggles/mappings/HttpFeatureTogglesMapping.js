import { LOAD_FEATURE_TOGGLES_CONFIG } from '../FeatureTogglesIntents';

const HttpFeatureTogglesMapping = {
  [LOAD_FEATURE_TOGGLES_CONFIG]: {
    method: 'GET',
    getPath: () => '/featureToggles/load_feature_toggles',
  },
};

export default HttpFeatureTogglesMapping;
