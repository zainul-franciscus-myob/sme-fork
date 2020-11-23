import {
  ADD_PURCHASE_ORDER_LINE,
  CALCULATE_LINE_AMOUNTS,
  CLOSE_ALERT,
  CLOSE_MODAL,
  DELETE_PURCHASE_ORDER_FAILED,
  DELETING_PURCHASE_ORDER,
  EXPORT_PURCHASE_ORDER_PDF_FAILED,
  FAIL_LOADING,
  GET_TAX_CALCULATIONS,
  HIDE_PREFILL_INFO,
  LOADING_AFTER_CREATE,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ITEM_DETAIL_FOR_LINE,
  LOAD_ITEM_DETAIL_FOR_LINE_FAILED,
  LOAD_JOB_AFTER_CREATE,
  LOAD_PURCHASE_ORDER,
  LOAD_SUPPLIER_DETAIL,
  LOAD_SUPPLIER_DETAIL_FAILED,
  OPEN_ALERT,
  OPEN_MODAL,
  RELOAD_PURCHASE_ORDER,
  RELOAD_PURCHASE_ORDER_FAILED,
  REMOVE_PURCHASE_ORDER_LINE,
  RESET_SUPPLIER,
  SAVE_PURCHASE_ORDER_FAILED,
  SET_ABN_LOADING_STATE,
  SET_DUPLICATE_ID,
  SET_REDIRECT_URL,
  SET_SOURCE,
  SET_UPGRADE_MODAL_SHOWING,
  SET_VIEWED_ACCOUNT_TOOL_TIP_STATE,
  START_BLOCKING,
  START_LOADING,
  START_MODAL_BLOCKING,
  STOP_BLOCKING,
  STOP_LOADING,
  STOP_MODAL_BLOCKING,
  UPDATE_EXPORT_PDF_DETAIL,
  UPDATE_HEADER_OPTION,
  UPDATE_ISSUE_DATE,
  UPDATE_LAYOUT,
  UPDATE_PURCHASE_ORDER_ID,
  UPDATE_PURCHASE_ORDER_LINE,
  UPDATE_PURCHASE_ORDER_OPTION,
} from './PurchaseOrderIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createPurchaseOrderDispatcher = (store) => ({
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

  loadJobAfterCreate: (payload) =>
    store.dispatch({
      intent: LOAD_JOB_AFTER_CREATE,
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

  loadPurchaseOrder: (response) => {
    store.dispatch({
      intent: LOAD_PURCHASE_ORDER,
      response,
    });
  },

  deletePurchaseOrderFailed: ({ message }) => {
    store.dispatch({
      intent: DELETE_PURCHASE_ORDER_FAILED,
      message,
    });
  },

  deletingPurchaseOrder: () => {
    store.dispatch({ intent: DELETING_PURCHASE_ORDER });
  },

  savePurchaseOrderFailed: ({ message }) => {
    store.dispatch({
      intent: SAVE_PURCHASE_ORDER_FAILED,
      message,
    });
  },

  loadItemDetailForLineFailed: ({ message }) => {
    store.dispatch({
      intent: LOAD_ITEM_DETAIL_FOR_LINE_FAILED,
      message,
    });
  },

  loadSupplierDetailFailed: ({ message }) => {
    store.dispatch({
      intent: LOAD_SUPPLIER_DETAIL_FAILED,
      message,
    });
  },

  reloadPurchaseOrder: (response) => {
    store.dispatch({ intent: RELOAD_PURCHASE_ORDER, response });
  },

  reloadPurchaseOrderFailed: ({ message }) => {
    store.dispatch({
      intent: RELOAD_PURCHASE_ORDER_FAILED,
      message,
    });
  },

  exportPurchaseOrderPdfFailed: ({ message }) => {
    store.dispatch({
      intent: EXPORT_PURCHASE_ORDER_PDF_FAILED,
      message,
    });
  },

  loadingAfterCreate: ({ message }) => {
    store.dispatch({
      intent: LOADING_AFTER_CREATE,
      message,
    });
  },
  updatePurchaseOrderOption: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_PURCHASE_ORDER_OPTION,
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

  addPurchaseOrderLine: () => {
    store.dispatch({
      intent: ADD_PURCHASE_ORDER_LINE,
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

  updatePurchaseOrderLine: ({ index, key, value }) => {
    store.dispatch({
      intent: UPDATE_PURCHASE_ORDER_LINE,
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

  removePurchaseOrderLine: ({ index }) => {
    store.dispatch({
      intent: REMOVE_PURCHASE_ORDER_LINE,
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

  updatePurchaseOrderId: (id) => {
    store.dispatch({
      intent: UPDATE_PURCHASE_ORDER_ID,
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

  hidePrefillInfo: () => {
    store.dispatch({
      intent: HIDE_PREFILL_INFO,
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

  setViewedAccountToolTip: (viewedAccountToolTip) => {
    store.dispatch({
      intent: SET_VIEWED_ACCOUNT_TOOL_TIP_STATE,
      viewedAccountToolTip,
    });
  },
});

export default createPurchaseOrderDispatcher;
