import {
  ADD_BILL_LINE,
  CALCULATE_LINE_AMOUNTS,
  CLOSE_ALERT,
  CLOSE_MODAL,
  DOWNLOAD_IN_TRAY_DOCUMENT,
  FAIL_LOADING,
  FORMAT_AMOUNT_PAID,
  FORMAT_BILL_LINE,
  GET_TAX_CALCULATIONS,
  HIDE_PREFILL_INFO,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_BILL,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_ITEM_OPTION,
  LOAD_SUPPLIER_AFTER_CREATE,
  LOAD_SUPPLIER_DETAIL,
  OPEN_ALERT,
  OPEN_MODAL,
  PREFILL_BILL_FROM_IN_TRAY,
  REMOVE_BILL_LINE,
  RESET_TOTALS,
  SET_ATTACHMENT_ID,
  SET_CALCULATED_BILL_LINES_AND_TOTALS,
  SET_DOCUMENT_LOADING_STATE,
  SET_IN_TRAY_DOCUMENT_ID,
  SET_SHOW_SPLIT_VIEW,
  SET_UPGRADE_MODAL_SHOWING,
  START_BLOCKING,
  START_LOADING,
  START_MODAL_BLOCKING,
  START_SUPPLIER_BLOCKING,
  STOP_BLOCKING,
  STOP_LOADING,
  STOP_MODAL_BLOCKING,
  STOP_SUPPLIER_BLOCKING,
  UNLINK_IN_TRAY_DOCUMENT,
  UPDATE_BILL_ID,
  UPDATE_BILL_LINE,
  UPDATE_BILL_OPTION,
  UPDATE_EXPORT_PDF_DETAIL,
  UPDATE_LAYOUT,
} from './BillIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createBillDispatcher = store => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  loadAccountAfterCreate: payload => store.dispatch({
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

  loadItemDetailForLine: ({ index, updatedLine }) => store.dispatch({
    intent: LOAD_ITEM_DETAIL_FOR_LINE,
    index,
    updatedLine,
  }),

  formatBillLine: ({ index, key, value }) => store.dispatch({
    intent: FORMAT_BILL_LINE, index, key, value,
  }),

  updateBillLine: ({ index, key, value }) => {
    store.dispatch({
      intent: UPDATE_BILL_LINE,
      index,
      key,
      value,
    });
  },

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

  formatAmountPaid: () => {
    store.dispatch({
      intent: FORMAT_AMOUNT_PAID,
    });
  },

  loadSupplierDetail: (response) => {
    store.dispatch({
      intent: LOAD_SUPPLIER_DETAIL,
      response,
    });
  },

  loadSupplierAfterCreate: (supplierId, payload) => store.dispatch({
    intent: LOAD_SUPPLIER_AFTER_CREATE, supplierId, ...payload,
  }),

  startSupplierBlocking: () => store.dispatch({ intent: START_SUPPLIER_BLOCKING }),

  stopSupplierBlocking: () => store.dispatch({ intent: STOP_SUPPLIER_BLOCKING }),

  setCalculatedBillLinesAndTotals: (response) => {
    store.dispatch({
      intent: SET_CALCULATED_BILL_LINES_AND_TOTALS,
      response,
    });
  },

  prefillDataFromInTray: (response) => {
    store.dispatch({
      intent: PREFILL_BILL_FROM_IN_TRAY,
      response,
    });
  },

  resetTotals: () => {
    store.dispatch({
      intent: RESET_TOTALS,
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
      intent: UPDATE_EXPORT_PDF_DETAIL, key, value,
    });
  },

  loadItemOption: (response) => {
    store.dispatch({
      intent: LOAD_ITEM_OPTION,
      response,
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
});

export default createBillDispatcher;
