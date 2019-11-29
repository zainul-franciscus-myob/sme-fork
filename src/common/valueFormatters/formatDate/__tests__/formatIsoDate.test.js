import formatIsoDate from '../formatIsoDate';

describe('formatIsoDate', () => {
  it('formats date as iso date string', () => {
    const date = new Date(2019, 9, 7);

    const actual = formatIsoDate(date);

    expect(actual).toEqual('2019-10-07');
  });
});
