import { createSelector } from 'reselect';

import countryList from '../../../sharedData/countryList';

const getContactDetailPhoneNumbers = state => state.contactDetail.phoneNumbers;

const MAX_PHONE_NUMBERS = 3;
const hasAddPhoneButton = state => getContactDetailPhoneNumbers(state).length < MAX_PHONE_NUMBERS;

const getPhoneNumbers = (state) => {
  const phoneNumbers = getContactDetailPhoneNumbers(state);
  return phoneNumbers.length === 0 ? [''] : phoneNumbers;
};

export const getContactDetail = state => ({
  ...state.contactDetail,
  phoneNumbers: getPhoneNumbers(state),
  hasAddPhoneButton: hasAddPhoneButton(state),
});

const getSelectedCountry = state => state.contactDetail.country;

export const getStateOptions = createSelector(
  getSelectedCountry,
  selectedcountry => (countryList
    .find(country => country.value === selectedcountry) || {}).states,
);

export const getIsStateDropdown = createSelector(
  getStateOptions,
  states => states !== undefined,
);
