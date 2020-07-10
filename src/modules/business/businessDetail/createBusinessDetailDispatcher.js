import {
  CLOSE_FINANCIAL_YEAR_MODAL,
  CLOSE_MODAL,
  LOAD_BUSINESS_DETAIL,
  OPEN_FINANCIAL_YEAR_MODAL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_LOCK_DATE_AUTO_POPULATED_STATE,
  SET_PAGE_EDITED_STATE,
  SET_SUBMITTING_STATE,
  START_LOADING_FINANCIAL_YEAR_MODAL,
  STOP_LOADING_FINANCIAL_YEAR_MODAL,
  UPDATE_BUSINESS_DETAIL,
  UPDATE_LOCK_DATE_DETAIL,
} from '../BusinessIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createBusinessDetailDispatcher = (store) => ({
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
  setSubmittingState: (isSubmitting) => {
    store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  },
  setAlertMessage: (alert) => {
    store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alert,
    });
  },
  closeModal: () => {
    store.dispatch({
      intent: CLOSE_MODAL,
    });
  },
  openModal: (url) => {
    store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        url,
      },
    });
  },
  setPageEditedState: (isPageEdited) => {
    store.dispatch({
      intent: SET_PAGE_EDITED_STATE,
      isPageEdited,
    });
  },
  setIsLockDateAutoPopulated: (isLockDateAutoPopulated) => {
    store.dispatch({
      intent: SET_LOCK_DATE_AUTO_POPULATED_STATE,
      isLockDateAutoPopulated,
    });
  },
  updateBusinessDetail: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_BUSINESS_DETAIL,
      key,
      value,
    });
  },
  updateLockDateDetail: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_LOCK_DATE_DETAIL,
      key,
      value,
    });
  },
  loadBusinessDetail: ({
    businessDetails,
    pageTitle,
    financialYearOptions,
    openingBalanceYearOptions,
  }) => {
    store.dispatch({
      intent: LOAD_BUSINESS_DETAIL,
      businessDetails,
      pageTitle,
      financialYearOptions,
      openingBalanceYearOptions,
    });
  },
  openFinancialYearModal: () => {
    store.dispatch({
      intent: OPEN_FINANCIAL_YEAR_MODAL,
    });
  },
  closeFinancialYearModal: () => {
    store.dispatch({
      intent: CLOSE_FINANCIAL_YEAR_MODAL,
    });
  },
  startLoadingFinancialYearModal: () => {
    store.dispatch({
      intent: START_LOADING_FINANCIAL_YEAR_MODAL,
    });
  },
  stopLoadingFinancialYearModal: () => {
    store.dispatch({
      intent: STOP_LOADING_FINANCIAL_YEAR_MODAL,
    });
  },
});

export default createBusinessDetailDispatcher;
