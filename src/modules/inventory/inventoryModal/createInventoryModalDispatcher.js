import {
  CLOSE_ALERT,
  LOAD_ITEM,
  OPEN,
  OPEN_ALERT,
  OPEN_BUYING_DETAILS,
  OPEN_SELLING_DETAILS,
  START_LOADING,
  STOP_LOADING,
  UPDATE_BUYING_OPTION,
  UPDATE_IS_BUYING,
  UPDATE_IS_SELLING,
  UPDATE_ITEM_OPTION,
  UPDATE_SELLING_OPTION,
} from './InventoryModalIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createInventoryModalDispatcher = store => ({
  open: () => {
    store.dispatch({
      intent: OPEN,
    });
  },

  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

  loadItem: (response) => {
    store.dispatch({
      intent: LOAD_ITEM,
      response,
    });
  },

  startLoading: () => {
    store.dispatch({
      intent: START_LOADING,
    });
  },

  stopLoading: () => {
    store.dispatch({
      intent: STOP_LOADING,
    });
  },

  openDangerAlert: ({ message }) => {
    store.dispatch({
      intent: OPEN_ALERT,
      message,
      type: 'danger',
    });
  },

  closeAlert: () => {
    store.dispatch({
      intent: CLOSE_ALERT,
    });
  },

  updateItemOption: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_ITEM_OPTION,
      key,
      value,
    });
  },

  updateSellingOption: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_SELLING_OPTION,
      key,
      value,
    });
  },

  updateBuyingOption: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_BUYING_OPTION,
      key,
      value,
    });
  },

  updateIsBuying: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_IS_BUYING,
      key,
      value,
    });
  },

  updateIsSelling: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_IS_SELLING,
      key,
      value,
    });
  },

  openBuyingDetails: () => {
    store.dispatch({
      intent: OPEN_BUYING_DETAILS,
    });
  },

  openSellingDetails: () => {
    store.dispatch({
      intent: OPEN_SELLING_DETAILS,
    });
  },
});

export default createInventoryModalDispatcher;
