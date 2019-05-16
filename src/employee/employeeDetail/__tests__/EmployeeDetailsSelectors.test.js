import { getCalculatedAge, getMainTab, getSubTab } from '../EmployeeDetailSelectors';
import { mainTabIds, payrollDetailsSubTabIds } from '../tabItems';

describe('employeeDetailSelectors', () => {
  describe('getMainTab', () => {
    it('returns main tab from state', () => {
      const mainTab = mainTabIds.contactDetails;
      const state = {
        mainTab,
      };
      const expected = mainTab;
      const actual = getMainTab(state);

      expect(actual).toBe(expected);
    });

    it('returns first main tab when the main tab in state is invalid', () => {
      const state = {
        mainTab: '',
      };
      const expected = Object.values(mainTabIds)[0];
      const actual = getMainTab(state);

      expect(actual).toBe(expected);
    });
  });

  describe('getSubTab', () => {
    it('returns sub tab from state', () => {
      const subTab = payrollDetailsSubTabIds.employmentDetails;
      const state = {
        mainTab: 'payrollDetails',
        subTab,
      };
      const expected = subTab;
      const actual = getSubTab(state);

      expect(actual).toBe(expected);
    });

    it('returns first sub tab when the sub tab in state is invalid', () => {
      const state = {
        mainTab: 'payrollDetails',
        subTab: 'something',
      };
      const expected = Object.values(payrollDetailsSubTabIds)[0];
      const actual = getSubTab(state);

      expect(actual).toBe(expected);
    });
  });

  describe('getCalculatedAge', () => {
    it('Calculates the users age from birthday to current date', () => {
      const dateOfBirth = '1985-07-20';
      const state = {
        payrollDetails: {
          employmentDetails: {
            dateOfBirth,
          },
        },
      };
      const expected = '33';
      const actual = getCalculatedAge(state);
      expect(actual).toBe(expected);
    });
    it('Returns 0 when the date of birth is unset', () => {
      const dateOfBirth = '';
      const state = {
        payrollDetails: {
          employmentDetails: {
            dateOfBirth,
          },
        },
      };
      const expected = '0';
      const actual = getCalculatedAge(state);
      expect(actual).toBe(expected);
    });
  });
});
