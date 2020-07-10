import { createSelector, createStructuredSelector } from 'reselect';

export const getIsCreating = (state) => state.superFundId === 'new';
export const getIsSubmitting = (state) => state.isSubmitting;
export const getSuperFundId = (state) => state.superFundId;
export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getAlertMessage = (state) => state.alertMessage;
export const getIsPageEdited = (state) => state.isPageEdited;
export const getModalType = (state) => state.modalType;
export const getIsAbnLoading = (state) => state.isAbnLoading;
export const getSuperFund = (state) => state.superFund;
export const getElectronicServiceAddresses = (state) =>
  state.electronicServiceAddresses;
export const getSuperProducts = (state) => state.superProducts;
export const getShowContactDetails = (state) => state.showContactDetails;

export const getSuperFundPageTitle = createSelector(
  getIsCreating,
  (isCreating) =>
    isCreating ? 'Create superannuation fund' : 'Edit superannuation fund'
);

export const getIsSuperFundEditable = (state) => state.isSuperFundEditable;

export const getIsSMSFSuperFund = (state) =>
  state.superFund.fundType === 'SelfManagedSuperFund';

export const getIsPaySuperFund = (state) => state.superFund.isPaySuperFund;

const getPhoneNumber = (state) => state.superFund.phoneNumber;
const getWebSite = (state) => state.superFund.webSite;
export const getSuperFundContactDetails = createStructuredSelector({
  phoneNumber: getPhoneNumber,
  webSite: getWebSite,
});

const getName = (state) => state.superFund.name;
const getEmployerMembershipNumber = (state) =>
  state.superFund.employerMembershipNumber;
export const getSuperProductAbn = (state) => state.superFund.superProductAbn;
const getSuperFundIdentifier = (state) => state.superFund.superFundIdentifier;
const getSuperProductId = (state) => state.superFund.superProductId;
const getSuperProductName = (state) => state.superFund.superProductName;
export const getFundType = (state) => state.superFund.fundType;
const getBankNumber = (state) => state.superFund.bankNumber;
const getAccountNumber = (state) => state.superFund.accountNumber;
const getElectronicServiceAddress = (state) =>
  state.superFund.electronicServiceAddress;
const getAuthorisationToken = (state) => state.accessToken;
export const getSaveSuperFundPayload = createStructuredSelector({
  accountNumber: getAccountNumber,
  bankNumber: getBankNumber,
  phoneNumber: getPhoneNumber,
  name: getName,
  electronicServiceAddress: getElectronicServiceAddress,
  employerMembershipNumber: getEmployerMembershipNumber,
  fundType: getFundType,
  superProductAbn: getSuperProductAbn,
  superFundIdentifier: getSuperFundIdentifier,
  superProductId: getSuperProductId,
  superProductName: getSuperProductName,
  webSite: getWebSite,
  isPaySuperFund: getIsPaySuperFund,
  authorisationToken: getAuthorisationToken,
});

export const getAbnIsDisabled = (state) => state.superFund.isPaySuperFund;

export const getSelfManagedSuperFundEnabled = (state) =>
  getIsCreating(state) &&
  state.selfManagedSuperFundEnabled &&
  state.superFund.isPaySuperFund;
export const getShowSelfManagedSuperFundWarning = (state) =>
  state.showSelfManagedSuperFundWarning;
