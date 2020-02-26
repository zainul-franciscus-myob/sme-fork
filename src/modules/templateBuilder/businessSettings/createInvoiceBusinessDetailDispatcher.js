import {
  CLOSE_MODAL,
  LOAD_BUSINESS_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_PAGE_EDITED_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BUSINESS_DETAIL,
} from './invoiceBusinessIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createInvoiceBusinessDetailDispatcher = store => ({
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
  setAlertMessage: (alert) => {
    store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alert,
    });
  },
  closeModal: () => {
    store.dispatch({
      intent: CLOSE_MODAL,
    });
  },
  openModal: (url) => {
    store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        url,
      },
    });
  },
  setPageEditedState: (isPageEdited) => {
    store.dispatch({
      intent: SET_PAGE_EDITED_STATE,
      isPageEdited,
    });
  },
  updateBusinessDetail: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_BUSINESS_DETAIL,
      key,
      value,
    });
  },
  loadBusinessDetail: ({ businessDetails, pageTitle }) => {
    store.dispatch({
      intent: LOAD_BUSINESS_DETAIL,
      businessDetails,
      pageTitle,
    });
  },
});

export default createInvoiceBusinessDetailDispatcher;
