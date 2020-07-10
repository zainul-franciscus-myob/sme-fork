import {
  getIsBeforeStartOfFinancialYear,
  getRefundDate,
  getStartOfFinancialYearDate,
} from '../payRefundSelectors';

describe('getIsBeforeStartOfFinancialYear', () => {
  it.each([
    ['2014-07-01', '2010-01-01', true],
    ['2014-07-01', '2014-06-30', true],
    ['2014-07-01', '2014-07-01', false],
    ['2014-07-01', '2014-07-02', false],
    ['2014-07-01', '2015-01-01', false],
  ])(
    'when start of financial year date is %s and issue date is %s, should return %s',
    (startOfFinancialYearDate, date, expected) => {
      const refund = { date };
      const state = {
        refund,
        startOfFinancialYearDate,
      };

      const actual = getIsBeforeStartOfFinancialYear(state);

      expect(actual).toEqual(expected);
    }
  );
});

describe('getStartOfFinancialYearDate', () => {
  it('should return the value of StartOfFinancialYearDate', () => {
    const expected = '2014-07-01';
    const state = {
      startOfFinancialYearDate: expected,
    };

    const actual = getStartOfFinancialYearDate(state);

    expect(actual).toEqual(expected);
  });
});

describe('getRefundDate', () => {
  it('should return the value of Refund Date', () => {
    const expected = '2020-06-01';
    const state = {
      refund: {
        date: expected,
      },
    };

    const actual = getRefundDate(state);

    expect(actual).toEqual(expected);
  });
});
