import {
  ADD_RECEIVE_MONEY_LINE,
  CLOSE_MODAL,
  DELETE_RECEIVE_MONEY_LINE,
  GET_TAX_CALCULATIONS,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_CONTACT_OPTIONS,
  OPEN_MODAL,
  RESET_TOTALS,
  SET_ALERT,
  SET_CONTACT_LOADING_STATE,
  SET_CONTACT_OPTIONS_LOADING_STATE,
  SET_DUPLICATE_ID,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_VIEWED_ACCOUNT_TOOL_TIP_STATE,
  UPDATE_RECEIVE_MONEY_HEADER,
  UPDATE_RECEIVE_MONEY_LINE,
} from '../ReceiveMoneyIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getLoadReceiveMoneyIntent } from './selectors/integrationSelectors';
import { getTransactionListUrl } from './selectors/redirectSelectors';
import ModalType from '../ModalType';

const createReceiveMoneyDetailDispatcher = ({ store }) => ({
  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },
  dismissAlert: () => {
    store.dispatch({
      intent: SET_ALERT,
    });
  },
  setAlert: ({ type, message }) =>
    store.dispatch({ intent: SET_ALERT, alert: { type, message } }),
  closeModal: () => {
    store.dispatch({
      intent: CLOSE_MODAL,
    });
  },
  openUnsavedModal: (url) => {
    store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        type: ModalType.UNSAVED,
        url,
      },
    });
  },
  openDeleteModal: () => {
    const state = store.getState();
    const transactionListUrl = getTransactionListUrl(state);

    store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        type: ModalType.DELETE,
        url: transactionListUrl,
      },
    });
  },
  openCancelModal: () => {
    const state = store.getState();
    const transactionListUrl = getTransactionListUrl(state);
    store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        type: ModalType.CANCEL,
        url: transactionListUrl,
      },
    });
  },
  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },
  updateHeaderOptions: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_RECEIVE_MONEY_HEADER,
      key,
      value,
    });
  },
  updateReceiveMoneyLine: (lineIndex, lineKey, lineValue) => {
    store.dispatch({
      intent: UPDATE_RECEIVE_MONEY_LINE,
      lineIndex,
      lineKey,
      lineValue,
    });
  },
  addReceiveMoneyLine: () => {
    store.dispatch({
      intent: ADD_RECEIVE_MONEY_LINE,
    });
  },
  deleteReceiveMoneyLine: (index) => {
    store.dispatch({
      intent: DELETE_RECEIVE_MONEY_LINE,
      index,
    });
  },
  resetTotals: () => {
    store.dispatch({
      intent: RESET_TOTALS,
    });
  },
  getCalculatedTotals: ({ lines, totals }) => {
    store.dispatch({
      intent: GET_TAX_CALCULATIONS,
      lines,
      totals,
    });
  },
  loadReceiveMoney: (response) => {
    const intent = getLoadReceiveMoneyIntent(store.getState());

    store.dispatch({
      intent,
      ...response,
    });
  },
  loadAccountAfterCreate: (payload) =>
    store.dispatch({
      intent: LOAD_ACCOUNT_AFTER_CREATE,
      ...payload,
    }),
  setContactLoadingState: (isContactLoading) =>
    store.dispatch({
      intent: SET_CONTACT_LOADING_STATE,
      isContactLoading,
    }),
  loadContactAfterCreate: (payload) =>
    store.dispatch({
      intent: LOAD_CONTACT_AFTER_CREATE,
      ...payload,
    }),
  loadContactOptions: (payload) =>
    store.dispatch({
      intent: LOAD_CONTACT_OPTIONS,
      ...payload,
    }),
  setContactOptionsLoadingState: (isLoading) =>
    store.dispatch({
      intent: SET_CONTACT_OPTIONS_LOADING_STATE,
      isLoading,
    }),
  setDuplicateId: (duplicateId) =>
    store.dispatch({
      intent: SET_DUPLICATE_ID,
      duplicateId,
    }),
  setViewedAccountToolTip: (viewedAccountToolTip) =>
    store.dispatch({
      intent: SET_VIEWED_ACCOUNT_TOOL_TIP_STATE,
      viewedAccountToolTip,
    }),
});

export default createReceiveMoneyDetailDispatcher;
