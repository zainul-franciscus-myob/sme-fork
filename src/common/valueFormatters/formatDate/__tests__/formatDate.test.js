import formatDate from '../formatDate';

describe('formatDate', () => {
  it('returns undefined when a Date object is not provided', () => {
    const nonDate = 1570487373566;

    const actual = formatDate(nonDate);

    expect(actual).toEqual(undefined);
  });

  it('formats a date to a given format', () => {
    const actual = formatDate(new Date(2019, 8, 18), 'YYYY-MM-DD');

    expect(actual).toEqual('2019-09-18');
  });
});
