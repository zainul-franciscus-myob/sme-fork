import { Decimal } from 'decimal.js';

const formatDisplayDiscount = (discount) =>
  Decimal(discount).toFixed(2, Decimal.ROUND_HALF_UP);

export default formatDisplayDiscount;
