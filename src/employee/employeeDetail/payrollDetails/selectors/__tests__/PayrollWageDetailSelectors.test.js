import {
  getBaseWagePayItemIdByPayBasis,
  getFilteredWagePayItemOptions,
  getIsBaseWagePayItemId,
  getIsSalaryByPayBasis,
  getIsWageDetailsInputChangedOnBlur,
  getSelectedWagePayItems,
} from '../PayrollWageSelectors';

describe('PayrollWageSelectors', () => {
  describe('getFilteredWagePayItemOptions', () => {
    it('should not contain pay item that has already been allocated', () => {
      const availablePayItems = [{ id: '1' }, { id: '2' }];
      const allocatedPayItems = [{ id: '1' }];

      const actual = getFilteredWagePayItemOptions
        .resultFunc(availablePayItems, allocatedPayItems);

      const expected = [{ id: '2' }];

      expect(actual).toEqual(expected);
    });
  });

  describe('getSelectedWagePayItems', () => {
    it('get selected wage pay items when selected pay basis is salary', () => {
      const availablePayItems = [
        { id: '1', name: 'name1', type: 'WagePayrollCategory' },
        { id: '2', name: 'name2', type: 'WagePayrollCategory' },
        { id: '3', name: 'name3', type: 'WagePayrollCategory' },
      ];
      const allocatedPayItems = [{ id: '1' }, { id: '2' }];
      const isSelectedPayBasisSalary = true;
      const baseSalaryWagePayItemId = '1';
      const baseHourlyWagePayItemId = '2';

      const expected = [
        {
          id: '1',
          name: 'name1',
          type: 'WagePayrollCategory',
          isRemovable: false,
          tooltipText: 'All salaried employees must be linked to the Base salary wage pay item',
        },
        {
          id: '2',
          name: 'name2',
          type: 'WagePayrollCategory',
          isRemovable: true,
          tooltipText: 'All Base hourly employees must be linked to the Base hourly wage pay item',
        },
      ];

      const actual = getSelectedWagePayItems.resultFunc(
        availablePayItems,
        allocatedPayItems,
        isSelectedPayBasisSalary,
        baseSalaryWagePayItemId,
        baseHourlyWagePayItemId,
      );

      expect(actual).toEqual(expected);
    });

    it('get selected wage pay items when selected pay basis is hourly', () => {
      const availablePayItems = [
        { id: '1', name: 'name1', type: 'WagePayrollCategory' },
        { id: '2', name: 'name2', type: 'WagePayrollCategory' },
        { id: '3', name: 'name3', type: 'WagePayrollCategory' },
      ];
      const allocatedPayItems = [{ id: '1' }, { id: '2' }];
      const isSelectedPayBasisSalary = false;
      const baseSalaryWagePayItemId = '1';
      const baseHourlyWagePayItemId = '2';

      const expected = [
        {
          id: '1',
          name: 'name1',
          type: 'WagePayrollCategory',
          isRemovable: true,
          tooltipText: 'All salaried employees must be linked to the Base salary wage pay item',
        },
        {
          id: '2',
          name: 'name2',
          type: 'WagePayrollCategory',
          isRemovable: false,
          tooltipText: 'All Base hourly employees must be linked to the Base hourly wage pay item',
        },
      ];

      const actual = getSelectedWagePayItems.resultFunc(
        availablePayItems,
        allocatedPayItems,
        isSelectedPayBasisSalary,
        baseSalaryWagePayItemId,
        baseHourlyWagePayItemId,
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('getIsSalaryByPayBasis', () => {
    it.each([
      ['Salary', true],
      ['Hourly', false],
    ])('when payBasis is %s should return %s', (payBasis, expected) => {
      const actual = getIsSalaryByPayBasis(payBasis);

      expect(actual).toEqual(expected);
    });
  });

  describe('getBaseWagePayItemIdByPayBasis', () => {
    it.each([
      ['Salary', '11'],
      ['Hourly', '12'],
    ])('when payBasis is %s should return %s', (payBasis, expected) => {
      const state = {
        baseSalaryWagePayItemId: '11',
        baseHourlyWagePayItemId: '12',
      };

      const actual = getBaseWagePayItemIdByPayBasis(state, payBasis);

      expect(actual).toEqual(expected);
    });
  });

  describe('getIsWageDetailsInputChangedOnBlur', () => {
    it.each([
      ['annualSalary', '1', 'appliedAnnualSalary', '0', true],
      ['annualSalary', '1', 'appliedAnnualSalary', '1', false],
      ['hourlyRate', '1', 'appliedHourlyRate', '0', true],
      ['hourlyRate', '1', 'appliedHourlyRate', '1', false],
      ['payPeriodHours', '1', 'appliedPayPeriodHours', '0', true],
      ['payPeriodHours', '1', 'appliedPayPeriodHours', '1', false],
      ['selectedPayCycle', 'weekly', 'appliedSelectedPayCycle', 'weekly', true],
      ['selectedPayCycle', 'weekly', 'appliedSelectedPayCycle', 'monthly', true],
      ['random', 'a', 'appliedRandom', 'a', true],
    ])('should check whether %s is changed on blur', (
      key, value, appliedKey, appliedValue, expected,
    ) => {
      const state = {
        payrollDetails: {
          wage: {
            annualSalary: 'annualSalary',
            hourlyRate: 'hourlyRate',
            payPeriodHours: 'payPeriodHours',
            appliedAnnualSalary: 'appliedAnnualSalary',
            appliedHourlyRate: 'appliedHourlyRate',
            appliedPayPeriodHours: 'appliedPayPeriodHours',
            [key]: value,
            [appliedKey]: appliedValue,
          },
        },
      };

      const actual = getIsWageDetailsInputChangedOnBlur(state, key);

      expect(actual).toEqual(expected);
    });
  });

  describe('getIsBaseWagePayItemId', () => {
    it.each([
      ['11', true],
      ['12', true],
      ['13', false],
    ])('should check if payItemId is base salary or base hourly payItemId', (payItemId, expected) => {
      const state = {
        baseSalaryWagePayItemId: '11',
        baseHourlyWagePayItemId: '12',
      };

      const actual = getIsBaseWagePayItemId(state, payItemId);

      expect(actual).toEqual(expected);
    });
  });
});
