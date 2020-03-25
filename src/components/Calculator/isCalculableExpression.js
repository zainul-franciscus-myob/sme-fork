import evaluate from './evaluate';

const isCalculableExpression = (value) => {
  const isNotANumber = Number.isNaN(Number(value));
  const parsedValue = evaluate(value);
  const isACalculableExpression = parsedValue !== '';
  return isNotANumber && isACalculableExpression;
};

export default isCalculableExpression;
