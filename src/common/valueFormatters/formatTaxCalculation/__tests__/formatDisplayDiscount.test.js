import formatDisplayDiscount from '../formatDisplayDiscount';

describe('formatDisplayDiscount', () => {
  describe.each([
    ['zero', 0, '0.00'],
    ['whole number', 1, '1.00'],
    ['negative number', -1, '-1.00'],
    ['1 decimal place', 1.5, '1.50'],
    ['2 decimal places', 1.55, '1.55'],
    ['3 decimal places with 4 at the third decimal', 1.554, '1.55'],
    ['3 decimal places with 5 at the third decimal', 1.555, '1.56'],
    ['3 decimal places with 6 at the third decimal', 1.556, '1.56'],
    ['4 decimal places', 1.5545, '1.55'],
  ])('format discount when value is %s', (_, discount, expected) => {
    it('format numeric value of number type', () => {
      const actual = formatDisplayDiscount(discount);

      expect(actual).toEqual(expected);
    });

    it('format numeric value of string type', () => {
      const actual = formatDisplayDiscount(discount.toString());

      expect(actual).toEqual(expected);
    });
  });
});
