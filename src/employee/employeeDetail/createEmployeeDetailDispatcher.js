import {
  ADD_ALLOCATED_LEAVE_ITEM,
  ADD_DEDUCTION_PAY_ITEM_MODAL_ITEM,
  ADD_PAYROLL_DEDUCTION_PAY_ITEM,
  ADD_PAYROLL_SUPER_PAY_ITEM,
  ADD_PAYROLL_TAX_PAY_ITEM,
  ADD_PAYROLL_WAGE_PAY_ITEM,
  CLOSE_DEDUCTION_PAY_ITEM_MODAL,
  CLOSE_MODAL,
  CLOSE_SUPER_FUND_MODAL,
  CLOSE_TAX_PAY_ITEM_MODAL,
  CREATE_DEDUCTION_PAY_ITEM_MODAL,
  CREATE_SUPER_FUND,
  FORMAT_DEDUCTION_PAY_ITEM_MODAL_AMOUNT_INPUT,
  FORMAT_PAYROLL_TAX_AMOUNT,
  LOAD_ABN_DETAIL,
  LOAD_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_EMPLOYEE_DETAIL,
  LOAD_NEW_SUPER_FUND,
  LOAD_TAX_PAY_ITEM_MODAL,
  OPEN_DEDUCTION_PAY_ITEM_MODAL,
  OPEN_MODAL,
  OPEN_SUPER_FUND_MODAL,
  OPEN_TAX_PAY_ITEM_MODAL,
  REMOVE_ALLOCATED_LEAVE_ITEM,
  REMOVE_DEDUCTION_PAY_ITEM_MODAL_ITEM,
  REMOVE_PAYROLL_DEDUCTION_PAY_ITEM,
  REMOVE_PAYROLL_SUPER_PAY_ITEM,
  REMOVE_PAYROLL_TAX_PAY_ITEM,
  REMOVE_PAYROLL_WAGE_PAY_ITEM,
  SELECT_APRA_FUND,
  SET_ABN_LOADING_STATE,
  SET_ABN_STATUS,
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
  SET_SUPER_FUND_MODAL_ALERT_MESSAGE,
  SET_SUPER_FUND_MODAL_LOADING_STATE,
  SET_SUPER_FUND_MODAL_SUBMITTING_STATE,
  SET_TAX_PAY_ITEM_MODAL_ALERT_MESSAGE,
  SET_TAX_PAY_ITEM_MODAL_LOADING_STATE,
  SET_TAX_PAY_ITEM_MODAL_SUBMITTING_STATE,
  SHOW_CONTACT_DETAILS,
  UPDATE_ALLOCATED_LEAVE_ITEM_CARRY_OVER,
  UPDATE_BANK_ACCOUNT_DETAILS,
  UPDATE_CONTACT_DETAILS,
  UPDATE_DEDUCTION_PAY_ITEM_MODAL,
  UPDATE_PAYMENT_DETAILS,
  UPDATE_PAYROLL_DETAILS_SUPERANNUATION_DETAILS,
  UPDATE_PAYROLL_EMPLOYMENT_DETAIL,
  UPDATE_PAYROLL_EMPLOYMENT_PAYSLIP_DELIVERY,
  UPDATE_PAYROLL_TAX_DETAILS,
  UPDATE_PAYROLL_WAGE_ANNUAL_SALARY,
  UPDATE_PAYROLL_WAGE_DETAILS,
  UPDATE_PAYROLL_WAGE_HOURLY_RATE,
  UPDATE_PAYROLL_WAGE_HOURS_IN_PAY_CYCLE,
  UPDATE_PAYROLL_WAGE_PAY_BASIS,
  UPDATE_PAYROLL_WAGE_PAY_CYCLE,
  UPDATE_SELF_MANAGED_FUND_ABN,
  UPDATE_SUPER_FUND_DETAIL,
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

  openModal: ({ type, url }) => {
    const intent = OPEN_MODAL;
    store.dispatch({ intent, modal: { type, url } });
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

  addPayrollWagePayItem: (payItem) => {
    const intent = ADD_PAYROLL_WAGE_PAY_ITEM;
    store.dispatch({ intent, ...payItem });
  },

  removePayrollWagePayItem: (id) => {
    const intent = REMOVE_PAYROLL_WAGE_PAY_ITEM;
    store.dispatch({ intent, id });
  },

  updatePayrollWageDetails: ({ key, value }) => {
    const intent = UPDATE_PAYROLL_WAGE_DETAILS;
    store.dispatch({ intent, key, value });
  },

  updatePayrollWagePayBasis: ({ value }) => {
    const intent = UPDATE_PAYROLL_WAGE_PAY_BASIS;
    store.dispatch({ intent, value });
  },

  updatePayrollWageAnnualSalary: ({ value }) => {
    const intent = UPDATE_PAYROLL_WAGE_ANNUAL_SALARY;
    store.dispatch({ intent, value });
  },

  updatePayrollWageHourlyRate: ({ value }) => {
    const intent = UPDATE_PAYROLL_WAGE_HOURLY_RATE;
    store.dispatch({ intent, value });
  },

  updatePayrollWageHoursInPayCycle: ({ value }) => {
    const intent = UPDATE_PAYROLL_WAGE_HOURS_IN_PAY_CYCLE;
    store.dispatch({ intent, value });
  },

  updatePayrollWagePayCycle: ({ value }) => {
    const intent = UPDATE_PAYROLL_WAGE_PAY_CYCLE;
    store.dispatch({ intent, value });
  },

  openTaxPayItemModal: () => {
    const intent = OPEN_TAX_PAY_ITEM_MODAL;
    store.dispatch({ intent });
  },

  closeTaxPayItemModal: () => {
    const intent = CLOSE_TAX_PAY_ITEM_MODAL;
    store.dispatch({ intent });
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

  closeDeductionPayItemModal: () => {
    const intent = CLOSE_DEDUCTION_PAY_ITEM_MODAL;
    store.dispatch({ intent });
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

  setSuperFundModalLoadingState: (isLoading) => {
    const intent = SET_SUPER_FUND_MODAL_LOADING_STATE;
    store.dispatch({ intent, isLoading });
  },

  setSuperFundModalSubmittingState: (isSubmitting) => {
    const intent = SET_SUPER_FUND_MODAL_SUBMITTING_STATE;
    store.dispatch({ intent, isSubmitting });
  },

  loadSuperFundModal: (response) => {
    const intent = LOAD_NEW_SUPER_FUND;
    store.dispatch({ intent, response });
  },

  updateSuperFundDetail: ({ key, value }) => {
    const intent = UPDATE_SUPER_FUND_DETAIL;
    store.dispatch({ intent, key, value });
  },

  setAbnLoadingState: (isAbnLoading) => {
    const intent = SET_ABN_LOADING_STATE;
    store.dispatch({ intent, isAbnLoading });
  },

  loadAbnDetail: (entityName) => {
    const intent = LOAD_ABN_DETAIL;
    store.dispatch({ intent, name: entityName });
  },

  setSuperFundModalAlertMessage: (alertMessage) => {
    const intent = SET_SUPER_FUND_MODAL_ALERT_MESSAGE;
    store.dispatch({ intent, alertMessage });
  },

  dismissSuperFundModalAlertMessage: () => {
    const intent = SET_SUPER_FUND_MODAL_ALERT_MESSAGE;
    store.dispatch({ intent, alertMessage: '' });
  },

  setAbnStatus: (isAbnDirty) => {
    const intent = SET_ABN_STATUS;
    store.dispatch({ intent, isAbnDirty });
  },

  updateSelfManagedFundAbn: ({ value }) => {
    const intent = UPDATE_SELF_MANAGED_FUND_ABN;
    store.dispatch({ intent, value });
  },

  selectSuperFund: (superProduct) => {
    const intent = SELECT_APRA_FUND;
    store.dispatch({ intent, superProduct });
  },

  showContactDetails: () => {
    const intent = SHOW_CONTACT_DETAILS;
    store.dispatch({ intent });
  },

  saveSuperFundModal: ({ selectedSuperFundId, superFundOptions }) => {
    const intent = CREATE_SUPER_FUND;
    store.dispatch({ intent, selectedSuperFundId, superFundOptions });
  },

  openSuperFundModal: () => {
    const intent = OPEN_SUPER_FUND_MODAL;
    store.dispatch({ intent });
  },

  closeSuperFundModal: () => {
    const intent = CLOSE_SUPER_FUND_MODAL;
    store.dispatch({ intent });
  },
});

export default createEmployeeDetailDispatcher;
