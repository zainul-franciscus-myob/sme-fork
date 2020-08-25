import { LOAD_SHARED_INFO, LOAD_SUBSCRIPTION } from './rootIntents';
import { getBusinessId } from './rootSelectors';

const createRootIntegrator = (store, integration) => ({
  loadSubscription: async () => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    return new Promise((resolve, reject) =>
      integration.read({
        intent: LOAD_SUBSCRIPTION,
        urlParams,
        onSuccess: resolve,
        onFailure: reject,
      })
    );
  },

  loadSharedInfo: async () => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    return new Promise((resolve, reject) =>
      integration.read({
        intent: LOAD_SHARED_INFO,
        urlParams,
        onSuccess: resolve,
        onFailure: reject,
      })
    );
  },
});

export default createRootIntegrator;
