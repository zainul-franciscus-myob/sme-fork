import formatNumberWithDecimalScaleRanger from '../formatNumberWithDecimalScaleRange';

describe('formatNumberWithDecimalScaleRange', () => {
  it.each([
    ['should format number to max decimal scale when length of decimal value is larger than max', 3.33333, 2, 3, '3.333'],
    ['should retain the number of decimal places if the length is between min and max', 3.333, 2, 4, '3.333'],
    ['should format number to min decimal scale when there is no decimal place', 3, 2, 5, '3.00'],
    ['should format number to max decimal scale when length of decimal value is less than min', 3.1, 2, 5, '3.10'],
    ['should format number to min decimal scale when all decimal places to max are zero', 40.0001, 2, 3, '40.00'],
  ])('%s', (_, num, min, max, expected) => {
    const actual = formatNumberWithDecimalScaleRanger(num, min, max);

    expect(actual).toBe(expected);
  });
});
