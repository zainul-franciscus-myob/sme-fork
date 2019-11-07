import {
  CLOSE_MODAL,
  LOAD_BUSINESS_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_PAGE_EDITED_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BUSINESS_DETAIL,
} from '../BusinessIntents';
import {
  RESET_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';

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
  },
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

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_BUSINESS_DETAIL]: loadBusinessDetail,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [UPDATE_BUSINESS_DETAIL]: updateBusinessDetail,
  [SET_ALERT_MESSAGE]: setAlert,
  [RESET_STATE]: resetState,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_PAGE_EDITED_STATE]: setPageEditedState,
};

const businessDetailsReducer = createReducer(getDefaultState(), handlers);

export default businessDetailsReducer;
