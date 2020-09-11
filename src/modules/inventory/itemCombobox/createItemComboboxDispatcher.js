import {
  LOAD_ITEM_COMBOBOX_OPTIONS,
  LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS,
  LOAD_ITEM_COMBOBOX_OPTION_BY_ID,
  SET_ITEM_COMBOBOX_LOADING_STATE,
  SET_ITEM_COMBOBOX_OPTIONS_LOADING_STATE,
  UPDATE_ITEM_COMBOBOX_OPTIONS,
} from '../InventoryIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createItemComboboxDispatcher = ({ store }) => ({
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  setItemLoadingState: (isLoading) =>
    store.dispatch({
      intent: SET_ITEM_COMBOBOX_LOADING_STATE,
      isLoading,
    }),
  setItemOptionsLoadingState: (isLoading) =>
    store.dispatch({
      intent: SET_ITEM_COMBOBOX_OPTIONS_LOADING_STATE,
      isLoading,
    }),
  loadItemOptions: (payload) =>
    store.dispatch({
      intent: LOAD_ITEM_COMBOBOX_OPTIONS,
      ...payload,
    }),
  loadItemOptionsByIds: (items) =>
    store.dispatch({
      intent: LOAD_ITEM_COMBOBOX_OPTIONS_BY_IDS,
      items,
    }),
  loadItemOptionById: (item) =>
    store.dispatch({
      intent: LOAD_ITEM_COMBOBOX_OPTION_BY_ID,
      item,
    }),
  updateItemOptions: (item) =>
    store.dispatch({
      intent: UPDATE_ITEM_COMBOBOX_OPTIONS,
      item,
    }),
});

export default createItemComboboxDispatcher;
