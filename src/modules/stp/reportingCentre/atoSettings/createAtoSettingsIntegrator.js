import {
  LOAD_ATO_SETTINGS,
  UPDATE_AGENT_CONTACT,
  UPDATE_BUSINESS_CONTACT,
  UPDATE_BUSINESS_DETAILS,
} from './AtoSettingsIntents';
import {
  getAgentDetails,
  getUpdateAgentContactContent,
  getUpdateBusinessContactContent,
  getUpdateBusinessDetailsContent,
} from './AtoSettingsSelectors';
import { getBusinessId } from '../ReportingCentreSelectors';

const createAtoSettingsIntegrator = (store, integration) => ({
  loadAtoSettings: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = getAgentDetails(state);

    integration.read({
      intent: LOAD_ATO_SETTINGS,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  updateBusinessDetails: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getUpdateBusinessDetailsContent(state);

    integration.write({
      intent: UPDATE_BUSINESS_DETAILS,
      urlParams,
      content,
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

  updateAgentContact: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getUpdateAgentContactContent(state);

    integration.write({
      intent: UPDATE_AGENT_CONTACT,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createAtoSettingsIntegrator;
