import { getShouldUsePayrollLayout } from '../DashboardSelectors';

describe('DashboardSelectors', () => {
  describe('getShouldUsePayrollLayout', () => {
    test.each([
      [false, 'payroll', 'banking', 'bankFeedBalance', 'sales', 'purchases', 'leanEngage', 'tracking'],
      [true, 'payroll', 'leanEngage'],
      [false, 'payroll', 'leanEngage', 'purchases'],
      [false, 'leanEngage'],
    ])('should evaluate combination to %o', (expected, ...rest) => {
      const state = {
        enabled: rest,
      };

      const actual = getShouldUsePayrollLayout(state);

      expect(actual).toEqual(expected);
    });
  });
});
