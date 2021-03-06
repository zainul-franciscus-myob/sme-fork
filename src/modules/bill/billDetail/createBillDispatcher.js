import {
  ADD_BILL_LINE,
  CALCULATE_LINE_AMOUNTS,
  CHANGE_BANK_STATEMENT_TEXT,
  CLOSE_ALERT,
  CLOSE_MODAL,
  CONVERT_TO_PRE_CONVERSION_BILL,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  FAIL_LOADING,
  GET_TAX_CALCULATIONS,
  HIDE_PREFILL_INFO,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_BILL,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_NEW_BILL_PAYMENT,
  LOAD_PREFILL_FROM_RECURRING_BILL,
  LOAD_SUPPLIER_DETAIL,
  OPEN_ALERT,
  OPEN_MODAL,
  PREFILL_BILL_FROM_IN_TRAY,
  RELOAD_BILL,
  REMOVE_BILL_LINE,
  RESET_SUPPLIER,
  SET_ABN_LOADING_STATE,
  SET_ATTACHMENT_ID,
  SET_DOCUMENT_LOADING_STATE,
  SET_DUPLICATE_ID,
  SET_IN_TRAY_DOCUMENT_ID,
  SET_PAYMENT_MODAL_ALERT,
  SET_PAYMENT_MODAL_LOADING_STATE,
  SET_PAYMENT_MODAL_SUBMITTING_STATE,
  SET_REDIRECT_URL,
  SET_SHOW_PRE_CONVERSION_ALERT,
  SET_SHOW_SPLIT_VIEW,
  SET_SOURCE,
  SET_UPGRADE_MODAL_SHOWING,
  SET_VIEWED_ACCOUNT_TOOL_TIP_STATE,
  START_BLOCKING,
  START_LOADING,
  START_MODAL_BLOCKING,
  STOP_BLOCKING,
  STOP_LOADING,
  STOP_MODAL_BLOCKING,
  UNLINK_IN_TRAY_DOCUMENT,
  UPDATE_BANK_STATEMENT_TEXT,
  UPDATE_BILL_ID,
  UPDATE_BILL_LINE,
  UPDATE_BILL_OPTION,
  UPDATE_BILL_PAYMENT_AMOUNT_FIELDS,
  UPDATE_BILL_PAYMENT_ID,
  UPDATE_EXPORT_PDF_DETAIL,
  UPDATE_HEADER_OPTION,
  UPDATE_ISSUE_DATE,
  UPDATE_LAYOUT,
  UPDATE_REFERENCE_ID,
  UPDATE_SHOULD_SEND_REMITTANCE_ADVICE,
} from './BillIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createBillDispatcher = (store) => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  loadAccountAfterCreate: (payload) =>
    store.dispatch({
      intent: LOAD_ACCOUNT_AFTER_CREATE,
      ...payload,
    }),

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

  showUpgradeModal: (monthlyLimit) => {
    store.dispatch({
      intent: SET_UPGRADE_MODAL_SHOWING,
      isUpgradeModalShowing: true,
      monthlyLimit,
    });
  },

  hideUpgradeModal: () => {
    store.dispatch({
      intent: SET_UPGRADE_MODAL_SHOWING,
      isUpgradeModalShowing: false,
    });
  },

  loadBill: (response) => {
    store.dispatch({
      intent: LOAD_BILL,
      response,
    });
  },

  loadBillPayment: (response) => {
    store.dispatch({
      intent: LOAD_NEW_BILL_PAYMENT,
      response,
    });
  },

  reloadBill: (response) => {
    store.dispatch({ intent: RELOAD_BILL, response });
  },

  updateBillOption: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_BILL_OPTION,
      key,
      value,
    });
  },

  updateLayout: ({ value }) => {
    store.dispatch({
      intent: UPDATE_LAYOUT,
      value,
    });
  },

  openModal: ({ modalType }) => {
    store.dispatch({
      intent: OPEN_MODAL,
      modalType,
    });
  },

  closeModal: () => {
    store.dispatch({
      intent: CLOSE_MODAL,
    });
  },

  openDangerAlert: ({ message }) => {
    store.dispatch({
      intent: OPEN_ALERT,
      message,
      type: 'danger',
    });
  },

  openSuccessAlert: ({ message }) => {
    store.dispatch({
      intent: OPEN_ALERT,
      message,
      type: 'success',
    });
  },

  openInfoAlert: ({ message }) => {
    store.dispatch({
      intent: OPEN_ALERT,
      message,
      type: 'info',
    });
  },

  closeAlert: () => {
    store.dispatch({
      intent: CLOSE_ALERT,
    });
  },

  startLoading: () => {
    store.dispatch({
      intent: START_LOADING,
    });
  },

  stopLoading: () => {
    store.dispatch({
      intent: STOP_LOADING,
    });
  },

  failLoading: () => {
    store.dispatch({
      intent: FAIL_LOADING,
    });
  },

  startBlocking: () => {
    store.dispatch({
      intent: START_BLOCKING,
    });
  },

  stopBlocking: () => {
    store.dispatch({
      intent: STOP_BLOCKING,
    });
  },

  startModalBlocking: () => {
    store.dispatch({
      intent: START_MODAL_BLOCKING,
    });
  },

  stopModalBlocking: () => {
    store.dispatch({
      intent: STOP_MODAL_BLOCKING,
    });
  },

  addBillLine: () => {
    store.dispatch({
      intent: ADD_BILL_LINE,
    });
  },

  calculateLineAmounts: ({ key, index }) => {
    store.dispatch({
      intent: CALCULATE_LINE_AMOUNTS,
      key,
      index,
    });
  },

  loadItemDetailForLine: ({ index, updatedLine }) =>
    store.dispatch({
      intent: LOAD_ITEM_DETAIL_FOR_LINE,
      index,
      updatedLine,
    }),

  updateBillLine: ({ index, key, value }) => {
    store.dispatch({
      intent: UPDATE_BILL_LINE,
      index,
      key,
      value,
    });
  },

  updateIssueDate: (date) => {
    store.dispatch({
      intent: UPDATE_ISSUE_DATE,
      date,
    });
  },

  convertToPreConversionBill: () =>
    store.dispatch({
      intent: CONVERT_TO_PRE_CONVERSION_BILL,
    }),

  setShowPreConversionAlert: (showPreConversionAlert) =>
    store.dispatch({
      intent: SET_SHOW_PRE_CONVERSION_ALERT,
      showPreConversionAlert,
    }),

  removeBillLine: ({ index }) => {
    store.dispatch({
      intent: REMOVE_BILL_LINE,
      index,
    });
  },

  getTaxCalculations: (taxCalculations, isSwitchingTaxInclusive = false) => {
    const intent = GET_TAX_CALCULATIONS;
    store.dispatch({ intent, taxCalculations, isSwitchingTaxInclusive });
  },

  loadSupplierDetail: (response) => {
    store.dispatch({
      intent: LOAD_SUPPLIER_DETAIL,
      response,
    });
  },

  resetSupplier: () => {
    store.dispatch({ intent: RESET_SUPPLIER });
  },

  prefillDataFromInTray: (response) => {
    store.dispatch({
      intent: PREFILL_BILL_FROM_IN_TRAY,
      response,
    });
  },

  updateBillId: (id) => {
    store.dispatch({
      intent: UPDATE_BILL_ID,
      id,
    });
  },

  updateExportPdfDetail: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_EXPORT_PDF_DETAIL,
      key,
      value,
    });
  },

  setShowSplitView: (showSplitView) => {
    store.dispatch({
      intent: SET_SHOW_SPLIT_VIEW,
      showSplitView,
    });
  },

  setInTrayDocumentId: (inTrayDocumentId) => {
    store.dispatch({
      intent: SET_IN_TRAY_DOCUMENT_ID,
      inTrayDocumentId,
    });
  },

  downloadInTrayDocument: (inTrayDocumentUrl) => {
    store.dispatch({
      intent: DOWNLOAD_IN_TRAY_DOCUMENT,
      inTrayDocumentUrl,
    });
  },

  unlinkInTrayDocument: () => {
    store.dispatch({
      intent: UNLINK_IN_TRAY_DOCUMENT,
    });
  },

  setDocumentLoadingState: (isDocumentLoading) => {
    store.dispatch({
      intent: SET_DOCUMENT_LOADING_STATE,
      isDocumentLoading,
    });
  },

  setBillPaymentModalLoadingState: (isModalLoading) => {
    store.dispatch({
      intent: SET_PAYMENT_MODAL_LOADING_STATE,
      isModalLoading,
    });
  },

  hidePrefillInfo: () => {
    store.dispatch({
      intent: HIDE_PREFILL_INFO,
    });
  },

  setAttachmentId: (attachmentId) => {
    store.dispatch({
      intent: SET_ATTACHMENT_ID,
      attachmentId,
    });
  },

  setDuplicateId: (duplicateId) => {
    store.dispatch({
      intent: SET_DUPLICATE_ID,
      duplicateId,
    });
  },

  setSource: (source) => {
    store.dispatch({
      intent: SET_SOURCE,
      source,
    });
  },

  setRedirectUrl: (redirectUrl) => {
    store.dispatch({
      intent: SET_REDIRECT_URL,
      redirectUrl,
    });
  },

  setAbnLoadingState: (isAbnLoading) => {
    store.dispatch({
      intent: SET_ABN_LOADING_STATE,
      isAbnLoading,
    });
  },

  loadAbn: (abn) => {
    store.dispatch({
      intent: LOAD_ABN_FROM_SUPPLIER,
      abn,
    });
  },

  updateHeaderOption: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_HEADER_OPTION,
      key,
      value,
    });
  },

  updateReferenceId: (referenceId) => {
    store.dispatch({
      intent: UPDATE_REFERENCE_ID,
      referenceId,
    });
  },

  setBillPaymentModalAlert: (alert) => {
    store.dispatch({
      intent: SET_PAYMENT_MODAL_ALERT,
      alert,
    });
  },

  setBillPaymentModalSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_PAYMENT_MODAL_SUBMITTING_STATE,
      isSubmitting,
    });
  },

  updateBillPaymentAmountFields: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_BILL_PAYMENT_AMOUNT_FIELDS,
      key,
      value,
    });
  },

  changeBankStatementText: (bankStatementText) => {
    store.dispatch({
      intent: CHANGE_BANK_STATEMENT_TEXT,
      bankStatementText,
    });
  },

  updateBankStatementText: (bankStatementText) => {
    store.dispatch({
      intent: UPDATE_BANK_STATEMENT_TEXT,
      bankStatementText,
    });
  },

  setViewedAccountToolTip: (viewedAccountToolTip) => {
    store.dispatch({
      intent: SET_VIEWED_ACCOUNT_TOOL_TIP_STATE,
      viewedAccountToolTip,
    });
  },

  updateBillPaymentId: (billPaymentId) => {
    store.dispatch({
      intent: UPDATE_BILL_PAYMENT_ID,
      billPaymentId,
    });
  },

  updateShouldSendRemittanceAdvice: ({ value }) => {
    store.dispatch({
      intent: UPDATE_SHOULD_SEND_REMITTANCE_ADVICE,
      shouldSendRemittanceAdvice: value,
    });
  },

  loadPrefillFromRecurringBill: (data) => {
    store.dispatch({ intent: LOAD_PREFILL_FROM_RECURRING_BILL, ...data });
  },
});

export default createBillDispatcher;
