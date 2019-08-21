import {
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_IS_PAGE_EDITED,
  SET_LOADING_STATE,
  UPDATE_FORM,
} from './BankingRuleInvoiceIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';

const createBankingRuleInvoiceDispatcher = store => ({
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

  openModal: ({ type, url }) => {
    store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        type,
        url,
      },
    });
  },

  closeModal: () => {
    store.dispatch({
      intent: CLOSE_MODAL,
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

  updateForm: (key, value) => {
    store.dispatch({
      intent: UPDATE_FORM,
      key,
      value,
    });
  },
});

export default createBankingRuleInvoiceDispatcher;
