import { Decimal } from 'decimal.js';

const formatAmount = amount => amount.toFixed(6);

export const formatDisplayAmount = amount => Decimal(amount).toFixed(2, Decimal.ROUND_HALF_UP);

export default formatAmount;
