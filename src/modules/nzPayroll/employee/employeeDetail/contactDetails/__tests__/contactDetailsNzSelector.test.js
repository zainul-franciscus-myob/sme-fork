import { getAddPhoneButton, getContactDetail } from '../contactDetailsNzSelector';

describe('EmployeeDetailNzSelectors', () => {
  const state = {
    contactDetail: {
      firstName: 'Bob',
      lastName: 'The Builder',
      phoneNumbers: [91919191],
    },
  };
  describe('getContactDetail', () => {
    it('should return contact details', () => {
      const expectedState = { ...state.contactDetail };

      const actual = getContactDetail(state);

      expect(actual).toEqual(expectedState);
    });
  });
  describe('getAddPhoneButton', () => {
    it('returns true when hone numbers length is less than 3', () => {
      const actual = getAddPhoneButton(state);

      expect(actual).toEqual(true);
    });

    it('returns false when phone numbers length is more than 2', () => {
      const newState = {
        contactDetail: {
          phoneNumbers: [91988, 353, 535],
        },
      };

      const actual = getAddPhoneButton(newState);

      expect(actual).toEqual(false);
    });
  });
});
