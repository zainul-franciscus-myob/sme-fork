import {
  calculateWagePayItemAmount,
  fieldTypes,
  getAmountFieldType,
  getHoursFieldType,
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
