import buildAmountInputChangeEvent from '../buildAmountInputChangeEvent';

describe('buildAmountInputChangeEvent', () => {
  const event = {
    target: {
      name: 'a',
      value: '1',
      rawValue: '1',
    },
  };

  it('returns original event when value is a number', () => {
    const modifiedEvent = {
      ...event,
      target: {
        ...event.target,
        value: '1',
        rawValue: '1',
      },
    };
    const currentValue = '';

    const actual = buildAmountInputChangeEvent(modifiedEvent, currentValue);

    expect(actual).toEqual(modifiedEvent);
  });

  it('returns undefined when value is a not a number and is currently empty', () => {
    const modifiedEvent = {
      ...event,
      target: {
        ...event.target,
        rawValue: '-',
      },
    };
    const currentValue = '';

    const actual = buildAmountInputChangeEvent(modifiedEvent, currentValue);

    expect(actual).toEqual(undefined);
  });

  it('returns event with empty value when not a number and is currently not empty', () => {
    const modifiedEvent = {
      ...event,
      target: {
        ...event.target,
        rawValue: '.',
      },
    };
    const currentValue = '-1';


    const actual = buildAmountInputChangeEvent(modifiedEvent, currentValue);

    expect(actual).toEqual({
      target: {
        name: 'a',
        value: '',
        rawValue: '',
      },
    });
  });

  it('returns event negative value when receive minus and is currently not empty', () => {
    const modifiedEvent = {
      ...event,
      target: {
        ...event.target,
        rawValue: '-',
      },
    };
    const currentValue = '1';


    const actual = buildAmountInputChangeEvent(modifiedEvent, currentValue);

    expect(actual).toEqual({
      target: {
        name: 'a',
        value: '-1',
        rawValue: '-1',
      },
    });
  });

  it('returns undefined when value is undefined', () => {
    const modifiedEvent = {
      ...event,
      target: {
        ...event.target,
        rawValue: undefined,
      },
    };
    const currentValue = '';

    const actual = buildAmountInputChangeEvent(modifiedEvent, currentValue);

    expect(actual).toEqual(undefined);
  });
});
