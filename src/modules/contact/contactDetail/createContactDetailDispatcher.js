import {
  CLOSE_MODAL,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_DETAIL,
  LOAD_NEW_CONTACT,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_SINGLE_ACCOUNT_STATE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BILLING_ADDRESS,
  UPDATE_CONTACT_DETAILS,
  UPDATE_SHIPPING_ADDRESS,
} from '../ContactIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createContactDetailDispatcher = store => ({
  setInitialState: context => store.dispatch({ intent: SET_INITIAL_STATE, context }),

  resetState: () => store.dispatch({ intent: RESET_STATE }),

  openModal: modalType => store.dispatch({ intent: OPEN_MODAL, modalType }),

  closeModal: () => store.dispatch({ intent: CLOSE_MODAL }),

  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },

  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },

  dismissAlert: () => store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: '',
  }),

  displayAlert: errorMessage => store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: errorMessage,
  }),

  loadContactDetail: content => store.dispatch({
    intent: LOAD_CONTACT_DETAIL,
    ...content,
  }),

  loadNewContact: content => store.dispatch({
    intent: LOAD_NEW_CONTACT,
    ...content,
  }),

  updateContactDetails: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_CONTACT_DETAILS,
      key,
      value,
    });
  },

  updateShippingAddress: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_SHIPPING_ADDRESS,
      key,
      value,
    });
  },

  updateBillingAddress: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_BILLING_ADDRESS,
      key,
      value,
    });
  },

  loadAccountAfterCreate: (account) => {
    store.dispatch({
      intent: LOAD_ACCOUNT_AFTER_CREATE,
      account,
    });
  },

  setLoadingSingleAccountState: (isLoadingAccount) => {
    store.dispatch({
      intent: SET_LOADING_SINGLE_ACCOUNT_STATE,
      isLoadingAccount,
    });
  },
});

export default createContactDetailDispatcher;
