import {
  LOAD_PAYDAY_USER_SESSION,
  SET_ALERT,
  SET_IS_BUSINESS_ONBOARDED,
  SET_LOADING_STATE,
  SET_TAB,
} from './PaydayFilingIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  eiSubmissionsHandlers,
  getEiSubmissionsDefaultState,
} from './eiSubmissions/EiSubmissionsReducer';
import { tabIds } from './TabItems';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';
import wrapHandlers from '../../../../store/wrapHandlers';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  alert: null,
  tab: '',
  userSession: null,
  [tabIds.eiSubmissions]: getEiSubmissionsDefaultState(),
});

const setValidTab = (tab) => {
  const validTabIds = Object.keys(tabIds);
  const isValidTab = validTabIds.includes(tab);

  return isValidTab ? tab : tabIds.eiSubmissions;
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

const setIsBusinessOnboarded = (state, { isBusinessOnboarded }) => ({
  ...state,
  isBusinessOnboarded,
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
  [SET_IS_BUSINESS_ONBOARDED]: setIsBusinessOnboarded,
  [LOAD_PAYDAY_USER_SESSION]: setUserSession,
  ...wrapHandlers(tabIds.eiSubmissions, eiSubmissionsHandlers),
};

const paydayFilingReducer = createReducer(getDefaultState(), handlers);

export default paydayFilingReducer;
