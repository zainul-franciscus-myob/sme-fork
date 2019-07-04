import { createSelector, createStructuredSelector } from 'reselect';

const getName = state => state.superFund.name;
const getEmployerMembershipNumber = state => state.superFund.employerMembershipNumber;
const getSuperProductAbn = state => state.superFund.superProductAbn;
const getSuperProductId = state => state.superFund.superProductId;
const getSuperProducts = state => state.superProducts;
export const getShowContactDetails = state => state.showContactDetails;
const getPhoneNumber = state => state.superFund.phoneNumber;
const getWebSite = state => state.superFund.webSite;
const getIsPaySuperFund = state => state.superFund.isPaySuperFund;

export const getSuperFundDetailSectionProps = createStructuredSelector({
  name: getName,
  employerMembershipNumber: getEmployerMembershipNumber,
  superProductAbn: getSuperProductAbn,
  superProductId: getSuperProductId,
  superProducts: getSuperProducts,
  phoneNumber: getPhoneNumber,
  webSite: getWebSite,
});

export const getIsActionsDisabled = state => state.isSubmitting;

export const getIsCreating = state => state.superFundId === 'new';

export const getBusinessId = state => state.businessId;

export const getRegion = state => state.region;

export const getModalType = state => state.modalType;

export const getIsPageEdited = state => state.isPageEdited;

export const getSuperFundId = state => state.superFundId;

export const getAlertMessage = state => state.alertMessage;

const getSuperProductName = state => state.superFund.superProductName;
const getSuperFundIdentifier = state => state.superFund.superFundIdentifier;
const getFundType = () => 'APRASuperFund';
export const getSaveSuperFundPayload = createStructuredSelector({
  phoneNumber: getPhoneNumber,
  name: getName,
  employerMembershipNumber: getEmployerMembershipNumber,
  fundType: getFundType,
  superProductAbn: getSuperProductAbn,
  superFundIdentifier: getSuperFundIdentifier,
  superProductId: getSuperProductId,
  superProductName: getSuperProductName,
  webSite: getWebSite,
  isPaySuperFund: getIsPaySuperFund,
});

export const getSuperFundPageTitle = createSelector(
  getIsCreating,
  isCreating => (isCreating ? 'Create superannuation fund' : 'Edit superannuation fund'),
);

export const getSuperFundContactDetails = createStructuredSelector({
  phoneNumber: getPhoneNumber,
  webSite: getWebSite,
});
