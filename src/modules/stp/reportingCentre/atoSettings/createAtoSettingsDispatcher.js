import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SET_ATO_SETTINGS,
  SET_BUSINESS_CONTACT,
  SET_LOADING_STATE,
  SET_MODAL_STATE,
} from './AtoSettingsIntents';

const createAtoSettingsDispatcher = store => ({
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

  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setBusinessContact: ({ key, value }) => {
    store.dispatch({
      intent: SET_BUSINESS_CONTACT,
      key,
      value,
    });
  },

  openConfirmationModal: () => {
    store.dispatch({
      intent: SET_MODAL_STATE,
      isModalOpen: true,
    });
  },

  closeConfirmationModal: () => {
    store.dispatch({
      intent: SET_MODAL_STATE,
      isModalOpen: false,
    });
  },

  setAtoSettings: (response) => {
    store.dispatch({
      intent: SET_ATO_SETTINGS,
      response,
    });
  },
});

export default createAtoSettingsDispatcher;
