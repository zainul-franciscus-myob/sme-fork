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
} from '../EmployeeIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
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
  countryOptions: [],
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

const setMainTab = (state, action) => ({
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
  },
  paymentDetails: {
    ...state.paymentDetails,
    ...action.paymentDetails,
  },
  countryOptions: action.countryOptions,
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
  },
  paymentDetails: {
    ...state.paymentDetails,
    ...action.paymentDetails,
  },
  countryOptions: action.countryOptions,
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

const clearStateOrTerritoryIfCountryIsChanged = (oldState, newState) => {
  const oldCountryValue = oldState.contactDetail.country;
  const newCountryValue = newState.contactDetail.country;

  return oldCountryValue !== newCountryValue
    ? {
      ...newState,
      contactDetail: {
        ...newState.contactDetail,
        state: '',
      },
    }
    : newState;
};

const updateContactDetails = (state, action) => {
  let newState = {
    ...state,
    contactDetail: {
      ...state.contactDetail,
      [action.key]: action.value,
    },
    ...pageEdited,
  };

  newState = clearStateOrTerritoryIfCountryIsChanged(state, newState);

  return newState;
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
};

const employeeDetailReducer = createReducer(getDefaultState(), handlers);

export default employeeDetailReducer;
