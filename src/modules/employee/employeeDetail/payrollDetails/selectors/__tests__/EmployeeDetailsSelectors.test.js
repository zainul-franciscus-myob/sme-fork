import { getIsPaySlipEmailRequired } from '../EmploymentDetailsSelectors';
import { getMainTab, getSubTab, sortPayItems } from '../../../EmployeeDetailSelectors';
import { mainTabIds, payrollDetailsSubTabIds } from '../../../tabItems';

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

  describe('sortPayItems', () => {
    it('sorts pay items', () => {
      const payItems = [{
        payItemId: '3',
        name: 'B Hourly',
        payBasis: 'Hourly',
      }, {
        payItemId: '1',
        name: 'Base Salary',
        payBasis: 'Salary',
      }, {
        payItemId: '4',
        name: 'A Hourly',
        payBasis: 'Hourly',
      }, {
        payItemId: '5',
        name: 'C Salary',
        payBasis: 'Salary',
      }, {
        payItemId: '6',
        name: 'A Salary',
        payBasis: 'Salary',
      }, {
        payItemId: '7',
        name: 'B Salary',
        payBasis: 'Salary',
      }];
      const baseSalaryWagePayItemId = '1';
      const baseHourlyWagePayItemId = '2';
      const expected = [{
        payItemId: '1',
        name: 'Base Salary',
        payBasis: 'Salary',
      }, {
        payItemId: '4',
        name: 'A Hourly',
        payBasis: 'Hourly',
      }, {
        payItemId: '3',
        name: 'B Hourly',
        payBasis: 'Hourly',
      }, {
        payItemId: '6',
        name: 'A Salary',
        payBasis: 'Salary',
      }, {
        payItemId: '7',
        name: 'B Salary',
        payBasis: 'Salary',
      }, {
        payItemId: '5',
        name: 'C Salary',
        payBasis: 'Salary',
      }];

      const actual = sortPayItems({
        payItems,
        baseSalaryWagePayItemId,
        baseHourlyWagePayItemId,
      });

      expect(actual).toEqual(expected);
    });

    it('does not sort base pay items', () => {
      const payItems = [{
        payItemId: '1',
        name: 'Base Salary',
        payBasis: 'Salary',
      }, {
        payItemId: '4',
        name: 'Base Hourly',
        payBasis: 'Hourly',
      }];
      const baseSalaryWagePayItemId = '1';
      const baseHourlyWagePayItemId = '4';
      const expected = [{
        payItemId: '1',
        name: 'Base Salary',
        payBasis: 'Salary',
      }, {
        payItemId: '4',
        name: 'Base Hourly',
        payBasis: 'Hourly',
      }];

      const actual = sortPayItems({
        payItems,
        baseSalaryWagePayItemId,
        baseHourlyWagePayItemId,
      });

      expect(actual).toEqual(expected);
    });
  });

  describe('getIsPaySlipEmailRequired', () => {
    it('returns true when paySlipDelivery is ToBeEmailed', () => {
      const state = {
        payrollDetails: {
          employmentDetails: {
            paySlipDelivery: 'ToBeEmailed',
          },
        },
      };

      const actual = getIsPaySlipEmailRequired(state);

      expect(actual).toBe(true);
    });

    it('returns true when paySlipDelivery is ToBePrintedAndEmailed', () => {
      const state = {
        payrollDetails: {
          employmentDetails: {
            paySlipDelivery: 'ToBePrintedAndEmailed',
          },
        },
      };

      const actual = getIsPaySlipEmailRequired(state);

      expect(actual).toBe(true);
    });

    it('returns false when paySlipDelivery is ToBePrinted', () => {
      const state = {
        payrollDetails: {
          employmentDetails: {
            paySlipDelivery: 'ToBePrinted',
          },
        },
      };

      const actual = getIsPaySlipEmailRequired(state);

      expect(actual).toBe(false);
    });

    it('returns false when paySlipDelivery is AlreadyPrintedOrSent', () => {
      const state = {
        payrollDetails: {
          employmentDetails: {
            paySlipDelivery: 'AlreadyPrintedOrSent',
          },
        },
      };

      const actual = getIsPaySlipEmailRequired(state);

      expect(actual).toBe(false);
    });
  });
});
