import { LOAD_SHARED_INFO, LOAD_SUBSCRIPTION } from './rootIntents';
import { getBusinessId } from './rootSelectors';

const createRootIntegrator = (store, integration) => ({
  loadSubscription: async ({ onSuccess }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    try {
      const subscription = await new Promise((resolve, reject) =>
        integration.read({
          intent: LOAD_SUBSCRIPTION,
          urlParams,
          onSuccess: resolve,
          onFailure: reject,
        })
      );

      onSuccess(subscription);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  },

  loadSharedInfo: async ({ onSuccess }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    try {
      const sharedInfo = await new Promise((resolve, reject) =>
        integration.read({
          intent: LOAD_SHARED_INFO,
          urlParams,
          onSuccess: resolve,
          onFailure: reject,
        })
      );

      onSuccess(sharedInfo);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  },
});

export default createRootIntegrator;
