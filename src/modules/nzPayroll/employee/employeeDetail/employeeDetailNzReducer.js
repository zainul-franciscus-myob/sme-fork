
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

const loadEmployeeDetail = (state, action) => ({
  ...state,
  loadingState: LoadingState.LOADING_SUCCESS,

  ...action.payload,
  contactDetail: loadContactDetail(state, action.payload),
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const updateEmployeeDetail = (state, action) => ({
  ...state,
  loadingState: LoadingState.LOADING_SUCCESS,
  contactDetail: loadContactDetail(state, action),
  payrollDetails: action.payrollDetails,
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

const closeModal = state => ({
  ...state,
  modal: undefined,
});

const setIsSubmitting = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setSavingState = (state) => ({
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

const setSubTab = (state, { mainTab, subTab }) => (
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
    : state
);

const setInitialState = (
  state = getDefaultState(),
  { context: { mainTab, subTab, ...params } },
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
  [intents.SET_LOADING_STATE]: setLoadingState,
  [intents.UPDATE_EMPLOYEE]: updateEmployeeDetail,
  [intents.UPDATE_EMPLOYEE_FAILED]: updateEmployeeFailed,
  [intents.SET_ALERT]: setAlert,
  [intents.DISMISS_ALERT]: dismissAlert,
  [intents.OPEN_MODAL]: openModal,
  [intents.CLOSE_MODAL]: closeModal,
  [intents.SET_SUBMITTING_STATE]: setIsSubmitting,
  [intents.SET_SAVING_STATE]: setSavingState,
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
