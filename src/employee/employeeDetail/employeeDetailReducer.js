import {
  CLOSE_MODAL,
  LOAD_EMPLOYEE_DETAIL,
  LOAD_NEW_EMPLOYEE_DETAIL,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MAIN_TAB,
  SET_PAGE_EDITED_STATE,
  SET_SUBMITTING_STATE,
  SET_SUB_TAB,
  UPDATE_CONTACT_DETAILS,
  UPDATE_PAYROLL_EMPLOYMENT_DETAIL,
  UPDATE_PAYROLL_EMPLOYMENT_PAYSLIP_DELIVERY,
} from '../EmployeeIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import { mainTabIds } from './tabItems';
import { shouldDefaultPayslipEmail } from './EmployeeDetailSelectors';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  isLoading: true,
  isSubmitting: false,
  isPageEdited: false,
  alert: undefined,
  modalType: '',
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
  },
  paymentDetails: {
    paymentMethod: '',
    splitPayBetween: '',
    bankStatementText: '',
    bankAccounts: [],
  },
  genderOptions: [],
  employeeBasisOptions: [],
  employeeCategoryOptions: [],
  employeeStatusOptions: [],
  payslipDeliveryOptions: [],
  paymentMethodOptions: [],
  splitNetPayBetweenOptions: [],
  valueOptions: [],
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setInitalState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => (getDefaultState());

const setMainTab = (state, action) => ((
  action.selectedTab === mainTabIds.payrollDetails && shouldDefaultPayslipEmail(state))
  ? {
    ...state,
    mainTab: action.selectedTab,
    payrollDetails: {
      employmentDetails: {
        ...state.payrollDetails.employmentDetails,
        paySlipEmail: state.contactDetail.email,
        [action.key]: action.value,
      },
    },
  } : {
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
  },
  paymentDetails: {
    ...state.paymentDetails,
    ...action.paymentDetails,
  },
  genderOptions: action.genderOptions,
  employeeBasisOptions: action.employeeBasisOptions,
  employeeCategoryOptions: action.employeeCategoryOptions,
  employeeStatusOptions: action.employeeStatusOptions,
  payslipDeliveryOptions: action.payslipDeliveryOptions,
  paymentMethodOptions: action.paymentMethodOptions,
  splitNetPayBetweenOptions: action.splitNetPayBetweenOptions,
  valueOptions: action.valueOptions,
});

const loadNewEmployeeDetail = (state, action) => ({
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
  },
  paymentDetails: {
    ...state.paymentDetails,
    ...action.paymentDetails,
  },
  genderOptions: action.genderOptions,
  employeeBasisOptions: action.employeeBasisOptions,
  employeeCategoryOptions: action.employeeCategoryOptions,
  employeeStatusOptions: action.employeeStatusOptions,
  payslipDeliveryOptions: action.payslipDeliveryOptions,
  paymentMethodOptions: action.paymentMethodOptions,
  splitNetPayBetweenOptions: action.splitNetPayBetweenOptions,
  valueOptions: action.valueOptions,
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
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
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
      employmentDetails: {
        ...state.payrollDetails.employmentDetails,
        paySlipEmail: state.contactDetail.email,
        [action.key]: action.value,
      },
    },
  }
  : {
    ...state,
    payrollDetails: {
      employmentDetails: {
        ...state.payrollDetails.employmentDetails,
        [action.key]: action.value,
      },
    },
  });

const updatePayrollEmployeeDetail = (state, action) => ({
  ...state,
  payrollDetails: {
    employmentDetails: {
      ...state.payrollDetails.employmentDetails,
      [action.key]: action.value,
    },
  },
});

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitalState,
  [RESET_STATE]: resetState,
  [SET_MAIN_TAB]: setMainTab,
  [SET_SUB_TAB]: setSubTab,
  [LOAD_EMPLOYEE_DETAIL]: loadEmployeeDetail,
  [UPDATE_CONTACT_DETAILS]: updateContactDetails,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT]: setAlert,
  [LOAD_NEW_EMPLOYEE_DETAIL]: loadNewEmployeeDetail,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_PAGE_EDITED_STATE]: setPageEditedState,
  [UPDATE_PAYROLL_EMPLOYMENT_DETAIL]: updatePayrollEmployeeDetail,
  [UPDATE_PAYROLL_EMPLOYMENT_PAYSLIP_DELIVERY]: updatePayslipDelivery,
};

const employeeDetailReducer = createReducer(getDefaultState(), handlers);

export default employeeDetailReducer;
