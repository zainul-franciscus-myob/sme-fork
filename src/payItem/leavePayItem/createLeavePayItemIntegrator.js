import {
  CREATE_LEAVE_PAY_ITEM,
  DELETE_LEAVE_PAY_ITEM,
  LOAD_LEAVE_PAY_ITEM,
  LOAD_NEW_LEAVE_PAY_ITEM,
  UPDATE_LEAVE_PAY_ITEM,
} from './LeavePayItemIntents';
import {
  getBusinessId, getIsCreating, getLeavePayItemId, getLeavePayItemPayload,
} from './leavePayItemSelectors';

const createLeavePayItemIntegrator = (store, integration) => ({
  loadLeavePayItem: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? LOAD_NEW_LEAVE_PAY_ITEM
      : LOAD_LEAVE_PAY_ITEM;

    const urlParams = {
      businessId: getBusinessId(state),
      leavePayItemId: getLeavePayItemId(state),
    };

    integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  saveLeavePayItem: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? CREATE_LEAVE_PAY_ITEM
      : UPDATE_LEAVE_PAY_ITEM;

    const urlParams = {
      businessId: getBusinessId(state),
      leavePayItemId: getLeavePayItemId(state),
    };

    const content = getLeavePayItemPayload(state);

    integration.write({
      intent, urlParams, content, onSuccess, onFailure,
    });
  },

  deleteLeavePayItem: ({ onSuccess, onFailure }) => {
    const intent = DELETE_LEAVE_PAY_ITEM;

    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      leavePayItemId: getLeavePayItemId(state),
    };

    integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createLeavePayItemIntegrator;
