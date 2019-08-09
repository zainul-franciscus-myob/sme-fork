import { getFilteredWagePayItemOptions, getSelectedWagePayItems } from '../PayrollWageSelectors';

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
});
