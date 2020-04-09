import { buildOnBlurEvent } from '../FormattedAmountInput';

describe('buildOnBlurEvent', () => {
  it('returns value of 0 when input is not a number', () => {
    const event = {
      target: {
        value: '-',
        rawValue: '-',
      },
    };

    const actual = buildOnBlurEvent(event);

    expect(actual.target.value).toEqual('0');
  });

  it('use rawValue as value to hide internal formatting by cleave', () => {
    const event = {
      target: {
        value: '1,111',
        rawValue: '1111',
      },
    };

    const actual = buildOnBlurEvent(event);

    expect(actual.target.value).toEqual('1111');
  });
});
