import * as intents from '../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import { tabIds } from './tabItems';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import employementDetailsReducer from './employmentDetails/employementDetailsReducer';
import leaveReducer from './leave/leaveReducer';
import personalDetailsNzTabReducer from './personalDetails/personalDetailsNzTabReducer';
import standardPayTabReducer from './standardPay/standardPayTabReducer';

// @TODO: LOAD DEFAULT LEAVE DETAILS
const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  alert: undefined,
  isPageEdited: false,
  isSubmitting: false,
  tabs: {
    main: tabIds.personalDetails,
  },
  personalDetail: {
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

const loadPersonalDetail = (state, payload) => ({
  ...state.personalDetail,
  ...payload.personalDetail,
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
  personalDetail: loadPersonalDetail(state, action.payload),
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
  personalDetail: loadPersonalDetail(state, action),
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

const setInitialState = (
  state = getDefaultState(),
  { context: { mainTab, ...params } }
) => ({
  ...state,
  ...params,
  tabs: {
    main: mainTab || state.tabs.main,
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
  ...personalDetailsNzTabReducer,
  ...employementDetailsReducer,
  ...standardPayTabReducer,
  ...leaveReducer,
};

const employeeDetailNzReducer = createReducer(getDefaultState(), handlers);

export default employeeDetailNzReducer;
