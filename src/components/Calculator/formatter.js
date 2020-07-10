import formatNumberWithDecimalScaleRange from '../../common/valueFormatters/formatNumberWithDecimalScaleRange';

const NEGATIVE_SIGN = '-';

export const removeCommas = (value) => {
  const formattedValue = String(value);
  const regexPattern = /,/g;
  const newValue = formattedValue.replace(regexPattern, '');
  return newValue;
};

export const addDecimalPlaces = (
  value,
  numeralDecimalScaleMin,
  numeralDecimalScaleMax
) => {
  const stringValue = String(value);

  return stringValue
    ? formatNumberWithDecimalScaleRange(
        stringValue,
        numeralDecimalScaleMin,
        numeralDecimalScaleMax
      )
    : stringValue;
};

const addComma = (integers) => {
  const remainingLength = integers.length;

  if (remainingLength > 3) {
    const last3Integers = integers.slice(integers.length - 3);
    const restOfIntegers = integers.slice(0, integers.length - 3);

    if (restOfIntegers === NEGATIVE_SIGN) {
      return integers;
    }

    return addComma(restOfIntegers).concat(',').concat(last3Integers);
  }

  return integers;
};

const addCommas = (number) => {
  const integersAndDecimals = number.split('.', 2);

  if (integersAndDecimals.length > 0) {
    const integerWithComma = addComma(integersAndDecimals[0]);

    return integersAndDecimals.length > 1
      ? integerWithComma.concat('.').concat(integersAndDecimals[1])
      : integerWithComma;
  }

  return number;
};

const replaceNumber = ({ acc, index, originalNumbers, formattedNumbers }) => {
  if (formattedNumbers.length === index) {
    return acc;
  }

  const originalNumber = originalNumbers[index];
  const formattedNumber = formattedNumbers[index];
  const updatedAcc = acc.replace(originalNumber, formattedNumber);
  const nextIndex = index + 1;

  return replaceNumber({
    acc: updatedAcc,
    index: nextIndex,
    originalNumbers,
    formattedNumbers,
  });
};

export const addCommasInPlace = (value) => {
  if (value === undefined) {
    return '';
  }

  const stringValue = String(value);
  const regexPattern = /[,.0-9]*/g;
  const allNumberGroupings = stringValue
    .match(regexPattern)
    .filter((v) => Boolean(v));
  const formattedNumberGroupings = allNumberGroupings.map(addCommas);

  const formattedString = replaceNumber({
    acc: stringValue,
    index: 0,
    originalNumbers: allNumberGroupings,
    formattedNumbers: formattedNumberGroupings,
  });

  return formattedString;
};
