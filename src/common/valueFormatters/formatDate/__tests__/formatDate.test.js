import formatDate from '../formatDate';

describe('formatDate', () => {
  const dateFormat = 'dd/MM/yyyy';

  it('should format date when date is valid', () => {
    const isoDate = '2019-06-25T03:46:39+00:00';

    const expected = '25/06/2019';

    const actual = formatDate(isoDate, dateFormat);

    expect(actual).toBe(expected);
  });

  it('should format date when day is less than 12', () => {
    const isoDate = '2019-06-07T03:46:39+00:00';

    const expected = '07/06/2019';

    const actual = formatDate(isoDate, dateFormat);

    expect(actual).toBe(expected);
  });

  it('should return undefined when date value is falsy', () => {
    const isoDate = undefined;

    const actual = formatDate(isoDate, dateFormat);

    expect(actual).toBeUndefined();
  });

  it('should return undefined when date value is invalid string', () => {
    const isoDate = 'aaa';

    const actual = formatDate(isoDate, dateFormat);

    expect(actual).toBeUndefined();
  });
});
