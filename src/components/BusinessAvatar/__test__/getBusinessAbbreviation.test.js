import getBusinessAbbreviation from '../buildBusinessAbbreviation';

describe('getBusinessAbbreviation', () => {
  it.each([
    [
      'should return first letter of the first two words',
      'Stark Industry',
      'SI',
    ],
    [
      'should ignore any sequential words after two words',
      'Mind Your Own Business',
      'MY',
    ],
    [
      'should return a single letter if business name has only one word',
      'Bob',
      'B',
    ],
    ['should ignore multiple empty space', 'Bob   Business', 'BB'],
    [
      'should treat symbol connecting to a word as part of the word',
      "Bob's Business",
      'BB',
    ],
    ['should split into multiple word on capital letter', 'BobsBusiness', 'BB'],
    ['should treat the split word as normal word', 'BobsBusiness Saga', 'BB'],
    ['should ignore Pty', 'Bluebird Pty Ltd', 'B'],
    ['should ignore Ltd', 'Bluebird Ltd', 'B'],
    ['should treat symbol as any character', '#SymbolicBusinessName', '#S'],
    [
      'should allow lower case as the first letter',
      'camelCaseBusinessName',
      'CC',
    ],
    [
      'should ignore empty space at the beginning of the name',
      ' empty space in front',
      'ES',
    ],
    ['should return empty string when name is empty', '', ''],
    [
      'because having emoji as your business name is so cool',
      '📚 🤓eek',
      '📚🤓',
    ],
  ])('%s', (scenario, businessName, expected) => {
    const actual = getBusinessAbbreviation(businessName);

    expect(actual).toEqual(expected);
  });
});
