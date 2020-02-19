import { LOAD_SUBSCRIPTION } from './rootIntents';
import { getBusinessId } from './rootSelectors';

const createRootIntegrator = (store, integration) => ({
  loadSubscriptions: () => new Promise((resolve, reject) => {
    const intent = LOAD_SUBSCRIPTION;
    const urlParams = {
      businessId: getBusinessId(store.getState()),
    };

    integration.read({
      intent,
      urlParams,
      onSuccess: resolve,
      onFailure: reject,
    });
  }).catch(error => console.error(error)), // eslint-disable-line no-console
});

export default createRootIntegrator;
