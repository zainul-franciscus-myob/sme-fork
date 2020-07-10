import { LOAD_HELP_CONTENT, LOAD_HELP_USER_SETTINGS } from './HelpIntents';
import {
  getLoadHelpContentParams,
  getLoadHelpContentUrlParams,
  getLoadHelpUserSettingsUrlParams,
} from './HelpSelectors';

const createHelpIntegrator = (store, integration) => ({
  loadHelpUserSettings: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getLoadHelpUserSettingsUrlParams(state);

    integration.read({
      intent: LOAD_HELP_USER_SETTINGS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  loadHelpContent: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getLoadHelpContentUrlParams(state);
    const params = getLoadHelpContentParams(state);

    integration.read({
      intent: LOAD_HELP_CONTENT,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createHelpIntegrator;
