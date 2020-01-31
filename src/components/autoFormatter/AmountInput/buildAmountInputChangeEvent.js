const copyEventWithValue = (e, newValue) => {
  const { name } = e.target;

  return {
    ...e,
    target: {
      ...e.target,
      name,
      value: newValue,
      rawValue: newValue,
    },
  };
};

const buildAmountInputChangeEvent = (e, currentValue) => {
  const { rawValue } = e.target;
  const number = Number(rawValue);
  const currentNumber = Number(currentValue);

  if (rawValue === '-'
    && !Number.isNaN(currentNumber)
    && currentNumber !== 0
  ) {
    return copyEventWithValue(e, String(-currentNumber));
  }

  if (Number.isNaN(number)) {
    if (currentValue.length !== 0) {
      return copyEventWithValue(e, '');
    }

    return undefined;
  }

  return e;
};

export default buildAmountInputChangeEvent;
