import {
  LOAD_PAY_SUPER_LIST,
  LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST,
} from './paySuperIntents';
import {
  getAccessTokenContent,
  getBusinessId,
  getSortOrder,
} from './paySuperListSelector';

const createPaySuperListIntegrator = (store, integration) => ({
  loadPaySuperList: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const sortOrder = getSortOrder(state);
    const params = {
      orderBy: sortOrder.column,
      sortOrder: sortOrder.descending ? 'desc' : 'asc',
    };

    integration.read({
      intent: LOAD_PAY_SUPER_LIST,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },

  updateSuperPaymentStatus: ({ onSuccess, onFailure }) => {
    const state = store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getAccessTokenContent(state);

    integration.write({
      intent: LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
});

export default createPaySuperListIntegrator;
