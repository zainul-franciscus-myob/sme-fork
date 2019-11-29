const removeTrailingZeroes = number => String(Number(number));

const countDecimalPlaces = (num) => {
  if (Math.floor(num) === num) return 0;
  return num.toString().split('.')[1].length || 0;
};

const formatNumberWithDecimalScaleRange = (number, min, max) => {
  const value = Number(number) || 0;

  if (countDecimalPlaces(value) < min) {
    return value.toFixed(min);
  }

  const withoutTrailingZeros = removeTrailingZeroes(value.toFixed(max));

  const numberWithoutTrailingZeros = Number(withoutTrailingZeros);
  if (countDecimalPlaces(numberWithoutTrailingZeros) < min) {
    return numberWithoutTrailingZeros.toFixed(min);
  }
  return withoutTrailingZeros;
};

export default formatNumberWithDecimalScaleRange;
