import {
  ADD_ALLOCATED_LEAVE_ITEM,
  ADD_DEDUCTION_PAY_ITEM_MODAL_ITEM,
  ADD_PAYROLL_DEDUCTION_PAY_ITEM,
  ADD_PAYROLL_SUPER_PAY_ITEM,
  ADD_PAYROLL_TAX_PAY_ITEM,
  CLOSE_MODAL,
  CREATE_DEDUCTION_PAY_ITEM_MODAL,
  FORMAT_DEDUCTION_PAY_ITEM_MODAL_AMOUNT_INPUT,
  FORMAT_PAYROLL_TAX_AMOUNT,
  LOAD_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_EMPLOYEE_DETAIL,
  LOAD_TAX_PAY_ITEM_MODAL,
  OPEN_DEDUCTION_PAY_ITEM_MODAL,
  OPEN_MODAL,
  REMOVE_ALLOCATED_LEAVE_ITEM,
  REMOVE_DEDUCTION_PAY_ITEM_MODAL_ITEM,
  REMOVE_PAYROLL_DEDUCTION_PAY_ITEM,
  REMOVE_PAYROLL_SUPER_PAY_ITEM,
  REMOVE_PAYROLL_TAX_PAY_ITEM,
  SET_ALERT,
  SET_DEDUCTION_PAY_ITEM_MODAL_ALERT,
  SET_DEDUCTION_PAY_ITEM_MODAL_INPUT,
  SET_DEDUCTION_PAY_ITEM_MODAL_LOADING_STATE,
  SET_DEDUCTION_PAY_ITEM_MODAL_SUBMITTING_STATE,
  SET_LOADING_STATE,
  SET_MAIN_TAB,
  SET_PAGE_EDITED_STATE,
  SET_SUBMITTING_STATE,
  SET_SUB_TAB,
  SET_TAX_PAY_ITEM_MODAL_ALERT_MESSAGE,
  SET_TAX_PAY_ITEM_MODAL_LOADING_STATE,
  SET_TAX_PAY_ITEM_MODAL_SUBMITTING_STATE,
  UPDATE_ALLOCATED_LEAVE_ITEM_CARRY_OVER,
  UPDATE_BANK_ACCOUNT_DETAILS,
  UPDATE_CONTACT_DETAILS,
  UPDATE_DEDUCTION_PAY_ITEM_MODAL,
  UPDATE_PAYMENT_DETAILS,
  UPDATE_PAYROLL_DETAILS_SUPERANNUATION_DETAILS,
  UPDATE_PAYROLL_EMPLOYMENT_DETAIL,
  UPDATE_PAYROLL_EMPLOYMENT_PAYSLIP_DELIVERY,
  UPDATE_PAYROLL_TAX_DETAILS,
  UPDATE_TAX_PAY_ITEM_MODAL_DETAILS,
} from '../EmployeeIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createEmployeeDetailDispatcher = store => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  setAlert: ({ type, message }) => {
    const intent = SET_ALERT;
    store.dispatch({ intent, alert: { type, message } });
  },

  dismissAlert: () => {
    const intent = SET_ALERT;
    store.dispatch({ intent, alert: undefined });
  },

  openModal: (modalType) => {
    const intent = OPEN_MODAL;
    store.dispatch({ intent, modalType });
  },

  closeModal: () => {
    const intent = CLOSE_MODAL;
    store.dispatch({ intent });
  },

  setMainTab: (selectedTab) => {
    const intent = SET_MAIN_TAB;
    store.dispatch({ intent, selectedTab });
  },

  setSubTab: (selectedTab) => {
    const intent = SET_SUB_TAB;
    store.dispatch({ intent, selectedTab });
  },

  setIsPageEdited: (isPageEdited) => {
    const intent = SET_PAGE_EDITED_STATE;
    store.dispatch({ intent, isPageEdited });
  },

  setLoadingState: (isLoading) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setSubmittingState: (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;
    store.dispatch({ intent, isSubmitting });
  },

  updateContactDetails: ({ key, value }) => {
    const intent = UPDATE_CONTACT_DETAILS;
    store.dispatch({ intent, key, value });
  },

  updatePayrollEmploymentDetails: ({ key, value }) => {
    const intent = UPDATE_PAYROLL_EMPLOYMENT_DETAIL;
    store.dispatch({ intent, key, value });
  },

  updatePayrollEmploymentPaySlipDelivery: ({ key, value }) => {
    const intent = UPDATE_PAYROLL_EMPLOYMENT_PAYSLIP_DELIVERY;
    store.dispatch({ intent, key, value });
  },

  updatePaymentDetails: ({ key, value }) => {
    const intent = UPDATE_PAYMENT_DETAILS;
    store.dispatch({ intent, key, value });
  },

  updateBankAccountDetails: ({ key, value, index }) => {
    const intent = UPDATE_BANK_ACCOUNT_DETAILS;
    store.dispatch({
      intent,
      key,
      value,
      index,
    });
  },

  addPayrollDeductionPayItem: (payItem) => {
    const intent = ADD_PAYROLL_DEDUCTION_PAY_ITEM;
    store.dispatch({ intent, payItem });
  },

  removePayrollDeductionPayItem: (id) => {
    const intent = REMOVE_PAYROLL_DEDUCTION_PAY_ITEM;
    store.dispatch({ intent, id });
  },

  updatePayrollDetailSuperannuationDetails: ({ key, value }) => {
    const intent = UPDATE_PAYROLL_DETAILS_SUPERANNUATION_DETAILS;
    store.dispatch({ intent, key, value });
  },

  addPayrollSuperPayItem: (payItem) => {
    const intent = ADD_PAYROLL_SUPER_PAY_ITEM;
    store.dispatch({ intent, ...payItem });
  },

  removePayrollSuperPayItem: (id) => {
    const intent = REMOVE_PAYROLL_SUPER_PAY_ITEM;
    store.dispatch({ intent, id });
  },

  loadEmployeeDetails: (response) => {
    const intent = LOAD_EMPLOYEE_DETAIL;
    store.dispatch({ intent, ...response });
  },

  addAllocatedLeaveItem: (leaveItem) => {
    const intent = ADD_ALLOCATED_LEAVE_ITEM;
    store.dispatch({ intent, leaveItem });
  },

  removeAllocatedLeaveItem: (payItemId) => {
    const intent = REMOVE_ALLOCATED_LEAVE_ITEM;
    store.dispatch({ intent, payItemId });
  },

  updateAllocatedLeaveItemCarryOver: ({ payItemId, value }) => {
    const intent = UPDATE_ALLOCATED_LEAVE_ITEM_CARRY_OVER;
    store.dispatch({ intent, payItemId, value });
  },

  addPayrollTaxPayItem: (payItem) => {
    const intent = ADD_PAYROLL_TAX_PAY_ITEM;
    store.dispatch({ intent, ...payItem });
  },

  removePayrollTaxPayItem: (id) => {
    const intent = REMOVE_PAYROLL_TAX_PAY_ITEM;
    store.dispatch({ intent, id });
  },

  updatePayrollTaxDetails: ({ key, value }) => {
    const intent = UPDATE_PAYROLL_TAX_DETAILS;
    store.dispatch({ intent, key, value });
  },

  formatAmountInput: ({ key, value }) => {
    const intent = FORMAT_PAYROLL_TAX_AMOUNT;
    store.dispatch({ intent, key, value });
  },

  setTaxPayItemModalLoadingState: (isLoading) => {
    const intent = SET_TAX_PAY_ITEM_MODAL_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  loadTaxPayItemModal: (response) => {
    const intent = LOAD_TAX_PAY_ITEM_MODAL;
    store.dispatch({ intent, ...response });
  },

  updateTaxPayItemModalDetails: ({ key, value }) => {
    const intent = UPDATE_TAX_PAY_ITEM_MODAL_DETAILS;
    store.dispatch({ intent, key, value });
  },

  setTaxPayItemModalSubmitting: (isSubmitting) => {
    const intent = SET_TAX_PAY_ITEM_MODAL_SUBMITTING_STATE;
    store.dispatch({ intent, isSubmitting });
  },

  setTaxPayItemModalAlertMessage: (alertMessage) => {
    const intent = SET_TAX_PAY_ITEM_MODAL_ALERT_MESSAGE;
    store.dispatch({ intent, alertMessage });
  },

  dismissTaxPayItemModalAlertMessage: () => {
    const intent = SET_TAX_PAY_ITEM_MODAL_ALERT_MESSAGE;
    store.dispatch({ intent, alertMessage: '' });
  },

  loadDeductionPayItemModal: (response) => {
    const intent = LOAD_DEDUCTION_PAY_ITEM_MODAL;
    store.dispatch({ intent, response });
  },

  createDeductionPayItemModal: (response) => {
    const intent = CREATE_DEDUCTION_PAY_ITEM_MODAL;
    store.dispatch({ intent, response });
  },

  updateDeductionPayItemModal: (response) => {
    const intent = UPDATE_DEDUCTION_PAY_ITEM_MODAL;
    store.dispatch({ intent, response });
  },

  openDeductionPayItemModal: (id) => {
    const intent = OPEN_DEDUCTION_PAY_ITEM_MODAL;
    store.dispatch({ intent, id });
  },

  setDeductionPayItemModalLoadingState: (isLoading) => {
    const intent = SET_DEDUCTION_PAY_ITEM_MODAL_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setDeductionPayItemModalSubmittingState: (isSubmitting) => {
    const intent = SET_DEDUCTION_PAY_ITEM_MODAL_SUBMITTING_STATE;
    store.dispatch({ intent, isSubmitting });
  },

  setDeductionPayItemModalAlert: (alert) => {
    const intent = SET_DEDUCTION_PAY_ITEM_MODAL_ALERT;
    store.dispatch({ intent, alert });
  },

  dismissDeductionPayItemModalAlert: () => {
    const intent = SET_DEDUCTION_PAY_ITEM_MODAL_ALERT;
    store.dispatch({ intent, alert: undefined });
  },

  setDeductionPayItemModalInput: ({ key, value }) => {
    const intent = SET_DEDUCTION_PAY_ITEM_MODAL_INPUT;
    store.dispatch({ intent, key, value });
  },

  formatDeductionPayItemModalAmountInput: ({ key, value }) => {
    const intent = FORMAT_DEDUCTION_PAY_ITEM_MODAL_AMOUNT_INPUT;
    store.dispatch({ intent, key, value });
  },

  addDeductionPayItemModalItem: ({ key, item }) => {
    const intent = ADD_DEDUCTION_PAY_ITEM_MODAL_ITEM;
    store.dispatch({ intent, key, item });
  },

  removeDeductionPayItemModalItem: ({ key, itemId }) => {
    const intent = REMOVE_DEDUCTION_PAY_ITEM_MODAL_ITEM;
    store.dispatch({ intent, key, itemId });
  },
});

export default createEmployeeDetailDispatcher;
