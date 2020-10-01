const MAX_PHONE_NUMBERS = 3;

const getContactDetailPhoneNumbers = (state) =>
  state.contactDetail.phoneNumbers;

const getPhoneNumbers = (state) => {
  const phoneNumbers = getContactDetailPhoneNumbers(state);
  return phoneNumbers.length === 0 ? [''] : phoneNumbers;
};

export const getAddPhoneButton = (state) =>
  state.contactDetail.phoneNumbers.length < MAX_PHONE_NUMBERS;

export const getContactDetail = (state) => ({
  ...state.contactDetail,
  phoneNumbers: getPhoneNumbers(state),
});
