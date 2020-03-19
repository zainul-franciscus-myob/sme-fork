import areValuesEqual from '../areValuesEqual';

describe('areValuesEqual', () => {
  describe('should evaluate to true for equivocal amounts', () => {
    [
      {
        currValue: 5000,
        propValue: '5,000',
      },
      {
        currValue: '5000.00',
        propValue: '5000',
      },
      {
        currValue: 5000.00,
        propValue: '5,000',
      },
    ].forEach((test) => {
      it(`${test.currValue} and ${test.propValue}`, () => {
        expect(areValuesEqual(test.currValue, test.propValue)).toEqual(true);
      });
    });
  });

  describe('should evaluate to true for values that contain non-numbers', () => {
    [
      {
        currValue: '12*',
        propValue: '12*',
      },
      {
        currValue: '12*(1+2)-1,222.00',
        propValue: '12*(1+6-1.11)-123,112.1',
      },
    ].forEach((test) => {
      it(`${test.currValue} and ${test.propValue}`, () => {
        expect(areValuesEqual(test.currValue, test.propValue)).toEqual(true);
      });
    });
  });

  describe('should evaluate to false for values that are not equivocal', () => {
    [
      {
        currValue: '124',
        propValue: '126',
      },
      {
        currValue: '1,122.77',
        propValue: '1,122.76',
      },
    ].forEach((test) => {
      it(`${test.currValue} and ${test.propValue}`, () => {
        expect(areValuesEqual(test.currValue, test.propValue)).toEqual(false);
      });
    });
  });
});
