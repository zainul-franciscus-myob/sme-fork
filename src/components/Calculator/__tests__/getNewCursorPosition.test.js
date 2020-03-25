import getNewCursorPosition from '../getNewCursorPosition';

describe('getNewCursorPosition', () => {
  describe('should return the current position of the cursor', () => {
    describe('when we\'re just adding or removing numbers', () => {
      [
        {
          oldValue: '123456',
          value: '',
          formattedValue: '',
        },
        {
          oldValue: '12',
          value: '123',
          formattedValue: '123',
        },
        {
          oldValue: '12345',
          value: '1,345',
          formattedValue: '1,345',
        },
        {
          value: '1,2345',
          formattedValue: '12,345',
        },
        {
          value: '12,33,345',
          formattedValue: '1,233,345',
        },
      ].forEach(test => {
        it(`${test.value} to ${test.formattedValue}`, () => {
          const endPosition = 1;
          const values = {
            ...test,
            endPosition,
            oldValue: '',
          };
          expect(getNewCursorPosition(values)).toEqual(endPosition);
        });
      });
    });

    describe('when a comma is being deleted and the cursor is at the beginning of the input', () => {
      [
        {
          endPosition: 0,
          oldValue: '1234',
          value: ',234',
          formattedValue: '234',
        },
        {
          endPosition: 0,
          oldValue: '1234567',
          value: ',234,567',
          formattedValue: '234,567',
        },
      ].forEach(test => {
        it(`${test.value} to ${test.formattedValue}`, () => {
          expect(getNewCursorPosition(test)).toEqual(test.endPosition);
        });
      });
    });

    describe('when a user is trying to backspace on a comma', () => {
      [
        {
          endPosition: 1,
          expectedEndPosition: 1,
          oldValue: '1234567',
          value: '1234,567',
          formattedValue: '1,234,567',
        },
        {
          endPosition: 1,
          expectedEndPosition: 1,
          oldValue: '1234',
          value: '1234',
          formattedValue: '1,234',
        },
      ].forEach(test => {
        it(`${test.value} to ${test.formattedValue}`, () => {
          expect(getNewCursorPosition(test)).toEqual(test.expectedEndPosition);
        });
      });
    });

    describe('edge cases', () => {
      [
        {
          // Occurs when a user selects from one comma to another comma
          // and presses backspace E.g. 1,234,567
          endPosition: 1,
          expectedEndPosition: 1,
          oldValue: '1234567',
          value: '1567',
          formattedValue: '1,567',
        },
        {
          // Occurs when a user presses backspace on a decimal point E.g. 111.22
          endPosition: 3,
          expectedEndPosition: 3,
          oldValue: '111.22',
          value: '11222',
          formattedValue: '11,222',
        },
      ].forEach(test => {
        it(`${test.value} to ${test.formattedValue}`, () => {
          expect(getNewCursorPosition(test)).toEqual(test.expectedEndPosition);
        });
      });
    });
  });

  describe('should increment the current position of the cursor when a comma is added', () => {
    [
      {
        endPosition: 3,
        expectedEndPosition: 4,
        oldValue: '123',
        value: '1234',
        formattedValue: '1,234',
      },
      {
        endPosition: 5,
        expectedEndPosition: 6,
        oldValue: '123456',
        value: '123,4567',
        formattedValue: '1,234,567',
      },
      {
        endPosition: 7,
        expectedEndPosition: 9,
        oldValue: '',
        value: '1234567',
        formattedValue: '1,234,567',
      },
    ].forEach(test => {
      it(`${test.value} to ${test.formattedValue}`, () => {
        expect(getNewCursorPosition(test)).toEqual(test.expectedEndPosition);
      });
    });
  });

  describe('should decrement the current position of the cursor when a comma is removed', () => {
    [
      {
        endPosition: 4,
        expectedEndPosition: 3,
        oldValue: '1234',
        value: '1,23',
        formattedValue: '123',
      },
      {
        endPosition: 6,
        expectedEndPosition: 5,
        oldValue: '1234567',
        value: '1,234,67',
        formattedValue: '123,467',
      },
    ].forEach(test => {
      it(`${test.value} to ${test.formattedValue}`, () => {
        expect(getNewCursorPosition(test)).toEqual(test.expectedEndPosition);
      });
    });
  });

  /*
    We've chosen to not implement a solution for this edge case due to the added complexity it will
    bring to our existing branching logic. It also does not break any behaviour, only the index
    of the cursor will be aligned incorrectly one space.
  */
  describe('test cases that will fail given the existing implementation', () => {
    [
      {
        // Occurs when a user presses backspace on the leading digit behind an operator
        // E.g. 1,123*1,123 and presses backspace on the `1` behind the `*` operator.
        endPosition: 6,
        expectedEndPosition: 6,
        actualEndPosition: 5,
        oldValue: '1123*1123',
        value: '1,123*,123',
        formattedValue: '1,123*123',
      },
    ].forEach(test => {
      it(`${test.value} to ${test.formattedValue}`, () => {
        expect(getNewCursorPosition(test)).toEqual(test.actualEndPosition);
      });
    });
  });
});
