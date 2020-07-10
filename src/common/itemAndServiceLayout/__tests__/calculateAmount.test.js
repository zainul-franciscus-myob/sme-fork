import calculateAmount from '../calculateAmount';

describe('calculateAmount', () => {
  it.each([
    [1, 1, 1, '0.99'],
    [9, 10, 0, '90'],
    [2, 10.98, 50, '10.98'],
    [2, 10.98, -50, '32.94'],
  ])(
    'return calculated value of %i * %i (1 - %i / 100)',
    (units, unitPrice, discount, expected) => {
      const actual = calculateAmount(units, unitPrice, discount);

      expect(actual).toEqual(expected);
    }
  );
});
