import { LOAD_SETTINGS } from '../../rootIntents';
import {
  getAreOnboardingSettingsLoaded,
  getBusinessId,
  getPreviousSettingsBusinessId,
} from '../../rootSelectors';

const load = async (dispatcher, integration, store) => {
  const state = store.getState();
  const businessId = getBusinessId(state);
  const previousSettingsBusinessId = getPreviousSettingsBusinessId(state);
  const areOnboardingSettingsLoaded = getAreOnboardingSettingsLoaded(state);

  if (
    !businessId ||
    (businessId === previousSettingsBusinessId && areOnboardingSettingsLoaded)
  )
    return;

  const settings = await new Promise((resolve, reject) =>
    integration.read({
      intent: LOAD_SETTINGS,
      urlParams: { businessId },
      onSuccess: resolve,
      onFailure: reject,
    })
  );

  dispatcher.loadSettings({
    ...settings,
    previousSettingsBusinessId: businessId,
  });
};

export default load;
