import { SET_ALERT } from '../ReportingCentreIntents';
import {
  SET_ATO_SETTINGS,
  SET_BUSINESS_CONTACT,
  SET_LOADING_STATE,
  SET_MODAL_STATE,
} from './AtoSettingsIntents';

const createAtoSettingsDispatcher = store => ({
  setLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
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

  setAlert: (alert) => {
    store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  },
});

export default createAtoSettingsDispatcher;
