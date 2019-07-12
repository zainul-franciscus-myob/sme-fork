import { UPDATE_CALCULATION_BASIS_AMOUNTS } from '../LeavePayItemIntents';
import leavePayItemReducer from '../leavePayItemReducer';

describe('leavePayItemReducer', () => {
  describe('updateCalculationBasisAmounts', () => {
    it('should format percentages', () => [
      ['many decimal places', '25.00006', '25.00006'],
      ['trailing zeros', '25.00050', '25.0005'],
      ['1 decimal place', '25.50000', '25.50'],
      ['whole number', '25.00000', '25.00'],
      ['hyphen', '-', '0.00'],
    ].forEach((i) => {
      const [, input, expected] = i;

      const state = {};

      const action = {
        intent: UPDATE_CALCULATION_BASIS_AMOUNTS,
        key: 'calculationBasisPercentage',
        value: input,
      };

      const actual = leavePayItemReducer(state, action);

      expect(actual.leavePayItem.calculationBasisPercentage).toEqual(expected);
    }));
  });
});
