import { LOAD_NEW_ITEM, SAVE_ITEM } from './InventoryModalIntents';
import { getLoadItemUrlParams, getSaveItemContent, getSaveItemUrlParams } from './selectors/InventoryModalIntegratorSelectors';

const createInventoryModalIntegrator = (store, integration) => ({
  loadItem: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_NEW_ITEM;
    const urlParams = getLoadItemUrlParams(state);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

  saveItem: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = SAVE_ITEM;
    const urlParams = getSaveItemUrlParams(state);
    const content = getSaveItemContent(state);

    integration.write({
      intent,
      content,
      urlParams,
      onSuccess,
      onFailure,
    });
  },

});

export default createInventoryModalIntegrator;
