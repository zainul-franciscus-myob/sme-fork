import {
  CREATE_PAY_REFUND,
  DELETE_PAY_REFUND,
  LOAD_NEW_PAY_REFUND,
  LOAD_PAY_REFUND,
  LOAD_REFERENCE_ID,
} from '../PayRefundIntents';
import {
  getBusinessId,
  getCustomerReturnId,
  getIsCreating,
  getRefund,
  getRefundId,
} from './payRefundSelectors';

const createPayRefundIntegrator = (store, integration) => ({
  loadRefund: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? LOAD_NEW_PAY_REFUND : LOAD_PAY_REFUND;

    const customerReturnId = isCreating
      ? getCustomerReturnId(state)
      : undefined;
    const refundId = isCreating ? undefined : getRefundId(state);

    const urlParams = {
      businessId: getBusinessId(state),
      customerReturnId,
      refundId,
    };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  createRefund: ({ onSuccess, onFailure }) => {
    const intent = CREATE_PAY_REFUND;

    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const content = getRefund(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  deleteRefund: ({ onSuccess, onFailure }) => {
    const intent = DELETE_PAY_REFUND;

    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      refundId: getRefundId(state),
    };

    integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  loadReferenceId: ({ accountId, onSuccess, onFailure }) => {
    const intent = LOAD_REFERENCE_ID;

    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = { accountId };

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createPayRefundIntegrator;
