import {
  CLOSE_MODAL,
  LOAD_ABN_DETAIL,
  OPEN_MODAL,
  SELECT_APRA_FUND,
  SET_ABN_LOADING_STATE,
  SET_ABN_STATUS,
  SET_ALERT_MESSAGE,
  SET_SUBMITTING_STATE,
  SHOW_CONTACT_DETAILS,
  UPDATE_SELF_MANAGED_FUND_ABN,
  UPDATE_SUPER_FUND_DETAIL,
} from '../SuperFundIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getFundType } from './SuperFundWithPaySuperSelectors';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  superFund: {
    id: '',
    accountNumber: '',
    bankNumber: '',
    phoneNumber: '',
    name: '',
    electronicServiceAddress: '',
    employerMembershipNumber: '',
    fundType: '',
    isPaySuperFund: false,
    superProductAbn: '',
    superFundIdentifier: '',
    superProductId: '',
    superProductName: '',
    webSite: '',
  },
  selfManagedSuperFundEnabled: false,
  showSelfManagedSuperFundWarning: false,
  isPaySuperEnabled: false,
  superProducts: [],
  electronicServiceAddresses: [],
  isSubmitting: false,
  isPageEdited: false,
  isAbnLoading: false,
  modalType: '',
  alertMessage: '',
  isAbnDirty: false,
  showContactDetails: false,
  superFundId: '',
});

const shouldShowContactDetails = ({ phoneNumber, webSite }) => phoneNumber || webSite;

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
  superFund: action.superFund,
  selfManagedSuperFundEnabled: action.selfManagedSuperFundEnabled,
  showSelfManagedSuperFundWarning: action.showSelfManagedSuperFundWarning,
  superProducts: action.superProducts,
  electronicServiceAddresses: action.electronicServiceAddresses,
  showContactDetails: shouldShowContactDetails(action.superFund),
});

const resetState = () => (getDefaultState());

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAbnLoadingState = (state, action) => ({
  ...state,
  isAbnLoading: action.isAbnLoading,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: undefined,
});

const showContactDetails = state => ({
  ...state,
  showContactDetails: true,
});

const getAppliedFormatRestrictions = (currentText, text, pattern) => (
  pattern.test(text) ? text : currentText
);

const allowedPhoneNumberPattern = /^[0-9 ]*$/;

const getUpdateSuperFundDetailValue = (key, currentValue, newValue) => {
  if (key === 'phoneNumber') {
    return getAppliedFormatRestrictions(currentValue, newValue, allowedPhoneNumberPattern);
  }

  return newValue;
};

const getUpdatedFundType = (state, key, newValue) => ((key === 'isPaySuperFund' && !newValue)
  ? 'APRASuperFund'
  : getFundType(state));

const updateSuperFundDetail = (state, action) => {
  const { key, value } = action;
  const fundType = getUpdatedFundType(state, key, value);

  return ({
    ...state,
    superFund: {
      ...state.superFund,
      fundType,
      [key]: getUpdateSuperFundDetailValue(
        key, state.superFund[key], value,
      ),
    },
    isPageEdited: true,
  });
};

const updateSelfManagedFundAbn = (state, action) => ({
  ...state,
  superFund: {
    ...state.superFund,
    superProductAbn: action.value,
  },
  isPageEdited: true,
  isAbnDirty: true,
});

const selectAPRAFund = (state, action) => {
  const defaultState = getDefaultState();
  return {
    ...state,
    superFund: {
      ...state.superFund,
      superProductAbn: action.superProduct.abn || defaultState.superFund.superProductAbn,
      superFundIdentifier: action.superProduct.scfi || defaultState.superFund.superFundIdentifier,
      superProductId: action.superProduct.usi || defaultState.superFund.superProductId,
      superProductName: action.superProduct.name || defaultState.superFund.superProductName,
      name: action.superProduct.name || state.superFund.name,
    },
    isPageEdited: true,
  };
};

const loadAbnDetail = (state, action) => ({
  ...state,
  superFund: {
    ...state.superFund,
    name: action.name,
    superProductName: action.name,
  },
  isAbnDirty: false,
});

const setAbnStatus = (state, action) => ({
  ...state,
  isAbnDirty: action.isAbnDirty,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ABN_LOADING_STATE]: setAbnLoadingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SHOW_CONTACT_DETAILS]: showContactDetails,
  [UPDATE_SUPER_FUND_DETAIL]: updateSuperFundDetail,
  [UPDATE_SELF_MANAGED_FUND_ABN]: updateSelfManagedFundAbn,
  [SELECT_APRA_FUND]: selectAPRAFund,
  [LOAD_ABN_DETAIL]: loadAbnDetail,
  [SET_ABN_STATUS]: setAbnStatus,
};

const superFundWithPaySuperReducer = createReducer(getDefaultState(), handlers);

export default superFundWithPaySuperReducer;
