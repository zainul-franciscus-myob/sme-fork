import isFeatureEnabled from '../isFeatureEnabled';

describe('isFeatureEnabled', () => {
  it.each([
    ['feature completed with early access', true, true, true],
    ['feature completed without early access', true, false, true],
    ['feature not completed with early access', false, true, true],
    ['feature not completed without early access', false, false, false],
    ['no completion data with early access', undefined, true, true],
    ['no completion data without early access', undefined, false, false],
    ['feature completed with no early access data', true, undefined, true],
    [
      'feature not completed with no early access data',
      false,
      undefined,
      false,
    ],
  ])('when %s', (_, isFeatureCompleted, isEarlyAccess, expected) => {
    const actual = isFeatureEnabled({ isFeatureCompleted, isEarlyAccess });

    expect(actual).toEqual(expected);
  });
});
