import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PAYROLL_IS_SET_UP,
  SET_STP_REGISTRATION_STATUS,
  SET_TAB,
} from './ReportingCentreIntents';
import { tabIds } from './TabItems';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  alert: null,
  tab: '',
  status: '',
  agentAbn: '',
  agentNumber: '',
  payrollIsSetUp: true,
});

const setValidTab = (tab) => {
  const validTabIds = Object.keys(tabIds);
  const isValidTab = validTabIds.includes(tab);

  return isValidTab ? tab : tabIds.reports;
};

const setInitialState = (state, { context }) => {
  const contextTab = context.tab;
  return {
    ...state,
    ...context,
    tab: setValidTab(contextTab),
  };
};

const resetState = () => ({
  ...getDefaultState(),
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const setTab = (state, { tab }) => ({
  ...state,
  tab: setValidTab(tab),
});

const setRegistration = (state, { response }) => ({
  ...state,
  ...response,
});

const setPayrollIsSetUp = (state, { payrollIsSetUp }) => ({
  ...state,
  payrollIsSetUp,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [SET_TAB]: setTab,
  [SET_STP_REGISTRATION_STATUS]: setRegistration,
  [SET_PAYROLL_IS_SET_UP]: setPayrollIsSetUp,
};

const reportingCentreReducer = createReducer(getDefaultState(), handlers);

export default reportingCentreReducer;
