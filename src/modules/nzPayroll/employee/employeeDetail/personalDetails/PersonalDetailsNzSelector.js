import { differenceInYears } from 'date-fns';

const MAX_PHONE_NUMBERS = 3;

const getPhoneNumbers = ({ phoneNumbers }) => {
  return phoneNumbers.length === 0 ? [''] : phoneNumbers;
};

export const getAddPhoneButton = (state) =>
  state.personalDetail.phoneNumbers.length < MAX_PHONE_NUMBERS;

export const getPersonalDetail = ({ personalDetail }) => ({
  ...personalDetail,
  phoneNumbers: getPhoneNumbers(personalDetail),
});

export const getGenderOptions = ({ genderOptions }) => genderOptions;

export const getCalculatedAge = ({ personalDetail }) => {
  const age = differenceInYears(
    Date.now(),
    new Date(personalDetail?.dateOfBirth)
  );
  return String(age >= 0 ? age : '-');
};
