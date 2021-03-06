import {
  CHANGE_EMPLOYMENT_CLASSIFICATION_DETAIL,
  CHANGE_GENERAL_PAYROLL_INFORMATION,
  CHANGE_PAY_SLIP_EMAIL_DEFAULTS_FIELD,
  CLOSE_MODAL,
  LOAD_EMPLOYMENT_CLASSIFICATION_DETAIL,
  LOAD_EMPLOYMENT_CLASSIFICATION_LIST,
  LOAD_GENERAL_PAYROLL_INFORMATION,
  LOAD_NEW_EMPLOYMENT_CLASSIFICATION_DETAIL,
  LOAD_PAY_SLIP_EMAIL_DEFAULTS,
  LOAD_SUPER_FUND_LIST,
  OPEN_MODAL,
  RESET_EMPLOYMENT_CLASSIFICATION_LIST_FILTER_OPTIONS,
  RESET_SUPER_FUND_LIST_FILTER_OPTIONS,
  SET_ALERT,
  SET_EMPLOYMENT_CLASSIFICATION_DETAIL_ALERT,
  SET_EMPLOYMENT_CLASSIFICATION_DETAIL_INITIAL_STATE,
  SET_EMPLOYMENT_CLASSIFICATION_DETAIL_IS_LOADING,
  SET_EMPLOYMENT_CLASSIFICATION_LIST_FILTER_OPTIONS,
  SET_EMPLOYMENT_CLASSIFICATION_LIST_LOADING_STATE,
  SET_EMPLOYMENT_CLASSIFICATION_LIST_SORT_ORDER,
  SET_EMPLOYMENT_CLASSIFICATION_LIST_TABLE_LOADING_STATE,
  SET_GENERAL_PAYROLL_INFORMATION_LOADING_STATE,
  SET_IS_PAGE_EDITED,
  SET_IS_USE_TIMESHEETS_CHANGED,
  SET_MODAL_TYPE,
  SET_NEW_EMPLOYMENT_CLASSIFICATION_DETAIL_INITIAL_STATE,
  SET_PAY_SLIP_EMAIL_DEFAULTS_LOADING_STATE,
  SET_SUPER_FUND_LIST_FILTER_OPTIONS,
  SET_SUPER_FUND_LIST_LOADING_STATE,
  SET_SUPER_FUND_LIST_SORT_ORDER,
  SET_SUPER_FUND_LIST_TABLE_LOADING_STATE,
  SET_TAB,
  SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST,
  SORT_AND_FILTER_SUPER_FUND_LIST,
} from './PayrollSettingsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createPayrollSettingsDispatcher = (store) => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({
      intent,
      context,
    });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  setAlert: ({ message, type }) => {
    const intent = SET_ALERT;
    store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
  },

  dismissAlert: () => {
    const intent = SET_ALERT;
    store.dispatch({
      intent,
      alert: undefined,
    });
  },

  setModalType: (modalType) => {
    store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType,
    });
  },

  dismissModal: () => {
    store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType: '',
    });
  },

  closeModal: () => {
    store.dispatch({
      intent: CLOSE_MODAL,
    });
  },

  setTab: (selectedTab) => {
    const intent = SET_TAB;
    store.dispatch({
      intent,
      selectedTab,
    });
  },

  loadSuperFundList: (response) => {
    const intent = LOAD_SUPER_FUND_LIST;
    store.dispatch({
      intent,
      ...response,
    });
  },

  sortAndFilterSuperFundList: (response) => {
    const intent = SORT_AND_FILTER_SUPER_FUND_LIST;
    store.dispatch({
      intent,
      ...response,
    });
  },

  setSuperFundListFilterOptions: ({ key, value }) => {
    const intent = SET_SUPER_FUND_LIST_FILTER_OPTIONS;
    store.dispatch({
      intent,
      key,
      value,
    });
  },

  resetSuperFundListFilterOptions: () => {
    const intent = RESET_SUPER_FUND_LIST_FILTER_OPTIONS;
    store.dispatch({
      intent,
    });
  },

  setSuperFundListSortOrder: (orderBy, sortOrder) => {
    const intent = SET_SUPER_FUND_LIST_SORT_ORDER;
    store.dispatch({
      intent,
      orderBy,
      sortOrder,
    });
  },

  setSuperFundListLoadingState: (loadingState) => {
    const intent = SET_SUPER_FUND_LIST_LOADING_STATE;
    store.dispatch({
      intent,
      loadingState,
    });
  },

  setSuperFundListTableLoadingState: (isTableLoading) => {
    const intent = SET_SUPER_FUND_LIST_TABLE_LOADING_STATE;
    store.dispatch({
      intent,
      isTableLoading,
    });
  },

  setPaySlipEmailDefaultsLoadingState: (loadingState) => {
    const intent = SET_PAY_SLIP_EMAIL_DEFAULTS_LOADING_STATE;
    store.dispatch({
      intent,
      loadingState,
    });
  },

  loadPaySlipEmailDefaults: (response) => {
    const intent = LOAD_PAY_SLIP_EMAIL_DEFAULTS;
    store.dispatch({
      intent,
      response,
    });
  },

  changePaySlipEmailDefaultsField: ({ key, value }) => {
    const intent = CHANGE_PAY_SLIP_EMAIL_DEFAULTS_FIELD;
    store.dispatch({
      intent,
      key,
      value,
    });
  },

  loadEmploymentClassificationList: (response) => {
    const intent = LOAD_EMPLOYMENT_CLASSIFICATION_LIST;
    store.dispatch({
      intent,
      ...response,
    });
  },

  setEmploymentClassificationListLoadingState: (loadingState) => {
    const intent = SET_EMPLOYMENT_CLASSIFICATION_LIST_LOADING_STATE;
    store.dispatch({
      intent,
      loadingState,
    });
  },

  setEmploymentClassificationListTableLoadingState: (isTableLoading) => {
    const intent = SET_EMPLOYMENT_CLASSIFICATION_LIST_TABLE_LOADING_STATE;
    store.dispatch({
      intent,
      isTableLoading,
    });
  },

  sortAndFilterEmploymentClassificationList: (response) => {
    const intent = SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST;
    store.dispatch({
      intent,
      ...response,
    });
  },

  setEmploymentClassificationListFilterOptions: ({ key, value }) => {
    const intent = SET_EMPLOYMENT_CLASSIFICATION_LIST_FILTER_OPTIONS;
    store.dispatch({
      intent,
      key,
      value,
    });
  },

  resetEmploymentClassificationListFilterOptions: () => {
    const intent = RESET_EMPLOYMENT_CLASSIFICATION_LIST_FILTER_OPTIONS;
    store.dispatch({
      intent,
    });
  },

  setEmploymentClassificationListSortOrder: (orderBy, sortOrder) => {
    const intent = SET_EMPLOYMENT_CLASSIFICATION_LIST_SORT_ORDER;
    store.dispatch({
      intent,
      orderBy,
      sortOrder,
    });
  },

  changeEmploymentClassificationDetail: ({ key, value }) => {
    store.dispatch({
      intent: CHANGE_EMPLOYMENT_CLASSIFICATION_DETAIL,
      key,
      value,
    });
  },

  setEmploymentClassificationDetailInitialState: (context) => {
    store.dispatch({
      intent: SET_EMPLOYMENT_CLASSIFICATION_DETAIL_INITIAL_STATE,
      context,
    });
  },

  setNewEmploymentClassificationDetailInitialState: () => {
    store.dispatch({
      intent: SET_NEW_EMPLOYMENT_CLASSIFICATION_DETAIL_INITIAL_STATE,
    });
  },

  setEmploymentClassificationDetailIsLoading: (isLoading) => {
    store.dispatch({
      intent: SET_EMPLOYMENT_CLASSIFICATION_DETAIL_IS_LOADING,
      isLoading,
    });
  },

  setEmploymentClassificationDetailAlert: (alert) => {
    store.dispatch({
      intent: SET_EMPLOYMENT_CLASSIFICATION_DETAIL_ALERT,
      alert,
    });
  },

  dismissEmploymentClassificationDetailAlert: () => {
    store.dispatch({
      intent: SET_EMPLOYMENT_CLASSIFICATION_DETAIL_ALERT,
      alert: '',
    });
  },

  loadNewEmploymentClassificationDetail: (employmentClassification) => {
    store.dispatch({
      intent: LOAD_NEW_EMPLOYMENT_CLASSIFICATION_DETAIL,
      employmentClassification,
    });
  },

  loadEmploymentClassificationDetail: (employmentClassification) => {
    store.dispatch({
      intent: LOAD_EMPLOYMENT_CLASSIFICATION_DETAIL,
      employmentClassification,
    });
  },

  setGeneralPayrollInformationLoadingState: (loadingState) => {
    const intent = SET_GENERAL_PAYROLL_INFORMATION_LOADING_STATE;
    store.dispatch({
      intent,
      loadingState,
    });
  },

  loadGeneralPayrollInformation: (generalPayrollInformation) => {
    store.dispatch({
      intent: LOAD_GENERAL_PAYROLL_INFORMATION,
      generalPayrollInformation,
    });
  },

  changeGeneralPayrollInformation: ({ key, value }) => {
    store.dispatch({
      intent: CHANGE_GENERAL_PAYROLL_INFORMATION,
      key,
      value,
    });
  },

  changeUseTimesheets: ({ key, value }) => {
    store.dispatch({
      intent: CHANGE_GENERAL_PAYROLL_INFORMATION,
      key,
      value,
    });
    store.dispatch({
      intent: SET_IS_USE_TIMESHEETS_CHANGED,
      isUseTimesheetsChanged: true,
    });
  },

  openModal: ({ type, url, year }) => {
    store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        type,
        url,
        year,
      },
    });
  },

  setIsPageEdited: (isPageEdited) => {
    store.dispatch({
      intent: SET_IS_PAGE_EDITED,
      isPageEdited,
    });
  },
});

export default createPayrollSettingsDispatcher;
