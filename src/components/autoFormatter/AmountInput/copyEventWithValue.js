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

export default copyEventWithValue;
