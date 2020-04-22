const isCalculableExpression = (value, parsedValue) => {
  const isNotANumber = Number.isNaN(Number(value));
  const isACalculableExpression = parsedValue !== '';
  return isNotANumber && isACalculableExpression;
};

export default isCalculableExpression;
