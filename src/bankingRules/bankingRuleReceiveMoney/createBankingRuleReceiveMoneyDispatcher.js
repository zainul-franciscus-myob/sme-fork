import {
  ADD_TABLE_ROW,
  CHANGE_TABLE_ROW,
  FORMAT_AMOUNT,
  REMOVE_TABLE_ROW,
  SET_ALERT_MESSAGE,
  SET_IS_PAGE_EDITED,
  SET_LOADING_STATE,
  SET_MODAL_TYPE,
  UPDATE_FORM,
} from './BankingRuleReceiveMoneyIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';

const createBankingRuleReceiveMoneyDispatcher = store => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

  loadBankingRule: (intent, bankingRule) => {
    store.dispatch({
      intent,
      bankingRule,
    });
  },

  setModalType: (modalType) => {
    store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType,
    });
  },

  setIsPageEdited: (isPageEdited) => {
    store.dispatch({
      intent: SET_IS_PAGE_EDITED,
      isPageEdited,
    });
  },

  displayAlert: errorMessage => store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: errorMessage,
  }),

  dismissAlert: () => store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: '',
  }),

  setLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },

  addTableRow: (row) => {
    store.dispatch({
      intent: ADD_TABLE_ROW,
      row,
    });
  },

  changeTableRow: (index, key, value) => {
    store.dispatch({
      intent: CHANGE_TABLE_ROW,
      index,
      key,
      value,
    });
  },

  removeTableRow: (index) => {
    store.dispatch({
      intent: REMOVE_TABLE_ROW,
      index,
    });
  },

  formatAmount: (index) => {
    store.dispatch({
      intent: FORMAT_AMOUNT,
      index,
    });
  },

  updateForm: (key, value) => {
    store.dispatch({
      intent: UPDATE_FORM,
      key,
      value,
    });
  },
});

export default createBankingRuleReceiveMoneyDispatcher;
