import { getPageTitle } from '../EmployeePayDetailSelectors';

describe('EmployeePayDetailSelectors', () => {
  describe('getPageTitle', () => {
    it('should get the page title', () => {
      const state = {
        employeePay: {
          employeeFirstName: 'John',
          employeeLastName: 'Doe',
          referenceNumber: 'REF0001',
        },
      };

      const actual = getPageTitle(state);

      expect(actual).toEqual('John Doe REF0001');
    });
  });
});
