import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../SystemIntents';
import {
  SET_ALERT,
  SET_TAB,
} from './TransactionListIntents';
import { tabItemIds } from './tabItems';
import createReducer from '../store/createReducer';
import getJournalDefaultState from './journalTransaction/getDefaultState';
import journalHandlers from './journalTransaction/journalTransactionListReducer';
import wrapHandlers from '../store/wrapHandlers';

const getDefaultState = () => ({
  activeTab: tabItemIds.journal,
  alert: undefined,
  region: undefined,
  businessId: undefined,
  journalTransactions: getJournalDefaultState(),
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

const handlers = {
  [SET_TAB]: setTab,
  [SET_ALERT]: setAlert,
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  ...wrapHandlers('journalTransactions', journalHandlers),
};

const transactionListReducer = createReducer(getDefaultState(), handlers);

export default transactionListReducer;
