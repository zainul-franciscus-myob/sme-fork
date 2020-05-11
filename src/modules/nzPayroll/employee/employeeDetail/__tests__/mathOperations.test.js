import { addNumbers } from '../mathOperations';

describe('mathOperations', () => {
  test.each([
    [undefined, null, '0'],
    ['5', 5, '10'],
    ['1,00', '5', '105'],
    ['7.0005', '2.9995', '10'],
    ['5.8652', '7.9995', '13.8647'],
    ['%', '&', '0'],
    [true, false, '0'],
    ['7', null, '7'],
  ])('addNumbers( %s , %j ) to be %d', (inputOne, inputTwo, expected) => {
    expect(addNumbers(inputOne, inputTwo)).toEqual(expected);
  });
});
