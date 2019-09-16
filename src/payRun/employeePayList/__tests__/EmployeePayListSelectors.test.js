import {
  getCombinedPayItemEntries,
  getEmployerExpensePayItemEntries,
  getIsEtpAlertForLineShown,
  getIsEtpSelectionForLineShown,
  getIsPartiallySelected,
  getIsValidEtp,
  getLeavePayItemEntries,
  getRecalculatePayPayload,
  getShouldShowCombinedPayItemTableRows,
  getShouldShowExpensePayItemTableRows,
  getShouldShowLeavePayItemTableRows,
  getTotals,
  getValidateEtpContent,
} from '../EmployeePayListSelectors';
import EtpCode from '../types/EtpCode';
import combinedPayItemEntries from './fixtures/combinedPayItemEntries';
import employeePayList from './fixtures/stateWithEmployeePayItems';
import employerExpensePayItemEntries from './fixtures/employerExpensePayItemEntries';
import expectedRecalculatePayPayload from './fixtures/expectedRecalculatePayPayload';
import leavePayItemEntries from './fixtures/leavePayItemEntries';

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

  describe('getValidateEtpContent', () => {
    it('builds content', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              employeeId: '1',
              name: 'Tony',
              payItems: [
                {
                  payItemId: '1',
                  amount: '1.00',
                  stpCategory: 'something else',
                },
              ],
            },
            {
              employeeId: '2',
              name: 'Edward',
              etpCode: EtpCode.B,
              payItems: [
                {
                  payItemId: '2',
                  amount: '2.00',
                  stpCategory: 'ETPTaxableComponent',
                },
              ],
            },
          ],
        },
      };

      const actual = getValidateEtpContent(state);

      expect(actual).toEqual([
        {
          employeeId: '1',
          name: 'Tony',
          etpCode: undefined,
          payItems: [
            {
              payItemId: '1',
              amount: '1.00',
              stpCategory: 'something else',
            },
          ],
        },
        {
          employeeId: '2',
          name: 'Edward',
          etpCode: EtpCode.B,
          payItems: [
            {
              payItemId: '2',
              amount: '2.00',
              stpCategory: 'ETPTaxableComponent',
            },
          ],
        },
      ]);
    });
  });

  describe('getIsEtpSelectionForLineShown', () => {
    const line = {
      payItems: [
        {
          stpCategory: 'ETPTaxableComponent',
          amount: '1.00',
        },
      ],
      etpCode: undefined,
    };


    [
      {
        stpCategory: 'ETPTaxableComponent',
      },
      {
        stpCategory: 'ETPTaxFreeComponent',
      },
      {
        stpCategory: 'ETPTaxWithholding',
      },
    ].forEach((test) => {
      it(`true when has ${test.stpCategory}, non empty amount and no etpCode`, () => {
        const modifiedLine = {
          ...line,
          payItems: line.payItems.map(payItem => ({ ...payItem, stpCategory: test.stpCategory })),
        };
        const actual = getIsEtpAlertForLineShown(modifiedLine);

        expect(actual).toEqual(true);
      });
    });

    it('true when has existing etpCode', () => {
      const modifiedLine = {
        ...line,
        etpCode: EtpCode.B,
      };

      const actual = getIsEtpSelectionForLineShown(modifiedLine);

      expect(actual).toEqual(true);
    });

    it('false when has empty etp pay item', () => {
      const modifiedLine = {
        ...line,
        payItems: line.payItems.map(payItem => ({ ...payItem, amount: '0.00' })),
      };

      const actual = getIsEtpSelectionForLineShown(modifiedLine);

      expect(actual).toEqual(false);
    });

    it('false when has no etp pay items', () => {
      const modifiedLine = {
        ...line,
        payItems: line.payItems.map(payItem => ({ ...payItem, stpCategory: 'something else' })),
      };

      const actual = getIsEtpSelectionForLineShown(modifiedLine);

      expect(actual).toEqual(false);
    });
  });

  describe('getIsEtpAlertForLineShown', () => {
    const line = {
      payItems: [
        {
          stpCategory: 'ETPTaxableComponent',
          amount: '1.00',
        },
      ],
      etpCode: undefined,
    };

    [
      {
        stpCategory: 'ETPTaxableComponent',
      },
      {
        stpCategory: 'ETPTaxFreeComponent',
      },
      {
        stpCategory: 'ETPTaxWithholding',
      },
    ].forEach((test) => {
      it(`true when has ${test.stpCategory} and non empty amount`, () => {
        const modifiedLine = {
          ...line,
          payItems: line.payItems.map(payItem => ({ ...payItem, stpCategory: test.stpCategory })),
        };
        const actual = getIsEtpAlertForLineShown(modifiedLine);

        expect(actual).toEqual(true);
      });
    });

    it('false when has empty etp pay item', () => {
      const modifiedLine = {
        ...line,
        payItems: line.payItems.map(payItem => ({ ...payItem, amount: '0.00' })),
      };

      const actual = getIsEtpAlertForLineShown(modifiedLine);

      expect(actual).toEqual(false);
    });

    it('false when has no etp pay items', () => {
      const modifiedLine = {
        ...line,
        payItems: line.payItems.map(payItem => ({ ...payItem, stpCategory: 'something else' })),
      };

      const actual = getIsEtpAlertForLineShown(modifiedLine);

      expect(actual).toEqual(false);
    });
  });

  describe('getIsValidEtp', () => {
    it('true when empty names', () => {
      const invalidEtpNames = [];

      const actual = getIsValidEtp({ invalidEtpNames });

      expect(actual).toEqual(true);
    });

    it('false when has names', () => {
      const invalidEtpNames = ['Tony'];

      const actual = getIsValidEtp({ invalidEtpNames });

      expect(actual).toEqual(false);
    });
  });

  describe('getCombinedPayItemEntries', () => {
    it('returns combined pay item entries without the hours field, except for HourlyWage pay items', () => {
      const actualCombinedPayItemEntries = getCombinedPayItemEntries(employeePayList, { employeeId: '21' });

      const expectedCombinedPayItemEntries = combinedPayItemEntries;

      expect(actualCombinedPayItemEntries).toEqual(expectedCombinedPayItemEntries);
    });
  });

  describe('getLeavePayItemEntries', () => {
    it('returns leave pay items with the hours field', () => {
      const actualLeavePayItemEntries = getLeavePayItemEntries(employeePayList, { employeeId: '21' });

      const expectedLeavePayItemEntries = leavePayItemEntries;

      expect(actualLeavePayItemEntries).toEqual(expectedLeavePayItemEntries);
    });
  });

  describe('getEmployerExpensePayItemEntries', () => {
    it('returns employer expense pay items without the hours field', () => {
      const actualEmployerExpensePayItemEntries = getEmployerExpensePayItemEntries(employeePayList, { employeeId: '21' });

      const expectedEmployerExpensePayItemEntries = employerExpensePayItemEntries;

      expect(actualEmployerExpensePayItemEntries).toEqual(expectedEmployerExpensePayItemEntries);
    });
  });

  describe('getShouldShowCombinedPayItemTableRows', () => {
    it('should always shows combined pay item table rows', () => {
      const actual = getShouldShowCombinedPayItemTableRows();
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('getShouldShowLeavePayItemTableRows', () => {
    it('returns true when employee has at least one leave pay item', () => {
      const actual = getShouldShowLeavePayItemTableRows(employeePayList, { employeeId: '21' });
      const expected = true;

      expect(actual).toEqual(expected);
    });
    it('returns false when employee has no leave pay item', () => {
      const state = {
        employeePayList: {
          lines: [{
            employeeId: '21',
            payItems: [{
              type: 'Tax',
            }],
          }],
        },
      };
      const actual = getShouldShowLeavePayItemTableRows(state, { employeeId: '21' });
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('getShouldShowEmployerExpensePayItemTableRows', () => {
    it('returns true when employee has at least one employer expense pay item', () => {
      const actual = getShouldShowExpensePayItemTableRows(employeePayList, { employeeId: '21' });
      const expected = true;

      expect(actual).toEqual(expected);
    });
    it('returns false when employee has no employer expense pay item', () => {
      const state = {
        employeePayList: {
          lines: [{
            employeeId: '21',
            payItems: [{
              type: 'Tax',
            }],
          }],
        },
      };
      const actual = getShouldShowExpensePayItemTableRows(state, { employeeId: '21' });
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('getRecalculatedPayPayload', () => {
    it('returns the payload to recalculate the pay for a particular employee', () => {
      const actualPayload = getRecalculatePayPayload({
        state: employeePayList, employeeId: '21', payItemId: '2', key: 'hours',
      });
      const expectedPayload = expectedRecalculatePayPayload;

      expect(actualPayload).toEqual(expectedPayload);
    });
  });
});
