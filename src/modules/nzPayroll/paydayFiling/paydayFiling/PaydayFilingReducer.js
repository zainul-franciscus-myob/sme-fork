import {
  CLOSE_REMOVE_AUTHORISATION_MODAL,
  LOAD_PAYDAY_USER_SESSION,
  OPEN_REMOVE_AUTHORISATION_MODAL,
  SET_ALERT,
  SET_ARE_MULTIPLE_USERS_ONBOARDED,
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
  removeAuthorisationModalIsOpen: false,
  areMultipleUsersOnboarded: false,
  authorisation: '',
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

const setMultipleUsersOnboarded = (state, { areMultipleUsersOnboarded }) => ({
  ...state,
  areMultipleUsersOnboarded,
});

const setUserSession = (state, { userSession }) => ({
  ...state,
  userSession,
});

const openRemoveAuthorisationModal = (state) => ({
  ...state,
  removeAuthorisationModalIsOpen: true,
});

const closeRemoveAuthorisationModal = (state) => ({
  ...state,
  removeAuthorisationModalIsOpen: false,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [SET_TAB]: setTab,
  [SET_IS_BUSINESS_ONBOARDED]: setIsBusinessOnboarded,
  [SET_ARE_MULTIPLE_USERS_ONBOARDED]: setMultipleUsersOnboarded,
  [LOAD_PAYDAY_USER_SESSION]: setUserSession,
  ...wrapHandlers(tabIds.eiSubmissions, eiSubmissionsHandlers),
  [OPEN_REMOVE_AUTHORISATION_MODAL]: openRemoveAuthorisationModal,
  [CLOSE_REMOVE_AUTHORISATION_MODAL]: closeRemoveAuthorisationModal,
};

const paydayFilingReducer = createReducer(getDefaultState(), handlers);

export default paydayFilingReducer;
