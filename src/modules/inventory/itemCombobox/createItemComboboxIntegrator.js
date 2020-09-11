import {
  LOAD_ITEM_COMBOBOX_OPTIONS,
  LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS,
  SEARCH_COMBOBOX_ITEM,
} from '../InventoryIntents';
import {
  getLoadItemOptionByIdContent,
  getLoadItemOptionsParams,
  getLoadItemOptionsUrlParams,
  getSearchItemParams,
} from './ItemComboboxSelectors';

const createItemComboboxIntegrator = ({ store, integration }) => ({
  loadItemOptions: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_ITEM_COMBOBOX_OPTIONS;
    const urlParams = getLoadItemOptionsUrlParams(state);
    const params = getLoadItemOptionsParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
  searchItem: ({ keywords, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = SEARCH_COMBOBOX_ITEM;
    const urlParams = getLoadItemOptionsUrlParams(state);
    const params = getSearchItemParams(keywords, state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
  loadItemOptionById: ({ itemId, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS;
    const urlParams = getLoadItemOptionsUrlParams(state);
    const content = getLoadItemOptionByIdContent(itemId);

    integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  },
  loadItemOptionsByIds: ({ ids, onSuccess, onFailure }) => {
    const state = store.getState();

    const intent = LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS;
    const urlParams = getLoadItemOptionsUrlParams(state);

    integration.write({
      intent,
      urlParams,
      content: ids,
      onSuccess,
      onFailure,
    });
  },
});

export default createItemComboboxIntegrator;
