import Decimal from 'decimal.js';

const calculateDiscount = (units, unitPrice, amount) => {
  const totalAmount = Decimal(units).times(unitPrice);
  const decimalAmount = Decimal(amount);
  return Decimal(1)
    .minus(decimalAmount.div(totalAmount))
    .times(100).valueOf();
};

export default calculateDiscount;
