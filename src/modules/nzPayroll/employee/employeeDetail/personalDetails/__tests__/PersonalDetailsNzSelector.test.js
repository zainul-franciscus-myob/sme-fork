import {
  getAddPhoneButton,
  getCalculatedAge,
  getGenderOptions,
  getPersonalDetail,
} from '../PersonalDetailsNzSelector';

describe('EmployeeDetailNzSelectors', () => {
  const state = {
    personalDetail: {
      firstName: 'Bob',
      lastName: 'The Builder',
      phoneNumbers: [91919191],
    },
    genderOptions: [
      { name: '-', value: 'NotSet' },
      { name: 'Male', value: 'Male' },
    ],
  };

  describe('getPersonalDetail', () => {
    it('should return personal details', () => {
      const expectedState = state.personalDetail;

      const actual = getPersonalDetail(state);

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
        personalDetail: {
          phoneNumbers: [91988, 353, 535],
        },
      };

      const actual = getAddPhoneButton(newState);

      expect(actual).toEqual(false);
    });
  });

  describe('getCalculatedAge', () => {
    afterEach(jest.resetAllMocks);
    beforeEach(() => {});
    const dateOfBirth = '2000-01-01T00:00:00';
    const updatedState = {
      personalDetail: {
        dateOfBirth,
      },
    };
    const mockCurrentTime = (date) => {
      jest.spyOn(global.Date, 'now').mockReturnValue(date.getTime());
    };

    it('should caculate the age', () => {
      const currentDate = new Date('2010-01-02T00:00:00');
      mockCurrentTime(currentDate);

      expect(getCalculatedAge(updatedState)).toEqual('10');
    });

    it('should return "-" if date of birth is not available', () => {
      const currentDate = new Date('2010-01-02T00:00:00');
      mockCurrentTime(currentDate);
      const stateWithoutDoB = {
        personalDetail: {},
      };

      expect(getCalculatedAge(stateWithoutDoB)).toEqual('-');
    });
  });

  describe('getGenderOptions', () => {
    it('should retrieve the genderOptions', () => {
      const { genderOptions } = state;
      expect(getGenderOptions(state)).toEqual(genderOptions);
    });
  });
});
