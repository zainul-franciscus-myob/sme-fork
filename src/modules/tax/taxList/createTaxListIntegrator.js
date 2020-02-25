import { LOAD_TAX_LIST } from '../TaxIntents';
import { getBusinessId } from './taxListSelectors';

const createTaxListIntegrator = (store, integration) => ({
  loadTaxList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_TAX_LIST,
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },
});

export default createTaxListIntegrator;
