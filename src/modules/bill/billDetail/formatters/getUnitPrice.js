import Decimal from 'decimal.js';

const getUnitPrice = ({ units, amount, discount, currentUnitPrice }) => {
  const percent = Number(
    Decimal(1).minus(Decimal(discount).div(100)).valueOf()
  );
  if (percent === 0 || units === 0) {
    return currentUnitPrice;
  }
  const unitPrice = amount.div(percent).div(units);

  return unitPrice;
};

export default getUnitPrice;
