import isCalculableExpression from '../isCalculableExpression';

describe('isCalculableExpression', () => {
  it('should return false for an empty string', () => {
    const value = '';
    expect(isCalculableExpression(value)).toEqual(false);
  });

  describe('should return false for a number', () => {
    [
      { value: '12.12', parsedValue: 12.12 },
      { value: 12.12, parsedValue: 12.12 },
      { value: '0', parsedValue: 0 },
      { value: 0, parsedValue: 0 },
      { value: 999, parsedValue: 999 },
      { value: 12, parsedValue: 12 },
    ].forEach((test) => {
      it(`${test}`, () => {
        expect(isCalculableExpression(test.value, test.parsedValue)).toEqual(
          false
        );
      });
    });
  });

  describe('should return false for an expression that cannot be calculated', () => {
    [
      { value: '12***12', parsedValue: '' },
      { value: '5.0+*+1', parsedValue: '' },
      { value: '9/', parsedValue: '' },
      { value: '5-+1))(', parsedValue: '' },
    ].forEach((test) => {
      it(`${test}`, () => {
        expect(isCalculableExpression(test.value, test.parsedValue)).toEqual(
          false
        );
      });
    });
  });

  describe('should return true for an expression that can be calculated', () => {
    [
      { value: '12*12', parsedValue: 144 },
      { value: '10-10', parsedValue: 0 },
      { value: '5+5*12-(12)', parsedValue: 53 },
    ].forEach((test) => {
      it(`${test}`, () => {
        expect(isCalculableExpression(test)).toEqual(true);
      });
    });
  });
});
