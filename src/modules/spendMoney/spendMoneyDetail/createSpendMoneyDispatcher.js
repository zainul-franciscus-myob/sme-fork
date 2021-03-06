import {
  ADD_ATTACHMENTS,
  ADD_SPEND_MONEY_LINE,
  APPEND_ALERT_MESSAGE,
  CLEAR_ABN,
  CLEAR_CONTACT_TYPE,
  CLEAR_IN_TRAY_DOCUMENT_URL,
  CLEAR_IS_REPORTABLE,
  CLOSE_MODAL,
  DELETE_SPEND_MONEY_LINE,
  GET_TAX_CALCULATIONS,
  HIDE_PREFILL_INFO,
  LOAD_ABN_FROM_CONTACT,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_PREFILL_FROM_RECURRING_SPEND_MONEY,
  LOAD_REFERENCE_ID,
  LOAD_SUPPLIER_EXPENSE_ACCOUNT,
  OPEN_MODAL,
  OPEN_REMOVE_ATTACHMENT_MODAL,
  PREFILL_DATA_FROM_IN_TRAY,
  PREFILL_SPEND_MONEY_ON_CONTACT,
  REMOVE_ATTACHMENT,
  REMOVE_ATTACHMENT_BY_INDEX,
  RESET_BANK_STATEMENT_TEXT,
  RESET_TOTALS,
  SET_ABN_LOADING_STATE,
  SET_ALERT,
  SET_CONTACT_TYPE,
  SET_DUPLICATE_ID,
  SET_IN_TRAY_DOCUMENT_URL,
  SET_LOADING_STATE,
  SET_OPERATION_IN_PROGRESS_STATE,
  SET_PREFILL_INTRAY_DOCUMENT_ID,
  SET_PREFILL_NEW,
  SET_SHOW_SPLIT_VIEW,
  SET_SUBMITTING_STATE,
  SET_SUPPLIER_BLOCKING_STATE,
  SET_VIEWED_ACCOUNT_TOOL_TIP_STATE,
  UPDATE_BANK_STATEMENT_TEXT,
  UPDATE_SPEND_MONEY_HEADER,
  UPDATE_SPEND_MONEY_LINE,
  UPDATE_UPLOAD_PROGRESS,
  UPLOAD_ATTACHMENT,
  UPLOAD_ATTACHMENT_FAILED,
} from '../SpendMoneyIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import ModalType from './components/ModalType';

