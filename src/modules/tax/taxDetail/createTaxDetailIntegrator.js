import { LOAD_TAX_DETAIL, SAVE_TAX_DETAIL } from '../TaxIntents';
import {
  getBusinessId,
  getSaveTaxDetailContent,
  getTaxCodeId,
} from './taxDetailSelectors';

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

  saveTaxDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      taxCodeId: getTaxCodeId(state),
    };

    integration.write({
      intent: SAVE_TAX_DETAIL,
      urlParams,
      content: getSaveTaxDetailContent(state),
      onSuccess,
      onFailure,
    });
  },
});

export default createTaxDetailIntegrator;
