import isCalculableExpression from '../isCalculableExpression';

describe('isCalculableExpression', () => {
  it('should return false for an empty string', () => {
    const value = '';
    expect(isCalculableExpression(value)).toEqual(false);
  });

  describe('should return false for a number', () => {
    [
      '12.12', 12.12, '0', 0, 999, 12,
    ].forEach(test => {
      it(`${test}`, () => {
        expect(isCalculableExpression(test)).toEqual(false);
      });
    });
  });

  describe('should return false for an expression that cannot be calculated', () => {
    [
      '12***12',
      '5.0+*+1',
      '9/',
      '5-+1))(',
    ].forEach(test => {
      it(`${test}`, () => {
        expect(isCalculableExpression(test)).toEqual(false);
      });
    });
  });

  describe('should return true for an expression that can be calculated', () => {
    [
      '12*12',
      '10-10',
      '5+5*12-(12)',
    ].forEach(test => {
      it(`${test}`, () => {
        expect(isCalculableExpression(test)).toEqual(true);
      });
    });
  });
});
