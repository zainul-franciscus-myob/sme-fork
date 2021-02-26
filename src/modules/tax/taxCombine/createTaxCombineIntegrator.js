import { COMBINE, LOAD_TAX_COMBINE } from '../TaxIntents';
import {
  getBusinessId,
  getCombineTaxCodesContent,
} from './taxCombineSelectors';

const createTaxCombineIntegrator = (store, integration) => ({
  loadTaxCombine: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_TAX_COMBINE,
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },

  combineTaxCodes: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: COMBINE,
      urlParams: {
        businessId: getBusinessId(state),
      },
      content: getCombineTaxCodesContent(state),
      onSuccess,
      onFailure,
    });
  },
});

export default createTaxCombineIntegrator;
