import {
  CREATE_SUPER_PAY_ITEM,
  DELETE_SUPER_PAY_ITEM,
  LOAD_NEW_SUPER_PAY_ITEM,
  LOAD_SUPER_PAY_ITEM,
  UPDATE_SUPER_PAY_ITEM,
} from '../PayItemIntents';
import {
  getBusinessId, getIsCreating, getSuperPayItem, getSuperPayItemId,
} from './superPayItemSelectors';

const createSuperPayItemIntegrator = (store, integration) => ({
  loadSuperPayItem: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? LOAD_NEW_SUPER_PAY_ITEM
      : LOAD_SUPER_PAY_ITEM;

    const urlParams = {
      businessId: getBusinessId(state),
      superPayItemId: getSuperPayItemId(state),
    };

    integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  },

  createOrUpdateSuperPayItem: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? CREATE_SUPER_PAY_ITEM
      : UPDATE_SUPER_PAY_ITEM;

    const urlParams = {
      businessId: getBusinessId(state),
      superPayItemId: getSuperPayItemId(state),
    };

    const content = getSuperPayItem(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  deleteSuperPayItem: ({ onSuccess, onFailure }) => {
    const intent = DELETE_SUPER_PAY_ITEM;

    const state = store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      superPayItemId: getSuperPayItemId(state),
    };

    integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createSuperPayItemIntegrator;
