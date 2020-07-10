import { getLegend } from '../DashboardTrackingSelectors';

describe('DashboardTrackingSelectors', () => {
  describe('getLegend', () => {
    it('should ', () => {
      const expected = {
        incomeAmount: '$1.00',
        expenseAmount: '-$1.00',
        profitAmount: '$1.00',
        isIncomeNegative: false,
        isExpensesNegative: true,
        isProfitNegative: false,
        financialYearLabel: 'Current',
        financialYearDisplay: '2019-2020',
      };

      const actual = getLegend.resultFunc(1, -1, 1, '2019-07-01', [
        { name: 'Current', value: '2019-07-01' },
      ]);

      expect(actual).toEqual(expected);
    });
  });
});
