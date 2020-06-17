import {
  CLOSE_SUPER_FUND_MODAL,
  CREATE_SUPER_FUND,
  LOAD_ABN_DETAIL,
  LOAD_NEW_SUPER_FUND,
  OPEN_SUPER_FUND_MODAL,
  SELECT_APRA_FUND,
  SET_ABN_LOADING_STATE,
  SET_ABN_STATUS,
  SET_ACCESS_TOKEN,
  SET_SUPER_FUND_MODAL_ALERT_MESSAGE,
  SET_SUPER_FUND_MODAL_LOADING_STATE,
  SET_SUPER_FUND_MODAL_SUBMITTING_STATE,
  SHOW_CONTACT_DETAILS,
  UPDATE_SELF_MANAGED_FUND_ABN,
  UPDATE_SUPER_FUND_DETAIL,
} from '../../../EmployeeIntents';
import { getFundType } from '../selectors/SuperFundModalSelectors';

const getDefaultSuperFundState = () => ({
  superFund: {
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
  isPaySuperEnabled: false,
  selfManagedSuperFundEnabled: false,
  showSelfManagedSuperFundWarning: false,
  superProducts: [],
  electronicServiceAddresses: [],
  isSubmitting: false,
  isAbnLoading: false,
  alertMessage: '',
  isAbnDirty: false,
  showContactDetails: false,
  superFundId: '',
  registerPaySuperUrl: '',
  accessToken: '',
});

const openSuperFundModal = state => ({
  ...state,
  superFundModal: getDefaultSuperFundState(),
});

const closeSuperFundModal = state => ({
  ...state,
  superFundModal: undefined,
});

const loadSuperFundModal = (state, { response }) => ({
  ...state,
  superFundModal: {
    ...state.superFundModal,
    ...response,
  },
});

const setSuperFundModalState = (state, modal) => ({
  ...state,
  superFundModal: {
    ...state.superFundModal,
    ...modal,
  },
});

const setSuperFundModalLoadingState = (state, { isLoading }) => (
  setSuperFundModalState(state, { isLoading })
);

const setSuperFundModalSubmittingState = (state, { isSubmitting }) => (
  setSuperFundModalState(state, { isSubmitting })
);

const setAbnLoadingState = (state, { isAbnLoading }) => (
  setSuperFundModalState(state, { isAbnLoading })
);

const setAbnStatus = (state, { isAbnDirty }) => (
  setSuperFundModalState(state, { isAbnDirty })
);

const showContactDetails = state => (
  setSuperFundModalState(state, { showContactDetails: true })
);

const setSuperFundModalAlertMessage = (state, { alertMessage }) => (
  setSuperFundModalState(state, { alertMessage })
);

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

const setSuperFundDetailState = (state, details) => ({
  ...state,
  superFundModal: {
    ...state.superFundModal,
    superFund: {
      ...state.superFundModal.superFund,
      ...details,
    },
  },
});

const updateSuperFundDetail = (state, action) => {
  const { key, value } = action;
  const fundType = getUpdatedFundType(state, key, value);

  return setSuperFundDetailState(state, {
    fundType,
    [key]: getUpdateSuperFundDetailValue(
      key, state.superFundModal.superFund[key], value,
    ),
  });
};

const loadAbnDetail = (state, { name }) => (
  setSuperFundModalState(state, {
    isAbnDirty: false,
    superFund: {
      ...state.superFundModal.superFund,
      name,
      superProductName: name,
    },
  })
);

const updateSelfManagedFundAbn = (state, { value }) => (
  setSuperFundModalState(state, {
    isAbnDirty: true,
    superFund: {
      ...state.superFundModal.superFund,
      superProductAbn: value,
    },
  })
);

const selectAPRAFund = (state, { superProduct }) => {
  const defaultState = getDefaultSuperFundState();

  return setSuperFundDetailState(state, {
    superProductAbn: superProduct.abn || defaultState.superFund.superProductAbn,
    superFundIdentifier: superProduct.scfi || defaultState.superFund.superFundIdentifier,
    superProductId: superProduct.usi || defaultState.superFund.superProductId,
    superProductName: superProduct.name || defaultState.superFund.superProductName,
    name: superProduct.name || state.superFund.name,
  });
};

const saveSuperFundModal = (state, { selectedSuperFundId, superFundOptions }) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    superannuationDetails: {
      ...state.payrollDetails.superannuationDetails,
      selectedSuperFundId,
    },
  },
  isPageEdited: true,
  superFundOptions,
});

const setAccessToken = (state, { accessToken }) => ({
  ...state,
  accessToken,
});

export default {
  [OPEN_SUPER_FUND_MODAL]: openSuperFundModal,
  [CLOSE_SUPER_FUND_MODAL]: closeSuperFundModal,
  [SET_SUPER_FUND_MODAL_LOADING_STATE]: setSuperFundModalLoadingState,
  [SET_SUPER_FUND_MODAL_SUBMITTING_STATE]: setSuperFundModalSubmittingState,
  [SET_SUPER_FUND_MODAL_ALERT_MESSAGE]: setSuperFundModalAlertMessage,
  [LOAD_NEW_SUPER_FUND]: loadSuperFundModal,
  [UPDATE_SUPER_FUND_DETAIL]: updateSuperFundDetail,
  [SET_ABN_LOADING_STATE]: setAbnLoadingState,
  [LOAD_ABN_DETAIL]: loadAbnDetail,
  [SET_ABN_STATUS]: setAbnStatus,
  [UPDATE_SELF_MANAGED_FUND_ABN]: updateSelfManagedFundAbn,
  [SELECT_APRA_FUND]: selectAPRAFund,
  [SHOW_CONTACT_DETAILS]: showContactDetails,
  [CREATE_SUPER_FUND]: saveSuperFundModal,
  [SET_ACCESS_TOKEN]: setAccessToken,
};
