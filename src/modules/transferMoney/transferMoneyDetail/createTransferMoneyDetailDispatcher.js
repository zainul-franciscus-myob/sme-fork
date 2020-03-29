import {
  CLOSE_MODAL,
  LOAD_NEW_TRANSFER_MONEY,
  LOAD_TRANSFER_MONEY_DETAIL,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_FORM,
} from '../TransferMoneyIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getIsCreating } from './transferMoneyDetailSelectors';

const createTransferMoneyDetailDispatcher = store => ({
  setLoadingState: (loadingState) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  },
  closeModal: () => {
    store.dispatch({
      intent: CLOSE_MODAL,
    });
  },
  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },
  updateForm: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_FORM,
      key,
      value,
    });
  },
  setAlert: (alert) => {
    store.dispatch({
      intent: SET_ALERT,
      alert,
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
  loadTransferMoney: (transferMoney) => {
    const intent = getIsCreating(store.getState())
      ? LOAD_NEW_TRANSFER_MONEY
      : LOAD_TRANSFER_MONEY_DETAIL;

    store.dispatch({
      intent,
      transferMoney,
    });
  },
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
});

export default createTransferMoneyDetailDispatcher;
