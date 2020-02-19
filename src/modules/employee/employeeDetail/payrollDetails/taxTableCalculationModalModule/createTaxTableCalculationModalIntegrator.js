import { LOAD_TAX_TABLE_RESULT } from './taxTableCalculationModalIntents';
import { getBusinessId, getFetchTaxTableResultRequestContext } from './taxTableCalculationModalSelectors';

const createTaxTableCalculationModalIntegrator = (store, integration) => ({
  fetchTaxTableResult: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = getFetchTaxTableResultRequestContext(state);

    integration.read({
      intent: LOAD_TAX_TABLE_RESULT,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createTaxTableCalculationModalIntegrator;
