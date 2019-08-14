import { getFundType } from '../selectors/SuperFundModalSelectors';

export const getDefaultSuperFundState = () => ({
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
  superProducts: [],
  electronicServiceAddresses: [],
  isSubmitting: false,
  isAbnLoading: false,
  alertMessage: '',
  isAbnDirty: false,
  showContactDetails: false,
  superFundId: '',
});

export const openSuperFundModal = state => ({
  ...state,
  superFundModal: getDefaultSuperFundState(),
});

export const closeSuperFundModal = state => ({
  ...state,
  superFundModal: undefined,
});

export const loadSuperFundModal = (state, { response }) => ({
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

export const setSuperFundModalLoadingState = (state, { isLoading }) => (
  setSuperFundModalState(state, { isLoading })
);

export const setSuperFundModalSubmittingState = (state, { isSubmitting }) => (
  setSuperFundModalState(state, { isSubmitting })
);

export const setAbnLoadingState = (state, { isAbnLoading }) => (
  setSuperFundModalState(state, { isAbnLoading })
);

export const setAbnStatus = (state, { isAbnDirty }) => (
  setSuperFundModalState(state, { isAbnDirty })
);

export const showContactDetails = state => (
  setSuperFundModalState(state, { showContactDetails: true })
);

export const setSuperFundModalAlertMessage = (state, { alertMessage }) => (
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

export const updateSuperFundDetail = (state, action) => {
  const { key, value } = action;
  const fundType = getUpdatedFundType(state, key, value);

  return setSuperFundDetailState(state, {
    fundType,
    [key]: getUpdateSuperFundDetailValue(
      key, state.superFundModal.superFund[key], value,
    ),
  });
};

export const loadAbnDetail = (state, { name }) => (
  setSuperFundModalState(state, {
    isAbnDirty: false,
    superFund: {
      ...state.superFundModal.superFund,
      name,
      superProductName: name,
    },
  })
);

export const updateSelfManagedFundAbn = (state, { value }) => (
  setSuperFundModalState(state, {
    isAbnDirty: true,
    superFund: {
      ...state.superFundModal.superFund,
      superProductAbn: value,
    },
  })
);

export const selectAPRAFund = (state, { superProduct }) => {
  const defaultState = getDefaultSuperFundState();

  return setSuperFundDetailState(state, {
    superProductAbn: superProduct.abn || defaultState.superFund.superProductAbn,
    superFundIdentifier: superProduct.scfi || defaultState.superFund.superFundIdentifier,
    superProductId: superProduct.usi || defaultState.superFund.superProductId,
    superProductName: superProduct.name || defaultState.superFund.superProductName,
    name: superProduct.name || state.superFund.name,
  });
};

export const saveSuperFundModal = (state, { selectedSuperFundId, superFundOptions }) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    superannuationDetails: {
      ...state.payrollDetails.superannuationDetails,
      selectedSuperFundId,
    },
  },
  superFundOptions,
});
