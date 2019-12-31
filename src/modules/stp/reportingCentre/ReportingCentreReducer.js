import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SET_ALERT, SET_LOADING_STATE, SET_TAB } from './ReportingCentreIntents';
import { tabIds } from './TabItems';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  isLoading: false,
  alert: null,
  tab: '',
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

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const setTab = (state, { tab }) => ({
  ...state,
  tab: setValidTab(tab),
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [SET_TAB]: setTab,
};

const reportingCentreReducer = createReducer(getDefaultState(), handlers);

export default reportingCentreReducer;
