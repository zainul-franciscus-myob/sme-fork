import { FORMAT_PAYROLL_TAX_AMOUNT } from '../../../EmployeeIntents';
import employeeDetailReducer from '../employeeDetailReducer';

describe('PayrollTaxReducer', () => {
  describe('formatAmountInput', () => {
    it('should format percentages', () => [
      ['many decimal places', '25.0006', '25.0006'],
      ['trailing zeros', '25.0050', '25.005'],
      ['1 decimal place', '25.5000', '25.50'],
      ['whole number', '25.0000', '25.00'],
      ['minus sign', '-', '0.00'],
    ].forEach((i) => {
      const [, input, expected] = i;

      const state = {
        payrollDetails: {
          tax: {},
        },
      };

      const action = {
        intent: FORMAT_PAYROLL_TAX_AMOUNT,
        key: 'withholdingVariationRate',
        value: input,
      };

      const actual = employeeDetailReducer(state, action);

      expect(actual.payrollDetails.tax.withholdingVariationRate).toEqual(expected);
    }));
  });
});
