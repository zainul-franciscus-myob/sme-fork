import { createSelector, createStructuredSelector } from 'reselect';

export const getBusinessDetails = createStructuredSelector({
  selectedContactType: state => state.contact.selectedContactType,
  designation: state => state.contact.designation,
  referenceId: state => state.contact.referenceId,
  isInactive: state => state.contact.isInactive,
});

export const getAlertMessage = state => state.alertMessage;
export const getModalType = state => state.modalType;
export const getIsLoading = state => state.isLoading;

const getIsCompany = state => state.contact.designation === 'Company';

export const getContactDetails = createStructuredSelector({
  companyName: state => state.contact.companyName,
  abn: state => state.contact.abn,
  firstName: state => state.contact.firstName,
  lastName: state => state.contact.lastName,
  isCompany: getIsCompany,
  notes: state => state.contact.notes,
});

const MAX_PHONE_NUMBERS = 3;

const formatAddress = (address) => {
  const numberOfAddedPhoneNumbers = address.phoneNumbers.length;
  const phoneNumbers = numberOfAddedPhoneNumbers === 0 ? [''] : address.phoneNumbers;
  const hasAddPhoneButton = numberOfAddedPhoneNumbers < MAX_PHONE_NUMBERS;

  return {
    ...address,
    phoneNumbers,
    hasAddPhoneButton,
  };
};

const getShippingAddress = state => state.contact.shippingAddress;

export const getFormattedShippingAddress = createSelector(
  getShippingAddress,
  formatAddress,
);

const getBillingAddress = state => state.contact.billingAddress;

export const getFormattedBillingAddress = createSelector(
  getBillingAddress,
  formatAddress,
);

export const getContactHeader = state => state.contact.contactHeader;

export const getContact = state => state.contact;

export const getIsActionsDisabled = state => state.isSubmitting;
export const isPageEdited = state => state.isPageEdited;
