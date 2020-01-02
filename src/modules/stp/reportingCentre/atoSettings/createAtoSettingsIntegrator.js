import { LOAD_ATO_SETTINGS } from './AtoSettingsIntents';
import { getBusinessId } from '../ReportingCentreSelectors';

const createAtoSettingsIntegrator = (store, integration) => ({
  loadAtoSettings: ({ onSuccess, onFailure }) => {
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent: LOAD_ATO_SETTINGS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createAtoSettingsIntegrator;
