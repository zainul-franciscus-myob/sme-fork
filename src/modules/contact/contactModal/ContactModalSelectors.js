import { createSelector } from 'reselect';

import countryList from '../../../sharedData/countryList';

const MAX_PHONE_NUMBERS = 3;

const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;

export const getAlert = (state) => state.alert;
export const getIsOpen = (state) => state.isOpen;
export const getIsLoading = (state) => state.isLoading;
export const getIsSubmitting = (state) => state.isSubmitting;
export const getShowContactType = (state) => state.showContactType;
const getShowBillingAddress = (state) => state.showBillingAddress;
const getShowShippingAddress = (state) => state.showShippingAddress;
export const getShowPaymentDetails = (state) => state.togglePaymentDetails;

export const getContact = (state) => state.contact;
export const getContactType = (state) => state.contact.contactType;
export const getDesignation = (state) => state.contact.designation;
export const getReferenceId = (state) => state.contact.referenceId;
export const getIsReportable = (state) => state.contact.isReportable;
export const getCompanyName = (state) => state.contact.companyName;
export const getAbn = (state) => state.contact.abn;
export const getFirstName = (state) => state.contact.firstName;
export const getLastName = (state) => state.contact.lastName;
export const getNotes = (state) => state.contact.notes;
const getBillingAddress = (state) => state.contact.billingAddress;
const getShippingAddress = (state) => state.contact.shippingAddress;
export const getPaymentDetails = (state) => state.contact.paymentDetails;

export const getContactTypeOptions = (state) => state.contactTypeOptions;

export const getIsPayBillRemittanceAdviceEnabled = (state) =>
  state.isPayBillRemittanceAdviceEnabled;

export const getTitle = createSelector(
  getShowContactType,
  getContactType,
  getContactTypeOptions,
  (showContactType, contactType, contactTypeOptions) => {
    if (!showContactType && contactType) {
      const { name } =
        contactTypeOptions.find(({ value }) => value === contactType) || {};
      if (name) {
        return `Create ${name.toLowerCase()}`;
      }
    }

    return 'Create contact';
  }
);

export const getIsActionDisabled = createSelector(
  getIsSubmitting,
  getIsLoading,
  (isSubmitting, isLoading) => isSubmitting || isLoading
);

export const getIsCompany = createSelector(
  getDesignation,
  (designation) => designation === 'Company'
);

export const getIsSupplier = createSelector(
  getContactType,
  (contactType) => contactType === 'Supplier'
);

export const getAbnLink = createSelector(getAbn, (abn) =>
  abn
    ? `https://abr.business.gov.au/ABN/View?id=${abn}`
    : 'https://abr.business.gov.au/'
);

const compareStateByValue = ({ id: stateA }, { id: stateB }) =>
  stateA.localeCompare(stateB);

const findStatesInCountry = (selectedCountry) => {
  const matchingCountry = countryList.find(
    (country) => country.id === selectedCountry
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

const getContactModalAddress = (address, showAddress) => {
  const numberOfAddedPhoneNumbers = address.phoneNumbers.length;
  const phoneNumbers =
    numberOfAddedPhoneNumbers === 0 ? [''] : address.phoneNumbers;
  const hasAddPhoneButton = numberOfAddedPhoneNumbers < MAX_PHONE_NUMBERS;
  const stateOptions = findStatesInCountry(address.country).sort(
    compareStateByValue
  );
  const isStateDropdown = stateOptions.length > 0;

  return {
    ...address,
    phoneNumbers,
    hasAddPhoneButton,
    isStateDropdown,
    stateOptions,
    showAddress,
  };
};

export const getContactModalBillingAddress = createSelector(
  getBillingAddress,
  getShowBillingAddress,
  getContactModalAddress
);

export const getContactModalShippingAddress = createSelector(
  getShippingAddress,
  getShowShippingAddress,
  getContactModalAddress
);

export const getShouldShowPaymentDetails = createSelector(
  getRegion,
  getIsSupplier,
  (region, isSupplier) => region === 'au' && isSupplier
);

export const getLoadNewContactModalUrlParams = (state) => ({
  businessId: getBusinessId(state),
});

export const getLoadNewContactModalQueryParams = (state) => ({
  region: getRegion(state),
});

export const getCreateContactModalUrlParams = (state) => ({
  businessId: getBusinessId(state),
});
