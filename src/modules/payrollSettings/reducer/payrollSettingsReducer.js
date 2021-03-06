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
} from '../PayrollSettingsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  changeEmploymentClassificationDetail,
  loadEmploymentClassificationDetail,
  loadNewEmploymentClassificationDetail,
  setEmploymentClassificationDetailAlert,
  setEmploymentClassificationDetailIsLoading,
  setEmploymentClassificationInitialState,
  setNewEmploymentClassificationInitialState,
} from './employmentClassificationDetailReducer';
import {
  changePaySlipEmailDefaultsField,
  loadPaySlipEmailDefaults,
  setPaySlipEmailDefaultsLoadingState,
} from './paySlipEmailDefaultsReducer';
import {
  loadEmploymentClassificationList,
  resetEmploymentClassificationListFilterOption,
  setEmploymentClassificationListFilterOption,
  setEmploymentClassificationListLoadingState,
  setEmploymentClassificationListSortOrder,
  setEmploymentClassificationListTableLoadingState,
  sortAndFilterEmploymentClassificationList,
} from './employmentClassificationListReducer';
import {
  loadSuperFundList,
  resetSuperFundListFilterOption,
  setSuperFundListFilterOption,
  setSuperFundListLoadingState,
  setSuperFundListSortOrder,
  setSuperFundListTableLoadingState,
  sortAndFilterSuperFundList,
} from './superFundListReducer';
import createReducer from '../../../store/createReducer';
import getDefaultState from './getDefaultState';

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => getDefaultState();

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setTab = (state, action) => ({
  ...state,
  tab: action.selectedTab,
});

const setModalType = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const openModal = (state, action) => ({
  ...state,
  modal: action.modal,
});

const closeModal = (state) => ({
  ...state,
  modal: undefined,
});

const setIsPageEdited = (state, action) => ({
  ...state,
  isPageEdited: action.isPageEdited,
});

const changeGeneralPayrollInformation = (state, action) => ({
  ...state,
  generalPayrollInformation: {
    ...state.generalPayrollInformation,
    [action.key]: action.value,
  },
  isPageEdited: true,
});

const setIsUseTimesheetsChanged = (state, action) => ({
  ...state,
  generalPayrollInformation: {
    ...state.generalPayrollInformation,
    isUseTimesheetsChanged: action.isUseTimesheetsChanged,
  },
});

export const loadGeneralPayrollInformation = (state, action) => ({
  ...state,
  generalPayrollInformation: {
    ...state.generalPayrollInformation,
    ...action.generalPayrollInformation,
  },
});

export const setGeneralPayrollInformationIsLoading = (
  state,
  { loadingState }
) => ({
  ...state,
  generalPayrollInformation: {
    ...state.generalPayrollInformation,
    loadingState,
  },
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_ALERT]: setAlert,
  [SET_TAB]: setTab,
  [SET_MODAL_TYPE]: setModalType,
  [LOAD_SUPER_FUND_LIST]: loadSuperFundList,
  [SORT_AND_FILTER_SUPER_FUND_LIST]: sortAndFilterSuperFundList,
  [SET_SUPER_FUND_LIST_FILTER_OPTIONS]: setSuperFundListFilterOption,
  [RESET_SUPER_FUND_LIST_FILTER_OPTIONS]: resetSuperFundListFilterOption,
  [SET_SUPER_FUND_LIST_SORT_ORDER]: setSuperFundListSortOrder,
  [SET_SUPER_FUND_LIST_LOADING_STATE]: setSuperFundListLoadingState,
  [SET_SUPER_FUND_LIST_TABLE_LOADING_STATE]: setSuperFundListTableLoadingState,
  [LOAD_EMPLOYMENT_CLASSIFICATION_LIST]: loadEmploymentClassificationList,
  [SET_EMPLOYMENT_CLASSIFICATION_LIST_LOADING_STATE]: setEmploymentClassificationListLoadingState,
  [SET_EMPLOYMENT_CLASSIFICATION_LIST_FILTER_OPTIONS]: setEmploymentClassificationListFilterOption,
  [RESET_EMPLOYMENT_CLASSIFICATION_LIST_FILTER_OPTIONS]: resetEmploymentClassificationListFilterOption,
  [SORT_AND_FILTER_EMPLOYMENT_CLASSIFICATION_LIST]: sortAndFilterEmploymentClassificationList,
  [SET_EMPLOYMENT_CLASSIFICATION_DETAIL_INITIAL_STATE]: setEmploymentClassificationInitialState,
  [SET_NEW_EMPLOYMENT_CLASSIFICATION_DETAIL_INITIAL_STATE]: setNewEmploymentClassificationInitialState,
  [SET_EMPLOYMENT_CLASSIFICATION_LIST_TABLE_LOADING_STATE]: setEmploymentClassificationListTableLoadingState,
  [SET_EMPLOYMENT_CLASSIFICATION_LIST_SORT_ORDER]: setEmploymentClassificationListSortOrder,
  [SET_EMPLOYMENT_CLASSIFICATION_DETAIL_IS_LOADING]: setEmploymentClassificationDetailIsLoading,
  [SET_EMPLOYMENT_CLASSIFICATION_DETAIL_ALERT]: setEmploymentClassificationDetailAlert,
  [LOAD_NEW_EMPLOYMENT_CLASSIFICATION_DETAIL]: loadNewEmploymentClassificationDetail,
  [LOAD_EMPLOYMENT_CLASSIFICATION_DETAIL]: loadEmploymentClassificationDetail,
  [CHANGE_EMPLOYMENT_CLASSIFICATION_DETAIL]: changeEmploymentClassificationDetail,
  [LOAD_GENERAL_PAYROLL_INFORMATION]: loadGeneralPayrollInformation,
  [CHANGE_GENERAL_PAYROLL_INFORMATION]: changeGeneralPayrollInformation,
  [SET_IS_USE_TIMESHEETS_CHANGED]: setIsUseTimesheetsChanged,
  [CLOSE_MODAL]: closeModal,
  [OPEN_MODAL]: openModal,
  [SET_IS_PAGE_EDITED]: setIsPageEdited,
  [SET_GENERAL_PAYROLL_INFORMATION_LOADING_STATE]: setGeneralPayrollInformationIsLoading,
  [SET_PAY_SLIP_EMAIL_DEFAULTS_LOADING_STATE]: setPaySlipEmailDefaultsLoadingState,
  [LOAD_PAY_SLIP_EMAIL_DEFAULTS]: loadPaySlipEmailDefaults,
  [CHANGE_PAY_SLIP_EMAIL_DEFAULTS_FIELD]: changePaySlipEmailDefaultsField,
};

const payrollSettingsReducer = createReducer(getDefaultState(), handlers);

export default payrollSettingsReducer;
