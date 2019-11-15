import {
  ADD_BILL_ITEM_LINE,
  ADD_BILL_SERVICE_LINE,
  CLOSE_ALERT,
  CLOSE_MODAL,
  FORMAT_AMOUNT_PAID,
  FORMAT_BILL_SERVICE_LINES,
  ITEM_CALCULATE,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_BILL,
  LOAD_ITEM_OPTION,
  LOAD_SUPPLIER_ADDRESS,
  LOAD_SUPPLIER_AFTER_CREATE,
  OPEN_ALERT,
  OPEN_MODAL,
  PREFILL_NEW_BILL_FROM_IN_TRAY,
  REMOVE_BILL_LINE,
  RESET_TOTALS,
  SERVICE_CALCULATE,
  SET_ACCOUNT_LOADING_STATE,
  START_BLOCKING,
  START_LOADING,
  START_MODAL_BLOCKING,
  START_PENDING_CALCULATION,
  START_SUPPLIER_BLOCKING,
  STOP_BLOCKING,
  STOP_LOADING,
  STOP_MODAL_BLOCKING,
  STOP_PENDING_CALCULATION,
  STOP_SUPPLIER_BLOCKING,
  UPDATE_BILL_ID,
  UPDATE_BILL_ITEM_LINE,
  UPDATE_BILL_OPTION,
  UPDATE_BILL_SERVICE_LINE,
  UPDATE_EXPORT_PDF_DETAIL,
} from './BillIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

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

  setAccountLoadingState: isAccountLoading => store.dispatch({
    intent: SET_ACCOUNT_LOADING_STATE,
    isAccountLoading,
  }),

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
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

  addBillServiceLine: ({ accountId }) => {
    store.dispatch({
      intent: ADD_BILL_SERVICE_LINE,
      accountId,
    });
  },

  addBillItemLine: ({ itemId }) => {
    store.dispatch({
      intent: ADD_BILL_ITEM_LINE,
      itemId,
    });
  },

  updateBillServiceLine: ({ index, key, value }) => {
    store.dispatch({
      intent: UPDATE_BILL_SERVICE_LINE,
      index,
      key,
      value,
    });
  },

  updateBillItemLine: ({ index, key, value }) => {
    store.dispatch({
      intent: UPDATE_BILL_ITEM_LINE,
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

  formatBillServiceLines: () => {
    store.dispatch({
      intent: FORMAT_BILL_SERVICE_LINES,
    });
  },

  formatAmountPaid: () => {
    store.dispatch({
      intent: FORMAT_AMOUNT_PAID,
    });
  },

  serviceCalculate: (response) => {
    store.dispatch({
      intent: SERVICE_CALCULATE,
      response,
    });
  },

  loadSupplierAddress: (response) => {
    store.dispatch({
      intent: LOAD_SUPPLIER_ADDRESS,
      response,
    });
  },

  loadSupplierAfterCreate: (supplierId, payload) => store.dispatch({
    intent: LOAD_SUPPLIER_AFTER_CREATE, supplierId, ...payload,
  }),

  startSupplierBlocking: () => store.dispatch({ intent: START_SUPPLIER_BLOCKING }),

  stopSupplierBlocking: () => store.dispatch({ intent: STOP_SUPPLIER_BLOCKING }),

  itemCalculate: (response) => {
    store.dispatch({
      intent: ITEM_CALCULATE,
      response,
    });
  },

  startPendingCalculation: () => {
    store.dispatch({
      intent: START_PENDING_CALCULATION,
    });
  },

  stopPendingCalculation: () => {
    store.dispatch({
      intent: STOP_PENDING_CALCULATION,
    });
  },

  prefillDataFromInTray: (response) => {
    store.dispatch({
      intent: PREFILL_NEW_BILL_FROM_IN_TRAY,
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
});

export default createBillDispatcher;
