import { SAVE_SETTINGS } from '../../rootIntents';
import buildOnboardingSettings from '../../builders/buildOnboardingSettings';

const save = async (dispatcher, integration, store) => {
  const intent = SAVE_SETTINGS;
  const state = store.getState();
  const { businessId } = state;
  const urlParams = { businessId };
  const onboardingSettings = buildOnboardingSettings(state);

  const onSuccess = (settings) => {
    dispatcher.saveSettings(settings);
    dispatcher.setLoadingState(false);
  };

  // eslint-disable-next-line no-console
  const onFailure = error => console.error(error);

  dispatcher.setLoadingState(true);

  integration.write({
    intent,
    urlParams,
    content: onboardingSettings,
    onSuccess,
    onFailure,
  });
};

export default save;
