import {
  buildPayHistoryEntries,
  buildPayHistoryEntry,
  getAssignedMonthForPeriod,
  getDeductionTableRows,
  getExpenseTableRows,
  getFormattedActivity,
  getIsFutureMonth,
  getLeaveTableRows,
  getMonthsInPeriod,
  getPayHistoryDetailsPayload,
  getTaxTableRows,
  getUpdatedPayHistoryItems,
  getUpdatedPayHistoryItemsFromFilterOptions,
  getWageTableRows,
} from '../PayrollPayHistorySelectors';

describe('PayrollPayHistorySelectors', () => {
  describe('getMonthsInPeriod', () => {
    it.each([
      ['Quarter1', ['July', 'August', 'September']],
      ['Quarter2', ['October', 'November', 'December']],
      ['Quarter3', ['January', 'February', 'March']],
      ['Quarter4', ['April', 'May', 'June']],
      ['YearToDate', ['July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June']],
      ['July', ['July']],
    ])('should get months in period', (period, expected) => {
      const actual = getMonthsInPeriod(period);

      expect(actual).toEqual(expected);
    });
  });

  describe('getAssignedMonthForPeriod', () => {
    it.each([
      ['July', 'July'],
      ['August', 'August'],
      ['September', 'September'],
      ['October', 'October'],
      ['November', 'November'],
      ['December', 'December'],
      ['January', 'January'],
      ['February', 'February'],
      ['March', 'March'],
      ['April', 'April'],
      ['May', 'May'],
      ['June', 'June'],
      ['Quarter1', 'July'],
      ['Quarter2', 'October'],
      ['Quarter3', 'January'],
      ['Quarter4', 'April'],
      ['YearToDate', 'July'],
    ])('should get assigned month from pay history period filter', (
      period, expected,
    ) => {
      const actual = getAssignedMonthForPeriod(period);

      expect(actual).toEqual(expected);
    });
  });

  describe('getIsFutureMonth', () => {
    it.each([
      ['January', 'July', false],
      ['January', 'January', false],
      ['January', 'April', true],
      ['July', 'June', true],
      ['June', 'July', false],
    ])('should return whether the selected month is future month in financial year', (
      currentMonth, selectedMonth, expected,
    ) => {
      const actual = getIsFutureMonth(currentMonth, selectedMonth);

      expect(actual).toEqual(expected);
    });
  });

  describe('buildPayHistoryEntry', () => {
    it('should return pay history entry', () => {
      const payHistoryItem = {
        id: 'id', payItemId: 'payItemId', month: 'July', activity: 100, total: '100.00',
      };
      const allocatedPayItem = { id: 'payItemId' };
      const payItemOption = { id: 'payItemId', type: 'payItemType', name: 'name' };

      const expected = {
        id: 'id',
        payItemId: 'payItemId',
        payItemType: 'payItemType',
        name: 'name',
        hours: '100.00',
        amount: '100.00',
        isHours: false,
        isAmount: true,
      };

      const actual = buildPayHistoryEntry(payHistoryItem, allocatedPayItem, payItemOption);

      expect(actual).toEqual(expected);
    });

    it('should return pay history entry when the pay item is allocated', () => {
      const allocatedPayItem = { id: 'payItemId' };
      const payItemOption = { id: 'payItemId', type: 'payItemType', name: 'name' };

      const expected = {
        payItemId: 'payItemId',
        payItemType: 'payItemType',
        name: 'name',
        hours: '0.00',
        amount: '0.00',
        isHours: false,
        isAmount: true,
      };

      const actual = buildPayHistoryEntry(undefined, allocatedPayItem, payItemOption);

      expect(actual).toEqual(expected);
    });

    it('should return pay history entry when there is pay history item with activity value', () => {
      const payHistoryItem = {
        id: 'id', payItemId: 'payItemId', month: 'July', activity: 100, total: '0.00',
      };
      const payItemOption = { id: 'payItemId', type: 'payItemType', name: 'name' };

      const expected = {
        id: 'id',
        payItemId: 'payItemId',
        payItemType: 'payItemType',
        name: 'name',
        hours: '0.00',
        amount: '0.00',
        isHours: false,
        isAmount: true,
      };

      const actual = buildPayHistoryEntry(payHistoryItem, undefined, payItemOption);

      expect(actual).toEqual(expected);
    });

    it('should return pay history entry when there is pay history item with total value', () => {
      const payHistoryItem = {
        id: 'id', payItemId: 'payItemId', month: 'July', activity: 0, total: '100.00',
      };
      const payItemOption = { id: 'payItemId', type: 'payItemType', name: 'name' };

      const expected = {
        id: 'id',
        payItemId: 'payItemId',
        payItemType: 'payItemType',
        name: 'name',
        hours: '100.00',
        amount: '100.00',
        isHours: false,
        isAmount: true,
      };

      const actual = buildPayHistoryEntry(payHistoryItem, undefined, payItemOption);

      expect(actual).toEqual(expected);
    });

    it('should not return pay history entry when pay history does not have activity nor total value', () => {
      const payHistoryItem = {
        id: 'id', payItemId: 'payItemId', month: 'July', activity: 0, total: '0.00',
      };
      const payItemOption = { id: 'payItemId', type: 'payItemType', name: 'name' };

      const actual = buildPayHistoryEntry(payHistoryItem, undefined, payItemOption);

      expect(actual).toBeUndefined();
    });

    it('should shows Activity (hrs) input when pay item type is entitlement', () => {
      const payHistoryItem = {
        id: 'id', payItemId: 'payItemId', month: 'July', activity: 100, total: '100.00',
      };
      const allocatedPayItem = { id: 'payItemId' };
      const payItemOption = { id: 'payItemId', type: 'EntitlementPayrollCategory', name: 'name' };

      const expected = {
        id: 'id',
        payItemId: 'payItemId',
        payItemType: 'EntitlementPayrollCategory',
        name: 'name',
        hours: '100.00',
        amount: '100.00',
        isHours: true,
        isAmount: false,
      };

      const actual = buildPayHistoryEntry(payHistoryItem, allocatedPayItem, payItemOption);

      expect(actual).toEqual(expected);
    });

    it('should not return pay history entry when pay item is not allocated nor pay history exists', () => {
      const payItemOption = { id: 'payItemId', type: 'payItemType', name: 'name' };

      const actual = buildPayHistoryEntry(undefined, undefined, payItemOption);

      expect(actual).toBeUndefined();
    });
  });

  describe('buildPayHistoryEntries', () => {
    it('should build eligible pay history entries', () => {
      const payHistoryItems = [
        { id: '1', payItemId: 'payItemId-1', activity: 100 },
        { id: '2', payItemId: 'payItemId-2', activity: 100 },
      ];

      const allocatedPayItems = [
        { id: 'payItemId-1' },
        { id: 'payItemId-3' },
      ];

      const payItemOptions = [
        { id: 'payItemId-1', type: 'payItemType', name: 'name' },
        { id: 'payItemId-2', type: 'payItemType', name: 'name' },
        { id: 'payItemId-3', type: 'payItemType', name: 'name' },
        { id: 'payItemId-4', type: 'payItemType', name: 'name' },
      ];

      const actual = buildPayHistoryEntries(payHistoryItems, allocatedPayItems, payItemOptions);

      expect(actual.length).toEqual(3);
    });
  });

  describe('getWageTableRows', () => {
    it('should return allocated wage pay items', () => {
      const state = {
        payrollDetails: {
          deductionDetails: {
            deductionPayItems: [
              { id: '41' },
            ],
          },
          superannuationDetails: {
            allocatedPayItems: [
              { id: '31' },
              { id: '33' },
            ],
          },
          tax: {
            taxPayItems: [
              { id: '21' },
            ],
          },
          wage: {
            allocatedWagePayItems: [
              { id: '16' },
              { id: '11' },
              { id: '15' },
              { id: '14' },
              { id: '13' },
            ],
          },
          payHistoryDetails: {
            filterOptions: {
              period: 'July',
            },
            payHistoryItems: [
              { id: '16', payItemId: '16' },
              { id: '11', payItemId: '11' },
              { id: '15', payItemId: '15' },
              { id: '14', payItemId: '14' },
              { id: '13', payItemId: '13' },
            ],
          },
        },
        wagePayItems: [
          {
            id: '11',
            name: 'Base salary',
            type: 'WagesPayrollCategory',
            payBasis: 'Salary',
          },
          {
            id: '13',
            name: 'A hourly',
            type: 'WagesPayrollCategory',
            payBasis: 'Hourly',
          },
          {
            id: '12',
            name: 'Base hourly',
            type: 'WagesPayrollCategory',
            payBasis: 'Hourly',
          },
          {
            id: '15',
            name: 'A Salary',
            type: 'WagesPayrollCategory',
            payBasis: 'Salary',
          },
          {
            id: '14',
            name: 'B hourly',
            type: 'WagesPayrollCategory',
            payBasis: 'Hourly',
          },
          {
            id: '16',
            name: 'B Salary',
            type: 'WagesPayrollCategory',
            payBasis: 'Salary',
          },
        ],
        deductionPayItemOptions: [
          {
            id: '41',
            name: 'Deduction percent',
            type: 'DeductionPayrollCategory',
          },
          {
            id: '42',
            name: 'Deduction fixed dollar',
            type: 'DeductionPayrollCategory',
          },
        ],
        taxPayItemOptions: [
          {
            id: '21',
            name: 'PAYG Withholding',
            type: 'TaxPayrollCategory',
          },
        ],
        superPayItemOptions: [
          {
            id: '31',
            name: 'Super deduction before tax',
            type: 'SuperannuationDeductionBeforeTaxPayrollCategory',
          },
          {
            id: '33',
            name: 'Super expense',
            type: 'SuperannuationExpensePayrollCategory',
          },
        ],
        baseSalaryWagePayItemId: '11',
        baseHourlyWagePayItemId: '22',
      };

      const expected = {
        entries: [
          {
            id: '11',
            payItemId: '11',
            payItemType: 'WagesPayrollCategory',
            name: 'Base salary',
            hours: '0.00',
            amount: '0.00',
            isHours: false,
            isAmount: true,
            payBasis: 'Salary',
          },
          {
            id: '13',
            payItemId: '13',
            name: 'A hourly',
            payItemType: 'WagesPayrollCategory',
            hours: '0.00',
            amount: '0.00',
            isHours: false,
            isAmount: true,
            payBasis: 'Hourly',
          },
          {
            id: '14',
            payItemId: '14',
            name: 'B hourly',
            payItemType: 'WagesPayrollCategory',
            hours: '0.00',
            amount: '0.00',
            isHours: false,
            isAmount: true,
            payBasis: 'Hourly',
          },
          {
            id: '15',
            payItemId: '15',
            name: 'A Salary',
            payItemType: 'WagesPayrollCategory',
            hours: '0.00',
            amount: '0.00',
            isHours: false,
            isAmount: true,
            payBasis: 'Salary',
          },
          {
            id: '16',
            payItemId: '16',
            name: 'B Salary',
            payItemType: 'WagesPayrollCategory',
            hours: '0.00',
            amount: '0.00',
            isHours: false,
            isAmount: true,
            payBasis: 'Salary',
          },
        ],
        showTableRows: true,
      };

      const actual = getWageTableRows(state);

      expect(actual.entries).toEqual(expected.entries);
      expect(actual.showTableRows).toEqual(expected.showTableRows);
    });
  });

  describe('getDeductionTableRows', () => {
    it('should return deduction pay items', () => {
      const state = {
        payrollDetails: {
          deductionDetails: {
            deductionPayItems: [
              { id: '41' },
            ],
          },
          superannuationDetails: {
            allocatedPayItems: [
              { id: '31' },
              { id: '33' },
            ],
          },
          tax: {
            taxPayItems: [
              { id: '21' },
            ],
          },
          wage: {
            allocatedWagePayItems: [
              { id: '11' },
            ],
          },
          payHistoryDetails: {
            filterOptions: {
              period: 'July',
            },
            payHistoryItems: [],
          },
        },
        wagePayItems: [
          {
            id: '11',
            name: 'Base salary',
            type: 'WagesPayrollCategory',
          },
          {
            id: '12',
            name: 'Base hourly',
            type: 'WagesPayrollCategory',
          },
        ],
        deductionPayItemOptions: [
          {
            id: '41',
            name: 'Deduction percent',
            type: 'DeductionPayrollCategory',
          },
          {
            id: '42',
            name: 'Deduction fixed dollar',
            type: 'DeductionPayrollCategory',
          },
        ],
        taxPayItemOptions: [
          {
            id: '21',
            name: 'PAYG Withholding',
            type: 'TaxPayrollCategory',
          },
        ],
        superPayItemOptions: [
          {
            id: '31',
            name: 'Super deduction before tax',
            type: 'SuperannuationDeductionBeforeTaxPayrollCategory',
          },
          {
            id: '33',
            name: 'Super expense',
            type: 'SuperannuationExpensePayrollCategory',
          },
        ],
      };

      const expected = {
        entries: [
          {
            payItemId: '41',
            payItemType: 'DeductionPayrollCategory',
            name: 'Deduction percent',
            hours: '0.00',
            amount: '0.00',
            isHours: false,
            isAmount: true,
          },
        ],
        showTableRows: true,
      };

      const actual = getDeductionTableRows(state);

      expect(actual.entries).toEqual(expected.entries);
      expect(actual.showTableRows).toEqual(expected.showTableRows);
    });
  });

  describe('getTaxTableRows', () => {
    it('should return allocated tax and super (deduction) pay items', () => {
      const state = {
        payrollDetails: {
          deductionDetails: {
            deductionPayItems: [
              { id: '41' },
            ],
          },
          superannuationDetails: {
            allocatedPayItems: [
              { id: '31' },
              { id: '33' },
            ],
          },
          tax: {
            taxPayItems: [
              { id: '21' },
            ],
          },
          wage: {
            allocatedWagePayItems: [
              { id: '11' },
            ],
          },
          payHistoryDetails: {
            filterOptions: {
              period: 'July',
            },
            payHistoryItems: [],
          },
        },
        wagePayItems: [
          {
            id: '11',
            name: 'Base salary',
            type: 'WagesPayrollCategory',
          },
          {
            id: '12',
            name: 'Base hourly',
            type: 'WagesPayrollCategory',
          },
        ],
        deductionPayItemOptions: [
          {
            id: '41',
            name: 'Deduction percent',
            type: 'DeductionPayrollCategory',
          },
          {
            id: '42',
            name: 'Deduction fixed dollar',
            type: 'DeductionPayrollCategory',
          },
        ],
        taxPayItemOptions: [
          {
            id: '21',
            name: 'PAYG Withholding',
            type: 'TaxPayrollCategory',
          },
        ],
        superPayItemOptions: [
          {
            id: '31',
            name: 'Super deduction before tax',
            type: 'SuperannuationDeductionBeforeTaxPayrollCategory',
          },
          {
            id: '33',
            name: 'Super expense',
            type: 'SuperannuationExpensePayrollCategory',
          },
        ],
      };

      const expected = {
        entries: [
          {
            payItemId: '21',
            payItemType: 'TaxPayrollCategory',
            name: 'PAYG Withholding',
            hours: '0.00',
            amount: '0.00',
            isHours: false,
            isAmount: true,
            payBasis: undefined,
          },
          {
            payItemId: '31',
            payItemType: 'SuperannuationDeductionBeforeTaxPayrollCategory',
            name: 'Super deduction before tax',
            hours: '0.00',
            amount: '0.00',
            isHours: false,
            isAmount: true,
            payBasis: undefined,
          },
        ],
        showTableRows: true,
      };

      const actual = getTaxTableRows(state);

      expect(actual.entries).toEqual(expected.entries);
      expect(actual.showTableRows).toEqual(expected.showTableRows);
    });
  });

  describe('getExpensePayItemEntries', () => {
    it('should return allocated employer expense and super (expense) pay items', () => {
      const state = {
        payrollDetails: {
          superannuationDetails: {
            allocatedPayItems: [
              { id: '31' },
              { id: '33' },
            ],
          },
          employerExpenseDetails: {
            expensePayItems: [
              { id: '61' },
            ],
          },
          payHistoryDetails: {
            filterOptions: {
              period: 'July',
            },
            payHistoryItems: [],
          },
        },
        superPayItemOptions: [
          {
            id: '31',
            name: 'Super deduction before tax',
            type: 'SuperannuationDeductionBeforeTaxPayrollCategory',
          },
          {
            id: '33',
            name: 'Super expense',
            type: 'SuperannuationExpensePayrollCategory',
          },
        ],
        expensePayItemOptions: [
          {
            id: '61',
            name: 'Employer expense percent',
            type: 'ExpensePayrollCategory',
          },
          {
            id: '62',
            name: 'Employer expense fixed hour',
            type: 'ExpensePayrollCategory',
          },
        ],
      };

      const expected = {
        entries: [
          {
            payItemId: '61',
            payItemType: 'ExpensePayrollCategory',
            name: 'Employer expense percent',
            hours: '0.00',
            amount: '0.00',
            isHours: false,
            isAmount: true,
          },
          {
            payItemId: '33',
            payItemType: 'SuperannuationExpensePayrollCategory',
            name: 'Super expense',
            hours: '0.00',
            amount: '0.00',
            isHours: false,
            isAmount: true,
          },
        ],
        showTableRows: true,
      };

      const actual = getExpenseTableRows(state);

      expect(actual.entries).toEqual(expected.entries);
      expect(actual.showTableRows).toEqual(expected.showTableRows);
    });
  });

  describe('getLeavePayItemEntries', () => {
    it('should return allocated leave pay items', () => {
      const state = {
        payrollDetails: {
          leaveDetails: {
            allocatedLeavePayItems: [
              { payItemId: '51' },
            ],
          },
          payHistoryDetails: {
            filterOptions: {
              period: 'July',
            },
            payHistoryItems: [],
          },
        },
        leavePayItemOptions: [
          {
            id: '51',
            name: 'Leave percent',
            type: 'EntitlementPayrollCategory',
          },
          {
            id: '52',
            name: 'Leave fixed hours',
            type: 'EntitlementPayrollCategory',
          },
          {
            id: '53',
            name: 'Leave user entered',
            type: 'EntitlementPayrollCategory',
          },
        ],
      };

      const expected = {
        entries: [
          {
            payItemId: '51',
            payItemType: 'EntitlementPayrollCategory',
            name: 'Leave percent',
            hours: '0.00',
            amount: '0.00',
            isHours: true,
            isAmount: false,
          },
        ],
        showTableRows: true,
      };

      const actual = getLeaveTableRows(state);

      expect(actual.entries).toEqual(expected.entries);
      expect(actual.showTableRows).toEqual(expected.showTableRows);
    });
  });

  describe('getUpdatedPayHistoryItems', () => {
    it('should update existing pay history item', () => {
      const payItemId = '11';
      const payItemType = 'WagesPayrollCategory';
      const state = {
        payrollDetails: {
          payHistoryDetails: {
            filterOptions: {
              period: 'July',
            },
            payHistoryItems: [
              {
                id: '1',
                payItemId,
                payItemType,
                lines: [
                  {
                    total: '3000.00',
                    activity: 2500.50,
                    month: 'July',
                  },
                ],
              },
            ],
          },
        },
      };

      const expected = [
        {
          id: '1',
          payItemId,
          payItemType,
          lines: [
            {
              total: '1000.00',
              activity: 2500.50,
              month: 'July',
            },
          ],
        },
      ];

      const actual = getUpdatedPayHistoryItems(state, { payItemId, payItemType, total: '1000.00' });

      expect(actual).toEqual(expected);
    });

    it('should add to existing pay history item line', () => {
      const payItemId = '11';
      const payItemType = 'WagesPayrollCategory';
      const state = {
        payrollDetails: {
          payHistoryDetails: {
            filterOptions: {
              period: 'July',
            },
            payHistoryItems: [
              {
                id: '1',
                payItemId,
                payItemType,
                lines: [
                  {
                    total: '3000.00',
                    activity: 2500.50,
                    month: 'August',
                  },
                ],
              },
            ],
          },
        },
      };

      const expected = [
        {
          id: '1',
          payItemId,
          payItemType,
          lines: [
            {
              total: '3000.00',
              activity: 2500.50,
              month: 'August',
            },
            {
              total: '2000.00',
              activity: 0,
              month: 'July',
            },
          ],
        },
      ];

      const actual = getUpdatedPayHistoryItems(state, { payItemId, payItemType, total: '2000.00' });

      expect(actual).toEqual(expected);
    });

    it('should add new pay history item', () => {
      const payItemId = '11';
      const payItemType = 'WagesPayrollCategory';
      const state = {
        payrollDetails: {
          payHistoryDetails: {
            filterOptions: {
              period: 'July',
            },
            payHistoryItems: [],
          },
        },
      };

      const expected = [
        {
          payItemId,
          payItemType,
          lines: [
            {
              total: '1000.00',
              activity: 0,
              month: 'July',
            },
          ],
        },
      ];

      const actual = getUpdatedPayHistoryItems(state, { payItemId, payItemType, total: '1000.00' });

      expect(actual).toEqual(expected);
    });
  });

  describe('getFormattedActivity', () => {
    it('should allow up to 3 decimals for Activity (hrs)', () => {
      const expected = '1.123';

      const actual = getFormattedActivity({ key: 'hours', value: '1.1234' });

      expect(actual).toEqual(expected);
    });

    it('should allow up to 2 decimals for Activity ($)', () => {
      const expected = '1.12';

      const actual = getFormattedActivity({ key: 'amount', value: '1.1234' });

      expect(actual).toEqual(expected);
    });
  });

  describe('getUpdatedPayHistoryItemsFromFilterOptions', () => {
    describe('getGroupedPayHistoryItems', () => {
      it('should create pay history group from months in period', () => {
        const currentPeriod = 'July';
        const nextPeriod = 'Quarter1';
        const payItemId = '11';
        const payItemType = 'WagesPayrollCategory';
        const groupLine = { total: '6000.00', activity: 5001, month: 'group' };
        const lines = [
          { total: '3000.00', activity: 2500.50, month: 'July' },
          { total: '3000.00', activity: 2500.50, month: 'August' },
          { total: '3000.00', activity: 2500.50, month: 'April' },
        ];
        const state = {
          payrollDetails: {
            payHistoryDetails: {
              filterOptions: { period: currentPeriod },
              payHistoryItems: [
                {
                  id: '1', payItemId, payItemType, lines,
                },
              ],
            },
          },
        };

        const expected = [
          {
            id: '1',
            payItemId,
            payItemType,
            lines: [...lines, groupLine],
          },
        ];

        const actual = getUpdatedPayHistoryItemsFromFilterOptions(state, nextPeriod);

        expect(actual).toEqual(expected);
      });

      it('should create new pay history group', () => {
        const currentPeriod = 'July';
        const nextPeriod = 'Quarter1';
        const payItemId = '11';
        const payItemType = 'WagesPayrollCategory';
        const state = {
          payrollDetails: {
            payHistoryDetails: {
              filterOptions: { period: currentPeriod },
              payHistoryItems: [
                {
                  id: '1', payItemId, payItemType, lines: [],
                },
              ],
            },
          },
        };

        const expected = [
          {
            id: '1',
            payItemId,
            payItemType,
            lines: [{ total: '0.00', activity: 0, month: 'group' }],
          },
        ];

        const actual = getUpdatedPayHistoryItemsFromFilterOptions(state, nextPeriod);

        expect(actual).toEqual(expected);
      });
    });

    describe('getUngroupedPayHistoryItems', () => {
      it('should update the total of the first month of the group', () => {
        const currentPeriod = 'Quarter1';
        const nextPeriod = 'July';
        const payItemId = '11';
        const payItemType = 'WagesPayrollCategory';
        const state = {
          payrollDetails: {
            payHistoryDetails: {
              filterOptions: { period: currentPeriod },
              payHistoryItems: [
                {
                  id: '1',
                  payItemId,
                  payItemType,
                  lines: [
                    { total: '3000.00', activity: 2500.50, month: 'July' },
                    { total: '3000.00', activity: 2500.50, month: 'August' },
                    { total: '3000.00', activity: 2500.50, month: 'November' },
                    { total: '9000.00', activity: 5001, month: 'group' },
                  ],
                },
              ],
            },
          },
        };

        const expected = [
          {
            id: '1',
            payItemId,
            payItemType,
            lines: [
              { total: '6000.00', activity: 2500.50, month: 'July' },
              { total: '3000.00', activity: 2500.50, month: 'August' },
              { total: '3000.00', activity: 2500.50, month: 'November' },
            ],
          },
        ];

        const actual = getUpdatedPayHistoryItemsFromFilterOptions(state, nextPeriod);

        expect(actual).toEqual(expected);
      });

      it('should create line for the first month of the group', () => {
        const currentPeriod = 'Quarter1';
        const nextPeriod = 'July';
        const payItemId = '11';
        const payItemType = 'WagesPayrollCategory';
        const state = {
          payrollDetails: {
            payHistoryDetails: {
              filterOptions: { period: currentPeriod },
              payHistoryItems: [
                {
                  id: '1',
                  payItemId,
                  payItemType,
                  lines: [
                    { total: '3000.00', activity: 2500.50, month: 'August' },
                    { total: '9000.00', activity: 5001, month: 'group' },
                  ],
                },
              ],
            },
          },
        };

        const expected = [
          {
            id: '1',
            payItemId,
            payItemType,
            lines: [
              { total: '3000.00', activity: 2500.50, month: 'August' },
              { total: '6000.00', activity: 0, month: 'July' },
            ],
          },
        ];

        const actual = getUpdatedPayHistoryItemsFromFilterOptions(state, nextPeriod);

        expect(actual).toEqual(expected);
      });
    });

    describe('getUngroupedPayHistoryItems and getGroupedPayHistoryItems', () => {
      it('should ungroup the current period group and group a new period group', () => {
        const currentPeriod = 'Quarter1';
        const nextPeriod = 'YearToDate';
        const payItemId = '11';
        const payItemType = 'WagesPayrollCategory';
        const state = {
          payrollDetails: {
            payHistoryDetails: {
              filterOptions: { period: currentPeriod },
              payHistoryItems: [
                {
                  id: '1',
                  payItemId,
                  payItemType,
                  lines: [
                    { total: '3000.00', activity: 2500.50, month: 'July' },
                    { total: '3000.00', activity: 2500.50, month: 'August' },
                    { total: '3000.00', activity: 2500.50, month: 'November' },
                    { total: '9000.00', activity: 5001, month: 'group' },
                  ],
                },
              ],
            },
          },
        };

        const expected = [
          {
            id: '1',
            payItemId,
            payItemType,
            lines: [
              { total: '6000.00', activity: 2500.50, month: 'July' },
              { total: '3000.00', activity: 2500.50, month: 'August' },
              { total: '3000.00', activity: 2500.50, month: 'November' },
              { total: '12000.00', activity: 7501.5, month: 'group' },
            ],
          },
        ];

        const actual = getUpdatedPayHistoryItemsFromFilterOptions(state, nextPeriod);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('getPayHistoryDetailsPayload', () => {
    it('should return pay history items for save', () => {
      const state = {
        payrollDetails: {
          payHistoryDetails: {
            filterOptions: {
              period: 'July',
            },
            payHistoryItems: [
              {
                id: '1',
                payItemId: '11',
                payItemType: 'WagesPayrollCategory',
                lines: [
                  {
                    total: '3000.00',
                    activity: 2500.50,
                    month: 'July',
                  },
                ],
              },
            ],
          },
        },
      };

      const expected = {
        payHistoryItems: [
          {
            id: '1',
            payItemId: '11',
            payItemType: 'WagesPayrollCategory',
            lines: [
              {
                month: 'July',
                adjustment: 499.50,
              },
            ],
          },
        ],
      };

      const actual = getPayHistoryDetailsPayload(state);

      expect(actual).toEqual(expected);
    });

    it('should return pay history item that has pre-existing record', () => {
      const state = {
        payrollDetails: {
          payHistoryDetails: {
            filterOptions: {
              period: 'July',
            },
            payHistoryItems: [
              {
                id: '1',
                payItemId: '11',
                payItemType: 'WagesPayrollCategory',
                lines: [
                  {
                    total: '0.00',
                    activity: 0,
                    month: 'July',
                    hasPayHistory: true,
                  },
                ],
              },
            ],
          },
        },
      };

      const expected = {
        payHistoryItems: [
          {
            id: '1',
            payItemId: '11',
            payItemType: 'WagesPayrollCategory',
            lines: [
              {
                adjustment: 0,
                month: 'July',
              },
            ],
          },
        ],
      };

      const actual = getPayHistoryDetailsPayload(state);

      expect(actual).toEqual(expected);
    });

    it('should return pay history item that has pre-existing record with 0 adjustment', () => {
      const state = {
        payrollDetails: {
          payHistoryDetails: {
            filterOptions: {
              period: 'July',
            },
            payHistoryItems: [
              {
                payItemId: '11',
                payItemType: 'WagesPayrollCategory',
                lines: [
                  {
                    total: '0.00',
                    activity: 0,
                    month: 'July',
                  },
                ],
              },
            ],
          },
        },
      };

      const expected = {
        payHistoryItems: [],
      };

      const actual = getPayHistoryDetailsPayload(state);

      expect(actual).toEqual(expected);
    });

    it('should not return new pay history item that has 0 adjustment', () => {
      const state = {
        payrollDetails: {
          payHistoryDetails: {
            filterOptions: {
              period: 'July',
            },
            payHistoryItems: [
              {
                payItemId: '11',
                payItemType: 'WagesPayrollCategory',
                lines: [
                  {
                    total: '0.00',
                    activity: 0,
                    month: 'July',
                  },
                ],
              },
            ],
          },
        },
      };

      const expected = {
        payHistoryItems: [],
      };

      const actual = getPayHistoryDetailsPayload(state);

      expect(actual).toEqual(expected);
    });

    it('should upgroup pay history items before save', () => {
      const state = {
        payrollDetails: {
          payHistoryDetails: {
            filterOptions: {
              period: 'Quarter1',
            },
            payHistoryItems: [
              {
                id: '1',
                payItemId: '11',
                payItemType: 'WagesPayrollCategory',
                lines: [
                  { total: '1100.00', activity: 1000, month: 'July' },
                  { total: '1100.00', activity: 1000, month: 'August' },
                  { total: '1100.00', activity: 1000, month: 'September' },
                  { total: '3350.00', activity: 3000, month: 'group' },
                ],
              },
            ],
          },
        },
      };

      const expected = {
        payHistoryItems: [
          {
            id: '1',
            payItemId: '11',
            payItemType: 'WagesPayrollCategory',
            lines: [
              { month: 'July', adjustment: 150 },
              { month: 'August', adjustment: 100 },
              { month: 'September', adjustment: 100 },
            ],
          },
        ],
      };

      const actual = getPayHistoryDetailsPayload(state);

      expect(actual).toEqual(expected);
    });
  });
});
