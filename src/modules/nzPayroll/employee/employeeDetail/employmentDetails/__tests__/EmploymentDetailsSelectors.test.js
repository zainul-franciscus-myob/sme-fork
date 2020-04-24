import {
  getCalculatedAge,
  getDateOfBirth,
  getEmploymentStatus,
  getGender,
  getGenderOptions,
  getStartDate,
  getTerminationDate,
} from '../EmploymentDetailsSelectors';

describe('EmploymentDetailsSelectors', () => {
  describe('getDateOfBirth', () => {
    it('should retrieve the date of birth', () => {
      const dateOfBirth = '1976-02-28T00:00:00';
      const state = {
        payrollDetails: {
          employmentDetails: {
            dateOfBirth,
          },
        },
      };
      expect(getDateOfBirth(state)).toEqual(dateOfBirth);
    });
  });

  describe('getCalculatedAge', () => {
    afterEach(jest.resetAllMocks);
    beforeEach(() => {

    });
    const dateOfBirth = '2000-01-01T00:00:00';
    const state = {
      payrollDetails: {
        employmentDetails: {
          dateOfBirth,
        },
      },
    };
    const mockCurrentTime = date => {
      jest
        .spyOn(global.Date, 'now')
        .mockReturnValue(date.getTime());
    };

    it('should caculate the age', () => {
      const currentDate = new Date('2010-01-02T00:00:00');
      mockCurrentTime(currentDate);

      expect(getCalculatedAge(state)).toEqual('10');
    });

    it('should return "-" if date of birth is not available', () => {
      const currentDate = new Date('2010-01-02T00:00:00');
      mockCurrentTime(currentDate);
      const stateWithoutDoB = {
        payrollDetails: {
          employmentDetails: {
          },
        },
      };

      expect(getCalculatedAge(stateWithoutDoB)).toEqual('-');
    });

    it('should return "-" if date of birth is before current date', () => {
      const currentDate = new Date('1010-01-02T00:00:00');
      mockCurrentTime(currentDate);

      expect(getCalculatedAge(state)).toEqual('-');
    });
  });

  describe('getGender', () => {
    it('should retrieve the gender', () => {
      const gender = 'NotSet';
      const state = {
        payrollDetails: {
          employmentDetails: {
            gender,
          },
        },
      };
      expect(getGender(state)).toEqual(gender);
    });
  });

  describe('getGenderOptions', () => {
    it('should retrieve the genderOptions', () => {
      const genderOptions = [{ name: 'Gender 1', value: 'Gender 1' }];
      const state = {
        genderOptions,
      };

      expect(getGenderOptions(state)).toEqual(genderOptions);
    });
  });

  describe('getStartDate', () => {
    it('should retrieve the startDate', () => {
      const startDate = '2010-0-01T:00:00:00';
      const state = {
        payrollDetails: {
          employmentDetails: {
            startDate,
          },
        },
      };
      expect(getStartDate(state)).toEqual(startDate);
    });
  });

  describe('getTerminationDateDate', () => {
    it('should retrieve the terminationDate', () => {
      const terminationDate = '2015-0-01T:00:00:00';
      const state = {
        payrollDetails: {
          employmentDetails: {
            terminationDate,
          },
        },
      };
      expect(getTerminationDate(state)).toEqual(terminationDate);
    });
  });

  describe('getEmploymentStatus', () => {
    it('should retrieve the terminationDate', () => {
      const employmentStatus = 'Casual';
      const state = {
        payrollDetails: {
          employmentDetails: {
            employmentStatus,
          },
        },
      };
      expect(getEmploymentStatus(state)).toEqual(employmentStatus);
    });
  });
});
