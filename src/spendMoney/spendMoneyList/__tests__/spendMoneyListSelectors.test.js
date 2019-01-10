import { convertToUnixTime } from '../spendMoneyListSelectors';

describe('spendMoneySelectors', () => {
  it('it can convert a YYYY-MM-DD date format to a Unix Timestamp', () => {
    const state = {
      spendMoney: {
        date: '2018-07-31',
      },
    };

    const expected = '1532995200000';
    const actual = convertToUnixTime(state.spendMoney.date);
    expect(actual).toEqual(expected);
  });
});
