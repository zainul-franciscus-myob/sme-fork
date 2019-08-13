import {
  ADD_ALLOCATED_LEAVE_ITEM,
  ADD_DEDUCTION_PAY_ITEM_MODAL_ITEM,
  ADD_PAYROLL_DEDUCTION_PAY_ITEM,
  ADD_PAYROLL_SUPER_PAY_ITEM,
  ADD_PAYROLL_TAX_PAY_ITEM,
  ADD_PAYROLL_WAGE_PAY_ITEM,
  CLOSE_DEDUCTION_PAY_ITEM_MODAL,
  CLOSE_MODAL,
  CLOSE_TAX_PAY_ITEM_MODAL,
  CREATE_DEDUCTION_PAY_ITEM_MODAL,
  FORMAT_DEDUCTION_PAY_ITEM_MODAL_AMOUNT_INPUT,
  FORMAT_PAYROLL_TAX_AMOUNT,
  LOAD_DEDUCTION_PAY_ITEM_MODAL,
  LOAD_EMPLOYEE_DETAIL,
  LOAD_TAX_PAY_ITEM_MODAL,
  OPEN_DEDUCTION_PAY_ITEM_MODAL,
  OPEN_MODAL,
  OPEN_TAX_PAY_ITEM_MODAL,
  REMOVE_ALLOCATED_LEAVE_ITEM,
  REMOVE_DEDUCTION_PAY_ITEM_MODAL_ITEM,
  REMOVE_PAYROLL_DEDUCTION_PAY_ITEM,
  REMOVE_PAYROLL_SUPER_PAY_ITEM,
  REMOVE_PAYROLL_TAX_PAY_ITEM,
  REMOVE_PAYROLL_WAGE_PAY_ITEM,
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
  UPDATE_PAYROLL_WAGE_ANNUAL_SALARY,
  UPDATE_PAYROLL_WAGE_DETAILS,
  UPDATE_PAYROLL_WAGE_HOURLY_RATE,
  UPDATE_PAYROLL_WAGE_HOURS_IN_PAY_CYCLE,
  UPDATE_PAYROLL_WAGE_PAY_BASIS,
  UPDATE_PAYROLL_WAGE_PAY_CYCLE,
  UPDATE_TAX_PAY_ITEM_MODAL_DETAILS,
} from '../../EmployeeIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  addAllocatedLeaveItem,
  addPayrollDeductionPayItem,
  removeAllocatedLeaveItem,
  removePayrollDeductionPayItem,
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
  addPayrollSuperPayItem,
  removePayrollSuperPayItem,
  updatePayrollDetailsSuperannuationDetails,
} from './PayrollSuperReducer';
import {
  addPayrollTaxPayItem, closeTaxPayItemModal,
  formatAmountInput,
  loadTaxPayItemModal, openTaxPayItemModal,
  removePayrollTaxPayItem, setTaxPayItemModalAlertMessage,
  setTaxPayItemModalLoading, setTaxPayItemModalSubmitting,
  updatePayrollTaxDetail,
  updateTaxPayItemModalDetails,
} from './PayrollTaxReducer';
import {
  addPayrollWagePayItem,
  loadWagePayrollDetails,
  removePayrollWagePayItem,
  updatePayrollWageAnnualSalary,
  updatePayrollWageDetail,
  updatePayrollWageHourlyRate,
  updatePayrollWageHoursInPayCycle,
  updatePayrollWagePayBasis,
  updatePayrollWagePayCycle,
} from './PayrollWageReducer';
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
  taxPayItemModal: undefined,
  deductionPayItemModal: undefined,
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
};

const employeeDetailReducer = createReducer(getDefaultState(), handlers);

export default employeeDetailReducer;
