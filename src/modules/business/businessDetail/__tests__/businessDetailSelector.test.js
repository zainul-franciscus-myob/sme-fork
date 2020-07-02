import { getNewFinancialYearDetails } from '../businessDetailSelectors';

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
});
