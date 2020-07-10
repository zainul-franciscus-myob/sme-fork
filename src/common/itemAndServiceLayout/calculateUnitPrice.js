import Decimal from 'decimal.js';

const calculateUnitPrice = (units, amount, discount) =>
  Decimal(amount)
    .div(Decimal(1).minus(Decimal(discount).div(100)))
    .div(units)
    .valueOf();

export default calculateUnitPrice;
