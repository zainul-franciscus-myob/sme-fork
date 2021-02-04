import {
  CLOSE_SMARTME_REDIRECT_MODAL,
  OPEN_SMARTME_REDIRECT_MODAL,
  RESET_STATE,
} from './SmartMeIntents';
import { SET_INITIAL_STATE } from '../../../SystemIntents';

const createSmartMeDispatcher = (store) => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  openSmartMeRedirectModal: () => {
    store.dispatch({
      intent: OPEN_SMARTME_REDIRECT_MODAL,
      smartMeRedirectModal: { isOpen: true },
    });
  },
  closeSmartMeRedirectModal: () => {
    store.dispatch({
      intent: CLOSE_SMARTME_REDIRECT_MODAL,
      smartMeRedirectModal: { isOpen: false },
    });
  },
  resetState() {
    const intent = RESET_STATE;
    store.dispatch({
      intent,
    });
  },
});

export default createSmartMeDispatcher;
