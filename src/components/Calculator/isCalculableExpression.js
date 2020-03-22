import { removeCommas } from './formatter';
import evaluate from './evaluate';

const isCalculableExpression = (value) => {
  const valueWithoutCommas = removeCommas(value);
  const isNotANumber = Number.isNaN(Number(valueWithoutCommas));
  const parsedValue = evaluate(valueWithoutCommas);
  const isACalculableExpression = parsedValue !== '';
  return isNotANumber && isACalculableExpression;
};

export default isCalculableExpression;
