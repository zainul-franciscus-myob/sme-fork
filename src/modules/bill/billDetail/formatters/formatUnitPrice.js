const removeTrailingZeroes = number => String(Number(number));

const countDecimalPlaces = (num) => {
  if (Math.floor(num) === num) return 0;
  return num.toString().split('.')[1].length || 0;
};

const formatUnitPrice = (unitPrice) => {
  const num = Number(unitPrice);

  if (countDecimalPlaces(num) < 2) {
    return num.toFixed(2);
  }

  return removeTrailingZeroes(num.toFixed(6));
};

export default formatUnitPrice;
