
import {
  LOAD_EMPLOYEE_DETAIL, SET_LOADING_STATE, SET_MAIN_TAB, SET_SUB_TAB,
} from '../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import { tabIds } from './tabItems';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
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

const setInitialState = (state = getDefaultState(), { context }) => ({
  ...state,
  ...context,
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

const setMainTab = (state, { mainTab }) => ({
  ...state,
  tabs: {
    ...state.tabs,
    main: mainTab,
  },
});

const setSubTab = (state, { mainTab, subTab }) => ({
  ...state,
  tabs: {
    ...state.tabs,
    subTabs: {
      ...state.tabs.subTabs,
      [mainTab]: subTab,
    },
  },
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_EMPLOYEE_DETAIL]: loadEmployeeDetail,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_MAIN_TAB]: setMainTab,
  [SET_SUB_TAB]: setSubTab,
};

const employeeDetailNzReducer = createReducer(getDefaultState(), handlers);

export default employeeDetailNzReducer;
