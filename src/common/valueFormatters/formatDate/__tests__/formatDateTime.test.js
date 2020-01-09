import formatDateTime from '../formatDateTime';

describe('formatDateTime', () => {
  it.each([
    ['AM datetime', '2019-07-11T00:03:52.174Z', '11/07/2019 12:03am'],
    ['PM datetime', '2019-07-11T16:03:52.174Z', '11/07/2019 4:03pm'],
  ])('formats datetime for display - %s', (scenario, isoDateTime, expected) => {
    const actual = formatDateTime(isoDateTime);

    expect(actual).toEqual(expected);
  });
});
