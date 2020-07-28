import { SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SET_LOADING_STATE,
  SET_MODAL_IS_OPEN,
} from './StpRegistrationAlertModalIntents';

const createStpRegistrationAlertModalDispatcher = (store) => ({
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
});

export default createStpRegistrationAlertModalDispatcher;
