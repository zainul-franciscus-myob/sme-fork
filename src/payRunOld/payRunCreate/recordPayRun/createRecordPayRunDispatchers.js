import {
  CHANGE_STP_DECLARATION_NAME,
  CLOSE_STP_DECLARATION_MODAL,
  OPEN_STP_DECLARATION_MODAL,
  SET_STP_DECLARATION_ALERT_MESSAGE,
  SET_STP_DECLARATION_LOADING_STATE,
} from '../PayRunIntents';
import createPayRunDispatchers from '../createPayRunDispatchers';

const createRecordPayRunDispatchers = store => ({
  ...createPayRunDispatchers(store),

  openStpModal: () => {
    store.dispatch({
      intent: OPEN_STP_DECLARATION_MODAL,
    });
  },

  closeStpModal: () => {
    store.dispatch({
      intent: CLOSE_STP_DECLARATION_MODAL,
    });
  },

  changeStpDeclarationName: ({ value }) => {
    store.dispatch({
      intent: CHANGE_STP_DECLARATION_NAME,
      name: value,
    });
  },

  setStpDeclarationModalLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_STP_DECLARATION_LOADING_STATE,
      isLoading,
    });
  },

  setStpDeclarationAlert: (alertMessage) => {
    store.dispatch({
      intent: SET_STP_DECLARATION_ALERT_MESSAGE,
      alertMessage,
    });
  },

  dismissStpDeclarationAlert: () => {
    store.dispatch({
      intent: SET_STP_DECLARATION_ALERT_MESSAGE,
      alertMessage: '',
    });
  },
});

export default createRecordPayRunDispatchers;
