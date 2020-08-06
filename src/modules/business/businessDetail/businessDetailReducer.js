import {
  CLOSE_FINANCIAL_YEAR_MODAL,
  CLOSE_MODAL,
  LOAD_BUSINESS_DETAIL,
  OPEN_FINANCIAL_YEAR_MODAL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_IS_FINANCIAL_YEAR_SETTINGS_CHANGED_STATE,
  SET_LOADING_STATE,
  SET_LOCK_DATE_AUTO_POPULATED_STATE,
  SET_PAGE_EDITED_STATE,
  SET_SUBMITTING_STATE,
  START_LOADING_FINANCIAL_YEAR_MODAL,
  STOP_LOADING_FINANCIAL_YEAR_MODAL,
  UPDATE_BUSINESS_DETAIL,
  UPDATE_FINANCIAL_YEAR_SETTINGS,
  UPDATE_LOCK_DATE_DETAIL,
} from '../BusinessIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  getOpeningBalanceMonth,
  getOpeningBalanceYear,
} from './businessDetailSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  businessDetails: {
    region: '',
    organisationName: '',
    abn: '',
    nzbn: '',
    irdNumber: '',
    gstBranchNumber: '',
    acn: '',
    clientCode: '',
    phoneNumber: '',
    fax: '',
    email: '',
    address: '',
    financialYear: '',
    lastMonthInFinancialYear: '',
    lastMonthInNewFinancialYear: '',
    openingBalanceDate: '',
    openingBalanceYear: '',
    openingBalanceMonth: '',
    serialNumber: '',
    hasLockPeriod: false,
    lockDate: '',
    tradingName: '',
    website: '',
    isFinancialYearClosed: false,
    hasTransactions: false,
  },
  isLockDateAutoPopulated: false,
  loadingState: LoadingState.LOADING,
  alert: undefined,
  modal: undefined,
  isSubmitting: false,
  pageTitle: '',
  financialYearModal: {
    isOpen: false,
    isLoading: false,
  },
  isStartNewFinancialYearEnabled: false,
  isFinancialYearSettingsChanged: false,
  financialYearOptions: [],
  isFinancialYearSectionReadOnly: false,
  monthOptions: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
});

const setInitialState = (state, { context }) => ({
  ...state,
  businessId: context.businessId,
  region: context.region,
  isStartNewFinancialYearEnabled: context.isStartNewFinancialYearEnabled,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const loadBusinessDetail = (state, action) => {
  const isFinancialYearSectionReadOnly =
    action.businessDetails.isFinancialYearClosed;
  return {
    ...state,
    businessDetails: {
      ...state.businessDetails,
      ...action.businessDetails,
      openingBalanceMonth: getOpeningBalanceMonth(action),
      openingBalanceYear: getOpeningBalanceYear(action),
    },
    pageTitle: action.pageTitle,
    financialYearOptions: action.financialYearOptions,
    isFinancialYearSectionReadOnly,
  };
};

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setIsFinancialYearSettingsChangedState = (state, action) => ({
  ...state,
  isFinancialYearSettingsChanged: action.isFinancialYearSettingsChanged,
});

const calculateOpeningBalanceYear = (businessDetails) => {
  const {
    openingBalanceMonth,
    financialYear,
    lastMonthInFinancialYear,
  } = businessDetails;

  return Number(openingBalanceMonth) <= Number(lastMonthInFinancialYear)
    ? financialYear
    : financialYear - 1;
};

const updateFinancialYearSettings = (state, action) => {
  const newBusinessDetail = {
    ...state,
    businessDetails: {
      ...state.businessDetails,
      [action.key]: action.value,
    },
    isFinancialYearSettingsChanged: true,
  };
  const openingBalanceYear = calculateOpeningBalanceYear(
    newBusinessDetail.businessDetails
  );
  return {
    ...newBusinessDetail,
    businessDetails: {
      ...newBusinessDetail.businessDetails,
      openingBalanceYear,
    },
  };
};

const updateBusinessDetail = (state, action) => ({
  ...state,
  businessDetails: {
    ...state.businessDetails,
    [action.key]: action.value,
  },
});

const updateLockDateDetail = (state, { key, value }) => {
  let {
    isLockDateAutoPopulated,
    businessDetails: { lockDate, hasLockPeriod },
  } = state;

  if (key === 'hasLockPeriod') {
    hasLockPeriod = value;

    if (hasLockPeriod && !lockDate) {
      lockDate = formatIsoDate(new Date());
      isLockDateAutoPopulated = true;
    }

    if (!hasLockPeriod && isLockDateAutoPopulated) {
      lockDate = '';
      isLockDateAutoPopulated = false;
    }
  }

  if (key === 'lockDate') {
    lockDate = value;
    isLockDateAutoPopulated = false;
  }

  return {
    ...state,
    businessDetails: {
      ...state.businessDetails,
      hasLockPeriod,
      lockDate,
    },
    isLockDateAutoPopulated,
  };
};

const openModal = (state, action) => ({
  ...state,
  modal: action.modal,
});

const closeModal = (state) => ({
  ...state,
  modal: undefined,
});

const resetState = () => getDefaultState();

const setPageEditedState = (state, action) => ({
  ...state,
  isPageEdited: action.isPageEdited,
});

const setIsLockDateAutoPopulated = (state, action) => ({
  ...state,
  isLockDateAutoPopulated: action.isLockDateAutoPopulated,
});

const openFinancialYearModal = (state) => ({
  ...state,
  financialYearModal: { ...state.financialYearModal, isOpen: true },
});

const closeFinancialYearModal = (state) => ({
  ...state,
  financialYearModal: { ...state.financialYearModal, isOpen: false },
});

const startLoadingFinancialYearModal = (state) => ({
  ...state,
  financialYearModal: { ...state.financialYearModal, isLoading: true },
});

const stopLoadingFinancialYearModal = (state) => ({
  ...state,
  financialYearModal: { ...state.financialYearModal, isLoading: false },
});

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_BUSINESS_DETAIL]: loadBusinessDetail,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_IS_FINANCIAL_YEAR_SETTINGS_CHANGED_STATE]: setIsFinancialYearSettingsChangedState,
  [UPDATE_BUSINESS_DETAIL]: updateBusinessDetail,
  [UPDATE_FINANCIAL_YEAR_SETTINGS]: updateFinancialYearSettings,
  [UPDATE_LOCK_DATE_DETAIL]: updateLockDateDetail,
  [SET_ALERT_MESSAGE]: setAlert,
  [RESET_STATE]: resetState,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_PAGE_EDITED_STATE]: setPageEditedState,
  [SET_LOCK_DATE_AUTO_POPULATED_STATE]: setIsLockDateAutoPopulated,
  [SET_INITIAL_STATE]: setInitialState,
  [OPEN_FINANCIAL_YEAR_MODAL]: openFinancialYearModal,
  [CLOSE_FINANCIAL_YEAR_MODAL]: closeFinancialYearModal,
  [START_LOADING_FINANCIAL_YEAR_MODAL]: startLoadingFinancialYearModal,
  [STOP_LOADING_FINANCIAL_YEAR_MODAL]: stopLoadingFinancialYearModal,
};

const businessDetailsReducer = createReducer(getDefaultState(), handlers);

export default businessDetailsReducer;
