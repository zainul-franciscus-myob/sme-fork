import buildAmountInputBlurEvent from '../buildAmountInputBlurEvent';

describe('buildAmountInputBlurEvent', () => {
  const generateTestEvent = rawValue => ({
    target: {
      name: 'a',
      rawValue,
    },
  });

  it('should return original event when the rawValue is empty', () => {
    const event = generateTestEvent('');
    const numeralDecimalScaleMin = undefined;
    const numeralDecimalScaleMax = undefined;

    const actual = buildAmountInputBlurEvent(event, numeralDecimalScaleMin, numeralDecimalScaleMax);

    expect(actual).toEqual(event);
  });

  it('should return original event when the rawValue is not a number', () => {
    const event = generateTestEvent('string');
    const numeralDecimalScaleMin = undefined;
    const numeralDecimalScaleMax = undefined;

    const actual = buildAmountInputBlurEvent(event, numeralDecimalScaleMin, numeralDecimalScaleMax);

    expect(actual).toEqual(event);
  });

  it('should return format value when the rawValue is a number', () => {
    const event = generateTestEvent(1000);
    const numeralDecimalScaleMin = 2;
    const numeralDecimalScaleMax = undefined;

    const actual = buildAmountInputBlurEvent(event, numeralDecimalScaleMin, numeralDecimalScaleMax);

    expect(actual).toEqual({
      target: {
        name: 'a',
        value: '1000.00',
        rawValue: '1000.00',
      },
    });
  });

  it('should return format value when the rawValue is a negative number', () => {
    const event = generateTestEvent(-1000);
    const numeralDecimalScaleMin = 2;
    const numeralDecimalScaleMax = undefined;

    const actual = buildAmountInputBlurEvent(event, numeralDecimalScaleMin, numeralDecimalScaleMax);

    expect(actual).toEqual({
      target: {
        name: 'a',
        value: '-1000.00',
        rawValue: '-1000.00',
      },
    });
  });
});
