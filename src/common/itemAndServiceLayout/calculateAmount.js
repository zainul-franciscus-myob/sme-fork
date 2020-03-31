import Decimal from 'decimal.js';

const calculateAmount = (units, unitPrice, discount) => {
  const calculatedDiscount = Decimal(1).minus(Decimal(discount).div(100));
  return Decimal(units)
    .times(unitPrice)
    .times(calculatedDiscount).valueOf();
};

export default calculateAmount;
