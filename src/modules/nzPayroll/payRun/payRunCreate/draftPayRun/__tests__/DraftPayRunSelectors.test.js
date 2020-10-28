import {
  getEmployeePayId,
  getFormattedEmployeePayLines,
  getIsAllSelected,
  getIsPartiallySelected,
  getKiwiSaverPayLineEntries,
  getNumberOfSelected,
  getShouldShowKiwiSaverPayLines,
  getShouldShowTaxPayLines,
  getShouldShowWagePayLines,
  getTaxPayLineEntries,
  getTotals,
  getUpdateDraftPayRunRequest,
  getUpdateEmployeePayRequest,
  getWagePayLineEntries,
  isPayLineDirty,
} from '../DraftPayRunSelectors';
import draftPayRun from './fixtures/stateWithEmployeePayLines';
import kiwiSaverPayLineEntries from './fixtures/kiwiSaverPayLineEntries';
import taxPayLineEntries from './fixtures/taxPayLineEntries';
import updateEmployeePayRequest from './fixtures/updateEmployeePayRequest';
import wagePayLineEntries from './fixtures/wagePayLineEntries';

describe('draftPayRunSelectors', () => {
  describe('getIsPartiallySelected', () => {
    it('returns false when all selected', () => {
      const state = {
        draftPayRun: {
          lines: [{ isSelected: true }, { isSelected: true }],
        },
      };

      expect(getIsPartiallySelected(state)).toBe(false);
    });

    it('returns false when none selected', () => {
      const state = {
        draftPayRun: {
          lines: [{ isSelected: false }, { isSelected: false }],
        },
      };

      expect(getIsPartiallySelected(state)).toBe(false);
    });

    it('returns true when some selected', () => {
      const state = {
        draftPayRun: {
          lines: [{ isSelected: true }, { isSelected: false }],
        },
      };

      expect(getIsPartiallySelected(state)).toBe(true);
    });
  });

  describe('getTotals', () => {
    it('calculates totals', () => {
      const state = {
        draftPayRun: {
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

  describe('getWagePayLineEntries', () => {
    it('returns sorted wage pay item entries', () => {
      const actualWagePayLineEntries = getWagePayLineEntries(draftPayRun, {
        employeeId: 21,
      });

      const expectedWagePayLineEntries = wagePayLineEntries;

      expect(actualWagePayLineEntries).toEqual(expectedWagePayLineEntries);
    });
  });

  describe('getTaxPayLineEntries', () => {
    it('returns tax pay item entries', () => {
      const actualTaxPayLineEntries = getTaxPayLineEntries(draftPayRun, {
        employeeId: 21,
      });

      const expectedTaxPayLineEntries = taxPayLineEntries;

      expect(actualTaxPayLineEntries).toEqual(expectedTaxPayLineEntries);
    });
  });

  describe('getKiwiSaverPayLineEntries', () => {
    it('returns employer expense pay items without the hours field', () => {
      const actualEmployerExpensePayLineEntries = getKiwiSaverPayLineEntries(
        draftPayRun,
        { employeeId: 21 }
      );

      const expectedEmployerExpensePayLineEntries = kiwiSaverPayLineEntries;

      expect(actualEmployerExpensePayLineEntries).toEqual(
        expectedEmployerExpensePayLineEntries
      );
    });
  });

  describe('getShouldShowWagePayLines', () => {
    it('returns true when employee has at least one wage pay item', () => {
      const actual = getShouldShowWagePayLines(draftPayRun, {
        employeeId: 21,
      });
      const expected = true;

      expect(actual).toEqual(expected);
    });

    it('returns false when employee has no wage pay item', () => {
      const state = {
        draftPayRun: {
          lines: [
            {
              employeeId: 21,
              payLines: [
                {
                  type: 'Tax',
                },
              ],
            },
          ],
        },
      };
      const actual = getShouldShowWagePayLines(state, { employeeId: 21 });
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('getShouldShowTaxPayLine', () => {
    it('returns true when employee has at least one tax pay item', () => {
      const actual = getShouldShowTaxPayLines(draftPayRun, {
        employeeId: 21,
      });
      const expected = true;

      expect(actual).toEqual(expected);
    });

    it('returns false when employee has no tax pay item', () => {
      const state = {
        draftPayRun: {
          lines: [
            {
              employeeId: 21,
              payLines: [
                {
                  type: 'Deduction',
                },
              ],
            },
          ],
        },
      };
      const actual = getShouldShowTaxPayLines(state, { employeeId: 21 });
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('getShouldShowKiwiSaverPayLines', () => {
    it('returns true when employee has at least one KiwiSaver pay item', () => {
      const actual = getShouldShowKiwiSaverPayLines(draftPayRun, {
        employeeId: 21,
      });
      const expected = true;

      expect(actual).toEqual(expected);
    });
    it('returns false when employee has no KiwiSaver pay item', () => {
      const state = {
        draftPayRun: {
          lines: [
            {
              employeeId: 21,
              payLines: [
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
      const actual = getShouldShowKiwiSaverPayLines(state, {
        employeeId: 21,
      });
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('getUpdateEmployeePayRequest', () => {
    it('returns the request to update an employee pay', () => {
      const actualPayload = getUpdateEmployeePayRequest({
        state: draftPayRun,
        employeeId: 21,
      });
      const expectedRequest = updateEmployeePayRequest;

      expect(actualPayload).toEqual(expectedRequest);
    });
  });

  describe('getFormattedEmployeePayLines', () => {
    it('returns all lines correctly formatted to decimal', () => {
      const state = {
        draftPayRun: {
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
        draftPayRun: {
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
        draftPayRun: {
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
        draftPayRun: {
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
        draftPayRun: {
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
        draftPayRun: {
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

  describe('isPayLineDirty', () => {
    it('should get is pay item line dirty', () => {
      const state = {
        draftPayRun: {
          isPayLineDirty: true,
        },
      };

      const actual = isPayLineDirty(state);

      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('getEmployeePayId', () => {
    it('should get employee pay id', () => {
      const state = {
        draftPayRun: {
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

  describe('getUpdateDraftPayRunRequest', () => {
    it('returns the request to update the selected employees in draft pay run', () => {
      const actualPayload = getUpdateDraftPayRunRequest(draftPayRun);
      const expectedRequest = {
        employeePays: [
          {
            id: 217,
            isSelected: true,
          },
          {
            id: 218,
            isSelected: false,
          },
        ],
      };

      expect(actualPayload).toEqual(expectedRequest);
    });
  });
});
