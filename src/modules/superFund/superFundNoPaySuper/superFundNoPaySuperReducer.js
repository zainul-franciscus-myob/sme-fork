import {
  CLOSE_MODAL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_PAY_SUPER_URL,
  SET_SUBMITTING_STATE,
  SHOW_CONTACT_DETAILS,
  UPDATE_SUPER_FUND_DETAIL,
  UPDATE_SUPER_PRODUCT,
} from '../SuperFundIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  superFund: {
    id: '',
    phoneNumber: '',
    name: '',
    employerMembershipNumber: '',
    fundType: '',
    superProductAbn: '',
    superProductId: '',
    webSite: '',
  },
  superProducts: [],
  showContactDetails: false,
  isSubmitting: false,
  businessId: '',
  region: '',
  modalType: '',
  isPageEdited: false,
  superFundId: '',
  alertMessage: '',
});

const shouldShowContactDetails = ({ phoneNumber, webSite }) => phoneNumber || webSite;

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
  superFund: action.superFund,
  superProducts: action.superProducts,
  showContactDetails: shouldShowContactDetails(action.superFund),
});

const resetState = () => (getDefaultState());

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
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

const updateSuperFundDetail = (state, action) => ({
  ...state,
  superFund: {
    ...state.superFund,
    [action.key]: getUpdateSuperFundDetailValue(
      action.key, state.superFund[action.key], action.value,
    ),
  },
  isPageEdited: true,
});

const updateSuperProduct = (state, action) => {
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

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const setPaySuperUrl = (state, action) => ({
  ...state,
  paySuperUrl: action.paySuperUrl,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [SHOW_CONTACT_DETAILS]: showContactDetails,
  [UPDATE_SUPER_FUND_DETAIL]: updateSuperFundDetail,
  [UPDATE_SUPER_PRODUCT]: updateSuperProduct,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_PAY_SUPER_URL]: setPaySuperUrl,
};

const superFundNoPaySuperReducer = createReducer(getDefaultState(), handlers);

export default superFundNoPaySuperReducer;
