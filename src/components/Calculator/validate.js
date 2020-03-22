import { removeCommas } from './formatter';
import evaluate from './evaluate';

const defaultValidationHandler = (value) => {
  const stringValue = String(value);
  const regexPattern = '[,.+\\-*\\/()0-9 ]*';
  const regex = new RegExp(regexPattern);
  const groups = stringValue.match(regex);
  return groups[0] === groups.input;
};

const countIntegerPlaces = (num) => {
  if (Math.floor(num) === num) return num.length;
  return num.split('.')[0].length || 0;
};

const numeralIntegerScaleHandler = (value, scale) => {
  const valueWithoutCommas = removeCommas(value);
  let parsedValue = valueWithoutCommas;
  const isExpression = Number.isNaN(Number(valueWithoutCommas));

  if (isExpression) {
    parsedValue = String(evaluate(valueWithoutCommas));
  }

  const numberOfIntegerPlaces = countIntegerPlaces(parsedValue);
  return numberOfIntegerPlaces <= scale;
};

const validationRules = {
  numeralIntegerScale: numeralIntegerScaleHandler,
};

const validate = (rules = { numeralIntegerScale: undefined }) => (value) => {
  const rulesToValidateBy = Object.keys(rules).filter(rule => Boolean(rules[rule]));
  const validatedRules = rulesToValidateBy.map(rule => {
    const propValue = rules[rule];
    return validationRules[rule](value, propValue);
  });
  return validatedRules.every(Boolean) && defaultValidationHandler(value);
};

export default validate;
