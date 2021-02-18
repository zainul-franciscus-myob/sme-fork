import {
  ADD_BILL_LINE,
  CALCULATE_BILL_LINE_AMOUNTS,
  GET_TAX_CALCULATIONS,
  LOAD_ABN_FROM_SUPPLIER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ITEM,
  LOAD_RECURRING_BILL,
  LOAD_SUPPLIER,
  REMOVE_BILL_LINE,
  SET_ABN_LOADING_STATE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL,
  SET_REDIRECT_URL,
  SET_SUBMITTING_STATE,
  UPDATE_BILL_HEADER_OPTIONS,
  UPDATE_BILL_LAYOUT,
  UPDATE_BILL_LINE,
  UPDATE_BILL_SUPPLIER_OPTIONS,
  UPDATE_SCHEDULE_OPTIONS,
} from './RecurringBillIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';

const createRecurringBillDispatcher = (store) => ({
  setInitialState: (context) => {
    store.dispatch({ intent: SET_INITIAL_STATE, context });
  },

  resetState: () => {
    store.dispatch({ intent: RESET_STATE });
  },

  openDangerAlert: ({ message }) => {
    store.dispatch({ intent: SET_ALERT, alert: { message, type: 'danger' } });
  },

  openSuccessAlert: ({ message }) => {
    store.dispatch({ intent: SET_ALERT, alert: { message, type: 'success' } });
  },

  openInfoAlert: ({ message }) => {
    store.dispatch({ intent: SET_ALERT, alert: { message, type: 'info' } });
  },

  closeAlert: () => {
    store.dispatch({ intent: SET_ALERT, alert: undefined });
  },

  openModal: ({ modalType }) => {
    store.dispatch({ intent: SET_MODAL, modalType });
  },

  closeModal: () => {
    store.dispatch({ intent: SET_MODAL, modalType: undefined });
  },

  startLoading: () => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState: LoadingState.LOADING,
    });
  },

  stopLoading: () => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState: LoadingState.LOADING_SUCCESS,
    });
  },

  failLoading: () => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState: LoadingState.LOADING_FAIL,
    });
  },

  startSubmitting: () => {
    store.dispatch({ intent: SET_SUBMITTING_STATE, isSubmitting: true });
  },

  stopSubmitting: () => {
    store.dispatch({ intent: SET_SUBMITTING_STATE, isSubmitting: false });
  },

  loadRecurringBill: (response) => {
    store.dispatch({ intent: LOAD_RECURRING_BILL, response });
  },

  updateScheduleOptions: ({ key, value }) => {
    store.dispatch({ intent: UPDATE_SCHEDULE_OPTIONS, key, value });
  },

  updateBillHeaderOption: ({ key, value }) => {
    store.dispatch({ intent: UPDATE_BILL_HEADER_OPTIONS, key, value });
  },

  updateBillSupplierOptions: (item) => {
    store.dispatch({ intent: UPDATE_BILL_SUPPLIER_OPTIONS, item });
  },

  updateBillLayout: ({ value }) => {
    store.dispatch({ intent: UPDATE_BILL_LAYOUT, value });
  },

  addBillLine: () => {
    store.dispatch({ intent: ADD_BILL_LINE });
  },

  removeBillLine: ({ index }) => {
    store.dispatch({ intent: REMOVE_BILL_LINE, index });
  },

  updateBillLine: ({ index, key, value }) => {
    store.dispatch({ intent: UPDATE_BILL_LINE, index, key, value });
  },

  calculateBillLineAmounts: ({ key, index }) => {
    store.dispatch({ intent: CALCULATE_BILL_LINE_AMOUNTS, key, index });
  },

  getTaxCalculations: (taxCalculations, isSwitchingTaxInclusive = false) => {
    store.dispatch({
      intent: GET_TAX_CALCULATIONS,
      taxCalculations,
      isSwitchingTaxInclusive,
    });
  },

  loadSupplier: (response) => {
    store.dispatch({ intent: LOAD_SUPPLIER, response });
  },

  setRedirectUrl: (redirectUrl) => {
    store.dispatch({ intent: SET_REDIRECT_URL, redirectUrl });
  },

  setAbnLoadingState: (isAbnLoading) => {
    store.dispatch({ intent: SET_ABN_LOADING_STATE, isAbnLoading });
  },

  loadAbn: (abn) => {
    store.dispatch({ intent: LOAD_ABN_FROM_SUPPLIER, abn });
  },

  loadAccountAfterCreate: (payload) => {
    store.dispatch({ intent: LOAD_ACCOUNT_AFTER_CREATE, ...payload });
  },

  loadItem: ({ index, item }) => {
    store.dispatch({ intent: LOAD_ITEM, index, item });
  },
});

export default createRecurringBillDispatcher;
