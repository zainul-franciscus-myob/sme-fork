import {
  ADD_ALLOCATED_LEAVE_ITEM,
  ADD_DEDUCTION_PAY_ITEM_MODAL_ITEM,
  ADD_EXPENSE_PAY_ITEM_MODAL_ALLOCATED_EMPLOYEE,
  ADD_EXPENSE_PAY_ITEM_MODAL_EXEMPTION_PAY_ITEM,
  ADD_LEAVE_PAY_ITEM_MODAL_EMPLOYEE,
  ADD_LEAVE_PAY_ITEM_MODAL_EXEMPTION,
  ADD_LEAVE_PAY_ITEM_MODAL_LINKED_WAGE,
  ADD_PAYROLL_DEDUCTION_PAY_ITEM,
  ADD_PAYROLL_EXPENSE_PAY_ITEM,
  ADD_PAYROLL_SUPER_PAY_ITEM,
  ADD_PAYROLL_TAX_PAY_ITEM,
  ADD_PAYROLL_WAGE_PAY_ITEM,
  ADD_SUPER_PAY_ITEM_MODAL_ITEM,
  ADD_WAGE_PAY_ITEM_MODAL_EMPLOYEE,
  ADD_WAGE_PAY_ITEM_MODAL_EXEMPTION,
  CHANGE_EXPENSE_PAY_ITEM_MODAL_INPUT,
  CLOSE_DEDUCTION_PAY_ITEM_MODAL,
  CLOSE_EXPENSE_PAY_ITEM_MODAL,
  CLOSE_LEAVE_PAY_ITEM_MODAL,
  CLOSE_MODAL,
  CLOSE_SUPER_FUND_MODAL,
  CLOSE_SUPER_PAY_ITEM_MODAL,
  CLOSE_TAX_PAY_ITEM_MODAL,
  CLOSE_WAGE_PAY_ITEM_MODAL,
  CREATE_DEDUCTION_PAY_ITEM_MODAL,
  CREATE_EXPENSE_PAY_ITEM_MODAL,
  CREATE_LEAVE_PAY_ITEM,
  CREATE_SUPER_FUND,
  CREATE_SUPER_PAY_ITEM_MODAL,
  CREATE_WAGE_PAY_ITEM_MODAL,
  FORMAT_DEDUCTION_PAY_ITEM_MODAL_AMOUNT_INPUT,
  FORMAT_EXPENSE_PAY_ITEM_MODAL_AMOUNT_INPUT,
  FORMAT_PAYROLL_PAY_HISTORY_ITEM_INPUT,
  FORMAT_PAYROLL_TAX_AMOUNT,
  LOAD_ABN_DETAIL,
  LOAD_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_EMPLOYEE_DETAIL,
  LOAD_EXPENSE_PAY_ITEM_MODAL,
  LOAD_LEAVE_PAY_ITEM,
  LOAD_NEW_SUPER_FUND,
  LOAD_PAYROLL_STANDARD_PAY_WAGE_AMOUNT_RULE,
  LOAD_SUPER_PAY_ITEM_MODAL,
  LOAD_TAX_PAY_ITEM_MODAL,
  LOAD_WAGE_PAY_ITEM_MODAL,
  OPEN_DEDUCTION_PAY_ITEM_MODAL,
  OPEN_EXPENSE_PAY_ITEM_MODAL,
  OPEN_LEAVE_PAY_ITEM_MODAL,
  OPEN_MODAL,
  OPEN_SUPER_FUND_MODAL,
  OPEN_SUPER_PAY_ITEM_MODAL,
  OPEN_TAX_PAY_ITEM_MODAL,
  OPEN_WAGE_PAY_ITEM_MODAL,
  REMOVE_ALLOCATED_LEAVE_ITEM,
  REMOVE_DEDUCTION_PAY_ITEM_MODAL_ITEM,
  REMOVE_EXPENSE_PAY_ITEM_MODAL_ALLOCATED_EMPLOYEE,
  REMOVE_EXPENSE_PAY_ITEM_MODAL_EXEMPTION_PAY_ITEM,
  REMOVE_LEAVE_PAY_ITEM_MODAL_EMPLOYEE,
  REMOVE_LEAVE_PAY_ITEM_MODAL_EXEMPTION,
  REMOVE_LEAVE_PAY_ITEM_MODAL_LINKED_WAGE,
  REMOVE_PAYROLL_DEDUCTION_PAY_ITEM,
  REMOVE_PAYROLL_EXPENSE_PAY_ITEM,
  REMOVE_PAYROLL_STANDARD_PAY_ITEM,
  REMOVE_PAYROLL_SUPER_PAY_ITEM,
  REMOVE_PAYROLL_TAX_PAY_ITEM,
  REMOVE_PAYROLL_WAGE_PAY_ITEM,
  REMOVE_SUPER_PAY_ITEM_MODAL_ITEM,
  REMOVE_WAGE_PAY_ITEM_MODAL_EMPLOYEE,
  REMOVE_WAGE_PAY_ITEM_MODAL_EXEMPTION,
  SELECT_APRA_FUND,
  SET_ABN_LOADING_STATE,
  SET_ABN_STATUS,
  SET_ALERT,
  SET_ALLOCATED_LEAVE_ITEM_MODAL,
  SET_DEDUCTION_PAY_ITEM_MODAL_ALERT,
  SET_DEDUCTION_PAY_ITEM_MODAL_INPUT,
  SET_DEDUCTION_PAY_ITEM_MODAL_LOADING_STATE,
  SET_DEDUCTION_PAY_ITEM_MODAL_SUBMITTING_STATE,
  SET_EXPENSE_PAY_ITEM_MODAL_ALERT,
  SET_EXPENSE_PAY_ITEM_MODAL_LOADING_STATE,
  SET_EXPENSE_PAY_ITEM_MODAL_SUBMITTING_STATE,
  SET_LEAVE_PAY_ITEM_MODAL_ALERT,
  SET_LEAVE_PAY_ITEM_MODAL_LOADING_STATE,
  SET_LEAVE_PAY_ITEM_MODAL_SUBMITTING_STATE,
  SET_LOADING_STATE,
  SET_MAIN_TAB,
  SET_PAGE_EDITED_STATE,
  SET_PAYROLL_PAY_HISTORY_FILTER_OPTIONS,
  SET_PAYROLL_PAY_HISTORY_ITEM_INPUT,
  SET_PAYROLL_STANDARD_PAY_DETAILS_INPUT,
  SET_PAYROLL_STANDARD_PAY_ITEM_INPUT,
  SET_SUBMITTING_STATE,
  SET_SUB_TAB,
  SET_SUPER_FUND_MODAL_ALERT_MESSAGE,
  SET_SUPER_FUND_MODAL_LOADING_STATE,
  SET_SUPER_FUND_MODAL_SUBMITTING_STATE,
  SET_SUPER_PAY_ITEM_MODAL_ALERT,
  SET_SUPER_PAY_ITEM_MODAL_INPUT,
  SET_SUPER_PAY_ITEM_MODAL_LOADING_STATE,
  SET_SUPER_PAY_ITEM_MODAL_SUBMITTING_STATE,
  SET_SUPER_PAY_ITEM_MODAL_SUPER_PAY_ITEM,
  SET_TAX_PAY_ITEM_MODAL_ALERT_MESSAGE,
  SET_TAX_PAY_ITEM_MODAL_LOADING_STATE,
  SET_TAX_PAY_ITEM_MODAL_SUBMITTING_STATE,
  SET_WAGE_PAY_ITEM_MODAL_ALERT,
  SET_WAGE_PAY_ITEM_MODAL_LOADING_STATE,
  SET_WAGE_PAY_ITEM_MODAL_SUBMITTING_STATE,
  SHOW_CONTACT_DETAILS,
  UPDATE_ALLOCATED_LEAVE_ITEM_CARRY_OVER,
  UPDATE_BANK_ACCOUNT_DETAILS,
  UPDATE_CONTACT_DETAILS,
  UPDATE_DEDUCTION_PAY_ITEM_MODAL,
  UPDATE_EXPENSE_PAY_ITEM_MODAL,
  UPDATE_LEAVE_PAY_ITEM,
  UPDATE_LEAVE_PAY_ITEM_MODAL_CALCULATION_BASIS,
  UPDATE_LEAVE_PAY_ITEM_MODAL_CALCULATION_BASIS_AMOUNTS,
  UPDATE_LEAVE_PAY_ITEM_MODAL_NAME,
  UPDATE_PAYMENT_DETAILS,
  UPDATE_PAYROLL_DETAILS_SUPERANNUATION_DETAILS,
  UPDATE_PAYROLL_EMPLOYMENT_DETAIL,
  UPDATE_PAYROLL_EMPLOYMENT_PAYSLIP_DELIVERY,
  UPDATE_PAYROLL_TAX_DETAILS,
  UPDATE_PAYROLL_WAGE_ANNUAL_SALARY,
  UPDATE_PAYROLL_WAGE_APPLIED_DETAILS,
  UPDATE_PAYROLL_WAGE_DETAILS,
  UPDATE_PAYROLL_WAGE_HOURLY_RATE,
  UPDATE_PAYROLL_WAGE_HOURS_IN_PAY_CYCLE,
  UPDATE_PAYROLL_WAGE_PAY_BASIS,
  UPDATE_PAYROLL_WAGE_PAY_CYCLE,
  UPDATE_SELF_MANAGED_FUND_ABN,
  UPDATE_SUPER_FUND_DETAIL,
  UPDATE_SUPER_PAY_ITEM_MODAL,
  UPDATE_TAX_PAY_ITEM_MODAL_DETAILS,
  UPDATE_WAGE_PAY_ITEM_MODAL,
  UPDATE_WAGE_PAY_ITEM_MODAL_AMOUNT,
  UPDATE_WAGE_PAY_ITEM_MODAL_DETAILS,
  UPDATE_WAGE_PAY_ITEM_MODAL_OVERRIDE_ACCOUNT,
} from '../../EmployeeIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  addAllocatedLeaveItem,
  addPayrollDeductionPayItem,
  removeAllocatedLeaveItem,
  removePayrollDeductionPayItem,
  setAllocatedLeaveItemModal,
  updateAllocatedLeaveItemCarryOver,
  updatePayrollEmployeeDetail,
} from './PayrollDetailReducer';
import {
  addDeductionPayItemModalItem,
  closeDeductionPayItemModal,
  createDeductionPayItemModal,
  formatDeductionPayItemModalAmountInput,
  loadDeductionPayItemModal,
  openDeductionPayItemModal,
  removeDeductionPayItemModalItem,
  setDeductionPayItemModalAlert,
  setDeductionPayItemModalInput,
  setDeductionPayItemModalLoadingState,
  setDeductionPayItemModalSubmittingState,
  updateDeductionPayItemModal,
} from './DeductionPayItemModalReducer';
import {
  addExpensePayItemModalAllocatedEmployee,
  addExpensePayItemModalExemptionPayItem,
  changeExpensePayItemModalInput,
  closeExpensePayItemModal,
  createExpensePayItemModal,
  formatExpensePayItemModalAmountInput,
  loadExpensePayItemModal,
  openExpensePayItemModal,
  removeExpensePayItemModalAllocatedEmployee,
  removeExpensePayItemModalExemptionPayItem,
  setExpensePayItemModalAlert,
  setExpensePayItemModalLoadingState,
  setExpensePayItemModalSubmittingState,
  updateExpensePayItemModal,
} from './ExpensePayItemModalReducer';
import {
  addLeavePayItemModalEmployee,
  addLeavePayItemModalExemption,
  addLeavePayItemModalLinkedWage,
  closeLeavePayItemModal,
  createLeavePayItem,
  loadLeavePayItem,
  openLeavePayItemModal,
  removeLeavePayItemModalEmployee,
  removeLeavePayItemModalExemption,
  removeLeavePayItemModalLinkedWage,
  setLeavePayItemModalAlert,
  setLeavePayItemModalLoadingState,
  setLeavePayItemModalSubmittingState,
  updateLeavePayItem,
  updateLeavePayItemModalCalculationBasis,
  updateLeavePayItemModalCalculationBasisAmounts,
  updateLeavePayItemModalName,
} from './LeavePayItemModalReducer';
import {
  addPayrollExpensePayItem,
  removePayrollExpensePayItem,
} from './PayrollExpenseReducer';
import {
  addPayrollSuperPayItem,
  removePayrollSuperPayItem,
  updatePayrollDetailsSuperannuationDetails,
} from './PayrollSuperReducer';
import {
  addPayrollTaxPayItem,
  closeTaxPayItemModal,
  formatAmountInput,
  loadTaxPayItemModal,
  openTaxPayItemModal,
  removePayrollTaxPayItem,
  setTaxPayItemModalAlertMessage,
  setTaxPayItemModalLoading,
  setTaxPayItemModalSubmitting,
  updatePayrollTaxDetail,
  updateTaxPayItemModalDetails,
} from './PayrollTaxReducer';
import {
  addPayrollWagePayItem,
  loadWagePayrollDetails,
  removePayrollWagePayItem,
  updatePayrollWageAnnualSalary,
  updatePayrollWageAppliedDetails,
  updatePayrollWageDetail,
  updatePayrollWageHourlyRate,
  updatePayrollWageHoursInPayCycle,
  updatePayrollWagePayBasis,
  updatePayrollWagePayCycle,
} from './PayrollWageReducer';
import {
  addSuperPayItemModalItem,
  closeSuperPayItemModal,
  createSuperPayItemModal,
  loadSuperPayItemModal,
  openSuperPayItemModal,
  removeSuperPayItemModalItem,
  setSuperPayItemModalAlert,
  setSuperPayItemModalInput,
  setSuperPayItemModalLoadingState,
  setSuperPayItemModalSubmittingState,
  setSuperPayItemModalSuperPayItem,
  updateSuperPayItemModal,
} from './SuperPayItemModalReducer';
import {
  addWagePayItemModalEmployee,
  addWagePayItemModalExemption,
  closeWagePayItemModal,
  createWagePayItemModal,
  loadWagePayItemModal,
  openWagePayItemModal,
  removeWagePayItemModalEmployee,
  removeWagePayItemModalExemption,
  setWagePayItemModalAlert,
  setWagePayItemModalLoadingState,
  setWagePayItemModalSubmittingState,
  updateWagePayItemModal,
  updateWagePayItemModalAmount,
  updateWagePayItemModalDetails,
  updateWagePayItemModalOverrideAccount,
} from './WagePayItemModalReducer';
import {
  closeSuperFundModal,
  loadAbnDetail,
  loadSuperFundModal,
  openSuperFundModal,
  saveSuperFundModal,
  selectAPRAFund,
  setAbnLoadingState,
  setAbnStatus,
  setSuperFundModalAlertMessage,
  setSuperFundModalLoadingState,
  setSuperFundModalSubmittingState,
  showContactDetails,
  updateSelfManagedFundAbn,
  updateSuperFundDetail,
} from './SuperFundModalReducer';
import {
  formatPayrollPayHistoryItemInput,
  setPayrollPayHistoryFilterOptions,
  setPayrollPayHistoryItemInput,
} from './PayrollPayHistoryReducer';
import { getCurrentMonth } from '../selectors/PayrollPayHistorySelectors';
import {
  loadPayrollStandardPayWageAmountRule,
  removePayrollStandardPayItem,
  setPayrollStandardPayDetailsItemInput,
  setPayrollStandardPayItemInput,
} from './PayrollStandardPayReducer';
import { mainTabIds } from '../tabItems';
import { shouldDefaultPayslipEmail } from '../selectors/EmployeeDetailSelectors';
import createReducer from '../../../store/createReducer';

