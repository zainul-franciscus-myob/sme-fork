const removeTrailingZeroes = (number) => String(Number(number));

// By using "e" we can easily multiply or divide number by 10^n
// For example 1.23e2 = 123, 123e-2 = 1.23
// In this function, giving we want to round number "value" to "n" decimal places
// 1. we mulitply "value" by "10^n"
// 2. use Math.round to round the value to integer
// 3. divide "value" by "10^n"
const round = (value, decimals) =>
  Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`).toFixed(
    decimals
  );

const countDecimalPlaces = (num) => {
  if (Math.floor(num) === num) return 0;
  return num.toString().split('.')[1].length || 0;
};

const formatNumberWithRoundedScaleRange = (number, min, max) => {
  const value = Number(number) || 0;

  if (countDecimalPlaces(value) < min) {
    return round(value, min);
  }

  const withoutTrailingZeros = removeTrailingZeroes(round(value, max));

  const numberWithoutTrailingZeros = Number(withoutTrailingZeros);
  if (countDecimalPlaces(numberWithoutTrailingZeros) < min) {
    return round(numberWithoutTrailingZeros, min);
  }
  return withoutTrailingZeros;
};

export default formatNumberWithRoundedScaleRange;