const createSpendMoneyDispatcher = (store) => ({
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

  loadSpendMoney: (intent, response) => {
    store.dispatch({
      intent,
      ...response,
      isLoading: false,
    });
  },

  loadReferenceId: (referenceId) => {
    const intent = LOAD_REFERENCE_ID;
    store.dispatch({ intent, referenceId });
  },

  loadSupplierExpenseAccount: (response) => {
    const intent = LOAD_SUPPLIER_EXPENSE_ACCOUNT;
    store.dispatch({ intent, response });
  },

  updateHeaderOptions: ({ key, value }) => {
    const intent = UPDATE_SPEND_MONEY_HEADER;
    store.dispatch({ intent, key, value });
  },

  setAlert: (alert) => {
    const intent = SET_ALERT;
    store.dispatch({ intent, alert });
  },

  setSubmittingState: (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;
    store.dispatch({ intent, isSubmitting });
  },

  setSupplierBlockingState: (isSupplierBlocking) => {
    const intent = SET_SUPPLIER_BLOCKING_STATE;
    store.dispatch({ intent, isSupplierBlocking });
  },

  openModal: ({ type, url }) => {
    store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        type,
        url,
      },
    });
  },

  closeModal: () => {
    const intent = CLOSE_MODAL;
    store.dispatch({ intent });
  },

  updateSpendMoneyLine: (lineIndex, lineKey, lineValue) => {
    const intent = UPDATE_SPEND_MONEY_LINE;
    store.dispatch({
      intent,
      lineIndex,
      lineKey,
      lineValue,
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

  resetTotals: () => {
    const intent = RESET_TOTALS;
    store.dispatch({ intent });
  },

  getTaxCalculations: (taxCalculations) => {
    const intent = GET_TAX_CALCULATIONS;
    store.dispatch({ intent, taxCalculations });
  },

  dismissAlert: () => {
    const intent = SET_ALERT;
    store.dispatch({ intent, alert: undefined });
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
    store.dispatch({
      intent,
      id,
      modal: { type: ModalType.DELETE_ATTACHMENT },
    });
  },

  removeAttachment: (id) => {
    const intent = REMOVE_ATTACHMENT;
    store.dispatch({ intent, id });
  },

  removeAttachmentByIndex: (index) => {
    const intent = REMOVE_ATTACHMENT_BY_INDEX;
    store.dispatch({ intent, index });
  },

  appendAlert: (message) => {
    const intent = APPEND_ALERT_MESSAGE;
    store.dispatch({ intent, message });
  },

  setOperationInProgressState: (id, isInProgress) => {
    const intent = SET_OPERATION_IN_PROGRESS_STATE;
    store.dispatch({ intent, id, isInProgress });
  },

  setShowSplitView: (showSplitView) => {
    const intent = SET_SHOW_SPLIT_VIEW;
    store.dispatch({ intent, showSplitView });
  },

  setInTrayDocumentUrl: (inTrayDocumentUrl) => {
    const intent = SET_IN_TRAY_DOCUMENT_URL;
    store.dispatch({ intent, inTrayDocumentUrl });
  },

  clearInTrayDocumentUrl: () => {
    const intent = CLEAR_IN_TRAY_DOCUMENT_URL;
    store.dispatch({ intent });
  },

  prefillDataFromInTray: (response) => {
    const intent = PREFILL_DATA_FROM_IN_TRAY;
    store.dispatch({ intent, response });
  },

  hidePrefillInfo: () => {
    const intent = HIDE_PREFILL_INFO;
    store.dispatch({ intent });
  },

  loadAccountAfterCreate: (payload) =>
    store.dispatch({
      intent: LOAD_ACCOUNT_AFTER_CREATE,
      ...payload,
    }),

  prefillSpendMoneyOnContact: (contactType, isReportable, expenseAccountId) =>
    store.dispatch({
      intent: PREFILL_SPEND_MONEY_ON_CONTACT,
      contactType,
      isReportable,
      expenseAccountId,
    }),

  setContactType: (contactType) => {
    store.dispatch({
      intent: SET_CONTACT_TYPE,
      contactType,
    });
  },

  clearContactType: () => {
    store.dispatch({
      intent: CLEAR_CONTACT_TYPE,
    });
  },

  clearIsReportable: () => {
    store.dispatch({
      intent: CLEAR_IS_REPORTABLE,
    });
  },

  resetBankStatementText: ({ key, value }) => {
    store.dispatch({
      intent: RESET_BANK_STATEMENT_TEXT,
      key,
      value,
    });
  },

  updateBankStatementText: () =>
    store.dispatch({
      intent: UPDATE_BANK_STATEMENT_TEXT,
    }),

  setDuplicateId: (duplicateId) =>
    store.dispatch({
      intent: SET_DUPLICATE_ID,
      duplicateId,
    }),

  setPrefillNew: ({ selectedBankAccountId, selectedDate }) =>
    store.dispatch({
      intent: SET_PREFILL_NEW,
      selectedBankAccountId,
      selectedDate,
    }),

  setPrefillInTrayDocumentId: (inTrayDocumentId) =>
    store.dispatch({
      intent: SET_PREFILL_INTRAY_DOCUMENT_ID,
      inTrayDocumentId,
    }),

  setLoadingAbnState: (isAbnLoading) =>
    store.dispatch({
      intent: SET_ABN_LOADING_STATE,
      isAbnLoading,
    }),

  loadAbn: (abn) =>
    store.dispatch({
      intent: LOAD_ABN_FROM_CONTACT,
      abn,
    }),

  clearAbn: () =>
    store.dispatch({
      intent: CLEAR_ABN,
    }),

  setViewedAccountToolTip: (viewedAccountToolTip) =>
    store.dispatch({
      intent: SET_VIEWED_ACCOUNT_TOOL_TIP_STATE,
      viewedAccountToolTip,
    }),

  loadPrefillFromRecurringSpendMoney: (data) =>
    store.dispatch({
      intent: LOAD_PREFILL_FROM_RECURRING_SPEND_MONEY,
      ...data,
    }),
});

export default createSpendMoneyDispatcher;
