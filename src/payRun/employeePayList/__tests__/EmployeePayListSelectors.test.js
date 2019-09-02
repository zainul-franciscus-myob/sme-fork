import { getIsPartiallySelected, getTotals } from '../EmployeePayListSelectors';

describe('EmployeePayListSelectors', () => {
  describe('getIsPartiallySelected', () => {
    it('returns false when all selected', () => {
      const state = {
        employeePayList: {
          lines: [
            { isSelected: true },
            { isSelected: true },
          ],
        },
      };

      expect(getIsPartiallySelected(state)).toBe(false);
    });

    it('returns false when none selected', () => {
      const state = {
        employeePayList: {
          lines: [
            { isSelected: false },
            { isSelected: false },
          ],
        },
      };

      expect(getIsPartiallySelected(state)).toBe(false);
    });

    it('returns true when some selected', () => {
      const state = {
        employeePayList: {
          lines: [
            { isSelected: true },
            { isSelected: false },
          ],
        },
      };

      expect(getIsPartiallySelected(state)).toBe(true);
    });
  });

  describe('getTotals', () => {
    it('calculates totals', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              employeeId: '20',
              name: 'Mary Jones',
              gross: 1500,
              payg: 100,
              deduction: 300,
              netPay: 700,
              super: 150,
              isSelected: true,
            },
            {
              employeeId: '21',
              name: 'Mary Jones',
              gross: 1400,
              payg: 200,
              deduction: 400,
              netPay: 800,
              super: 250,
              isSelected: false,
            },
            {
              employeeId: '22',
              name: 'Mary Jones',
              gross: 1600,
              payg: 150,
              deduction: 500,
              netPay: 900,
              super: 350,
              isSelected: true,
            },
          ],
        },
      };

      const expected = {
        gross: '3,100.00',
        payg: '250.00',
        deduction: '800.00',
        netPay: '1,600.00',
        super: '500.00',
      };

      const actual = getTotals(state);

      expect(actual).toEqual(expected);
    });
  });
});
