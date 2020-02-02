import { Decimal } from 'decimal.js';

const formatDiscount = discount => String(discount);

export const formatDisplayDiscount = discount => Decimal(discount)
  .toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
  .valueOf();

export default formatDiscount;
