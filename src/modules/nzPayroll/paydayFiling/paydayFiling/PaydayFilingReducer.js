import {
  LOAD_PAYDAY_USER_SESSION,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_TAB,
} from './PaydayFilingIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import { tabIds } from './TabItems';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  alert: null,
  tab: '',
  status: '',
  agentAbn: '',
  agentNumber: '',
  payrollIsSetUp: true,
  userSession: null,
});

const setValidTab = (tab) => {
  const validTabIds = Object.keys(tabIds);
  const isValidTab = validTabIds.includes(tab);

  return isValidTab ? tab : tabIds.submissionsList;
};

const setInitialState = (state, { context }) => {
  return {
    ...state,
    ...context,
    tab: setValidTab(context.tab),
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

const setUserSession = (state, { userSession }) => ({
  ...state,
  userSession,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [SET_TAB]: setTab,
  [LOAD_PAYDAY_USER_SESSION]: setUserSession,
};

const paydayFilingReducer = createReducer(getDefaultState(), handlers);

export default paydayFilingReducer;
