import { LOAD_FEATURE_TOGGLES_CONFIG } from './FeatureTogglesIntents';

const loadFeatureToggles = (integration) =>
  new Promise((res) => {
    const onSuccess = (response) => {
      res(response);
    };

    const onFailure = () => {
      res({});
    };

    integration.read({
      intent: LOAD_FEATURE_TOGGLES_CONFIG,
      onSuccess,
      onFailure,
    });
  });

export default loadFeatureToggles;
