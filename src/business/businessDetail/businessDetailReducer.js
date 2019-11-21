import {
  CLOSE_MODAL,
  LOAD_BUSINESS_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_LOCK_DATE_AUTO_POPULATED_STATE,
  SET_PAGE_EDITED_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BUSINESS_DETAIL,
  UPDATE_LOCK_DATE_DETAIL,
} from '../BusinessIntents';
import { RESET_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';
import formatIsoDate from '../../valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  businessDetails: {
    region: '',
    organisationName: '',
    abn: '',
    nzbn: '',
    irdNumber: '',
    gstBranchNumber: '',
    acn: '',
    phoneNumber: '',
    fax: '',
    email: '',
    address: '',
    financialYear: '',
    lastMonthInFinancialYear: '',
    openingBalanceDate: '',
    serialNumber: '',
    hasLockPeriod: false,
    lockDate: '',
  },
  isLockDateAutoPopulated: false,
  isLoading: false,
  alert: undefined,
  modal: undefined,
  isSubmitting: false,
  pageTitle: '',
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const loadBusinessDetail = (state, action) => ({
  ...state,
  businessDetails: {
    ...state.businessDetails,
    ...action.businessDetails,
  },
  pageTitle: action.pageTitle,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const updateBusinessDetail = (state, action) => ({
  ...state,
  businessDetails: {
    ...state.businessDetails,
    [action.key]: action.value,
  },
});

const updateLockDateDetail = (state, { key, value }) => {
  let { isLockDateAutoPopulated, businessDetails: { lockDate, hasLockPeriod } } = state;

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

const closeModal = state => ({
  ...state,
  modal: undefined,
});

const resetState = () => (getDefaultState());

const setPageEditedState = (state, action) => ({
  ...state,
  isPageEdited: action.isPageEdited,
});

const setIsLockDateAutoPopulated = (state, action) => ({
  ...state,
  isLockDateAutoPopulated: action.isLockDateAutoPopulated,
});

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_BUSINESS_DETAIL]: loadBusinessDetail,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [UPDATE_BUSINESS_DETAIL]: updateBusinessDetail,
  [UPDATE_LOCK_DATE_DETAIL]: updateLockDateDetail,
  [SET_ALERT_MESSAGE]: setAlert,
  [RESET_STATE]: resetState,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_PAGE_EDITED_STATE]: setPageEditedState,
  [SET_LOCK_DATE_AUTO_POPULATED_STATE]: setIsLockDateAutoPopulated,
};

const businessDetailsReducer = createReducer(getDefaultState(), handlers);

export default businessDetailsReducer;
