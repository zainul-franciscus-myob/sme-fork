import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { SET_ALERT, SET_LAST_LOADING_TAB, SET_TAB } from './TransactionListIntents';
import { tabItemIds } from './tabItems';
import createReducer from '../../store/createReducer';
import creditsAndDebitsHandlers from './creditAndDebitTransactions/creditsAndDebitsListReducer';
import getCreditsAndDebitsDefaultState from './creditAndDebitTransactions/getDefaultState';
import getJournalDefaultState from './journalTransaction/getDefaultState';
import journalHandlers from './journalTransaction/journalTransactionListReducer';
import wrapHandlers from '../../store/wrapHandlers';

const getDefaultState = () => ({
  activeTab: tabItemIds.debitsAndCredits,
  alert: undefined,
  region: undefined,
  businessId: undefined,
  lastLoadingTab: '',
  journalTransactions: getJournalDefaultState(),
  creditsAndDebitsTransactions: getCreditsAndDebitsDefaultState(),
});

const resetState = () => (getDefaultState());

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setTab = (state, action) => ({
  ...state,
  activeTab: action.tabId,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setLastLoadingTab = (state, { lastLoadingTab }) => ({
  ...state,
  lastLoadingTab,
});

const handlers = {
  [SET_TAB]: setTab,
  [SET_ALERT]: setAlert,
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LAST_LOADING_TAB]: setLastLoadingTab,
  ...wrapHandlers('journalTransactions', journalHandlers),
  ...wrapHandlers('creditsAndDebitsTransactions', creditsAndDebitsHandlers),
};

const transactionListReducer = createReducer(getDefaultState(), handlers);

export default transactionListReducer;
