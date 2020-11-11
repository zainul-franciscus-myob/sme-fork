import * as intents from '../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import { tabIds } from './tabItems';
import LoadingState from '../../../../components/PageView/LoadingState';
import contactDetailsNzTabReducer from './contactDetails/contactDetailsNzTabReducer';
import createReducer from '../../../../store/createReducer';
import employementDetailsReducer from './employmentDetails/employementDetailsReducer';
import leaveReducer from './leave/leaveReducer';
import salaryAndWageReducer from './salaryAndWages/salaryAndWageReducer';
import taxAndKiwiSaverReducer from './taxAndKiwiSaver/taxAndKiwiSaverReducer';

// @TODO: LOAD DEFAULT LEAVE DETAILS
const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  alert: undefined,
  isPageEdited: false,
  isSubmitting: false,
  tabs: {
    main: tabIds.contactDetails,
    subTabs: {
      [tabIds.payrollDetails]: tabIds.employmentDetails,
    },
  },
  contactDetail: {
    firstName: '',
    lastName: '',
    isInactive: false,
    employeeNumber: '',
    country: '',
    address: '',
    suburb: '',
    state: '',
    postcode: '',
    phoneNumbers: [],
    email: '',
    notes: '',
  },
  payrollDetails: {
    employmentDetails: {
      dateOfBirth: '',
      gender: 'NotSet',
      startDate: '',
      terminationDate: '',
      employmentBasis: '',
      employmentCategory: '',
      employmentStatus: '',
      paySlipDelivery: '',
      paySlipEmail: '',
    },
  },
});

const resetState = () => getDefaultState();

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const dismissAlert = (state) => ({
  ...state,
  alert: undefined,
});

const loadContactDetail = (state, payload) => ({
  ...state.contactDetail,
  ...payload.contactDetail,
});

// @TODO: LOAD DEFAULT LEAVE DETAILS
const loadPayrollDetail = (state, payload) => ({
  ...state.payrollDetails,
  ...payload.payrollDetails,
  employmentDetails: {
    ...state.payrollDetails.employmentDetails,
    ...payload.payrollDetails.employmentDetails,
  },
});

const loadEmployeeDetail = (state, action) => ({
  ...state,
  loadingState: LoadingState.LOADING_SUCCESS,

  ...action.payload,
  contactDetail: loadContactDetail(state, action.payload),
  payrollDetails: loadPayrollDetail(state, action.payload),
});

const loadingEmployeeDetail = (state) => ({
  ...state,
  isSubmitting: true,
});

const loadEmployeeDetailFailed = (state) => ({
  ...state,
  loadingState: LoadingState.LOADING_FAIL,
});

const updateEmployeeDetails = (state, action) => ({
  ...state,
  contactDetail: loadContactDetail(state, action),
  payrollDetails: loadPayrollDetail(state, action),
  loadingState: LoadingState.LOADING_SUCCESS,
  alert: { type: 'success', message: action.message },
  isPageEdited: false,
  isSubmitting: false,
});

const updateEmployeeFailed = (state, action) => ({
  ...state,
  loadingState: LoadingState.LOADING_SUCCESS,
  isSubmitting: false,
  alert: { type: 'danger', message: action.message },
});

const openModal = (state, action) => ({
  ...state,
  modal: action.modal,
});

const closeModal = (state) => ({
  ...state,
  modal: undefined,
});

const deletingEmployee = (state) => ({
  ...state,
  isSubmitting: true,
});

const deleteEmployeeFailed = (state, action) => ({
  ...state,
  isSubmitting: false,
  alert: { type: 'danger', message: action.message },
});

const updatingEmployeeDetails = (state) => ({
  ...state,
  isSubmitting: true,
  loadingState: LoadingState.LOADING,
  modal: undefined,
});

const setMainTab = (state, { mainTab }) => ({
  ...state,
  tabs: {
    ...state.tabs,
    main: mainTab,
  },
});

const setSubTab = (state, { mainTab, subTab }) =>
  mainTab && subTab
    ? {
        ...state,
        tabs: {
          ...state.tabs,
          subTabs: {
            ...state.tabs.subTabs,
            [mainTab]: subTab,
          },
        },
      }
    : state;

const setInitialState = (
  state = getDefaultState(),
  { context: { mainTab, subTab, ...params } }
) => ({
  ...state,
  ...params,
  tabs: {
    main: mainTab || state.tabs.main,
    subTabs: setSubTab(state, { mainTab, subTab }).tabs.subTabs,
  },
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [intents.LOAD_EMPLOYEE_DETAIL]: loadEmployeeDetail,
  [intents.LOADING_EMPLOYEE_DETAIL]: loadingEmployeeDetail,
  [intents.LOAD_EMPLOYEE_DETAIL_FAILED]: loadEmployeeDetailFailed,
  [intents.UPDATE_EMPLOYEE]: updateEmployeeDetails,
  [intents.UPDATE_EMPLOYEE_FAILED]: updateEmployeeFailed,
  [intents.SET_ALERT]: setAlert,
  [intents.DISMISS_ALERT]: dismissAlert,
  [intents.OPEN_DELETE_MODAL]: openModal,
  [intents.OPEN_UNSAVED_MODAL]: openModal,
  [intents.CLOSE_MODAL]: closeModal,
  [intents.DELETING_EMPLOYEE]: deletingEmployee,
  [intents.DELETE_EMPLOYEE_FAILED]: deleteEmployeeFailed,
  [intents.UPDATING_EMPLOYEE]: updatingEmployeeDetails,
  [intents.SET_MAIN_TAB]: setMainTab,
  [intents.SET_SUB_TAB]: setSubTab,
  ...contactDetailsNzTabReducer,
  ...employementDetailsReducer,
  ...salaryAndWageReducer,
  ...leaveReducer,
  ...taxAndKiwiSaverReducer,
};

const employeeDetailNzReducer = createReducer(getDefaultState(), handlers);

export default employeeDetailNzReducer;
