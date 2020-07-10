import {
  LOAD_CONTACT_MODAL,
  SET_ALERT,
  SET_CONTACT_MODAL_BILLING_ADDRESS,
  SET_CONTACT_MODAL_DETAILS,
  SET_CONTACT_MODAL_SHIPPING_ADDRESS,
  SET_LOADING_STATE,
  SET_SHOW_CONTACT_MODAL_BILLING_ADDRESS,
  SET_SHOW_CONTACT_MODAL_SHIPPING_ADDRESS,
  SET_SUBMITTING_STATE,
} from '../ContactIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createContactModalDispatcher = (store) => ({
  setInitialState: (context) =>
    store.dispatch({ intent: SET_INITIAL_STATE, context }),

  resetState: () => store.dispatch({ intent: RESET_STATE }),

  setLoadingState: (isLoading) =>
    store.dispatch({ intent: SET_LOADING_STATE, isLoading }),

  setSubmittingState: (isSubmitting) =>
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    }),

  setAlert: ({ type, message }) =>
    store.dispatch({ intent: SET_ALERT, alert: { type, message } }),

  dismissAlert: () => store.dispatch({ intent: SET_ALERT }),

  loadContactModal: (response) =>
    store.dispatch({ intent: LOAD_CONTACT_MODAL, ...response }),

  setContactModalDetails: ({ key, value }) =>
    store.dispatch({
      intent: SET_CONTACT_MODAL_DETAILS,
      key,
      value,
    }),

  setShowContactModalBillingAddress: (showBillingAddress) =>
    store.dispatch({
      intent: SET_SHOW_CONTACT_MODAL_BILLING_ADDRESS,
      showBillingAddress,
    }),

  setContactModalBillingAddress: ({ key, value }) =>
    store.dispatch({
      intent: SET_CONTACT_MODAL_BILLING_ADDRESS,
      key,
      value,
    }),

  setShowContactModalShippingAddress: (showShippingAddress) =>
    store.dispatch({
      intent: SET_SHOW_CONTACT_MODAL_SHIPPING_ADDRESS,
      showShippingAddress,
    }),

  setContactModalShippingAddress: ({ key, value }) =>
    store.dispatch({
      intent: SET_CONTACT_MODAL_SHIPPING_ADDRESS,
      key,
      value,
    }),
});

export default createContactModalDispatcher;
