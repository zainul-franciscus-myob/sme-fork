import {
  CLEAR_BANK_FEEDS_LOGIN,
  DELETE_BANK_FEED,
  LOAD_BANK_FEEDS,
  SET_ACCOUNT_TO_BE_DELETED,
  SET_ALERT,
  SET_IS_LOADING,
  SET_IS_SUBMITTING,
  SET_IS_TABLE_LOADING,
  SET_MODAL_TYPE,
  UPDATE_BANK_ACCOUNT_LINKED_ACCOUNT,
  UPDATE_BANK_FEEDS_LOGIN,
  UPDATE_CREDIT_CARD_LINKED_ACCOUNT,
} from './BankFeedsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import ModalTypes from './ModalTypes';

const createBankFeedsDispatcher = (store) => ({
  resetState: () => store.dispatch({ intent: RESET_STATE }),

  setInitialState: (context) =>
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    }),

  setLoadingState: (loadingState) =>
    store.dispatch({
      intent: SET_IS_LOADING,
      loadingState,
    }),

  setIsSubmitting: (isSubmitting) =>
    store.dispatch({
      intent: SET_IS_SUBMITTING,
      isSubmitting,
    }),

  setAlert: (alert) =>
    store.dispatch({
      intent: SET_ALERT,
      alert,
    }),

  dismissAlert: () =>
    store.dispatch({
      intent: SET_ALERT,
    }),

  openDeleteModal: () =>
    store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType: ModalTypes.DELETE,
    }),

  openBankFeedsLoginModal: () =>
    store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType: ModalTypes.BANK_FEEDS_LOGIN,
    }),

  closeModal: () =>
    store.dispatch({
      intent: SET_MODAL_TYPE,
    }),

  loadBankFeeds: (response) =>
    store.dispatch({
      intent: LOAD_BANK_FEEDS,
      ...response,
    }),

  updateBankAccountLinkedAccount: ({ key, value }) =>
    store.dispatch({
      intent: UPDATE_BANK_ACCOUNT_LINKED_ACCOUNT,
      key,
      value,
    }),

  updateCreditCardLinkedAccount: ({ key, value }) =>
    store.dispatch({
      intent: UPDATE_CREDIT_CARD_LINKED_ACCOUNT,
      key,
      value,
    }),

  setBankFeedAccountToBeDeleted: ({ bankFeedAccountType, bankFeedId }) =>
    store.dispatch({
      intent: SET_ACCOUNT_TO_BE_DELETED,
      bankFeedAccountType,
      bankFeedId,
    }),

  resetBankFeedAccountToBeDeleted: () =>
    store.dispatch({
      intent: SET_ACCOUNT_TO_BE_DELETED,
    }),

  deleteBankFeed: () =>
    store.dispatch({
      intent: DELETE_BANK_FEED,
    }),

  clearBankFeedsLogin: () =>
    store.dispatch({
      intent: CLEAR_BANK_FEEDS_LOGIN,
    }),

  updateBankFeedsLoginDetails: ({ key, value }) =>
    store.dispatch({
      intent: UPDATE_BANK_FEEDS_LOGIN,
      key,
      value,
    }),

  setIsTableLoading: (isTableLoading) =>
    store.dispatch({
      intent: SET_IS_TABLE_LOADING,
      isTableLoading,
    }),
});

export default createBankFeedsDispatcher;