export const getDefaultState = () => ({
  isLoading: true,
  isSubmitting: false,
  isPageEdited: false,
  alert: undefined,
  modal: undefined,
  mainTab: '',
  subTab: '',
  contactDetail: {
    firstName: '',
    lastName: '',
    address: '',
    suburb: '',
    state: '',
    postcode: '',
    country: '',
    phoneNumbers: [],
    email: '',
    notes: '',
    isInactive: false,
    employeeNumber: '',
  },
  payrollDetails: {
    employmentDetails: {
      dateOfBirth: '',
      gender: '',
      startDate: '',
      terminationDate: '',
      employmentBasis: '',
      employmentCategory: '',
      employmentStatus: '',
      paySlipDelivery: '',
      paySlipEmail: '',
    },
    deductionDetails: {
      deductionPayItems: [],
    },
    leaveDetails: {
      allocatedLeavePayItems: [],
      modal: undefined,
    },
    superannuationDetails: {
      selectedSuperFundId: '',
      employeeMembershipNumber: '',
      allocatedPayItems: [],
    },
    tax: {
      extraTax: '',
      taxFileNumber: '',
      taxTableId: '',
      totalRebates: '',
      withholdingVariationRate: '',
      taxPayItems: [],
    },
    wage: {
      selectedPayBasis: '',
      annualSalary: '',
      hourlyRate: '',
      selectedPayCycle: '',
      payPeriodHours: '',
      selectedWageExpenseAccount: '',
      allocatedWagePayItems: [],
      appliedAnnualSalary: '',
      appliedHourlyRate: '',
      appliedPayPeriodHours: '',
    },
    employerExpenseDetails: {
      expensePayItems: [],
    },
    standardPayDetails: {
      description: '',
      standardPayItems: [],
      wageAmountRules: {},
    },
    payHistoryDetails: {
      filterOptions: {
        period: getCurrentMonth(),
      },
      payHistoryItems: [],
    },
  },
  paymentDetails: {
    paymentMethod: '',
    splitPayBetween: '',
    bankStatementText: '',
    bankAccounts: [],
  },
  genderOptions: [],
  employmentBasisOptions: [],
  employmentCategoryOptions: [],
  employmentStatusOptions: [],
  payslipDeliveryOptions: [],
  paymentMethodOptions: [],
  splitNetPayBetweenOptions: [],
  valueOptions: [],
  deductionPayItemOptions: [],
  leavePayItemOptions: [],
  superFundOptions: [],
  superPayItemOptions: [],
  taxTableOptions: [],
  taxPayItemOptions: [],
  wagePayCycleOptions: [],
  wagePayBasisOptions: [],
  wageExpenseAccounts: [],
  baseSalaryWagePayItemId: '',
  baseHourlyWagePayItemId: '',
  wagePayItems: [],
  expensePayItemOptions: [],
  payHistoryPeriodOptions: [],
  wagePayItemModal: undefined,
  expensePayItemModal: undefined,
  taxPayItemModal: undefined,
  deductionPayItemModal: undefined,
  superFundModal: undefined,
  superPayItemModal: undefined,
  leavePayItemModal: undefined,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => getDefaultState();

const setMainTab = (state, action) => ((
  action.selectedTab === mainTabIds.payrollDetails && shouldDefaultPayslipEmail(state))
  ? {
    ...state,
    mainTab: action.selectedTab,
    payrollDetails: {
      ...state.payrollDetails,
      employmentDetails: {
        ...state.payrollDetails.employmentDetails,
        paySlipEmail: state.contactDetail.email,
        [action.key]: action.value,
      },
    },
  }
  : {
    ...state,
    mainTab: action.selectedTab,
  });

const setSubTab = (state, action) => ({
  ...state,
  subTab: action.selectedTab,
});

const loadEmployeeDetail = (state, action) => ({
  ...state,
  contactDetail: {
    ...state.contactDetail,
    ...action.contactDetail,
  },
  payrollDetails: {
    ...state.payrollDetails,
    ...action.payrollDetails,
    employmentDetails: {
      ...state.payrollDetails.employmentDetails,
      ...action.payrollDetails.employmentDetails,
    },
    deductionDetails: {
      ...state.payrollDetails.deductionDetails,
      ...action.payrollDetails.deductionDetails,
    },
    superannuationDetails: {
      ...state.payrollDetails.superannuationDetails,
      ...action.payrollDetails.superannuationDetails,
    },
    tax: {
      ...state.payrollDetails.tax,
      ...action.payrollDetails.tax,
    },
    wage: loadWagePayrollDetails(state.payrollDetails.wage, action.payrollDetails.wage),
    leaveDetails: {
      ...state.payrollDetails.leaveDetails,
      ...action.payrollDetails.leaveDetails,
    },
    employerExpenseDetails: {
      ...state.payrollDetails.employerExpenseDetails,
      ...action.payrollDetails.employerExpenseDetails,
    },
    standardPayDetails: {
      ...state.payrollDetails.standardPayDetails,
      ...action.payrollDetails.standardPayDetails,
    },
    payHistoryDetails: {
      ...state.payrollDetails.payHistoryDetails,
      ...action.payrollDetails.payHistoryDetails,
    },
  },
  paymentDetails: {
    ...state.paymentDetails,
    ...action.paymentDetails,
  },
  genderOptions: action.genderOptions,
  employmentBasisOptions: action.employmentBasisOptions,
  employmentCategoryOptions: action.employmentCategoryOptions,
  employmentStatusOptions: action.employmentStatusOptions,
  payslipDeliveryOptions: action.payslipDeliveryOptions,
  paymentMethodOptions: action.paymentMethodOptions,
  splitNetPayBetweenOptions: action.splitNetPayBetweenOptions,
  valueOptions: action.valueOptions,
  deductionPayItemOptions: action.deductionPayItemOptions,
  superFundOptions: action.superFundOptions,
  superPayItemOptions: action.superPayItemOptions,
  taxTableOptions: action.taxTableOptions,
  taxPayItemOptions: action.taxPayItemOptions,
  wagePayBasisOptions: action.wagePayBasisOptions,
  wagePayCycleOptions: action.wagePayCycleOptions,
  wageExpenseAccounts: action.wageExpenseAccounts,
  baseSalaryWagePayItemId: action.baseSalaryWagePayItemId,
  baseHourlyWagePayItemId: action.baseHourlyWagePayItemId,
  wagePayItems: action.wagePayItems,
  leavePayItemOptions: action.leavePayItemOptions,
  expensePayItemOptions: action.expensePayItemOptions,
  payHistoryPeriodOptions: action.payHistoryPeriodOptions,
});

const pageEdited = { isPageEdited: true };

const updateContactDetails = (state, action) => ({
  ...state,
  contactDetail: {
    ...state.contactDetail,
    [action.key]: action.value,
  },
  ...pageEdited,
});

const getAppliedFormatRestrictions = (currentText, text, length) => {
  const pattern = `^(?=.{0,${length}}$)^[a-zA-Z0-9 \\&\\*\\.\\/\\-]*`;
  const matchedText = text.match(pattern);

  return matchedText === null
    ? currentText
    : matchedText[0].toUpperCase();
};

const getUpdatedBankStatementText = (
  currentText,
  text,
) => getAppliedFormatRestrictions(currentText, text, 18);

const getUpdatedAccountName = (
  currentText,
  text,
) => getAppliedFormatRestrictions(currentText, text, 32);

const updatePaymentDetails = (state, action) => ({
  ...state,
  paymentDetails: {
    ...state.paymentDetails,
    [action.key]: ((action.key === 'bankStatementText')
      ? getUpdatedBankStatementText(state.paymentDetails.bankStatementText, action.value)
      : action.value),
  },
  ...pageEdited,
});

const updateBankAccountDetails = (state, action) => {
  const { bankAccounts } = state.paymentDetails;
  const bankAccount = state.paymentDetails.bankAccounts[action.index];
  const updatedBankAccount = {
    ...bankAccount,
    [action.key]: ((action.key === 'accountName')
      ? getUpdatedAccountName(bankAccount.accountName, action.value)
      : action.value),
  };

  const updatedBankAccounts = bankAccounts.map(
    (account, index) => ((index === action.index) ? updatedBankAccount : account),
  );

  return {
    ...state,
    paymentDetails: {
      ...state.paymentDetails,
      bankAccounts: updatedBankAccounts,
    },
    ...pageEdited,
  };
};

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const openModal = (state, action) => ({
  ...state,
  modal: action.modal,
});

const closeModal = state => ({
  ...state,
  modal: undefined,
});

const setPageEditedState = (state, action) => ({
  ...state,
  isPageEdited: action.isPageEdited,
});

const updatePayslipDelivery = (state, action) => ((
  ['ToBeEmailed', 'ToBePrintedAndEmailed'].includes(action.value)
  && shouldDefaultPayslipEmail(state))
  ? {
    ...state,
    payrollDetails: {
      ...state.payrollDetails,
      employmentDetails: {
        ...state.payrollDetails.employmentDetails,
        paySlipEmail: state.contactDetail.email,
        [action.key]: action.value,
      },
    },
    ...pageEdited,
  }
  : {
    ...state,
    payrollDetails: {
      ...state.payrollDetails,
      employmentDetails: {
        ...state.payrollDetails.employmentDetails,
        [action.key]: action.value,
      },
    },
    ...pageEdited,
  });

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_MAIN_TAB]: setMainTab,
  [SET_SUB_TAB]: setSubTab,
  [LOAD_EMPLOYEE_DETAIL]: loadEmployeeDetail,
  [UPDATE_CONTACT_DETAILS]: updateContactDetails,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_PAGE_EDITED_STATE]: setPageEditedState,
  [UPDATE_PAYROLL_EMPLOYMENT_DETAIL]: updatePayrollEmployeeDetail,
  [UPDATE_PAYROLL_EMPLOYMENT_PAYSLIP_DELIVERY]: updatePayslipDelivery,
  [UPDATE_PAYMENT_DETAILS]: updatePaymentDetails,
  [UPDATE_BANK_ACCOUNT_DETAILS]: updateBankAccountDetails,
  [ADD_PAYROLL_DEDUCTION_PAY_ITEM]: addPayrollDeductionPayItem,
  [REMOVE_PAYROLL_DEDUCTION_PAY_ITEM]: removePayrollDeductionPayItem,
  [UPDATE_PAYROLL_DETAILS_SUPERANNUATION_DETAILS]: updatePayrollDetailsSuperannuationDetails,
  [ADD_PAYROLL_SUPER_PAY_ITEM]: addPayrollSuperPayItem,
  [REMOVE_PAYROLL_SUPER_PAY_ITEM]: removePayrollSuperPayItem,
  [ADD_PAYROLL_TAX_PAY_ITEM]: addPayrollTaxPayItem,
  [REMOVE_PAYROLL_TAX_PAY_ITEM]: removePayrollTaxPayItem,
  [UPDATE_PAYROLL_TAX_DETAILS]: updatePayrollTaxDetail,
  [FORMAT_PAYROLL_TAX_AMOUNT]: formatAmountInput,
  [ADD_PAYROLL_WAGE_PAY_ITEM]: addPayrollWagePayItem,
  [REMOVE_PAYROLL_WAGE_PAY_ITEM]: removePayrollWagePayItem,
  [UPDATE_PAYROLL_WAGE_DETAILS]: updatePayrollWageDetail,
  [UPDATE_PAYROLL_WAGE_PAY_BASIS]: updatePayrollWagePayBasis,
  [UPDATE_PAYROLL_WAGE_HOURLY_RATE]: updatePayrollWageHourlyRate,
  [UPDATE_PAYROLL_WAGE_HOURS_IN_PAY_CYCLE]: updatePayrollWageHoursInPayCycle,
  [UPDATE_PAYROLL_WAGE_ANNUAL_SALARY]: updatePayrollWageAnnualSalary,
  [UPDATE_PAYROLL_WAGE_PAY_CYCLE]: updatePayrollWagePayCycle,
  [UPDATE_PAYROLL_WAGE_APPLIED_DETAILS]: updatePayrollWageAppliedDetails,
  [LOAD_PAYROLL_STANDARD_PAY_WAGE_AMOUNT_RULE]: loadPayrollStandardPayWageAmountRule,
  [SET_PAYROLL_STANDARD_PAY_DETAILS_INPUT]: setPayrollStandardPayDetailsItemInput,
  [SET_PAYROLL_STANDARD_PAY_ITEM_INPUT]: setPayrollStandardPayItemInput,
  [REMOVE_PAYROLL_STANDARD_PAY_ITEM]: removePayrollStandardPayItem,
  [SET_PAYROLL_PAY_HISTORY_FILTER_OPTIONS]: setPayrollPayHistoryFilterOptions,
  [SET_PAYROLL_PAY_HISTORY_ITEM_INPUT]: setPayrollPayHistoryItemInput,
  [FORMAT_PAYROLL_PAY_HISTORY_ITEM_INPUT]: formatPayrollPayHistoryItemInput,
  [OPEN_TAX_PAY_ITEM_MODAL]: openTaxPayItemModal,
  [CLOSE_TAX_PAY_ITEM_MODAL]: closeTaxPayItemModal,
  [SET_TAX_PAY_ITEM_MODAL_LOADING_STATE]: setTaxPayItemModalLoading,
  [LOAD_TAX_PAY_ITEM_MODAL]: loadTaxPayItemModal,
  [UPDATE_TAX_PAY_ITEM_MODAL_DETAILS]: updateTaxPayItemModalDetails,
  [SET_TAX_PAY_ITEM_MODAL_SUBMITTING_STATE]: setTaxPayItemModalSubmitting,
  [SET_TAX_PAY_ITEM_MODAL_ALERT_MESSAGE]: setTaxPayItemModalAlertMessage,
  [ADD_ALLOCATED_LEAVE_ITEM]: addAllocatedLeaveItem,
  [REMOVE_ALLOCATED_LEAVE_ITEM]: removeAllocatedLeaveItem,
  [UPDATE_ALLOCATED_LEAVE_ITEM_CARRY_OVER]: updateAllocatedLeaveItemCarryOver,
  [SET_EXPENSE_PAY_ITEM_MODAL_ALERT]: setExpensePayItemModalAlert,
  [CHANGE_EXPENSE_PAY_ITEM_MODAL_INPUT]: changeExpensePayItemModalInput,
  [FORMAT_EXPENSE_PAY_ITEM_MODAL_AMOUNT_INPUT]: formatExpensePayItemModalAmountInput,
  [ADD_EXPENSE_PAY_ITEM_MODAL_ALLOCATED_EMPLOYEE]: addExpensePayItemModalAllocatedEmployee,
  [REMOVE_EXPENSE_PAY_ITEM_MODAL_ALLOCATED_EMPLOYEE]: removeExpensePayItemModalAllocatedEmployee,
  [ADD_EXPENSE_PAY_ITEM_MODAL_EXEMPTION_PAY_ITEM]: addExpensePayItemModalExemptionPayItem,
  [REMOVE_EXPENSE_PAY_ITEM_MODAL_EXEMPTION_PAY_ITEM]: removeExpensePayItemModalExemptionPayItem,
  [OPEN_EXPENSE_PAY_ITEM_MODAL]: openExpensePayItemModal,
  [SET_EXPENSE_PAY_ITEM_MODAL_LOADING_STATE]: setExpensePayItemModalLoadingState,
  [LOAD_EXPENSE_PAY_ITEM_MODAL]: loadExpensePayItemModal,
  [CLOSE_EXPENSE_PAY_ITEM_MODAL]: closeExpensePayItemModal,
  [SET_EXPENSE_PAY_ITEM_MODAL_SUBMITTING_STATE]: setExpensePayItemModalSubmittingState,
  [CREATE_EXPENSE_PAY_ITEM_MODAL]: createExpensePayItemModal,
  [UPDATE_EXPENSE_PAY_ITEM_MODAL]: updateExpensePayItemModal,
  [ADD_PAYROLL_EXPENSE_PAY_ITEM]: addPayrollExpensePayItem,
  [REMOVE_PAYROLL_EXPENSE_PAY_ITEM]: removePayrollExpensePayItem,
  [OPEN_WAGE_PAY_ITEM_MODAL]: openWagePayItemModal,
  [SET_WAGE_PAY_ITEM_MODAL_LOADING_STATE]: setWagePayItemModalLoadingState,
  [SET_WAGE_PAY_ITEM_MODAL_SUBMITTING_STATE]: setWagePayItemModalSubmittingState,
  [LOAD_WAGE_PAY_ITEM_MODAL]: loadWagePayItemModal,
  [CLOSE_WAGE_PAY_ITEM_MODAL]: closeWagePayItemModal,
  [SET_WAGE_PAY_ITEM_MODAL_ALERT]: setWagePayItemModalAlert,
  [UPDATE_WAGE_PAY_ITEM_MODAL_DETAILS]: updateWagePayItemModalDetails,
  [UPDATE_WAGE_PAY_ITEM_MODAL_AMOUNT]: updateWagePayItemModalAmount,
  [UPDATE_WAGE_PAY_ITEM_MODAL_OVERRIDE_ACCOUNT]: updateWagePayItemModalOverrideAccount,
  [ADD_WAGE_PAY_ITEM_MODAL_EMPLOYEE]: addWagePayItemModalEmployee,
  [REMOVE_WAGE_PAY_ITEM_MODAL_EMPLOYEE]: removeWagePayItemModalEmployee,
  [ADD_WAGE_PAY_ITEM_MODAL_EXEMPTION]: addWagePayItemModalExemption,
  [REMOVE_WAGE_PAY_ITEM_MODAL_EXEMPTION]: removeWagePayItemModalExemption,
  [CREATE_WAGE_PAY_ITEM_MODAL]: createWagePayItemModal,
  [UPDATE_WAGE_PAY_ITEM_MODAL]: updateWagePayItemModal,
  [SET_ALLOCATED_LEAVE_ITEM_MODAL]: setAllocatedLeaveItemModal,
  [LOAD_DEDUCTION_PAY_ITEM_MODAL]: loadDeductionPayItemModal,
  [CREATE_DEDUCTION_PAY_ITEM_MODAL]: createDeductionPayItemModal,
  [UPDATE_DEDUCTION_PAY_ITEM_MODAL]: updateDeductionPayItemModal,
  [OPEN_DEDUCTION_PAY_ITEM_MODAL]: openDeductionPayItemModal,
  [CLOSE_DEDUCTION_PAY_ITEM_MODAL]: closeDeductionPayItemModal,
  [SET_DEDUCTION_PAY_ITEM_MODAL_LOADING_STATE]: setDeductionPayItemModalLoadingState,
  [SET_DEDUCTION_PAY_ITEM_MODAL_SUBMITTING_STATE]: setDeductionPayItemModalSubmittingState,
  [SET_DEDUCTION_PAY_ITEM_MODAL_ALERT]: setDeductionPayItemModalAlert,
  [SET_DEDUCTION_PAY_ITEM_MODAL_INPUT]: setDeductionPayItemModalInput,
  [FORMAT_DEDUCTION_PAY_ITEM_MODAL_AMOUNT_INPUT]: formatDeductionPayItemModalAmountInput,
  [ADD_DEDUCTION_PAY_ITEM_MODAL_ITEM]: addDeductionPayItemModalItem,
  [REMOVE_DEDUCTION_PAY_ITEM_MODAL_ITEM]: removeDeductionPayItemModalItem,
  [OPEN_SUPER_FUND_MODAL]: openSuperFundModal,
  [CLOSE_SUPER_FUND_MODAL]: closeSuperFundModal,
  [SET_SUPER_FUND_MODAL_LOADING_STATE]: setSuperFundModalLoadingState,
  [SET_SUPER_FUND_MODAL_SUBMITTING_STATE]: setSuperFundModalSubmittingState,
  [SET_SUPER_FUND_MODAL_ALERT_MESSAGE]: setSuperFundModalAlertMessage,
  [LOAD_NEW_SUPER_FUND]: loadSuperFundModal,
  [UPDATE_SUPER_FUND_DETAIL]: updateSuperFundDetail,
  [SET_ABN_LOADING_STATE]: setAbnLoadingState,
  [LOAD_ABN_DETAIL]: loadAbnDetail,
  [SET_ABN_STATUS]: setAbnStatus,
  [UPDATE_SELF_MANAGED_FUND_ABN]: updateSelfManagedFundAbn,
  [SELECT_APRA_FUND]: selectAPRAFund,
  [SHOW_CONTACT_DETAILS]: showContactDetails,
  [CREATE_SUPER_FUND]: saveSuperFundModal,
  [OPEN_SUPER_PAY_ITEM_MODAL]: openSuperPayItemModal,
  [CLOSE_SUPER_PAY_ITEM_MODAL]: closeSuperPayItemModal,
  [LOAD_SUPER_PAY_ITEM_MODAL]: loadSuperPayItemModal,
  [CREATE_SUPER_PAY_ITEM_MODAL]: createSuperPayItemModal,
  [UPDATE_SUPER_PAY_ITEM_MODAL]: updateSuperPayItemModal,
  [SET_SUPER_PAY_ITEM_MODAL_ALERT]: setSuperPayItemModalAlert,
  [SET_SUPER_PAY_ITEM_MODAL_LOADING_STATE]: setSuperPayItemModalLoadingState,
  [SET_SUPER_PAY_ITEM_MODAL_SUBMITTING_STATE]: setSuperPayItemModalSubmittingState,
  [SET_SUPER_PAY_ITEM_MODAL_SUPER_PAY_ITEM]: setSuperPayItemModalSuperPayItem,
  [SET_SUPER_PAY_ITEM_MODAL_INPUT]: setSuperPayItemModalInput,
  [ADD_SUPER_PAY_ITEM_MODAL_ITEM]: addSuperPayItemModalItem,
  [REMOVE_SUPER_PAY_ITEM_MODAL_ITEM]: removeSuperPayItemModalItem,
  [SET_LEAVE_PAY_ITEM_MODAL_ALERT]: setLeavePayItemModalAlert,
  [OPEN_LEAVE_PAY_ITEM_MODAL]: openLeavePayItemModal,
  [CLOSE_LEAVE_PAY_ITEM_MODAL]: closeLeavePayItemModal,
  [SET_LEAVE_PAY_ITEM_MODAL_LOADING_STATE]: setLeavePayItemModalLoadingState,
  [SET_LEAVE_PAY_ITEM_MODAL_SUBMITTING_STATE]: setLeavePayItemModalSubmittingState,
  [LOAD_LEAVE_PAY_ITEM]: loadLeavePayItem,
  [UPDATE_LEAVE_PAY_ITEM]: updateLeavePayItem,
  [CREATE_LEAVE_PAY_ITEM]: createLeavePayItem,
  [ADD_LEAVE_PAY_ITEM_MODAL_EMPLOYEE]: addLeavePayItemModalEmployee,
  [ADD_LEAVE_PAY_ITEM_MODAL_EXEMPTION]: addLeavePayItemModalExemption,
  [ADD_LEAVE_PAY_ITEM_MODAL_LINKED_WAGE]: addLeavePayItemModalLinkedWage,
  [REMOVE_LEAVE_PAY_ITEM_MODAL_EMPLOYEE]: removeLeavePayItemModalEmployee,
  [REMOVE_LEAVE_PAY_ITEM_MODAL_EXEMPTION]: removeLeavePayItemModalExemption,
  [REMOVE_LEAVE_PAY_ITEM_MODAL_LINKED_WAGE]: removeLeavePayItemModalLinkedWage,
  [UPDATE_LEAVE_PAY_ITEM_MODAL_NAME]: updateLeavePayItemModalName,
  [UPDATE_LEAVE_PAY_ITEM_MODAL_CALCULATION_BASIS]: updateLeavePayItemModalCalculationBasis,
  [UPDATE_LEAVE_PAY_ITEM_MODAL_CALCULATION_BASIS_AMOUNTS]:
    updateLeavePayItemModalCalculationBasisAmounts,
};

const employeeDetailReducer = createReducer(getDefaultState(), handlers);

export default employeeDetailReducer;
