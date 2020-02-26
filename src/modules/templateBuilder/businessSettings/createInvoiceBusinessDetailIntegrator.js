import { LOAD_BUSINESS_DETAIL, UPDATE_BUSINESS_DETAIL } from './invoiceBusinessIntents';
import { getBusinessForUpdate, getBusinessId } from './invoiceBusinessSettingsDetailSelectors';

const createInvoiceBusinessDetailIntegrator = (store, integration) => ({
  saveBusinessDetails: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.write({
      intent: UPDATE_BUSINESS_DETAIL,
      urlParams: {
        businessId: getBusinessId(state),
      },
      content: getBusinessForUpdate(state),
      onSuccess,
      onFailure,
    });
  },
  loadBusinessDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    integration.read({
      intent: LOAD_BUSINESS_DETAIL,
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
    });
  },
});

export default createInvoiceBusinessDetailIntegrator;
