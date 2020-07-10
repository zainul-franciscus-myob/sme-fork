import calculateDiscount from '../calculateDiscount';

describe('calculateDiscount', () => {
  it.each([
    [1, 1, 1, '0'],
    [9, 10, 2000, '99.955'],
    [2, 10, 50.99, '99.607766228672288684'],
  ])(
    'return calculated value of 1 - (%i / (%i * %i)) * 100',
    (amount, units, unitPrice, expected) => {
      const actual = calculateDiscount(units, unitPrice, amount);

      expect(actual).toEqual(expected);
    }
  );
});
