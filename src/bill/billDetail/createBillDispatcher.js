import {
  ADD_BILL_ITEM_LINE,
  ADD_BILL_SERVICE_LINE,
  CLOSE_ALERT,
  CLOSE_MODAL,
  FORMAT_BILL_SERVICE_LINES,
  ITEM_CALCULATE, LINE_AMOUNT_CALCULATED,
  LINE_AMOUNT_PENDING_CALCULATION, LOAD_BILL,
  LOAD_SUPPLIER_ADDRESS,
  OPEN_ALERT,
  OPEN_MODAL,
  PREFILL_NEW_BILL_FROM_IN_TRAY,
  REMOVE_BILL_LINE,
  RESET_TOTALS,
  SERVICE_CALCULATE,
  START_BLOCKING,
  START_LOADING,
  STOP_BLOCKING,
  STOP_LOADING,
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

  itemCalculate: (response) => {
    store.dispatch({
      intent: ITEM_CALCULATE,
      response,
    });
  },

  lineAmountPendingCalculation: () => {
    store.dispatch({
      intent: LINE_AMOUNT_PENDING_CALCULATION,
    });
  },

  lineAmountCalculated: () => {
    store.dispatch({
      intent: LINE_AMOUNT_CALCULATED,
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
});

export default createBillDispatcher;
