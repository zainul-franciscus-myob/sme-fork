import {
  CREATE_APPLY_TO_SALE,
  DELETE_APPLY_TO_SALE,
  LOAD_APPLY_TO_SALE,
  LOAD_NEW_APPLY_TO_SALE,
} from './ApplyToSaleIntents';
import {
  getApplyToSaleId,
  getBusinessId,
  getCreateApplyToSalePayload,
  getCustomerReturnId,
} from './applyToSaleSelectors';

const createApplyToSaleIntegrator = (store, integration) => ({
  loadApplyToSale: ({ isCreating, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = isCreating ? LOAD_NEW_APPLY_TO_SALE : LOAD_APPLY_TO_SALE;
    const urlParams = isCreating
      ? {
          businessId: getBusinessId(state),
          customerReturnId: getCustomerReturnId(state),
        }
      : {
          businessId: getBusinessId(state),
          applyToSaleId: getApplyToSaleId(state),
        };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  createApplyToSale: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getCreateApplyToSalePayload(state);

    integration.write({
      intent: CREATE_APPLY_TO_SALE,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  deleteApplyToSale: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      applyToSaleId: getApplyToSaleId(state),
    };

    integration.write({
      intent: DELETE_APPLY_TO_SALE,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createApplyToSaleIntegrator;
