import { createSelector, createStructuredSelector } from 'reselect';

import countryList from '../../sharedData/countryList';

export const getContactId = state => state.contactId;

export const getIsCreating = state => state.contactId === 'new';

export const getAlertMessage = state => state.alertMessage;

export const getModalType = state => state.modalType;

export const getIsLoading = state => state.isLoading;

const getIsCompany = state => state.contact.designation === 'Company';

const getIsSupplier = state => state.contact.selectedContactType === 'Supplier';

const getAbnLink = state => (
  state.contact.abn
    ? `https://abr.business.gov.au/ABN/View?id=${state.contact.abn}`
    : 'https://abr.business.gov.au/'
);

export const getContactDetails = createStructuredSelector({
  selectedContactType: state => state.contact.selectedContactType,
  designation: state => state.contact.designation,
  referenceId: state => state.contact.referenceId,
  isInactive: state => state.contact.isInactive,
  isReportable: state => state.contact.isReportable,
  companyName: state => state.contact.companyName,
  abn: state => state.contact.abn,
  firstName: state => state.contact.firstName,
  lastName: state => state.contact.lastName,
  isCompany: getIsCompany,
  isSupplier: getIsSupplier,
  abnLink: getAbnLink,
  contactTypes: state => state.contactTypes,
});

export const getMoreDetails = createStructuredSelector({
  notes: state => state.contact.notes,
});

export const getTitle = state => state.readonly.title;

export const getStatus = state => state.readonly.status;

export const getContactHeaderDetails = createStructuredSelector({
  contactType: state => state.readonly.contactType,
  averageDaysToPay: state => state.readonly.averageDaysToPay,
  balanceDue: state => state.readonly.balanceDue,
  overDue: state => state.readonly.overDue,
  showReminders: state => state.readonly.contactType === 'Customer',
  showPaymentSummary: state => state.readonly.contactType === 'Customer' || state.readonly.contactType === 'Supplier',
});

const MAX_PHONE_NUMBERS = 3;

const formatAddress = (address) => {
  const numberOfAddedPhoneNumbers = address.phoneNumbers.length;
  const phoneNumbers = numberOfAddedPhoneNumbers === 0 ? [''] : address.phoneNumbers;
  const hasAddPhoneButton = numberOfAddedPhoneNumbers < MAX_PHONE_NUMBERS;
  const stateOptions = (countryList
    .find(country => country.value === address.country) || {}).states || [];
  const isStateDropdown = stateOptions.length > 0;

  return {
    ...address,
    phoneNumbers,
    hasAddPhoneButton,
    isStateDropdown,
    stateOptions: stateOptions || [],
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

export const getContact = state => state.contact;

export const getIsActionsDisabled = state => state.isSubmitting;

export const isPageEdited = state => state.isPageEdited;

export const getBusinessId = state => state.businessId;

export const getRegion = state => state.region;
