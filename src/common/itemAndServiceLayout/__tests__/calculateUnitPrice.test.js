import calculateUnitPrice from '../calculateUnitPrice';

describe('calculateUnitPrice', () => {
  it.each([
    [99.99, 10, 1, '111.1'],
    [2000, 50, 2, '2000'],
  ])(
    'return calculated value of %i/(1-(%i/100))/%i',
    (amount, discount, units, expected) => {
      const actual = calculateUnitPrice(units, amount, discount);

      expect(actual).toEqual(expected);
    }
  );
});
