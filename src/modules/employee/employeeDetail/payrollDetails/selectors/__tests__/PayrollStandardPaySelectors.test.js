import {
  buildPayItemEntry,
  calculateWagePayItemAmount,
  fieldTypes,
  getAmountFieldType,
  getDeductionTableRows,
  getExpenseTableRows,
  getHoursFieldType,
  getLeaveTableRows,
  getShouldResetPayrollStandardHourlyWagePayItems,
  getStandardPayItemsToApplyAmountRule,
  getTaxTableRows,
  getWageTableRows,
} from '../PayrollStandardPaySelectors';
import payItemTypes from '../../../payItemTypes';

describe('PayrollStandardPaySelectors', () => {
  const jobOptions = [
    {
      id: '1',
      jobNumber: '100',
      jobName: 'Job 1',
      isActive: true,
    },
    {
      id: '2',
      jobNumber: '200',
      jobName: 'Job 2 with a long name',
      isActive: true,
    },
    {
      id: '3',
      jobNumber: '12345678901234',
      jobName: 'Job 3 with an even longer name',
      isActive: true,
    },
  ];

  describe('getHoursFieldType', () => {
    it.each([
      [payItemTypes.tax, undefined, undefined, fieldTypes.blank],
      [payItemTypes.deduction, 'Percent', undefined, fieldTypes.blank],
      [payItemTypes.deduction, 'FixedDollar', undefined, fieldTypes.blank],
      [payItemTypes.deduction, 'UserEntered', undefined, fieldTypes.blank],
      [payItemTypes.expense, 'Percent', undefined, fieldTypes.blank],
      [payItemTypes.expense, 'UserEntered', undefined, fieldTypes.blank],
      [
        payItemTypes.superDeductionBeforeTax,
        'PercentOfPayrollCategory',
        undefined,
        fieldTypes.blank,
      ],
      [
        payItemTypes.superDeductionBeforeTax,
        'FixedDollar',
        undefined,
        fieldTypes.blank,
      ],
      [
        payItemTypes.superDeductionBeforeTax,
        'UserEntered',
        undefined,
        fieldTypes.blank,
      ],
      [
        payItemTypes.superDeductionAfterTax,
        'PercentOfPayrollCategory',
        undefined,
        fieldTypes.blank,
      ],
      [
        payItemTypes.superDeductionAfterTax,
        'FixedDollar',
        undefined,
        fieldTypes.blank,
      ],
      [
        payItemTypes.superDeductionAfterTax,
        'UserEntered',
        undefined,
        fieldTypes.blank,
      ],
      [
        payItemTypes.superExpense,
        'PercentOfPayrollCategory',
        undefined,
        fieldTypes.blank,
      ],
      [payItemTypes.superExpense, 'FixedDollar', undefined, fieldTypes.blank],
      [payItemTypes.superExpense, 'UserEntered', undefined, fieldTypes.blank],
      [
        payItemTypes.entitlement,
        'PercentOfPayrollCategory',
        undefined,
        fieldTypes.calculated,
      ],
      [
        payItemTypes.entitlement,
        'FixedHours',
        undefined,
        fieldTypes.calculated,
      ],
      [payItemTypes.entitlement, 'UserEntered', undefined, fieldTypes.input],
      [payItemTypes.wages, undefined, 'Salary', fieldTypes.blank],
      [payItemTypes.wages, undefined, 'Hourly', fieldTypes.input],
    ])(
      'should return field type when pay item type is %s',
      (payItemType, calculationBasis, payBasis, expected) => {
        const actual = getHoursFieldType(
          payItemType,
          calculationBasis,
          payBasis
        );

        expect(actual).toEqual(expected);
      }
    );
  });

  describe('getAmountFieldType', () => {
    it.each([
      [payItemTypes.tax, undefined, fieldTypes.calculated],
      [payItemTypes.deduction, 'Percent', fieldTypes.calculated],
      [payItemTypes.deduction, 'FixedDollar', fieldTypes.calculated],
      [payItemTypes.deduction, 'UserEntered', fieldTypes.input],
      [payItemTypes.expense, 'Percent', fieldTypes.calculated],
      [payItemTypes.expense, 'UserEntered', fieldTypes.calculated],
      [
        payItemTypes.superDeductionBeforeTax,
        'PercentOfPayrollCategory',
        fieldTypes.calculated,
      ],
      [
        payItemTypes.superDeductionBeforeTax,
        'FixedDollar',
        fieldTypes.calculated,
      ],
      [payItemTypes.superDeductionBeforeTax, 'UserEntered', fieldTypes.input],
      [
        payItemTypes.superDeductionAfterTax,
        'PercentOfPayrollCategory',
        fieldTypes.calculated,
      ],
      [
        payItemTypes.superDeductionAfterTax,
        'FixedDollar',
        fieldTypes.calculated,
      ],
      [payItemTypes.superDeductionAfterTax, 'UserEntered', fieldTypes.input],
      [
        payItemTypes.superExpense,
        'PercentOfPayrollCategory',
        fieldTypes.calculated,
      ],
      [payItemTypes.superExpense, 'FixedDollar', fieldTypes.calculated],
      [payItemTypes.superExpense, 'UserEntered', fieldTypes.input],
      [payItemTypes.entitlement, 'PercentOfPayrollCategory', fieldTypes.blank],
      [payItemTypes.entitlement, 'FixedHours', fieldTypes.blank],
      [payItemTypes.entitlement, 'UserEntered', fieldTypes.blank],
      [payItemTypes.wages, undefined, fieldTypes.input],
      [payItemTypes.wages, undefined, fieldTypes.input],
    ])(
      'should return field type when pay item type is %s',
      (payItemType, calculationBasis, expected) => {
        const actual = getAmountFieldType(payItemType, calculationBasis);

        expect(actual).toEqual(expected);
      }
    );
  });

  describe('buildPayItemEntry', () => {
    const jobOptionsWithInactiveJobs = [
      {
        id: '1',
        jobNumber: '100',
        jobName: 'Job 1',
        isActive: false,
      },
      {
        id: '2',
        jobNumber: '200',
        jobName: 'Job 2 with a long name',
        isActive: true,
      },
      {
        id: '3',
        jobNumber: '12345678901234',
        jobName: 'Job 3 with an even longer name',
        isActive: true,
      },
      {
        id: '4',
        jobNumber: '44444',
        jobName:
          'An inactive job which is not selected, should be filtered out',
        isActive: false,
      },
    ];

    it('should return standard pay item entry with only active job in jobOptions when no current job is selected', () => {
      const standardPayItems = [
        { payItemId: '1', hours: '2.00', amount: '3.00' },
      ];
      const payItemOptions = [
        {
          id: '1',
          name: 'Pay item 1',
          type: payItemTypes.deduction,
          calculationBasis: 'Percent',
        },
      ];
      const allocatedPayItemId = '1';
      const expected = {
        payItemId: '1',
        payItemType: payItemTypes.deduction,
        name: 'Pay item 1',
        hours: '2.00',
        amount: '3.00',
        hourFieldType: fieldTypes.blank,
        amountFieldType: fieldTypes.calculated,
        jobOptions,
      };

      const actual = buildPayItemEntry(
        standardPayItems,
        payItemOptions,
        allocatedPayItemId,
        jobOptions
      );

      expect(actual).toEqual(expected);
    });

    it('should return standard pay item entry with current selected inactive job but not other inactive jobs in jobOptions', () => {
      const currentInactiveJobId = '1';
      const standardPayItems = [
        {
          payItemId: '1',
          hours: '2.00',
          amount: '3.00',
          jobId: currentInactiveJobId,
        },
      ];
      const payItemOptions = [
        {
          id: '1',
          name: 'Pay item 1',
          type: payItemTypes.deduction,
          calculationBasis: 'Percent',
        },
      ];
      const allocatedPayItemId = '1';
      const expectedJobOptions = [
        {
          id: '1',
          jobNumber: '100',
          jobName: 'Job 1',
          isActive: false,
        },
        {
          id: '2',
          jobNumber: '200',
          jobName: 'Job 2 with a long name',
          isActive: true,
        },
        {
          id: '3',
          jobNumber: '12345678901234',
          jobName: 'Job 3 with an even longer name',
          isActive: true,
        },
      ];
      const expected = {
        payItemId: '1',
        payItemType: payItemTypes.deduction,
        name: 'Pay item 1',
        hours: '2.00',
        amount: '3.00',
        hourFieldType: fieldTypes.blank,
        amountFieldType: fieldTypes.calculated,
        jobId: currentInactiveJobId,
        jobOptions: expectedJobOptions,
      };

      const actual = buildPayItemEntry(
        standardPayItems,
        payItemOptions,
        allocatedPayItemId,
        jobOptionsWithInactiveJobs
      );

      expect(actual).toEqual(expected);
    });

    it('should return standard pay item entry with only active job in jobOptions when current job is active', () => {
      const currentActiveJobId = '2';
      const standardPayItems = [
        {
          payItemId: '1',
          hours: '2.00',
          amount: '3.00',
          jobId: currentActiveJobId,
        },
      ];
      const payItemOptions = [
        {
          id: '1',
          name: 'Pay item 1',
          type: payItemTypes.deduction,
          calculationBasis: 'Percent',
        },
      ];
      const expectedJobOptions = [
        {
          id: '2',
          jobNumber: '200',
          jobName: 'Job 2 with a long name',
          isActive: true,
        },
        {
          id: '3',
          jobNumber: '12345678901234',
          jobName: 'Job 3 with an even longer name',
          isActive: true,
        },
      ];
      const allocatedPayItemId = '1';
      const expected = {
        payItemId: '1',
        payItemType: payItemTypes.deduction,
        name: 'Pay item 1',
        hours: '2.00',
        amount: '3.00',
        hourFieldType: fieldTypes.blank,
        amountFieldType: fieldTypes.calculated,
        jobId: currentActiveJobId,
        jobOptions: expectedJobOptions,
      };

      const actual = buildPayItemEntry(
        standardPayItems,
        payItemOptions,
        allocatedPayItemId,
        jobOptionsWithInactiveJobs
      );

      expect(actual).toEqual(expected);
    });

    it('should return default pay item entry', () => {
      const standardPayItems = [];
      const payItemOptions = [
        {
          id: '1',
          name: 'Pay item 1',
          type: payItemTypes.deduction,
          calculationBasis: 'Percent',
        },
      ];
      const allocatedPayItemId = '1';
      const expected = {
        payItemId: '1',
        payItemType: payItemTypes.deduction,
        name: 'Pay item 1',
        hours: '0.00',
        amount: '0.00',
        hourFieldType: fieldTypes.blank,
        amountFieldType: fieldTypes.calculated,
        jobOptions,
      };

      const actual = buildPayItemEntry(
        standardPayItems,
        payItemOptions,
        allocatedPayItemId,
        jobOptions
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('calculateWagePayItemAmount', () => {
    it.each([
      ['RegularRate', 12],
      ['FixedRate', 6],
    ])('should calculate amount for pay rate %s', (payRate, expected) => {
      const actual = calculateWagePayItemAmount({
        payRate,
        payRateMultiplier: 1,
        fixedHourlyRate: 2,
        hours: 3,
        hourlyRate: 4,
      });

      expect(actual).toEqual(expected);
    });
  });

  describe('getShouldResetPayrollStandardHourlyWagePayItems', () => {
    it.each([
      ['annualSalary', 'Salary', true],
      ['annualSalary', 'Hourly', true],
      ['hourlyRate', 'Salary', true],
      ['hourlyRate', 'Hourly', true],
      ['selectedPayCycle', 'Salary', false],
      ['selectedPayCycle', 'Hourly', true],
      ['payPeriodHours', 'Salary', false],
      ['payPeriodHours', 'Hourly', true],
      ['selectedPayBasis', 'Hourly', false],
    ])(
      'when key is %s and pay basis is %s, should return %s',
      (key, selectedPayBasis, expected) => {
        const state = {
          payrollDetails: {
            wage: {
              selectedPayBasis,
            },
          },
        };

        const actual = getShouldResetPayrollStandardHourlyWagePayItems(
          state,
          key
        );

        expect(actual).toEqual(expected);
      }
    );
  });

  describe('getWageTableRows', () => {
    it('should return allocated wage pay items', () => {
      const state = {
        payrollDetails: {
          deductionDetails: {
            deductionPayItems: [{ id: '41' }],
          },
          superannuationDetails: {
            allocatedPayItems: [{ id: '31' }, { id: '33' }],
          },
          tax: {
            taxPayItems: [{ id: '21' }],
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
          standardPayDetails: {
            standardPayItems: [
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
        jobs: jobOptions,
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
            amountFieldType: fieldTypes.input,
            hourFieldType: fieldTypes.blank,
            payBasis: 'Salary',
            jobOptions,
          },
          {
            id: '13',
            payItemId: '13',
            name: 'A hourly',
            payItemType: 'WagesPayrollCategory',
            hours: '0.00',
            amount: '0.00',
            amountFieldType: fieldTypes.input,
            hourFieldType: fieldTypes.input,
            payBasis: 'Hourly',
            jobOptions,
          },
          {
            id: '14',
            payItemId: '14',
            name: 'B hourly',
            payItemType: 'WagesPayrollCategory',
            hours: '0.00',
            amount: '0.00',
            amountFieldType: fieldTypes.input,
            hourFieldType: fieldTypes.input,
            payBasis: 'Hourly',
            jobOptions,
          },
          {
            id: '15',
            payItemId: '15',
            name: 'A Salary',
            payItemType: 'WagesPayrollCategory',
            hours: '0.00',
            amount: '0.00',
            amountFieldType: fieldTypes.input,
            hourFieldType: fieldTypes.blank,
            payBasis: 'Salary',
            jobOptions,
          },
          {
            id: '16',
            payItemId: '16',
            name: 'B Salary',
            payItemType: 'WagesPayrollCategory',
            hours: '0.00',
            amount: '0.00',
            amountFieldType: fieldTypes.input,
            hourFieldType: fieldTypes.blank,
            payBasis: 'Salary',
            jobOptions,
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
    it('should return allocated deduction and super deduction pay items', () => {
      const state = {
        payrollDetails: {
          deductionDetails: {
            deductionPayItems: [{ id: '41' }],
          },
          superannuationDetails: {
            allocatedPayItems: [{ id: '31' }, { id: '33' }],
          },
          tax: {
            taxPayItems: [{ id: '21' }],
          },
          wage: {
            allocatedWagePayItems: [{ id: '11' }],
          },
          standardPayDetails: {
            standardPayItems: [],
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
            id: '12',
            name: 'Base hourly',
            type: 'WagesPayrollCategory',
            payBasis: 'Hourly',
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
        jobs: jobOptions,
      };

      const expected = {
        entries: [
          {
            payItemId: '41',
            payItemType: 'DeductionPayrollCategory',
            name: 'Deduction percent',
            hours: '0.00',
            amount: '0.00',
            amountFieldType: fieldTypes.calculated,
            hourFieldType: fieldTypes.blank,
            jobOptions,
          },
          {
            payItemId: '31',
            payItemType: 'SuperannuationDeductionBeforeTaxPayrollCategory',
            name: 'Super deduction before tax',
            hours: '0.00',
            amount: '0.00',
            amountFieldType: fieldTypes.calculated,
            hourFieldType: fieldTypes.blank,
            jobOptions,
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
    it('should return allocated tax pay items', () => {
      const state = {
        payrollDetails: {
          deductionDetails: {
            deductionPayItems: [{ id: '41' }],
          },
          superannuationDetails: {
            allocatedPayItems: [{ id: '31' }, { id: '33' }],
          },
          tax: {
            taxPayItems: [{ id: '21' }],
          },
          wage: {
            allocatedWagePayItems: [{ id: '11' }],
          },
          standardPayDetails: {
            standardPayItems: [],
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
            id: '12',
            name: 'Base hourly',
            type: 'WagesPayrollCategory',
            payBasis: 'Hourly',
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
        jobs: jobOptions,
      };

      const expected = {
        entries: [
          {
            payItemId: '21',
            payItemType: 'TaxPayrollCategory',
            name: 'PAYG Withholding',
            hours: '0.00',
            amount: '0.00',
            amountFieldType: fieldTypes.calculated,
            hourFieldType: fieldTypes.blank,
            payBasis: undefined,
            jobOptions,
          },
        ],
        showTableRows: true,
      };

      const actual = getTaxTableRows(state);

      expect(actual.entries).toEqual(expected.entries);
      expect(actual.showTableRows).toEqual(expected.showTableRows);
    });
  });

  describe('getExpenseTableRows', () => {
    it('should return allocated employer expense and super (expense) pay items', () => {
      const state = {
        payrollDetails: {
          superannuationDetails: {
            allocatedPayItems: [{ id: '31' }, { id: '33' }],
          },
          employerExpenseDetails: {
            expensePayItems: [{ id: '61' }],
          },
          standardPayDetails: {
            standardPayItems: [],
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
        jobs: jobOptions,
      };

      const expected = {
        entries: [
          {
            payItemId: '61',
            payItemType: 'ExpensePayrollCategory',
            name: 'Employer expense percent',
            hours: '0.00',
            amount: '0.00',
            amountFieldType: fieldTypes.calculated,
            hourFieldType: fieldTypes.blank,
            jobOptions,
          },
          {
            payItemId: '33',
            payItemType: 'SuperannuationExpensePayrollCategory',
            name: 'Super expense',
            hours: '0.00',
            amount: '0.00',
            amountFieldType: fieldTypes.calculated,
            hourFieldType: fieldTypes.blank,
            jobOptions,
          },
        ],
        showTableRows: true,
      };

      const actual = getExpenseTableRows(state);

      expect(actual.entries).toEqual(expected.entries);
      expect(actual.showTableRows).toEqual(expected.showTableRows);
    });
  });

  describe('getLeaveTableRows', () => {
    it('should return allocated leave pay items', () => {
      const state = {
        payrollDetails: {
          leaveDetails: {
            allocatedLeavePayItems: [{ payItemId: '51' }],
          },
          standardPayDetails: {
            standardPayItems: [],
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
        jobs: jobOptions,
      };

      const expected = {
        entries: [
          {
            payItemId: '51',
            payItemType: 'EntitlementPayrollCategory',
            name: 'Leave percent',
            hours: '0.00',
            amount: '0.00',
            amountFieldType: fieldTypes.blank,
            hourFieldType: fieldTypes.calculated,
            jobOptions,
          },
        ],
        showTableRows: true,
      };

      const actual = getLeaveTableRows(state);

      expect(actual.entries).toEqual(expected.entries);
      expect(actual.showTableRows).toEqual(expected.showTableRows);
    });
  });

  describe('getStandardPayItemsToApplyAmountRule', () => {
    it('should get hourly wage pay item for standard pay', () => {
      const state = {
        payrollDetails: {
          wage: {
            allocatedWagePayItems: [{ id: '11' }, { id: '12' }],
          },
          standardPayDetails: {
            standardPayItems: [
              { payItemId: '11', hours: '1.00' },
              { payItemId: '12', hours: '1.00' },
            ],
          },
        },
        wagePayItems: [
          { id: '11', type: 'WagesPayrollCategory', payBasis: 'Salary' },
          { id: '12', type: 'WagesPayrollCategory', payBasis: 'Hourly' },
        ],
        jobs: jobOptions,
      };

      const actual = getStandardPayItemsToApplyAmountRule(state);

      expect(
        actual.find(({ payItemId }) => payItemId === '11')
      ).toBeUndefined();
      expect(actual.find(({ payItemId }) => payItemId === '12')).toBeDefined();
    });
  });
});
