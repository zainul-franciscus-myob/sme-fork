import {
  formatEtpCode,
  getCombinedPayItemEntries,
  getEmployerExpensePayItemEntries,
  getIsPartiallySelected,
  getLeavePayItemEntries,
  getLeaveWarning,
  getRecalculatePayPayload,
  getShouldShowCombinedPayItemTableRows,
  getShouldShowExpensePayItemTableRows,
  getShouldShowLeavePayItemTableRows,
  getTotals,
  getValidateEtpContent,
  isEtpAlertForLineShown,
  isEtpSelectionForLineShown,
  isValidEtp,
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
    const state = {
      employeePayList: {
        lines: [
          {
            employeeId: '2',
            name: 'Edward',
            etpCode: EtpCode.B,
            isSelected: true,
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
      it(`builds content with selected employees that have pay items with ${test.stpCategory}`, () => {
        const modifiedState = {
          ...state,
          employeePayList: {
            ...state.employeePayList,
            lines: [
              ...state.employeePayList.lines.map(line => ({
                ...line,
                payItems: line.payItems.map(payItem => ({
                  ...payItem,
                  stpCategory: test.stpCategory,
                })),
              })),
            ],
          },
        };

        const actual = getValidateEtpContent(modifiedState);

        expect(actual).toEqual([
          {
            employeeId: '2',
            name: 'Edward',
            etpCode: EtpCode.B,
            payItems: [
              {
                payItemId: '2',
                amount: '2.00',
                stpCategory: test.stpCategory,
              },
            ],
          },
        ]);
      });
    });

    it('builds content with selected employees that have no etp pay items', () => {
      const modifiedState = {
        ...state,
        employeePayList: {
          ...state.employeePayList,
          lines: [
            ...state.employeePayList.lines.map(line => ({
              ...line,
              payItems: line.payItems.map(payItem => ({
                ...payItem,
                stpCategory: 'something else',
              })),
            })),
          ],
        },
      };

      const actual = getValidateEtpContent(modifiedState);

      expect(actual).toEqual([
        {
          employeeId: '2',
          name: 'Edward',
          etpCode: EtpCode.B,
          payItems: [],
        },
      ]);
    });

    it('excludes employees not selected', () => {
      const modifiedState = {
        ...state,
        employeePayList: {
          ...state.employeePayList,
          lines: [
            ...state.employeePayList.lines.map(line => ({
              ...line,
              isSelected: false,
            })),
          ],
        },
      };

      const actual = getValidateEtpContent(modifiedState);

      expect(actual).toEqual([]);
    });
  });

  describe('isEtpSelectionForLineShown', () => {
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

        const actual = isEtpSelectionForLineShown(modifiedLine);

        expect(actual).toEqual(true);
      });
    });

    it('true when has existing etpCode', () => {
      const modifiedLine = {
        ...line,
        etpCode: EtpCode.B,
      };

      const actual = isEtpSelectionForLineShown(modifiedLine);

      expect(actual).toEqual(true);
    });

    it('false when has empty etp pay item', () => {
      const modifiedLine = {
        ...line,
        payItems: line.payItems.map(payItem => ({ ...payItem, amount: '0.00' })),
      };

      const actual = isEtpSelectionForLineShown(modifiedLine);

      expect(actual).toEqual(false);
    });

    it('false when has no etp pay items', () => {
      const modifiedLine = {
        ...line,
        payItems: line.payItems.map(payItem => ({ ...payItem, stpCategory: 'something else' })),
      };

      const actual = isEtpSelectionForLineShown(modifiedLine);

      expect(actual).toEqual(false);
    });
  });

  describe('isEtpAlertForLineShown', () => {
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
      it(`true when has ${test.stpCategory}, non-empty amount and no etp code`, () => {
        const modifiedLine = {
          ...line,
          payItems: line.payItems.map(payItem => ({ ...payItem, stpCategory: test.stpCategory })),
        };
        const actual = isEtpAlertForLineShown(modifiedLine);

        expect(actual).toEqual(true);
      });
    });

    it('false when has no etp pay items', () => {
      const modifiedLine = {
        ...line,
        payItems: line.payItems.map(payItem => ({ ...payItem, stpCategory: 'something else' })),
      };

      const actual = isEtpAlertForLineShown(modifiedLine);

      expect(actual).toEqual(false);
    });
  });

  describe('isValidEtp', () => {
    it('true when empty names', () => {
      const invalidEtpNames = [];

      const actual = isValidEtp({ invalidEtpNames });

      expect(actual).toEqual(true);
    });

    it('false when has names', () => {
      const invalidEtpNames = ['Tony'];

      const actual = isValidEtp({ invalidEtpNames });

      expect(actual).toEqual(false);
    });
  });

  describe('formatEtpCode', () => {
    it('formats when has etpCode', () => {
      const line = {
        etpCode: EtpCode.B,
      };

      const actual = formatEtpCode(line);

      expect(actual).toEqual('Code B');
    });

    it('formats when etpCode is undefined', () => {
      const line = {
        etpCode: undefined,
      };

      const actual = formatEtpCode(line);

      expect(actual).toEqual('None');
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

  describe('getLeaveWarning', () => {
    const leaveWarning = {
      currentLeaveBalance: 10,
      leaveAccruedThisPay: 15.50,
      leaveBeingPaid: 38,
      projectedLeaveBalance: -12.50,
    };

    it('should return null if inputHours is less than 0', () => {
      const actual = getLeaveWarning(-10.00, leaveWarning);
      expect(actual).toEqual(null);
    });

    it('should return null if inputHours is 0', () => {
      const actual = getLeaveWarning(0, leaveWarning);
      expect(actual).toEqual(null);
    });

    describe('inputHours is greater than 0', () => {
      it('should return null if leave warning is null', () => {
        const actual = getLeaveWarning(10.00, null);
        expect(actual).toEqual(null);
      });

      describe('leave warning is not null', () => {
        it('should format the warning hours if the project balance is less than 0', () => {
          const actual = getLeaveWarning(10.00, leaveWarning);
          const expected = {
            currentLeaveBalance: '10.00',
            leaveAccruedThisPay: '15.50',
            leaveBeingPaid: '38.00',
            projectedLeaveBalance: '-12.50',
          };

          expect(actual).toEqual(expected);
        });

        it('should return null if the project balance is 0', () => {
          const actual = getLeaveWarning(
            10.00,
            { ...leaveWarning, ...{ projectedLeaveBalance: 0 } },
          );
          expect(actual).toEqual(null);
        });

        it('should return null if the project balance is greater than 0', () => {
          const actual = getLeaveWarning(
            10.00,
            { ...leaveWarning, ...{ projectedLeaveBalance: 2 } },
          );
          expect(actual).toEqual(null);
        });
      });
    });
  });
});
