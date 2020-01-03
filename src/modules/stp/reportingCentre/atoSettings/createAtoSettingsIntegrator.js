import { LOAD_ATO_SETTINGS, UPDATE_BUSINESS_CONTACT } from './AtoSettingsIntents';
import { getBusinessId } from '../ReportingCentreSelectors';
import { getUpdateBusinessContactContent } from './AtoSettingsSelectors';

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

  updateBusinessContact: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getUpdateBusinessContactContent(state);

    integration.write({
      intent: UPDATE_BUSINESS_CONTACT,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createAtoSettingsIntegrator;
