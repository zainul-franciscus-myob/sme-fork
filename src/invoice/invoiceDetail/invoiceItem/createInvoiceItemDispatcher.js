import {
  ADD_LINE,
  FORMAT_LINE_AMOUNT,
  REMOVE_LINE,
  RESET_TOTALS,
  SET_ARE_LINES_CALCULATING,
  SET_LINE_AMOUNT_DIRTY,
  TABLE_ROW_CHANGE,
  UPDATE_INVOICE_ITEM_OPTION,
  UPDATE_LINES,
} from './InvoiceItemIntents';
import {
  LOAD_CONTACT_ADDRESS,
  RESET_EMAIL_INVOICE_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  SET_ALERT,
  SET_MODAL_ALERT,
  SET_MODAL_TYPE,
  SET_SHOW_EMAIL_MODAL_AFTER_SAVE,
  SET_SUBMITTING_STATE,
  UPDATE_EMAIL_INVOICE_DETAIL,
  UPDATE_INVOICE_ID_AFTER_CREATE,
} from '../../InvoiceIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createInvoiceItemDispatcher = store => ({

  setContactAddress: (address) => {
    store.dispatch({
      intent: LOAD_CONTACT_ADDRESS,
      address,
    });
  },

  updateInvoiceOption: (key, value) => {
    store.dispatch({
      intent: UPDATE_INVOICE_ITEM_OPTION,
      key,
      value,
    });
  },

  setAreLinesCalculating: (linesCalculating) => {
    store.dispatch({
      intent: SET_ARE_LINES_CALCULATING,
      areLinesCalculating: linesCalculating,
    });
  },

  setLineAmountDirty: (isLineAmountDirty) => {
    store.dispatch({
      intent: SET_LINE_AMOUNT_DIRTY,
      isLineAmountDirty,
    });
  },

  updateLines: (response) => {
    store.dispatch({
      intent: UPDATE_LINES,
      ...response,
    });
  },

  addLine: (line) => {
    store.dispatch({
      intent: ADD_LINE,
      line,
    });
  },

  changeTableRow: (index, key, value) => {
    store.dispatch({
      intent: TABLE_ROW_CHANGE,
      index,
      key,
      value,
    });
  },

  removeLine: (index) => {
    store.dispatch({
      intent: REMOVE_LINE,
      index,
    });
  },

  formatLineAmount: (index, key) => {
    store.dispatch({
      intent: FORMAT_LINE_AMOUNT,
      index,
      key,
    });
  },

  resetTotals: () => {
    store.dispatch({
      intent: RESET_TOTALS,
    });
  },

  setShowEmailModalAfterSave: (isShow) => {
    store.dispatch({
      intent: SET_SHOW_EMAIL_MODAL_AFTER_SAVE,
      shouldShowEmailModalAfterSave: isShow,
    });
  },

  updateEmailInvoiceDetail: (key, value) => {
    store.dispatch({
      intent: UPDATE_EMAIL_INVOICE_DETAIL,
      key,
      value,
    });
  },

  saveInvoiceIdForCreate: (invoiceId) => {
    store.dispatch({
      intent: UPDATE_INVOICE_ID_AFTER_CREATE,
      id: invoiceId,
    });
  },

  resetEmailInvoiceDetail: () => {
    store.dispatch({
      intent: RESET_EMAIL_INVOICE_DETAIL,
    });
  },

  resetOpenSendEmailParam: () => {
    store.dispatch({
      intent: RESET_OPEN_SEND_EMAIL,
    });
  },

  setModalType: (modalType) => {
    store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType,
    });
  },

  setAlert: (alert) => {
    store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  },

  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
    });
  },

  dismissModalAlert: () => {
    store.dispatch({
      intent: SET_MODAL_ALERT,
    });
  },

  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },

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
});

export default createInvoiceItemDispatcher;
