import { createSelector, createStructuredSelector } from 'reselect';

export const getSuperFundModal = state => state.superFundModal;

export const getAlertMessage = state => state.superFundModal.alertMessage;
const getIsSubmitting = state => state.superFundModal.isSubmitting;
export const getIsLoading = state => state.superFundModal.isLoading;
export const getIsActionDisabled = createSelector(
  getIsSubmitting,
  getIsLoading,
  (isSubmitting, isLoading) => isSubmitting || isLoading,
);

export const getIsPaySuperEnabled = state => state.superFundModal.isPaySuperEnabled;
export const getSignUpForPaySuperUrl = state => state.superFundModal.registerPaySuperUrl;

export const getSuperFund = state => state.superFundModal.superFund;
const getAuthorisationToken = state => state.accessToken;

export const getFundType = state => state.superFundModal.superFund.fundType;
export const getIsSelfManagedFund = createSelector(
  getFundType,
  fundType => fundType === 'SelfManagedSuperFund',
);

export const getSuperFundAbn = state => state.superFundModal.superFund.superProductAbn;
export const getIsAbnLoading = state => state.superFundModal.isAbnLoading;
export const getIsPaySuperFund = state => state.superFundModal.superFund.isPaySuperFund;
export const getElectronicServiceAddresses = (
  state => state.superFundModal.electronicServiceAddresses
);
export const getSuperProducts = state => state.superFundModal.superProducts;
export const getAbnIsDisabled = state => state.superFundModal.superFund.isPaySuperFund;

const getPhoneNumber = state => state.superFundModal.superFund.phoneNumber;
const getWebSite = state => state.superFundModal.superFund.webSite;
export const getSuperFundContactDetails = createStructuredSelector({
  phoneNumber: getPhoneNumber,
  webSite: getWebSite,
});

export const getShowContactDetails = state => state.superFundModal.showContactDetails;

export const getSelfManagedSuperFundEnabled = state => (
  state.superFundModal.selfManagedSuperFundEnabled
  && state.superFundModal.superFund.isPaySuperFund
);

export const getShowSelfManagedSuperFundWarning = state => (
  state.superFundModal.showSelfManagedSuperFundWarning
);

export const getSaveSuperFundPayload = createStructuredSelector({
  accountNumber: state => state.superFundModal.superFund.accountNumber,
  bankNumber: state => state.superFundModal.superFund.bankNumber,
  phoneNumber: getPhoneNumber,
  name: state => state.superFundModal.superFund.name,
  electronicServiceAddress: state => state.superFundModal.superFund.electronicServiceAddress,
  employerMembershipNumber: state => state.superFundModal.superFund.employerMembershipNumber,
  fundType: getFundType,
  superProductAbn: state => state.superFundModal.superFund.superProductAbn,
  superFundIdentifier: state => state.superFundModal.superFund.superFundIdentifier,
  superProductId: state => state.superFundModal.superFund.superProductId,
  superProductName: state => state.superFundModal.superFund.superProductName,
  webSite: getWebSite,
  isPaySuperFund: getIsPaySuperFund,
  authorisationToken: getAuthorisationToken,
});
