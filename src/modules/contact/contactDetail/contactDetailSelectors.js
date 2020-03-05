import { createSelector, createStructuredSelector } from 'reselect';

import countryList from '../../../sharedData/countryList';

export const getContactId = state => state.contactId;

export const getIsCreating = state => state.contactId === 'new';

export const getAlertMessage = state => state.alertMessage;

export const getModalType = state => state.modalType;

export const getLoadingState = state => state.loadingState;

export const getIsLoadingAccount = state => state.isLoadingAccount;

const getIsCompany = state => state.contact.designation === 'Company';

export const getIsSupplier = state => state.contact.selectedContactType === 'Supplier';

export const getAbn = state => state.contact.abn;

export const getIsReportable = state => state.contact.isReportable;

export const getAbnLink = state => (state.contact.abn
  ? `https://abr.business.gov.au/ABN/View?id=${state.contact.abn}`
  : 'https://abr.business.gov.au/');

export const getRegion = state => state.region;

export const getContactDetails = createStructuredSelector({
  selectedContactType: state => state.contact.selectedContactType,
  designation: state => state.contact.designation,
  referenceId: state => state.contact.referenceId,
  expenseAccountId: state => state.contact.expenseAccountId,
  isInactive: state => state.contact.isInactive,
  isReportable: state => state.contact.isReportable,
  companyName: state => state.contact.companyName,
  firstName: state => state.contact.firstName,
  lastName: state => state.contact.lastName,
  isCompany: getIsCompany,
  isSupplier: getIsSupplier,
  contactTypes: state => state.contactTypes,
  accountOptions: state => state.accountOptions,
  region: getRegion,
});

export const getMoreDetails = createStructuredSelector({
  notes: state => state.contact.notes,
});

export const getContactHeaderDetails = createStructuredSelector({
  contactType: state => state.readonly.contactType,
  averageDaysToPay: state => state.readonly.averageDaysToPay,
  balanceDue: state => state.readonly.balanceDue,
  overDue: state => state.readonly.overDue,
  showReminders: state => state.readonly.contactType === 'Customer',
  showPaymentSummary: state => state.readonly.contactType === 'Customer'
    || state.readonly.contactType === 'Supplier',
  isCreating: getIsCreating,
  title: state => state.readonly.title,
  status: state => state.readonly.status,
});

const MAX_PHONE_NUMBERS = 3;

const compareStateByValue = ({ value: stateA }, { value: stateB }) => stateA.localeCompare(stateB);

const findStatesInCountry = (selectedCountry) => {
  const matchingCountry = countryList.find(
    country => country.value === selectedCountry,
  );

  if (!matchingCountry) {
    return [];
  }

  const { states } = matchingCountry;

  if (!states) {
    return [];
  }

  return states;
};

const formatAddress = (address) => {
  const numberOfAddedPhoneNumbers = address.phoneNumbers.length;
  const phoneNumbers = numberOfAddedPhoneNumbers === 0 ? [''] : address.phoneNumbers;
  const hasAddPhoneButton = numberOfAddedPhoneNumbers < MAX_PHONE_NUMBERS;
  const stateOptions = findStatesInCountry(address.country).sort(
    compareStateByValue,
  );
  const isStateDropdown = stateOptions.length > 0;

  return {
    ...address,
    phoneNumbers,
    hasAddPhoneButton,
    isStateDropdown,
    stateOptions,
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

export const getContact = ({ contact }) => ({
  ...contact,
  expenseAccountId: (
    contact.selectedContactType === 'Supplier'
      ? contact.expenseAccountId : undefined
  ),
});

export const getIsActionsDisabled = state => state.isSubmitting;

export const isPageEdited = state => state.isPageEdited;

export const getBusinessId = state => state.businessId;

export const getAccountModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getLoadAddedAccountUrlParams = (state, accountId) => {
  const businessId = getBusinessId(state);
  return { businessId, accountId };
};

export const getReminderLink = state => `${state.reminders.url}?consumer=ARL&origin=Customer&cfid=${state.businessId}&id=${state.contact.uid}`;
