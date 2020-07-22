import {
  getCannotRecordTransactionBeforeDate,
  getFinancialYearDateRange,
  getNewFinancialYearDetails,
} from '../businessDetailSelectors';

describe('businessDetailSelector', () => {
  describe('getNewFinancialYearDetails', () => {
    it('given AU file, should return start and end of financial year', () => {
      const state = {
        businessDetails: {
          financialYear: '2020',
          lastMonthInNewFinancialYear: '6',
        },
      };

      const expected = {
        startOfNewFinancialYear: '01/07/2020',
        endOfNewFinancialYear: '30/06/2021',
        lastMonthInNewFinancialYear: '6',
      };

      const actual = getNewFinancialYearDetails(state);

      expect(actual).toEqual(expected);
    });

    it('given last month of financial year is december, should return correctly', () => {
      const state = {
        businessDetails: {
          financialYear: '2020',
          lastMonthInNewFinancialYear: '12',
        },
      };

      const expected = {
        startOfNewFinancialYear: '01/01/2021',
        endOfNewFinancialYear: '31/12/2021',
        lastMonthInNewFinancialYear: '12',
      };

      const actual = getNewFinancialYearDetails(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getFinancialYearDateRange', () => {
    const monthOptions = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    it('should return correct financial year date range for AU from july to june', () => {
      const state = {
        businessDetails: {
          financialYear: '2020',
          lastMonthInFinancialYear: '6',
        },
        monthOptions,
      };

      const expected = {
        start: '1 Jul 2019',
        end: '30 Jun 2020',
      };

      const actual = getFinancialYearDateRange(state);

      expect(actual).toEqual(expected);
    });

    it('should return correct financial year date range for NZ from april to march', () => {
      const state = {
        businessDetails: {
          financialYear: '2022',
          lastMonthInFinancialYear: '3',
        },
        monthOptions,
      };

      const expected = {
        start: '1 Apr 2021',
        end: '31 Mar 2022',
      };

      const actual = getFinancialYearDateRange(state);

      expect(actual).toEqual(expected);
    });

    it('should return correct financial year date range from january to december', () => {
      const state = {
        businessDetails: {
          financialYear: '2025',
          lastMonthInFinancialYear: '12',
        },
        monthOptions,
      };

      const expected = {
        start: '1 Jan 2025',
        end: '31 Dec 2025',
      };

      const actual = getFinancialYearDateRange(state);

      expect(actual).toEqual(expected);
    });

    it('should return correct financial year date range for a leap year', () => {
      const state = {
        businessDetails: {
          financialYear: '2024',
          lastMonthInFinancialYear: '2',
        },
        monthOptions,
      };

      const expected = {
        start: '1 Mar 2023',
        end: '29 Feb 2024',
      };

      const actual = getFinancialYearDateRange(state);

      expect(actual).toEqual(expected);
    });

    it('should return correct financial year date range for a NON leap year', () => {
      const state = {
        businessDetails: {
          financialYear: '2021',
          lastMonthInFinancialYear: '2',
        },
        monthOptions,
      };

      const expected = {
        start: '1 Mar 2020',
        end: '28 Feb 2021',
      };

      const actual = getFinancialYearDateRange(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getCannotRecordTransactionBeforeDate', () => {
    it('should return first day of the opening balance month and year', () => {
      const state = {
        businessDetails: {
          financialYear: '2020',
          lastMonthInFinancialYear: '6',
          openingBalanceMonth: '7',
          openingBalanceYear: '2019',
        },
      };

      const expected = '1 Jul 2019';

      const actual = getCannotRecordTransactionBeforeDate(state);

      expect(actual).toEqual(expected);
    });
  });
});
