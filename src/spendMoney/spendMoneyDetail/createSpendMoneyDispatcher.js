import {
  ADD_ATTACHMENTS,
  ADD_SPEND_MONEY_LINE,
  APPEND_ALERT_MESSAGE,
  CLOSE_MODAL,
  DELETE_SPEND_MONEY_LINE,
  FORMAT_SPEND_MONEY_LINE,
  GET_CALCULATED_TOTALS,
  LOAD_REFERENCE_ID,
  OPEN_MODAL,
  OPEN_REMOVE_ATTACHMENT_MODAL,
  REMOVE_ATTACHMENT,
  REMOVE_ATTACHMENT_BY_INDEX,
  RESET_TOTALS,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_OPERATION_IN_PROGRESS_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_SPEND_MONEY_HEADER,
  UPDATE_SPEND_MONEY_LINE,
  UPDATE_UPLOAD_PROGRESS,
  UPLOAD_ATTACHMENT,
  UPLOAD_ATTACHMENT_FAILED,
} from '../SpendMoneyIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createSpendMoneyDispatcher = store => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  setLoadingState: (isLoading) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  loadSpendMoney: (intent, {
    spendMoney, newLine, totals, pageTitle, attachments,
  }) => {
    store.dispatch({
      intent,
      spendMoney,
      totals,
      newLine,
      pageTitle,
      attachments,
      isLoading: false,
    });
  },

  loadReferenceId: (referenceId) => {
    const intent = LOAD_REFERENCE_ID;
    store.dispatch({ intent, referenceId });
  },

  updateHeaderOptions: ({ key, value }) => {
    const intent = UPDATE_SPEND_MONEY_HEADER;
    store.dispatch({ intent, key, value });
  },

  displayAlert: (alertMessage) => {
    const intent = SET_ALERT_MESSAGE;
    store.dispatch({ intent, alertMessage });
  },

  setSubmittingState: (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;
    store.dispatch({ intent, isSubmitting });
  },

  openModal: (modalType) => {
    const intent = OPEN_MODAL;
    store.dispatch({ intent, modalType });
  },

  closeModal: () => {
    const intent = CLOSE_MODAL;
    store.dispatch({ intent });
  },

  updateSpendMoneyLine: (lineIndex, lineKey, lineValue) => {
    const intent = UPDATE_SPEND_MONEY_LINE;
    store.dispatch({
      intent, lineIndex, lineKey, lineValue,
    });
  },

  addSpendMoneyLine: (partialLine) => {
    const intent = ADD_SPEND_MONEY_LINE;
    store.dispatch({ intent, line: partialLine });
  },

  deleteSpendMoneyLine: (index) => {
    const intent = DELETE_SPEND_MONEY_LINE;
    store.dispatch({ intent, index });
  },

  formatSpendMoneyLine: (index) => {
    const intent = FORMAT_SPEND_MONEY_LINE;
    store.dispatch({ intent, index });
  },

  resetTotals: () => {
    const intent = RESET_TOTALS;
    store.dispatch({ intent });
  },

  getCalculatedTotals: (totals) => {
    const intent = GET_CALCULATED_TOTALS;
    store.dispatch({ intent, totals });
  },

  dismissAlert: () => {
    const intent = SET_ALERT_MESSAGE;
    store.dispatch({ intent, alertMessage: '' });
  },

  addAttachments: (files) => {
    const intent = ADD_ATTACHMENTS;
    store.dispatch({ intent, files });
  },

  uploadAttachment: ({ response, file }) => {
    const intent = UPLOAD_ATTACHMENT;
    store.dispatch({ intent, ...response, file });
  },

  uploadAttachmentFailed: ({ message, file }) => {
    const intent = UPLOAD_ATTACHMENT_FAILED;
    store.dispatch({ intent, message, file });
  },

  updateUploadProgress: ({ uploadProgress, file }) => {
    const intent = UPDATE_UPLOAD_PROGRESS;
    store.dispatch({ intent, uploadProgress, file });
  },

  openRemoveAttachmentModal: (id) => {
    const intent = OPEN_REMOVE_ATTACHMENT_MODAL;
    store.dispatch({ intent, id });
  },

  removeAttachment: (id) => {
    const intent = REMOVE_ATTACHMENT;
    store.dispatch({ intent, id });
  },

  removeAttachmentByIndex: (index) => {
    const intent = REMOVE_ATTACHMENT_BY_INDEX;
    store.dispatch({ intent, index });
  },

  appendAlert: (alertMessage) => {
    const intent = APPEND_ALERT_MESSAGE;
    store.dispatch({ intent, alertMessage });
  },

  setOperationInProgressState: (id, isInProgress) => {
    const intent = SET_OPERATION_IN_PROGRESS_STATE;
    store.dispatch({ intent, id, isInProgress });
  },
});

export default createSpendMoneyDispatcher;
