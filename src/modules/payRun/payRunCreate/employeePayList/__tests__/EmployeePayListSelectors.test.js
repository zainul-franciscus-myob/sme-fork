import {
  formatEtpCode,
  getDeductionPayItemEntries,
  getEmployerExpensePayItemEntries,
  getIsPartiallySelected,
  getJobAmount,
  getJobsSelectStatus,
  getLeavePayItemEntries,
  getLeaveWarning,
  getRecalculatePayPayload,
  getSelectedPayItemJobs,
  getSelectedPayItemWithAllocatedJobs,
  getShouldShowDeductionPayItemTableRows,
  getShouldShowExpensePayItemTableRows,
  getShouldShowLeavePayItemTableRows,
  getShouldShowOverAllocationError,
  getShouldShowTaxPayItemTableRows,
  getShouldShowUnderAllocationWarning,
  getShouldShowWagePayItemTableRows,
  getTaxPayItemEntries,
  getTotals,
  getValidateEtpContent,
  getWagePayItemEntries,
  isEtpAlertForLineShown,
  isEtpSelectionForLineShown,
  isValidEtp,
} from '../EmployeePayListSelectors';
import EtpCode from '../types/EtpCode';
import deductionPayItemEntries from './fixtures/deductionPayItemEntries';
import employeePayList from './fixtures/stateWithEmployeePayItems';
import employeePayListOld from './fixtures/stateWithEmployeePayItemsOld';
import employerExpensePayItemEntries from './fixtures/employerExpensePayItemEntries';
import expectedRecalculatePayPayload from './fixtures/expectedRecalculatePayPayload';
import expectedRecalculatePayPayloadOld from './fixtures/expectedRecalculatePayPayloadOld';
import leavePayItemEntries from './fixtures/leavePayItemEntries';
import taxPayItemEntries from './fixtures/taxPayItemEntries';
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
              ...state.employeePayList.lines.map((line) => ({
                ...line,
                payItems: line.payItems.map((payItem) => ({
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
            ...state.employeePayList.lines.map((line) => ({
              ...line,
              payItems: line.payItems.map((payItem) => ({
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
            ...state.employeePayList.lines.map((line) => ({
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

    describe('stpCategory', () => {
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
        it(`returns true when has ${test.stpCategory} and non empty amount`, () => {
          const modifiedLine = {
            ...line,
            payItems: line.payItems.map((payItem) => ({
              ...payItem,
              stpCategory: test.stpCategory,
            })),
          };

          const actual = isEtpSelectionForLineShown(modifiedLine);

          expect(actual).toEqual(true);
        });
      });

      it('returns false when has no etp pay items', () => {
        const modifiedLine = {
          ...line,
          payItems: line.payItems.map((payItem) => ({
            ...payItem,
            stpCategory: 'something else',
          })),
        };

        const actual = isEtpSelectionForLineShown(modifiedLine);

        expect(actual).toEqual(false);
      });
    });

    describe('amount', () => {
      it('returns true when one of the etp pay items is not zero', () => {
        const employeeLine = {
          etpCode: EtpCode.B,
          payItems: [
            {
              payItemId: '1',
              amount: '0.00',
              stpCategory: 'ETPTaxableComponent',
            },
            {
              payItemId: '2',
              amount: '2.00',
              stpCategory: 'ETPTaxWithholding',
            },
          ],
        };

        const result = isEtpSelectionForLineShown(employeeLine);

        expect(result).toEqual(true);
      });

      it('returns true when all of the etp pay items are non zero', () => {
        const employeeLine = {
          etpCode: EtpCode.B,
          payItems: [
            {
              payItemId: '1',
              amount: '1.00',
              stpCategory: 'ETPTaxableComponent',
            },
            {
              payItemId: '2',
              amount: '2.00',
              stpCategory: 'ETPTaxWithholding',
            },
          ],
        };

        const result = isEtpSelectionForLineShown(employeeLine);

        expect(result).toEqual(true);
      });

      it('returns false when all etp pay items are zero', () => {
        const employeeLine = {
          etpCode: EtpCode.B,
          payItems: [
            {
              payItemId: '1',
              amount: '0.00',
              stpCategory: 'ETPTaxableComponent',
            },
            {
              payItemId: '2',
              amount: '0.00',
              stpCategory: 'ETPTaxWithholding',
            },
          ],
        };

        const result = isEtpSelectionForLineShown(employeeLine);

        expect(result).toEqual(false);
      });
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
          payItems: line.payItems.map((payItem) => ({
            ...payItem,
            stpCategory: test.stpCategory,
          })),
        };
        const actual = isEtpAlertForLineShown(modifiedLine);

        expect(actual).toEqual(true);
      });
    });

    it('false when has no etp pay items', () => {
      const modifiedLine = {
        ...line,
        payItems: line.payItems.map((payItem) => ({
          ...payItem,
          stpCategory: 'something else',
        })),
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

  describe('getWagePayItemEntries', () => {
    it('returns sorted wage pay item entries', () => {
      const actualWagePayItemEntries = getWagePayItemEntries(employeePayList, {
        employeeId: '21',
      });

      const expectedWagePayItemEntries = wagePayItemEntries;

      expect(actualWagePayItemEntries).toEqual(expectedWagePayItemEntries);
    });

    it('puts the wage pay items to the top but does not sort them', () => {
      const state = {
        ...employeePayList,
        employeePayList: {
          lines: [
            {
              employeeId: '21',
              name: 'Mary Jones',
              gross: 1500,
              payg: 100,
              deduction: 300,
              netPay: 700,
              super: 150,
              payItems: [
                {
                  payItemId: '1',
                  payItemName: 'Salary Wage',
                  type: 'SalaryWage',
                  amount: '100000.00',
                  hours: '0.00',
                },
                {
                  payItemId: '2',
                  payItemName: 'Hourly Wage',
                  type: 'HourlyWage',
                  amount: '0.00',
                  hours: '38.50',
                },
                {
                  payItemId: '3',
                  payItemName: 'Child support deduction',
                  type: 'Deduction',
                  amount: '100.00',
                  hours: '0.00',
                },
                {
                  payItemId: '4',
                  payItemName: 'Superannuation deduction before tax',
                  type: 'SuperannuationDeductionBeforeTax',
                  amount: '200.00',
                  hours: '0.00',
                },
                {
                  payItemId: '5',
                  payItemName: 'Superannuation deduction after tax',
                  type: 'SuperannuationDeductionAfterTax',
                  amount: '100.00',
                  hours: '0.00',
                },
                {
                  payItemId: '6',
                  payItemName: 'Child support deduction',
                  type: 'Deduction',
                  amount: '5000.00',
                  hours: '0.00',
                },
                {
                  payItemId: '7',
                  payItemName: 'Annual Leave',
                  type: 'Entitlement',
                  amount: '0.00',
                  hours: '30.00',
                },
                {
                  payItemId: '8',
                  payItemName: 'Sick Leave',
                  type: 'Entitlement',
                  amount: '0.00',
                  hours: '10.00',
                },
                {
                  payItemId: '9',
                  payItemName: 'Coffee Reimbursement',
                  type: 'Expense',
                  amount: '10000.00',
                  hours: '0.00',
                },
                {
                  payItemId: '10',
                  payItemName: 'Mortgage repayment',
                  type: 'SuperannuationExpense',
                  amount: '10000.00',
                  hours: '0.00',
                },
                {
                  payItemId: '11',
                  payItemName: 'PayGWithholding',
                  type: 'Tax',
                  amount: '222.00',
                  hours: '0.00',
                },
              ],
            },
          ],
          baseHourlyWagePayItemId: '2',
          baseSalaryWagePayItemId: '1',
        },
      };
      const actualWagePayItemEntries = getWagePayItemEntries(state, {
        employeeId: '21',
      });

      const expectedWagePayItemEntries = [
        {
          payItemId: '1',
          payItemName: 'Salary Wage',
          type: 'SalaryWage',
          amount: '100000.00',
          hours: '0.00',
          shouldShowHours: false,
        },
        {
          payItemId: '2',
          payItemName: 'Hourly Wage',
          type: 'HourlyWage',
          amount: '0.00',
          hours: '38.50',
          shouldShowHours: true,
        },
      ];

      expect(actualWagePayItemEntries).toEqual(expectedWagePayItemEntries);
    });
  });

  describe('getDeductionPayItemEntries', () => {
    it('returns deduction pay item entries', () => {
      const actualDeductionPayItemEntries = getDeductionPayItemEntries(
        employeePayList,
        { employeeId: '21' }
      );

      const expectedDeductionPayItemEntries = deductionPayItemEntries;

      expect(actualDeductionPayItemEntries).toEqual(
        expectedDeductionPayItemEntries
      );
    });
  });

  describe('getTaxPayItemEntries', () => {
    it('returns tax pay item entries', () => {
      const actualTaxPayItemEntries = getTaxPayItemEntries(employeePayList, {
        employeeId: '21',
      });

      const expectedTaxPayItemEntries = taxPayItemEntries;

      expect(actualTaxPayItemEntries).toEqual(expectedTaxPayItemEntries);
    });
  });

  describe('getLeavePayItemEntries', () => {
    it('returns leave pay items with the hours field', () => {
      const actualLeavePayItemEntries = getLeavePayItemEntries(
        employeePayList,
        { employeeId: '21' }
      );

      const expectedLeavePayItemEntries = leavePayItemEntries;

      expect(actualLeavePayItemEntries).toEqual(expectedLeavePayItemEntries);
    });
  });

  describe('getEmployerExpensePayItemEntries', () => {
    it('returns employer expense pay items without the hours field', () => {
      const actualEmployerExpensePayItemEntries = getEmployerExpensePayItemEntries(
        employeePayList,
        { employeeId: '21' }
      );

      const expectedEmployerExpensePayItemEntries = employerExpensePayItemEntries;

      expect(actualEmployerExpensePayItemEntries).toEqual(
        expectedEmployerExpensePayItemEntries
      );
    });
  });

  describe('getShouldShowWagePayItemTableRows', () => {
    it('returns true when employee has at least one wage pay item', () => {
      const actual = getShouldShowWagePayItemTableRows(employeePayList, {
        employeeId: '21',
      });
      const expected = true;

      expect(actual).toEqual(expected);
    });

    it('returns false when employee has no wage pay item', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              employeeId: '21',
              payItems: [
                {
                  type: 'Tax',
                },
              ],
            },
          ],
        },
      };
      const actual = getShouldShowWagePayItemTableRows(state, {
        employeeId: '21',
      });
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('getShouldShowDeductionPayItemTableRows', () => {
    it('returns true when employee has at least one deduction pay item', () => {
      const actual = getShouldShowDeductionPayItemTableRows(employeePayList, {
        employeeId: '21',
      });
      const expected = true;

      expect(actual).toEqual(expected);
    });

    it('returns false when employee has no deduction pay item', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              employeeId: '21',
              payItems: [
                {
                  type: 'Tax',
                },
              ],
            },
          ],
        },
      };
      const actual = getShouldShowDeductionPayItemTableRows(state, {
        employeeId: '21',
      });
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('getShouldShowTaxPayItemTableRows', () => {
    it('returns true when employee has at least one tax pay item', () => {
      const actual = getShouldShowTaxPayItemTableRows(employeePayList, {
        employeeId: '21',
      });
      const expected = true;

      expect(actual).toEqual(expected);
    });

    it('returns false when employee has no tax pay item', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              employeeId: '21',
              payItems: [
                {
                  type: 'Deduction',
                },
              ],
            },
          ],
        },
      };
      const actual = getShouldShowTaxPayItemTableRows(state, {
        employeeId: '21',
      });
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('getShouldShowLeavePayItemTableRows', () => {
    it('returns true when employee has at least one leave pay item', () => {
      const actual = getShouldShowLeavePayItemTableRows(employeePayList, {
        employeeId: '21',
      });
      const expected = true;

      expect(actual).toEqual(expected);
    });
    it('returns false when employee has no leave pay item', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              employeeId: '21',
              payItems: [
                {
                  type: 'Tax',
                },
              ],
            },
          ],
        },
      };
      const actual = getShouldShowLeavePayItemTableRows(state, {
        employeeId: '21',
      });
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('getShouldShowEmployerExpensePayItemTableRows', () => {
    it('returns true when employee has at least one employer expense pay item', () => {
      const actual = getShouldShowExpensePayItemTableRows(employeePayList, {
        employeeId: '21',
      });
      const expected = true;

      expect(actual).toEqual(expected);
    });
    it('returns false when employee has no employer expense pay item', () => {
      const state = {
        employeePayList: {
          lines: [
            {
              employeeId: '21',
              payItems: [
                {
                  type: 'Tax',
                },
              ],
            },
          ],
        },
      };
      const actual = getShouldShowExpensePayItemTableRows(state, {
        employeeId: '21',
      });
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('getRecalculatedPayPayload', () => {
    it('returns the new payload to recalculate the pay for a particular employee when toggle is on', () => {
      const actualPayload = getRecalculatePayPayload({
        state: employeePayList,
        employeeId: '21',
        payItemId: '2',
        key: 'amount',
        isAllowNegativesInPayRuns: true,
      });
      const expectedPayload = expectedRecalculatePayPayload;

      expect(actualPayload).toEqual(expectedPayload);
    });

    it('returns the old payload to recalculate the pay for a particular employee when toggle is off', () => {
      const actualPayload = getRecalculatePayPayload({
        state: employeePayListOld,
        employeeId: '21',
        payItemId: '2',
        key: 'amount',
        isAllowNegativesInPayRuns: false,
      });
      const expectedPayload = expectedRecalculatePayPayloadOld;

      expect(actualPayload).toEqual(expectedPayload);
    });
  });

  describe('getLeaveWarning', () => {
    const leaveWarning = {
      currentLeaveBalance: 10,
      leaveAccruedThisPay: 15.5,
      leaveBeingPaid: 38,
      projectedLeaveBalance: -12.5,
    };

    it('should return null if inputHours is less than 0', () => {
      const actual = getLeaveWarning(-10.0, leaveWarning);
      expect(actual).toEqual(null);
    });

    it('should return null if inputHours is 0', () => {
      const actual = getLeaveWarning(0, leaveWarning);
      expect(actual).toEqual(null);
    });

    describe('inputHours is greater than 0', () => {
      it('should return null if leave warning is null', () => {
        const actual = getLeaveWarning(10.0, null);
        expect(actual).toEqual(null);
      });

      describe('leave warning is not null', () => {
        it('should format the warning hours if the project balance is less than 0', () => {
          const actual = getLeaveWarning(10.0, leaveWarning);
          const expected = {
            currentLeaveBalance: '10.00',
            leaveAccruedThisPay: '15.50',
            leaveBeingPaid: '38.00',
            projectedLeaveBalance: '-12.50',
          };

          expect(actual).toEqual(expected);
        });

        it('should return null if the project balance is 0', () => {
          const actual = getLeaveWarning(10.0, {
            ...leaveWarning,
            ...{ projectedLeaveBalance: 0 },
          });
          expect(actual).toEqual(null);
        });

        it('should return null if the project balance is greater than 0', () => {
          const actual = getLeaveWarning(10.0, {
            ...leaveWarning,
            ...{ projectedLeaveBalance: 2 },
          });
          expect(actual).toEqual(null);
        });
      });
    });
  });

  describe('Payitem jobs', () => {
    let state = {
      recordedPayments: {
        printPaySlipEmployees: [],
        emailPaySlipEmployees: [],
      },
      employeePayList: {
        stpRegistrationStatus: 'lostConnection',
        jobs: [
          {
            id: 1,
            name: 'Test Job 1',
            number: '00001',
            isActive: true,
          },
          {
            id: 2,
            name: 'Test Job 2',
            number: '00002',
            isActive: false,
          },
          {
            id: 3,
            name: 'Test Job 3',
            number: '00003',
            isActive: true,
          },
          {
            id: 4,
            name: 'Test Job 4 inactive',
            number: '00003',
            isActive: false,
          },
        ],
        selectedPayItem: {
          payItemId: '38',
          amount: 100.0,
          jobs: [
            {
              jobId: 1,
              amount: '10.00',
              isActive: true,
            },
            {
              jobId: 2,
              amount: '20.00',
              isActive: false,
            },
          ],
        },
        lines: [
          {
            employeeId: 21,
            payItems: [
              {
                payItemId: '38',
                jobs: [
                  {
                    jobId: 1,
                    amount: 10,
                  },
                  {
                    jobId: 2,
                    amount: 20,
                  },
                ],
              },
              { payItemId: '39', jobs: [] },
            ],
            isSelected: false,
          },
          {
            employeeId: 23,
            payItems: [
              { payItemId: '39', jobs: [] },
              { payItemId: '40', jobs: [] },
            ],
            isSelected: true,
          },
          {
            employeeId: 25,
            payItems: [
              { payItemId: '39', jobs: [] },
              { payItemId: '40', jobs: [] },
            ],
            isSelected: true,
          },
        ],
        originalLines: [
          {
            employeeId: 21,
            payItems: [
              { payItemId: '38', jobs: [] },
              { payItemId: '39', jobs: [] },
            ],
            isSelected: false,
          },
          {
            employeeId: 23,
            payItems: [
              { payItemId: '39', jobs: [] },
              { payItemId: '40', jobs: [] },
            ],
            isSelected: true,
          },
          {
            employeeId: 25,
            payItems: [
              { payItemId: '39', jobs: [] },
              { payItemId: '40', jobs: [] },
            ],
            isSelected: true,
          },
        ],
      },
    };

    it('getJobAmount should return expected amount', () => {
      const amount = getJobAmount(state);
      const expected = {
        total: 100,
        allocated: 30,
        unallocated: 70,
        formatedAllocated: '30.00',
        formatedUnallocated: '70.00',
        allocatedPercent: '30.00',
        unallocatedPercent: '70.00',
      };
      expect(amount).toEqual(expected);
    });

    it('getSelectedPayItemJobs should return exptected list of jobs', () => {
      const selectedJobs = getSelectedPayItemJobs(state);

      const expectedSelectedJobs = [
        {
          id: 1,
          name: 'Test Job 1',
          number: '00001',
          isSelected: true,
          amount: '10.00',
          isActive: true,
        },
        {
          id: 2,
          name: 'Test Job 2',
          number: '00002',
          isSelected: true,
          amount: '20.00',
          isActive: false,
        },
        {
          id: 3,
          name: 'Test Job 3',
          number: '00003',
          isSelected: false,
          amount: '0.00',
          isActive: true,
        },
      ];

      expect(selectedJobs).toEqual(expectedSelectedJobs);
    });

    it('getJobsSelectStatus should return indeterminate', () => {
      const isAllJobsSelected = getJobsSelectStatus(state);
      expect(isAllJobsSelected).toEqual('indeterminate');
    });

    it('getJobsSelectStatus should return checked', () => {
      state = {
        ...state,
        employeePayList: {
          ...state.employeePayList,
          selectedPayItem: {
            ...state.employeePayList.selectedPayItem,
            jobs: [
              ...state.employeePayList.selectedPayItem.jobs,
              {
                jobId: 3,
                amount: 20,
              },
            ],
          },
        },
      };
      const isAllJobsSelected = getJobsSelectStatus(state);
      expect(isAllJobsSelected).toEqual('checked');
    });

    it('getJobsSelectStatus should return empty', () => {
      state = {
        ...state,
        employeePayList: {
          ...state.employeePayList,
          selectedPayItem: {
            ...state.employeePayList.selectedPayItem,
            jobs: [],
          },
        },
      };
      const isAllJobsSelected = getJobsSelectStatus(state);
      expect(isAllJobsSelected).toEqual('');
    });
  });

  describe('getShouldShowUnderAllocationWarning', () => {
    it('should return true when NOT all of that payitem is allocated to selected jobs', () => {
      const underAllocatedPayItemEntry = {
        payItemId: '38',
        amount: 30.9999999,
        jobs: [
          {
            jobId: 1,
            amount: '10.00',
            isActive: true,
          },
          {
            jobId: 2,
            amount: '20.00',
            isActive: false,
          },
        ],
      };
      const shouldShowWarning = getShouldShowUnderAllocationWarning(
        underAllocatedPayItemEntry
      );
      expect(shouldShowWarning).toBeTruthy();
    });

    it('should return false when all of that payitem is allocated to selected jobs', () => {
      const fullyAllocatedPayItemEntry = {
        payItemId: '38',
        amount: 100.011111,
        jobs: [
          {
            jobId: 1,
            amount: '50.00',
            isActive: true,
          },
          {
            jobId: 2,
            amount: '50.00',
            isActive: false,
          },
        ],
      };
      const shouldShowWarning = getShouldShowUnderAllocationWarning(
        fullyAllocatedPayItemEntry
      );
      expect(shouldShowWarning).toBeFalsy();
    });

    it('should return false when ignoreUnderAllocationWarning is true', () => {
      const underAllocatedPayItemEntry = {
        payItemId: '38',
        amount: 100.0,
        jobs: [
          {
            jobId: 1,
            amount: '50.00',
            isActive: true,
          },
          {
            jobId: 2,
            amount: '10.00',
            isActive: false,
          },
        ],
        ignoreUnderAllocationWarning: true,
      };
      const shouldShowWarning = getShouldShowUnderAllocationWarning(
        underAllocatedPayItemEntry
      );
      expect(shouldShowWarning).toBeFalsy();
    });

    it('should return false when when there are no jobs allocated', () => {
      const underAllocatedPayItemEntry = {
        payItemId: '38',
        amount: 100.0,
        jobs: [],
        ignoreUnderAllocationWarning: false,
      };
      const shouldShowWarning = getShouldShowUnderAllocationWarning(
        underAllocatedPayItemEntry
      );
      expect(shouldShowWarning).toBeFalsy();
    });
  });

  describe('getShouldShowOverAllocationError', () => {
    it('should return true when the amount allocated to selected jobs is MORE than actual payitem amount', () => {
      const overAllocatedPayItemEntry = {
        payItemId: '38',
        amount: 519.0999999999,
        jobs: [
          {
            jobId: 1,
            amount: '500.00',
            isActive: true,
          },
          {
            jobId: 2,
            amount: '20.00',
            isActive: false,
          },
        ],
      };
      const shouldShowError = getShouldShowOverAllocationError(
        overAllocatedPayItemEntry
      );
      expect(shouldShowError).toBeTruthy();
    });

    it('should return false when the amount allocated to selected jobs is less than or equal to actual payitem amount', () => {
      const fullyAllocatedPayItemEntry = {
        payItemId: '38',
        amount: 99.999999999,
        jobs: [
          {
            jobId: 1,
            amount: '110.00',
            isActive: true,
          },
          {
            jobId: 2,
            amount: '-10.00',
            isActive: false,
          },
        ],
      };
      const shouldShowError = getShouldShowOverAllocationError(
        fullyAllocatedPayItemEntry
      );
      expect(shouldShowError).toBeFalsy();
    });

    it('should return false when there is no amount allocated and the amount is negative', () => {
      const fullyAllocatedPayItemEntry = {
        payItemId: '38',
        amount: -0.01,
        jobs: [],
      };
      const shouldShowError = getShouldShowOverAllocationError(
        fullyAllocatedPayItemEntry
      );
      expect(shouldShowError).toBeFalsy();
    });
  });

  describe('getSelectedPayItemWithAllocatedJobs', () => {
    it('should return only jobs with amount > 0', () => {
      const state = {
        employeePayList: {
          selectedPayItem: {
            payItemId: '38',
            amount: 100.0,
            jobs: [
              {
                jobId: 1,
                amount: '10.00',
                isActive: true,
              },
              {
                jobId: 2,
                amount: '20.00',
                isActive: false,
              },
              {
                jobId: 3,
                amount: '0.00',
                isActive: true,
              },
            ],
          },
        },
      };
      const expected = {
        payItemId: '38',
        amount: 100.0,
        jobs: [
          {
            jobId: 1,
            amount: '10.00',
            isActive: true,
          },
          {
            jobId: 2,
            amount: '20.00',
            isActive: false,
          },
        ],
      };
      const payItemWithAllocatedJobs = getSelectedPayItemWithAllocatedJobs(
        state
      );
      expect(payItemWithAllocatedJobs).toEqual(expected);
    });
  });
});
