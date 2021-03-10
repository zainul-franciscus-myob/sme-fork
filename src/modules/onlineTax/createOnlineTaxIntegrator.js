import { LOAD_ONLINETAX_CONFIG } from './onlineTaxIntent';
import { getBusinessId } from './onlineTaxSelectors';

const createOnlineTaxIntegrator = (store, integration) => ({
  loadOnlineTaxConfig: ({ onSuccess, onFailure }) => {
    const businessId = getBusinessId(store.getState());
    const intent = LOAD_ONLINETAX_CONFIG;
    const urlParams = { businessId };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createOnlineTaxIntegrator;
