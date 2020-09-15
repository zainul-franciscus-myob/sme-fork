import {
  CLOSE_FINANCIAL_YEAR_MODAL,
  CLOSE_MODAL,
  DISCARD_TAB_DATA,
  LOAD_BUSINESS_SETTINGS,
  OPEN_FINANCIAL_YEAR_MODAL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_IS_FINANCIAL_YEAR_SETTINGS_CHANGED_STATE,
  SET_LOADING_STATE,
  SET_LOCK_DATE_AUTO_POPULATED_STATE,
  SET_PAGE_EDITED_STATE,
  SET_PENDING_TAB,
  SET_SUBMITTING_STATE,
  SET_TAB,
  START_LOADING_FINANCIAL_YEAR_MODAL,
  STOP_LOADING_FINANCIAL_YEAR_MODAL,
  UPDATE_BUSINESS_DETAILS,
  UPDATE_FINANCIAL_YEAR_SETTINGS,
  UPDATE_GST_SETTINGS,
  UPDATE_LOCK_DATE_DETAIL,
} from '../BusinessIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createBusinessSettingsDispatcher = (store) => ({
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
  setIsFinancialYearSettingsChangedState: (isFinancialYearSettingsChanged) => {
    store.dispatch({
      intent: SET_IS_FINANCIAL_YEAR_SETTINGS_CHANGED_STATE,
      isFinancialYearSettingsChanged,
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
  openModal: (url, modalType) => {
    store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        url,
        type: modalType,
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
  updateBusinessDetails: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_BUSINESS_DETAILS,
      key,
      value,
    });
  },
  updateGstSettings: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_GST_SETTINGS,
      key,
      value,
    });
  },
  updateFinancialYearSettings: ({ key, value }) => {
    store.dispatch({
      intent: UPDATE_FINANCIAL_YEAR_SETTINGS,
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
  loadBusinessSettings: ({
    businessDetails,
    gstSettings,
    pageTitle,
    financialYearOptions,
    openingBalanceYearOptions,
  }) => {
    store.dispatch({
      intent: LOAD_BUSINESS_SETTINGS,
      businessDetails,
      gstSettings,
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
  setPendingTab: (pendingTab) => {
    store.dispatch({
      intent: SET_PENDING_TAB,
      pendingTab,
    });
  },
  setTab: (selectedTab) => {
    store.dispatch({
      intent: SET_TAB,
      selectedTab,
    });
  },
  discardTabData: () => {
    store.dispatch({
      intent: DISCARD_TAB_DATA,
    });
  },
});

export default createBusinessSettingsDispatcher;
