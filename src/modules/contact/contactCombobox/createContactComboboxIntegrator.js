import {
  LOAD_CONTACT_COMBOBOX_OPTIONS,
  LOAD_CONTACT_COMBOBOX_OPTION_BY_ID,
  SEARCH_CONTACT_COMBOBOX,
} from '../ContactIntents';
import {
  getLoadContactOptionByIdUrlParams,
  getLoadContactOptionsParams,
  getLoadContactOptionsUrlParams,
  getSearchContactParams,
} from './contactComboboxSelectors';

const createContactComboboxIntegrator = ({ store, integration }) => ({
  loadContactComboboxOptions: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_CONTACT_COMBOBOX_OPTIONS;
    const urlParams = getLoadContactOptionsUrlParams(state);
    const params = getLoadContactOptionsParams(state);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
  loadContactComboboxOptionById: ({ id, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = LOAD_CONTACT_COMBOBOX_OPTION_BY_ID;
    const urlParams = getLoadContactOptionByIdUrlParams(state, id);

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
  searchContactCombobox: ({ keywords, onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = SEARCH_CONTACT_COMBOBOX;
    const urlParams = getLoadContactOptionsUrlParams(state);
    const params = getSearchContactParams(state, keywords);

    integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  },
});

export default createContactComboboxIntegrator;
