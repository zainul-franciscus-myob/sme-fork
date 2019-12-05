import { LOAD_SETTINGS, SAVE_SETTINGS } from '../rootIntents';
import buildOnboardingSettings from '../builders/buildOnboardingSettings';

const load = (dispatcher, integration, context) => {
  const urlParams = { businessId: context.businessId };

  const onSuccess = (settings) => {
    dispatcher.loadSettings(settings);
    dispatcher.setLoadingState(false);
  };

  const onFailure = error => console.error(error);

  integration.read({
    intent: LOAD_SETTINGS,
    urlParams,
    onSuccess,
    onFailure,
  });
  dispatcher.setLoadingState(true);
};

const save = (dispatcher, integration, store, content) => {
  const intent = SAVE_SETTINGS;
  const state = store.getState();
  const { businessId } = state;

  const onboardingSettings = buildOnboardingSettings(content);

  const urlParams = { businessId };

  const onSuccess = (settings) => {
    dispatcher.saveSettings(settings);
    dispatcher.setLoadingState(false);
  };

  const onFailure = error => console.error(error);

  integration.write({
    intent,
    urlParams,
    content: onboardingSettings,
    onSuccess,
    onFailure,
  });
};


export default (dispatcher, integration, store) => ({
  save: content => save(dispatcher, integration, store, content),
  load: context => load(dispatcher, integration, context),
});
