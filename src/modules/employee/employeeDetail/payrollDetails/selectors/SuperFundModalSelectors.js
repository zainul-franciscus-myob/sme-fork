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

const getPhoneNumber = state => state.superFundModal.superFund.phoneNumber;
const getWebSite = state => state.superFundModal.superFund.webSite;
export const getSuperFundContactDetails = createStructuredSelector({
  phoneNumber: getPhoneNumber,
  webSite: getWebSite,
});

export const getShowContactDetails = state => state.superFundModal.showContactDetails;
