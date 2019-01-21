import { convertToUnixTime } from '../transactionListSelectors';

describe('transactionListSelectors', () => {
  it('it can convert a YYYY-MM-DD date format to a Unix Timestamp', () => {
    const state = {
      date: '2018-07-31',
    };

    const expected = '1532995200000';
    const actual = convertToUnixTime(state.date);
    expect(actual).toEqual(expected);
  });
});
