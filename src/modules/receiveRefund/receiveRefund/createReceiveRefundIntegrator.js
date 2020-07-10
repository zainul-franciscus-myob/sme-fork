import {
  CREATE_RECEIVE_REFUND,
  DELETE_RECEIVE_REFUND,
  LOAD_NEW_RECEIVE_REFUND,
  LOAD_RECEIVE_REFUND,
} from '../ReceiveRefundIntents';
import {
  getBusinessId,
  getIsCreating,
  getRefundForCreate,
  getRefundId,
  getSupplierReturnId,
} from './receiveRefundSelectors';

const createReceiveRefundIntegrator = (store, integration) => ({
  loadRefund: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? LOAD_NEW_RECEIVE_REFUND : LOAD_RECEIVE_REFUND;

    const supplierReturnId = isCreating
      ? getSupplierReturnId(state)
      : undefined;
    const refundId = isCreating ? undefined : getRefundId(state);

    const urlParams = {
      businessId: getBusinessId(state),
      supplierReturnId,
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
    const intent = CREATE_RECEIVE_REFUND;

    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const content = getRefundForCreate(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  deleteRefund: ({ onSuccess, onFailure }) => {
    const intent = DELETE_RECEIVE_REFUND;

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
});

export default createReceiveRefundIntegrator;
