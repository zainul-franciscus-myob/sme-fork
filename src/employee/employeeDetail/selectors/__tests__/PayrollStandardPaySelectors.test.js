import {
  buildPayItemEntry,
  calculateWagePayItemAmount,
  fieldTypes,
  getAmountFieldType,
  getCombinedTableRows,
  getExpenseTableRows,
  getHoursFieldType,
  getLeaveTableRows,
  getShouldResetPayrollStandardHourlyWagePayItems,
  getStandardPayItemsToApplyAmountRule,
} from '../PayrollStandardPaySelectors';
import payItemTypes from '../../payItemTypes';

describe('PayrollStandardPaySelectors', () => {
  describe('getHoursFieldType', () => {
    it.each([
      [payItemTypes.tax, undefined, undefined, fieldTypes.blank],
      [payItemTypes.deduction, 'Percent', undefined, fieldTypes.blank],
      [payItemTypes.deduction, 'FixedDollar', undefined, fieldTypes.blank],
      [payItemTypes.deduction, 'UserEntered', undefined, fieldTypes.blank],
      [payItemTypes.expense, 'Percent', undefined, fieldTypes.blank],
      [payItemTypes.expense, 'UserEntered', undefined, fieldTypes.blank],
      [payItemTypes.superDeductionBeforeTax, 'PercentOfPayrollCategory', undefined, fieldTypes.blank],
      [payItemTypes.superDeductionBeforeTax, 'FixedDollar', undefined, fieldTypes.blank],
      [payItemTypes.superDeductionBeforeTax, 'UserEntered', undefined, fieldTypes.blank],
      [payItemTypes.superDeductionAfterTax, 'PercentOfPayrollCategory', undefined, fieldTypes.blank],
      [payItemTypes.superDeductionAfterTax, 'FixedDollar', undefined, fieldTypes.blank],
      [payItemTypes.superDeductionAfterTax, 'UserEntered', undefined, fieldTypes.blank],
      [payItemTypes.superExpense, 'PercentOfPayrollCategory', undefined, fieldTypes.blank],
      [payItemTypes.superExpense, 'FixedDollar', undefined, fieldTypes.blank],
      [payItemTypes.superExpense, 'UserEntered', undefined, fieldTypes.blank],
      [payItemTypes.entitlement, 'PercentOfPayrollCategory', undefined, fieldTypes.calculated],
      [payItemTypes.entitlement, 'FixedHours', undefined, fieldTypes.calculated],
      [payItemTypes.entitlement, 'UserEntered', undefined, fieldTypes.input],
      [payItemTypes.wages, undefined, 'Salary', fieldTypes.blank],
      [payItemTypes.wages, undefined, 'Hourly', fieldTypes.input],
    ])('should return field type when pay item type is %s', (payItemType, calculationBasis, payBasis, expected) => {
      const actual = getHoursFieldType(payItemType, calculationBasis, payBasis);

      expect(actual).toEqual(expected);
    });
  });

  describe('getAmountFieldType', () => {
    it.each([
      [payItemTypes.tax, undefined, fieldTypes.calculated],
      [payItemTypes.deduction, 'Percent', fieldTypes.calculated],
      [payItemTypes.deduction, 'FixedDollar', fieldTypes.calculated],
      [payItemTypes.deduction, 'UserEntered', fieldTypes.input],
      [payItemTypes.expense, 'Percent', fieldTypes.calculated],
      [payItemTypes.expense, 'UserEntered', fieldTypes.calculated],
      [payItemTypes.superDeductionBeforeTax, 'PercentOfPayrollCategory', fieldTypes.calculated],
      [payItemTypes.superDeductionBeforeTax, 'FixedDollar', fieldTypes.calculated],
      [payItemTypes.superDeductionBeforeTax, 'UserEntered', fieldTypes.input],
      [payItemTypes.superDeductionAfterTax, 'PercentOfPayrollCategory', fieldTypes.calculated],
      [payItemTypes.superDeductionAfterTax, 'FixedDollar', fieldTypes.calculated],
      [payItemTypes.superDeductionAfterTax, 'UserEntered', fieldTypes.input],
      [payItemTypes.superExpense, 'PercentOfPayrollCategory', fieldTypes.calculated],
      [payItemTypes.superExpense, 'FixedDollar', fieldTypes.calculated],
      [payItemTypes.superExpense, 'UserEntered', fieldTypes.input],
      [payItemTypes.entitlement, 'PercentOfPayrollCategory', fieldTypes.blank],
      [payItemTypes.entitlement, 'FixedHours', fieldTypes.blank],
      [payItemTypes.entitlement, 'UserEntered', fieldTypes.blank],
      [payItemTypes.wages, undefined, fieldTypes.input],
      [payItemTypes.wages, undefined, fieldTypes.input],
    ])('should return field type when pay item type is %s', (payItemType, calculationBasis, expected) => {
      const actual = getAmountFieldType(payItemType, calculationBasis);

      expect(actual).toEqual(expected);
    });
  });

  describe('buildPayItemEntry', () => {
    it('should return standard pay item entry', () => {
      const standardPayItems = [
        { payItemId: '1', hours: '2.00', amount: '3.00' },
      ];
      const payItemOptions = [
        {
          id: '1', name: 'Pay item 1', type: payItemTypes.deduction, calculationBasis: 'Percent',
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
      };

      const actual = buildPayItemEntry(standardPayItems, payItemOptions, allocatedPayItemId);

      expect(actual).toEqual(expected);
    });

    it('should return default pay item entry', () => {
      const standardPayItems = [];
      const payItemOptions = [
        {
          id: '1', name: 'Pay item 1', type: payItemTypes.deduction, calculationBasis: 'Percent',
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
      };

      const actual = buildPayItemEntry(standardPayItems, payItemOptions, allocatedPayItemId);

      expect(actual).toEqual(expected);
    });
  });

  describe('calculateWagePayItemAmount', () => {
    it.each([
      ['RegularRate', 12],
      ['FixedRate', 6],
    ])('should calculate amount for pay rate %s', (payRate, expected) => {
      const actual = calculateWagePayItemAmount({
        payRate, payRateMultiplier: 1, fixedHourlyRate: 2, hours: 3, hourlyRate: 4,
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
    ])('when key is %s and pay basis is %s, should return %s', (
      key, selectedPayBasis, expected,
    ) => {
      const state = {
        payrollDetails: {
          wage: {
            selectedPayBasis,
          },
        },
      };

      const actual = getShouldResetPayrollStandardHourlyWagePayItems(state, key);

      expect(actual).toEqual(expected);
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
          standardPayDetails: {
            standardPayItems: [],
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
            amountFieldType: fieldTypes.input,
            hourFieldType: fieldTypes.blank,
          },
          {
            payItemId: '21',
            payItemType: 'TaxPayrollCategory',
            name: 'PAYG Withholding',
            hours: '0.00',
            amount: '0.00',
            amountFieldType: fieldTypes.calculated,
            hourFieldType: fieldTypes.blank,
          },
          {
            payItemId: '41',
            payItemType: 'DeductionPayrollCategory',
            name: 'Deduction percent',
            hours: '0.00',
            amount: '0.00',
            amountFieldType: fieldTypes.calculated,
            hourFieldType: fieldTypes.blank,
          },
          {
            payItemId: '31',
            payItemType: 'SuperannuationDeductionBeforeTaxPayrollCategory',
            name: 'Super deduction before tax',
            hours: '0.00',
            amount: '0.00',
            amountFieldType: fieldTypes.calculated,
            hourFieldType: fieldTypes.blank,
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
          },
          {
            payItemId: '33',
            payItemType: 'SuperannuationExpensePayrollCategory',
            name: 'Super expense',
            hours: '0.00',
            amount: '0.00',
            amountFieldType: fieldTypes.calculated,
            hourFieldType: fieldTypes.blank,
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
            allocatedWagePayItems: [
              { id: '11' },
              { id: '12' },
            ],
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
      };

      const actual = getStandardPayItemsToApplyAmountRule(state);

      expect(actual.find(({ payItemId }) => payItemId === '11')).toBeUndefined();
      expect(actual.find(({ payItemId }) => payItemId === '12')).toBeDefined();
    });
  });
});
