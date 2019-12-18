import { LOAD_BUSINESS_DETAIL, UPDATE_BUSINESS_DETAIL } from '../../modules/business/BusinessIntents';
import { LOAD_SETTINGS, SAVE_SETTINGS } from '../rootIntents';
import buildOnboardingSettings from '../builders/buildOnboardingSettings';

const loadSettings = (dispatcher, integration, context) => {
  const urlParams = { businessId: context.businessId };

  const onSuccess = settings => dispatcher.loadSettings(settings);
  const onFailure = error => console.error(error);

  integration.read({
    intent: LOAD_SETTINGS,
    urlParams,
    onSuccess,
    onFailure,
  });
};

const loadBusinessDetails = (dispatcher, integration, context) => {
  const urlParams = { businessId: context.businessId };

  const onSuccess = details => dispatcher.loadBusinessDetails(details);
  const onFailure = error => console.error(error);

  integration.read({
    intent: LOAD_BUSINESS_DETAIL,
    urlParams,
    onSuccess,
    onFailure,
  });
};

const load = (dispatcher, integration, context) => {
  loadBusinessDetails(dispatcher, integration, context);
  loadSettings(dispatcher, integration, context);
};

const saveSettings = (dispatcher, integration, store, content) => {
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

  dispatcher.setLoadingState(true);

  integration.write({
    intent,
    urlParams,
    content: onboardingSettings,
    onSuccess,
    onFailure,
  });
};

const saveBusinessDetails = (dispatcher, integration, store, content) => {
  const intent = UPDATE_BUSINESS_DETAIL;
  const state = store.getState();
  const { businessId } = state;

  const urlParams = { businessId };

  const onSuccess = (settings) => {
    dispatcher.saveSettings(settings);
    dispatcher.setLoadingState(false);
  };

  const onFailure = error => console.error(error);

  dispatcher.setLoadingState(true);

  integration.write({
    intent,
    urlParams,
    content: {
      organisationName: content.businessName,
    },
    onSuccess,
    onFailure,
  });
};

const save = (dispatcher, integration, store, content) => {
  saveSettings(dispatcher, integration, store, content);
  saveBusinessDetails(dispatcher, integration, store, content);
};

export default (dispatcher, integration, store) => ({
  save: content => save(dispatcher, integration, store, content),
  load: context => load(dispatcher, integration, context),
  getBusinessName: () => store.state.businessName,
});
