import {
  FETCH_FILE_UPDATE_STATUS,
  LOAD_FILE_UNAVAILABLE,
  TRIGGER_FILE_UPDATE,
} from './FileUnavailableIntents';

const createFileUnavailableIntegration = (store, integration) => ({
  loadFileUnavailable: (onSuccess, onFailure) => {
    const state = store.getState();
    const { businessId, region } = state;

    const urlParams = {
      businessId,
      region,
    };

    integration.read({
      intent: LOAD_FILE_UNAVAILABLE,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  fetchFileUpdateStatus: (onSuccess, onFailure) => {
    const state = store.getState();
    const { businessId, region } = state;

    const urlParams = {
      businessId,
      region,
    };

    integration.read({
      intent: FETCH_FILE_UPDATE_STATUS,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  triggerFileUpdate: (onSuccess, onFailure) => {
    const state = store.getState();
    const { businessId, region } = state;

    const urlParams = {
      businessId,
      region,
    };

    integration.read({
      intent: TRIGGER_FILE_UPDATE,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createFileUnavailableIntegration;
