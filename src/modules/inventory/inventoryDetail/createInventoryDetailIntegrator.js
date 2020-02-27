import {
  CREATE_INVENTORY_DETAIL,
  DELETE_INVENTORY_DETAIL,
  LOAD_INVENTORY_DETAIL,
  LOAD_NEW_INVENTORY_DETAIL,
  UPDATE_INVENTORY_DETAIL,
} from '../InventoryIntents';
import { getIsCreating, getItem, getUrlParams } from './inventoryDetailSelectors';

const createInventoryDetailIntegrator = (store, integration) => ({
  loadInventoryDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? LOAD_NEW_INVENTORY_DETAIL : LOAD_INVENTORY_DETAIL;
    const urlParams = getUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  saveInventoryDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating ? CREATE_INVENTORY_DETAIL : UPDATE_INVENTORY_DETAIL;
    const urlParams = getUrlParams(state);
    const content = getItem(state);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },

  deleteInventoryDetail: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const urlParams = getUrlParams(state);

    integration.write({
      intent: DELETE_INVENTORY_DETAIL,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createInventoryDetailIntegrator;
