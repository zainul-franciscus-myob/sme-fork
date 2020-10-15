import {
  getEmployeePayId,
  getFormattedEmployeePayLines,
  getIsAllSelected,
  getIsPartiallySelected,
  getKiwiSaverPayItemEntries,
  getNumberOfSelected,
  getShouldShowKiwiSaverPayItems,
  getShouldShowTaxPayItems,
  getShouldShowWagePayItems,
  getTaxPayItemEntries,
  getTotals,
  getUpdateEmployeePayRequest,
  getWagePayItemEntries,
  isPayItemLineDirty,
} from '../EmployeePayListSelectors';
import employeePayList from './fixtures/stateWithEmployeePayItems';
import kiwiSaverPayItemEntries from './fixtures/kiwiSaverPayItemEntries';
import taxPayItemEntries from './fixtures/taxPayItemEntries';
import updateEmployeePayRequest from './fixtures/updateEmployeePayRequest';
import wagePayItemEntries from './fixtures/wagePayItemEntries';

describe('EmployeePayListSelectors', () => {
  describe('getIsPartiallySelected', () => {
    it('returns false when all selected', () => {
      const state = {
        employeePayList: {
          lines: [{ isSelected: true }, { isSelected: true }],
        },
      };

      expect(getIsPartiallySelected(state)).toBe(false);
    });

    it('returns false when none selected', () => {
      const state = {
        employeePayList: {
          lines: [{ isSelected: false }, { isSelected: false }],
        },
      };

      expect(getIsPartiallySelected(state)).toBe(false);
    });

    it('returns true when some selected', () => {
      const state = {
        employeePayList: {
          lines: [{ isSelected: true }, { isSelected: false }],
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
              paye: 100,
              daysPaid: 300,
              takeHomePay: 700,
              kiwiSaver: 150,
              isSelected: true,
            },
            {
              employeeId: '21',
              name: 'Mary Jones',
              gross: 1400,
              paye: 200,
              daysPaid: 400,
              takeHomePay: 800,
              kiwiSaver: 250,
              isSelected: false,
            },
            {
              employeeId: '22',
              name: 'Mary Jones',
              gross: 1600,
              paye: 150,
              daysPaid: 500,
              takeHomePay: 900,
              kiwiSaver: 350,
              isSelected: true,
            },
          ],
        },
      };

      const expected = {
        gross: '3,100.00',
        paye: '250.00',
        takeHomePay: '1,600.00',
        kiwiSaver: '500.00',
      };

      const actual = getTotals(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getWagePayItemEntries', () => {
    it('returns sorted wage pay item entries', () => {
      const actualWagePayItemEntries = getWagePayItemEntries(employeePayList, {
        employeeId: 21,
      });

      const expectedWagePayItemEntries = wagePayItemEntries;

      expect(actualWagePayItemEntries).toEqual(expectedWagePayItemEntries);
    });
  });

  describe('getTaxPayItemEntries', () => {
    it('returns tax pay item entries', () => {
      const actualTaxPayItemEntries = getTaxPayItemEntries(employeePayList, {
        employeeId: 21,
      });

      const expectedTaxPayItemEntries = taxPayItemEntries;

      expect(actualTaxPayItemEntries).toEqual(expectedTaxPayItemEntries);
    });
  });

  describe('getKiwiSaverPayItemEntries', () => {
    it('returns employer expense pay items without the hours field', () => {
      const actualEmployerExpensePayItemEntries = getKiwiSaverPayItemEntries(
        employeePayList,
        { employeeId: 21 }
      );

      const expectedEmployerExpensePayItemEntries = kiwiSaverPayItemEntries;

      expect(actualEmployerExpensePayItemEntries).toEqual(
        expectedEmployerExpensePayItemEntries
      );
    });
  });

  describe('getShouldShowWagePayItems', () => {
    it('returns true when employee has at least one wage pay item', () => {
      const actual = getShouldShowWagePayItems(employeePayList, {
        employeeId: 21,
      });
      const expected = true;

      expect(actual).toEqual(expected);
    });

    it('returns false when employee has no wage pay item', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              employeeId: 21,
              payItems: [
                {
                  type: 'Tax',
                },
              ],
            },
          ],
        },
      };
      const actual = getShouldShowWagePayItems(state, { employeeId: 21 });
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('getShouldShowTaxPayItem', () => {
    it('returns true when employee has at least one tax pay item', () => {
      const actual = getShouldShowTaxPayItems(employeePayList, {
        employeeId: 21,
      });
      const expected = true;

      expect(actual).toEqual(expected);
    });

    it('returns false when employee has no tax pay item', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              employeeId: 21,
              payItems: [
                {
                  type: 'Deduction',
                },
              ],
            },
          ],
        },
      };
      const actual = getShouldShowTaxPayItems(state, { employeeId: 21 });
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('getShouldShowKiwiSaverPayItems', () => {
    it('returns true when employee has at least one KiwiSaver pay item', () => {
      const actual = getShouldShowKiwiSaverPayItems(employeePayList, {
        employeeId: 21,
      });
      const expected = true;

      expect(actual).toEqual(expected);
    });
    it('returns false when employee has no KiwiSaver pay item', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              employeeId: 21,
              payItems: [
                {
                  type: 'Tax',
                },
                {
                  type: 'Expense',
                },
              ],
            },
          ],
        },
      };
      const actual = getShouldShowKiwiSaverPayItems(state, {
        employeeId: 21,
      });
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('getUpdateEmployeePayRequest', () => {
    it('returns the request to update an employee pay', () => {
      const actualPayload = getUpdateEmployeePayRequest({
        state: employeePayList,
        employeeId: 21,
      });
      const expectedRequest = updateEmployeePayRequest;

      expect(actualPayload).toEqual(expectedRequest);
    });
  });

  describe('getFormattedEmployeePayLines', () => {
    it('returns all lines correctly formatted to decimal', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              daysPaid: 5,
              gross: 1500,
              paye: 100,
              takeHomePay: 700,
              kiwiSaver: 150,
            },
          ],
        },
      };

      const expected = [
        {
          daysPaid: '5',
          gross: '1,500.00',
          paye: '100.00',
          takeHomePay: '700.00',
          kiwiSaver: '150.00',
        },
      ];

      const actual = getFormattedEmployeePayLines(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getIsAllSelected', () => {
    it('should return true when all lines are selected', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              isSelected: true,
            },
            {
              isSelected: true,
            },
          ],
        },
      };

      const actual = getIsAllSelected(state);

      expect(actual).toEqual(true);
    });

    it('should return false when there are unselected lines', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              isSelected: true,
            },
            {
              isSelected: false,
            },
          ],
        },
      };

      const actual = getIsAllSelected(state);

      expect(actual).toEqual(false);
    });

    it('should return true when there are no lines', () => {
      const state = {
        employeePayList: {
          lines: [],
        },
      };

      const actual = getIsAllSelected(state);

      expect(actual).toEqual(true);
    });
  });

  describe('getNumberOfSelected', () => {
    it('should return the number of lines selected', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              isSelected: true,
            },
            {
              isSelected: true,
            },
            {
              isSelected: false,
            },
          ],
        },
      };

      const actual = getNumberOfSelected(state);

      const expected = 2;

      expect(actual).toEqual(expected);
    });

    it('should return 0 when no lines are selected', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              isSelected: false,
            },
          ],
        },
      };

      const actual = getNumberOfSelected(state);

      const expected = 0;

      expect(actual).toEqual(expected);
    });
  });

  describe('isPayItemLineDirty', () => {
    it('should get is pay item line dirty', () => {
      const state = {
        employeePayList: {
          isPayItemLineDirty: true,
        },
      };

      const actual = isPayItemLineDirty(state);

      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('getEmployeePayId', () => {
    it('should get employee pay id', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              employeeId: 7,
              id: 666,
            },
          ],
        },
      };

      const actual = getEmployeePayId({ state, employeeId: 7 });

      const expected = 666;

      expect(actual).toEqual(expected);
    });
  });
});
