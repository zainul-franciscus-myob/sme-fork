const MAX_PHONE_NUMBERS = 3;

export const getAddPhoneButton = (state) =>
  state.contactDetail.phoneNumbers.length < MAX_PHONE_NUMBERS;

export const getContactDetail = (state) => state.contactDetail;
