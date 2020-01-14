import { LOAD_SETTINGS } from '../../rootIntents';
import { getAreOnboardingSettingsLoaded, getBusinessId, getPreviousSettingsBusinessId } from '../../rootSelectors';

const load = (dispatcher, integration, store) => {
  const state = store.getState();
  const businessId = getBusinessId(state);
  const previousSettingsBusinessId = getPreviousSettingsBusinessId(state);
  const areOnboardingSettingsLoaded = getAreOnboardingSettingsLoaded(state);

  if (!businessId
    || (businessId === previousSettingsBusinessId && areOnboardingSettingsLoaded)) return;

  const onFailure = error => console.error(error); //eslint-disable-line

  const onSuccess = settings => dispatcher.loadSettings({
    ...settings,
    previousSettingsBusinessId: businessId,
  });

  const urlParams = { businessId };

  integration.read({
    intent: LOAD_SETTINGS,
    urlParams,
    onSuccess,
    onFailure,
  });
};

export default load;
