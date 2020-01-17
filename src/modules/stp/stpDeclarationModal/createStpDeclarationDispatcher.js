import {
  SET_ALERT_MESSAGE,
  SET_DECLARATION_NAME,
  SET_LOADING_STATE,
  SET_MODAL_IS_OPEN,
} from './StpDeclarationModalIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';

const createStpDeclarationModalDispatcher = store => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  openModal: () => {
    store.dispatch({
      intent: SET_MODAL_IS_OPEN,
      isOpen: true,
    });
  },

  closeModal: () => {
    store.dispatch({
      intent: SET_MODAL_IS_OPEN,
      isOpen: false,
    });
  },

  setLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },

  setAlertMessage: (alertMessage) => {
    store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage,
    });
  },

  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  },

  setName: ({ value }) => {
    store.dispatch({
      intent: SET_DECLARATION_NAME,
      name: value,
    });
  },
});

export default createStpDeclarationModalDispatcher;
