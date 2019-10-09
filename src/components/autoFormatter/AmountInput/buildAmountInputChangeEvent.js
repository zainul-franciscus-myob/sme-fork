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

  if (Number.isNaN(number)) {
    if (currentValue.length !== 0) {
      return copyEventWithValue(e, '');
    }

    return undefined;
  }

  return e;
};

export default buildAmountInputChangeEvent;
