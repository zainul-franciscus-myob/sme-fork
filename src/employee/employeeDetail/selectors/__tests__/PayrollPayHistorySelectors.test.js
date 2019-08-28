import {
  buildPayHistoryEntries,
  buildPayHistoryEntry,
  getCombinedTableRows,
  getExpenseTableRows,
  getFormattedActivity,
  getIsFutureMonth,
  getLeaveTableRows,
  getMonthFromPeriod,
  getPayHistoryDetailsPayload,
  getUpdatedPayHistoryItems,
} from '../PayrollPayHistorySelectors';

describe('PayrollPayHistorySelectors', () => {
  describe('getMonthFromPeriod', () => {
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
    ])('should get month from pay history period filter', (period, expected) => {
      const actual = getMonthFromPeriod(period);

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

    it('should return pay history entry when there is pay history item', () => {
      const payHistoryItem = {
        id: 'id', payItemId: 'payItemId', month: 'July', activity: 100, total: '100.00',
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

  describe('getCombinedPayItemEntries', () => {
    it('should return allocated wage, deduction, tax and super (deduction) pay items', () => {
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
            payItemId: '11',
            payItemType: 'WagesPayrollCategory',
            name: 'Base salary',
            hours: '0.00',
            amount: '0.00',
            isHours: false,
            isAmount: true,
          },
          {
            payItemId: '21',
            payItemType: 'TaxPayrollCategory',
            name: 'PAYG Withholding',
            hours: '0.00',
            amount: '0.00',
            isHours: false,
            isAmount: true,
          },
          {
            payItemId: '41',
            payItemType: 'DeductionPayrollCategory',
            name: 'Deduction percent',
            hours: '0.00',
            amount: '0.00',
            isHours: false,
            isAmount: true,
          },
          {
            payItemId: '31',
            payItemType: 'SuperannuationDeductionBeforeTaxPayrollCategory',
            name: 'Super deduction before tax',
            hours: '0.00',
            amount: '0.00',
            isHours: false,
            isAmount: true,
          },
        ],
        showTableRows: true,
      };

      const actual = getCombinedTableRows(state);

      expect(actual.entries).toEqual(expected.entries);
      expect(actual.showTableRows).toEqual(expected.showTableRows);
    });
  });

  describe('getExpensePayItemEntries', () => {
    it('should return allocated super (expense) pay items', () => {
      const state = {
        payrollDetails: {
          superannuationDetails: {
            allocatedPayItems: [
              { id: '31' },
              { id: '33' },
            ],
          },
          payHistoryDetails: {
            filterOptions: {
              period: 'July',
            },
            payHistoryItems: [
              {
                id: '1',
                payItemId: '61',
                payItemType: 'ExpensePayrollCategory',
                lines: [{ month: 'July', activity: 10, total: '10.00' }],
              },
            ],
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
            id: '1',
            payItemId: '61',
            payItemType: 'ExpensePayrollCategory',
            name: 'Employer expense percent',
            hours: '10.00',
            amount: '10.00',
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
    it('should allow up to 2 decimals for Activity (hrs)', () => {
      const expected = '1.12';

      const actual = getFormattedActivity({ key: 'hours', value: '1.1234' });

      expect(actual).toEqual(expected);
    });

    it('should allow up to 3 decimals for Activity ($)', () => {
      const expected = '1.123';

      const actual = getFormattedActivity({ key: 'amount', value: '1.1234' });

      expect(actual).toEqual(expected);
    });
  });

  describe('getPayHistoryDetailsPayload', () => {
    it('should return pay history items for save', () => {
      const state = {
        payrollDetails: {
          payHistoryDetails: {
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

    it('should not return pay history item that has 0 adjustment and adjustment', () => {
      const state = {
        payrollDetails: {
          payHistoryDetails: {
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
  });
});
