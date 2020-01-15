import { SAVE_SETTINGS } from '../../rootIntents';
import buildOnboardingSettings from '../../builders/buildOnboardingSettings';

const save = async (dispatcher, integration, store) => {
  const intent = SAVE_SETTINGS;
  const state = store.getState();
  const { businessId } = state;
  const urlParams = { businessId };
  const onboardingSettings = buildOnboardingSettings(state);

  dispatcher.setLoadingState(true);

  try {
    const settings = await new Promise((resolve, reject) => integration.write({
      intent,
      urlParams,
      content: onboardingSettings,
      onSuccess: resolve,
      onFailure: reject,
    }));

    dispatcher.saveSettings(settings);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  dispatcher.setLoadingState(false);
};

export default save;
