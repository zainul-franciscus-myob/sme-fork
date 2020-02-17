import {
  CLOSE_MODAL,
  LOAD_EMPLOYEE_DETAIL,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MAIN_TAB,
  SET_PAGE_EDITED_STATE,
  SET_SUBMITTING_STATE,
  SET_SUB_TAB,
  UPDATE_EMPLOYEE,
  UPDATE_PAYROLL_EMPLOYMENT_PAYSLIP_DELIVERY,
} from '../EmployeeIntents';
import { PayrollWageReducerHandlers, loadWagePayrollDetails } from './payrollDetails/reducer/PayrollWageReducer';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getCurrentMonth } from './payrollDetails/selectors/PayrollPayHistorySelectors';
import { getIsCreating } from './EmployeeDetailSelectors';
import { mainTabIds } from './tabItems';
import { shouldDefaultPayslipEmail } from './payrollDetails/selectors/EmploymentDetailsSelectors';
import DeductionPayItemModalReducerHandlers from './payrollDetails/reducer/DeductionPayItemModalReducer';
import ExpensePayItemModalReducerHandlers from './payrollDetails/reducer/ExpensePayItemModalReducer';
import LeavePayItemModalReducerHandlers from './payrollDetails/reducer/LeavePayItemModalReducer';
import LoadingState from '../../../components/PageView/LoadingState';
import PayrollDetailReducerHandlers from './payrollDetails/reducer/PayrollDetailReducer';
import PayrollExpenseReducerHandlers from './payrollDetails/reducer/PayrollExpenseReducer';
import PayrollPayHistoryReducerHandlers from './payrollDetails/reducer/PayrollPayHistoryReducer';
import PayrollStandardPayReducerHandlers from './payrollDetails/reducer/PayrollStandardPayReducer';
import PayrollSuperReducerHandlers from './payrollDetails/reducer/PayrollSuperReducer';
import PayrollTaxReducerHandlers from './payrollDetails/reducer/PayrollTaxReducer';
import SuperFundModalReducerHandlers from './payrollDetails/reducer/SuperFundModalReducer';
import SuperPayItemModalReducerHandlers from './payrollDetails/reducer/SuperPayItemModalReducer';
import WagePayItemModalReducerHandlers from './payrollDetails/reducer/WagePayItemModalReducer';
import contactDetailTabHandlers from './contactDetails/contactDetailTabReducer';
import createReducer from '../../../store/createReducer';
import paymentDetailTabHandlers from './paymentDetails/paymentDetailTabReducer';

export const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  isSubmitting: false,
  isPageEdited: false,
  isPayrollSetup: true,
  alert: undefined,
  modal: undefined,
  mainTab: '',
  subTab: '',
  showAddPayItemButton: true,
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
      taxFileNumberStatusOptions: [],
      taxFileNumberStatus: '',
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

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
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
    showAddPayItemButton: true,
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
    showAddPayItemButton: true,
    mainTab: action.selectedTab,
  });

const setSubTab = (state, action) => ({
  ...state,
  subTab: action.selectedTab,
  showAddPayItemButton: true,
});

const loadContactDetail = (state, action) => ({
  ...state.contactDetail,
  ...action.contactDetail,
});

const loadPayrollDetail = (state, action) => ({
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
    selectedSuperFundId: getIsCreating(state)
      ? action.payrollDetails.superannuationDetails.defaultSuperannuationFundId
      : action.payrollDetails.superannuationDetails.selectedSuperFundId,
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
});

const loadPaymentDetail = (state, action) => ({
  ...state.paymentDetails,
  ...action.paymentDetails,
});

const loadEmployeeDetail = (state, action) => (action.isPayrollSetup ? {
  ...state,
  contactDetail: loadContactDetail(state, action),
  payrollDetails: loadPayrollDetail(state, action),
  paymentDetails: loadPaymentDetail(state, action),
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
} : {
  ...state,
  isPayrollSetup: false,
});

const updateEmployeeDetail = (state, action) => ({
  ...state,
  contactDetail: loadContactDetail(state, action),
  payrollDetails: loadPayrollDetail(state, action),
  paymentDetails: loadPaymentDetail(state, action),
});

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

// This is here as it crosses the main tab boundaries.
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
    isPageEdited: true,
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
    isPageEdited: true,
  });

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_MAIN_TAB]: setMainTab,
  [SET_SUB_TAB]: setSubTab,
  [LOAD_EMPLOYEE_DETAIL]: loadEmployeeDetail,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_PAGE_EDITED_STATE]: setPageEditedState,
  [UPDATE_PAYROLL_EMPLOYMENT_PAYSLIP_DELIVERY]: updatePayslipDelivery,
  [UPDATE_EMPLOYEE]: updateEmployeeDetail,
  ...DeductionPayItemModalReducerHandlers,
  ...ExpensePayItemModalReducerHandlers,
  ...LeavePayItemModalReducerHandlers,
  ...PayrollDetailReducerHandlers,
  ...PayrollWageReducerHandlers,
  ...PayrollExpenseReducerHandlers,
  ...PayrollPayHistoryReducerHandlers,
  ...PayrollStandardPayReducerHandlers,
  ...PayrollSuperReducerHandlers,
  ...PayrollTaxReducerHandlers,
  ...SuperFundModalReducerHandlers,
  ...SuperPayItemModalReducerHandlers,
  ...WagePayItemModalReducerHandlers,
  ...contactDetailTabHandlers,
  ...paymentDetailTabHandlers,
};

const employeeDetailReducer = createReducer(getDefaultState(), handlers);

export default employeeDetailReducer;
