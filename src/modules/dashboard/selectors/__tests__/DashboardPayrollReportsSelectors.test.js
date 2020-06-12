import { getFavouriteReports, getPopularReports } from '../DashboardPayrollReportsSelectors';

describe('DashboardPayrollReportsSelectors', () => {
  describe('getFavouriteReports', () => {
    const state = {
      businessId: '🥬',
      region: 'au',
      config: {
        myReportsUrl: 'https://🦕.org',
      },
      payrollReports: {
        favourites: [
        ],
        all: [
          { id: 'payrollCategoryTransactions', name: 'Pay item transactions' },
          { id: 'payrollSummary', name: 'Payroll summary' },
          { id: 'payrollRegister', name: 'Payroll register' },
          { id: 'payrollActivity', name: 'Payroll activity' },
          { id: 'payrollAdvice', name: 'Payroll advice' },
          { id: 'timesheets', name: 'Timesheets' },
          { id: 'accrualByFundSummary', name: 'Accrual by fund' },
          { id: 'accrualByFundDetail', name: 'Accrual by fund (detail)' },
          { id: 'leaveBalanceSummary', name: 'Leave balance' },
          { id: 'leaveBalanceDetail', name: 'Leave balance (detail)' },
        ],
      },
    };
    it('only returns 6 favourites', () => {
      const modifiedState = {
        ...state,
        payrollReports: {
          ...state.payrollReports,
          favourites: [
            'payrollCategoryTransactions',
            'payrollSummary',
            'payrollRegister',
            'payrollActivity',
            'payrollAdvice',
            'timesheets',
            'accrualByFundSummary',
            'accrualByFundDetail',
            'leaveBalanceSummary',
            'leaveBalanceDetail',
          ],
        },
      };
      const actual = getFavouriteReports(modifiedState);
      expect(actual).toEqual([
        { url: 'https://🦕.org/#/au/🥬/payrollCategoryTransactions', name: 'Pay item transactions' },
        { url: 'https://🦕.org/#/au/🥬/payrollSummary', name: 'Payroll summary' },
        { url: 'https://🦕.org/#/au/🥬/payrollRegister', name: 'Payroll register' },
        { url: 'https://🦕.org/#/au/🥬/payrollActivity', name: 'Payroll activity' },
        { url: 'https://🦕.org/#/au/🥬/payrollAdvice', name: 'Payroll advice' },
        { url: 'https://🦕.org/#/au/🥬/timesheets', name: 'Timesheets' },
      ]);
    });
    it('returns less than 6 favourites', () => {
      const modifiedState = {
        ...state,
        payrollReports: {
          ...state.payrollReports,
          favourites: [
            'payrollCategoryTransactions',
            'payrollSummary',
            'payrollRegister',
          ],
        },
      };
      const actual = getFavouriteReports(modifiedState);
      expect(actual).toEqual([
        { url: 'https://🦕.org/#/au/🥬/payrollCategoryTransactions', name: 'Pay item transactions' },
        { url: 'https://🦕.org/#/au/🥬/payrollSummary', name: 'Payroll summary' },
        { url: 'https://🦕.org/#/au/🥬/payrollRegister', name: 'Payroll register' },
      ]);
    });
    it('ignores reports not in all', () => {
      const modifiedState = {
        ...state,
        payrollReports: {
          ...state.payrollReports,
          favourites: [
            'bankTransactions',
          ],
        },
      };
      const actual = getFavouriteReports(modifiedState);
      expect(actual).toEqual([]);
    });
  });

  describe('getPopularReports', () => {
    const state = {
      businessId: '🥬',
      region: 'au',
      config: {
        myReportsUrl: 'https://🦕.org',
      },
      payrollReports: {
        favourites: [],
        all: [
          { id: 'payrollCategoryTransactions', name: 'Pay item transactions' },
          { id: 'payrollSummary', name: 'Payroll summary' },
          { id: 'payrollRegister', name: 'Payroll register' },
          { id: 'payrollActivity', name: 'Payroll activity' },
          { id: 'payrollAdvice', name: 'Payroll advice' },
          { id: 'timesheets', name: 'Timesheets' },
          { id: 'accrualByFundSummary', name: 'Accrual by fund' },
          { id: 'accrualByFundDetail', name: 'Accrual by fund (detail)' },
          { id: 'leaveBalanceSummary', name: 'Leave balance' },
          { id: 'leaveBalanceDetail', name: 'Leave balance (detail)' },
        ],
      },
    };
    it('returns nothing when there are 6 favourites', () => {
      const modifiedState = {
        ...state,
        payrollReports: {
          ...state.payrollReports,
          favourites: [
            'payrollAdvice',
            'timesheets',
            'accrualByFundSummary',
            'accrualByFundDetail',
            'leaveBalanceSummary',
            'leaveBalanceDetail',
          ],
        },
      };
      const actual = getPopularReports(modifiedState);
      expect(actual).toEqual([]);
    });
    it('returns first 6 when there are no favourites', () => {
      const modifiedState = {
        ...state,
        payrollReports: {
          ...state.payrollReports,
          favourites: [],
        },
      };
      const actual = getPopularReports(modifiedState);
      expect(actual).toEqual([
        { url: 'https://🦕.org/#/au/🥬/payrollCategoryTransactions', name: 'Pay item transactions' },
        { url: 'https://🦕.org/#/au/🥬/payrollSummary', name: 'Payroll summary' },
        { url: 'https://🦕.org/#/au/🥬/payrollRegister', name: 'Payroll register' },
        { url: 'https://🦕.org/#/au/🥬/payrollActivity', name: 'Payroll activity' },
        { url: 'https://🦕.org/#/au/🥬/payrollAdvice', name: 'Payroll advice' },
        { url: 'https://🦕.org/#/au/🥬/timesheets', name: 'Timesheets' },
      ]);
    });
    it('returns first 5 when there is 1 favourite', () => {
      const modifiedState = {
        ...state,
        payrollReports: {
          ...state.payrollReports,
          favourites: [
            'timesheets',
          ],
        },
      };
      const actual = getPopularReports(modifiedState);
      expect(actual).toEqual([
        { url: 'https://🦕.org/#/au/🥬/payrollCategoryTransactions', name: 'Pay item transactions' },
        { url: 'https://🦕.org/#/au/🥬/payrollSummary', name: 'Payroll summary' },
        { url: 'https://🦕.org/#/au/🥬/payrollRegister', name: 'Payroll register' },
        { url: 'https://🦕.org/#/au/🥬/payrollActivity', name: 'Payroll activity' },
        { url: 'https://🦕.org/#/au/🥬/payrollAdvice', name: 'Payroll advice' },
      ]);
    });
    it('should not return report that is already part of favourites', () => {
      const modifiedState = {
        ...state,
        payrollReports: {
          ...state.payrollReports,
          favourites: [
            'payrollCategoryTransactions',
          ],
        },
      };
      const actual = getPopularReports(modifiedState);
      expect(actual).not.toContainEqual(
        { url: 'https://🦕.org/#/au/🥬/payrollCategoryTransactions', name: 'Pay item transactions' },
      );
    });
  });
});
