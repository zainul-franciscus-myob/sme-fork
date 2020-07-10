import {
  getFavouriteReports,
  getPopularReports,
} from '../DashboardPayrollReportsSelectors';

describe('DashboardPayrollReportsSelectors', () => {
  describe('getFavouriteReports', () => {
    const state = {
      businessId: '🥬',
      region: 'au',
      config: {
        myReportsUrl: 'https://🦕.org',
      },
      payrollReports: {
        favourites: [],
        all: [
          {
            name: 'Payroll category transactions',
            path: 'payrollCategoryTransactions',
            displayName: 'Pay item transactions',
          },
          {
            name: 'Payroll summary',
            path: 'payrollSummary',
            displayName: 'Payroll summary',
          },
          {
            name: 'Payroll register',
            path: 'payrollRegister',
            displayName: 'Payroll register',
          },
          {
            name: 'Payroll activity',
            path: 'payrollActivity',
            displayName: 'Payroll activity',
          },
          {
            name: 'Payroll advice',
            path: 'payrollAdvice',
            displayName: 'Payroll advice',
          },
          { name: 'Timesheets', path: 'timesheets', displayName: 'Timesheets' },
          {
            name: 'Accrual by fund summary',
            path: 'accrualByFundSummary',
            displayName: 'Accrual by fund',
          },
          {
            name: 'Accrual by fund detail',
            path: 'accrualByFundDetail',
            displayName: 'Accrual by fund (detail)',
          },
          {
            name: 'Leave balance summary',
            path: 'leaveBalanceSummary',
            displayName: 'Leave balance',
          },
          {
            name: 'Leave balance detail',
            path: 'leaveBalanceDetail',
            displayName: 'Leave balance (detail)',
          },
        ],
      },
    };
    it('only returns 6 favourites', () => {
      const modifiedState = {
        ...state,
        payrollReports: {
          ...state.payrollReports,
          favourites: [
            'Payroll category transactions',
            'Payroll summary',
            'Payroll register',
            'Payroll activity',
            'Payroll advice',
            'Timesheets',
            'Accrual by fund summary',
            'Accrual by fund detail',
            'Leave balance summary',
            'Leave balance summary',
          ],
        },
      };
      const actual = getFavouriteReports(modifiedState);
      expect(actual).toEqual([
        {
          url: 'https://🦕.org/#/au/🥬/payrollCategoryTransactions',
          displayName: 'Pay item transactions',
        },
        {
          url: 'https://🦕.org/#/au/🥬/payrollSummary',
          displayName: 'Payroll summary',
        },
        {
          url: 'https://🦕.org/#/au/🥬/payrollRegister',
          displayName: 'Payroll register',
        },
        {
          url: 'https://🦕.org/#/au/🥬/payrollActivity',
          displayName: 'Payroll activity',
        },
        {
          url: 'https://🦕.org/#/au/🥬/payrollAdvice',
          displayName: 'Payroll advice',
        },
        { url: 'https://🦕.org/#/au/🥬/timesheets', displayName: 'Timesheets' },
      ]);
    });
    it('returns less than 6 favourites', () => {
      const modifiedState = {
        ...state,
        payrollReports: {
          ...state.payrollReports,
          favourites: [
            'Payroll category transactions',
            'Payroll summary',
            'Payroll register',
          ],
        },
      };
      const actual = getFavouriteReports(modifiedState);
      expect(actual).toEqual([
        {
          url: 'https://🦕.org/#/au/🥬/payrollCategoryTransactions',
          displayName: 'Pay item transactions',
        },
        {
          url: 'https://🦕.org/#/au/🥬/payrollSummary',
          displayName: 'Payroll summary',
        },
        {
          url: 'https://🦕.org/#/au/🥬/payrollRegister',
          displayName: 'Payroll register',
        },
      ]);
    });
    it('ignores reports not in all', () => {
      const modifiedState = {
        ...state,
        payrollReports: {
          ...state.payrollReports,
          favourites: ['Jobs profit and loss'],
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
          {
            name: 'Payroll category transactions',
            path: 'payrollCategoryTransactions',
            displayName: 'Pay item transactions',
          },
          {
            name: 'Payroll summary',
            path: 'payrollSummary',
            displayName: 'Payroll summary',
          },
          {
            name: 'Payroll register',
            path: 'payrollRegister',
            displayName: 'Payroll register',
          },
          {
            name: 'Payroll activity',
            path: 'payrollActivity',
            displayName: 'Payroll activity',
          },
          {
            name: 'Payroll advice',
            path: 'payrollAdvice',
            displayName: 'Payroll advice',
          },
          { name: 'Timesheets', path: 'timesheets', displayName: 'Timesheets' },
          {
            name: 'Accrual by fund summary',
            path: 'accrualByFundSummary',
            displayName: 'Accrual by fund',
          },
          {
            name: 'Accrual by fund detail',
            path: 'accrualByFundDetail',
            displayName: 'Accrual by fund (detail)',
          },
          {
            name: 'Leave balance summary',
            path: 'leaveBalanceSummary',
            displayName: 'Leave balance',
          },
          {
            name: 'Leave balance detail',
            path: 'leaveBalanceDetail',
            displayName: 'Leave balance (detail)',
          },
        ],
      },
    };
    it('returns nothing when there are 6 favourites', () => {
      const modifiedState = {
        ...state,
        payrollReports: {
          ...state.payrollReports,
          favourites: [
            'Payroll advice',
            'Timesheets',
            'Accrual by fund summary',
            'Accrual by fund detail',
            'Leave balance summary',
            'Leave balance summary',
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
        {
          url: 'https://🦕.org/#/au/🥬/payrollCategoryTransactions',
          displayName: 'Pay item transactions',
        },
        {
          url: 'https://🦕.org/#/au/🥬/payrollSummary',
          displayName: 'Payroll summary',
        },
        {
          url: 'https://🦕.org/#/au/🥬/payrollRegister',
          displayName: 'Payroll register',
        },
        {
          url: 'https://🦕.org/#/au/🥬/payrollActivity',
          displayName: 'Payroll activity',
        },
        {
          url: 'https://🦕.org/#/au/🥬/payrollAdvice',
          displayName: 'Payroll advice',
        },
        { url: 'https://🦕.org/#/au/🥬/timesheets', displayName: 'Timesheets' },
      ]);
    });
    it('returns first 5 when there is 1 favourite', () => {
      const modifiedState = {
        ...state,
        payrollReports: {
          ...state.payrollReports,
          favourites: ['Timesheets'],
        },
      };
      const actual = getPopularReports(modifiedState);
      expect(actual).toEqual([
        {
          url: 'https://🦕.org/#/au/🥬/payrollCategoryTransactions',
          displayName: 'Pay item transactions',
        },
        {
          url: 'https://🦕.org/#/au/🥬/payrollSummary',
          displayName: 'Payroll summary',
        },
        {
          url: 'https://🦕.org/#/au/🥬/payrollRegister',
          displayName: 'Payroll register',
        },
        {
          url: 'https://🦕.org/#/au/🥬/payrollActivity',
          displayName: 'Payroll activity',
        },
        {
          url: 'https://🦕.org/#/au/🥬/payrollAdvice',
          displayName: 'Payroll advice',
        },
      ]);
    });
    it('should not return report that is already part of favourites', () => {
      const modifiedState = {
        ...state,
        payrollReports: {
          ...state.payrollReports,
          favourites: ['Payroll category transactions'],
        },
      };
      const actual = getPopularReports(modifiedState);
      expect(actual).not.toContainEqual({
        url: 'https://🦕.org/#/au/🥬/payrollCategoryTransactions',
        displayName: 'Pay item transactions',
      });
    });
  });
});
