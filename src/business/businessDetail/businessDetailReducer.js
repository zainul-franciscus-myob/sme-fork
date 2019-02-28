import {
  LOAD_BUSINESS_DETAIL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BUSINESS_DETAIL,
} from '../BusinessIntents';
import {
  RESET_STATE,
} from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getInitialState = () => ({
  businessDetails: {
    region: '',
    organisationName: '',
    abn: '',
    nzbn: '',
    irdNumber: '',
    gstBranchNumber: '',
    acn: '',
    payeeNumber: '',
    phoneNumber: '',
    fax: '',
    email: '',
    address: '',
    financialYear: '',
    lastMonthInFinancialYear: '',
    accountingPeriods: '',
    openingBalanceDate: '',
    serialNumber: '',
  },
  isLoading: false,
  alert: undefined,
  isSubmitting: false,
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

const resetState = () => (getInitialState());

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_BUSINESS_DETAIL]: loadBusinessDetail,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [UPDATE_BUSINESS_DETAIL]: updateBusinessDetail,
  [SET_ALERT_MESSAGE]: setAlert,
  [RESET_STATE]: resetState,
};

const businessDetailsReducer = createReducer(getInitialState(), handlers);

export default businessDetailsReducer;
