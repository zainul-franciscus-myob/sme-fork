import {
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_USER_DETAILS,
  UPDATE_USER_ROLES,
} from '../UserIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getLoadUserIntent } from './userDetailSelectors';

const createUserDetailDispatcher = (store) => ({
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
  closeModal: () => {
    store.dispatch({
      intent: CLOSE_MODAL,
    });
  },
  openModal: ({ url, type }) => {
    store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        type,
        url,
      },
    });
  },
  updateUserDetails: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_USER_DETAILS,
      key,
      value,
    });
  },
  updateUserRoles: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_USER_ROLES,
      key,
      value,
    });
  },
  setAlertMessage: (alertMessage) => {
    store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage,
    });
  },
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },
  loadUser: (response) => {
    const state = store.getState();
    const intent = getLoadUserIntent(state);

    store.dispatch({
      intent,
      ...response,
    });
  },
  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },
});

export default createUserDetailDispatcher;
