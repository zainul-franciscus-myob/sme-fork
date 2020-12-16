import { LOAD_TAX_DETAIL } from '../TaxIntents';
import { getBusinessId, getTaxCodeId } from './taxDetailSelectors';

const createTaxDetailIntegrator = (store, integration) => ({
  loadTaxDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      taxCodeId: getTaxCodeId(state),
    };

    integration.read({
      intent: LOAD_TAX_DETAIL,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createTaxDetailIntegrator;
