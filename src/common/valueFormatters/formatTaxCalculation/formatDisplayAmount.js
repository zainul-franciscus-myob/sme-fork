import { Decimal } from 'decimal.js';

const formatDisplayAmount = amount => Decimal(amount).toFixed(2, Decimal.ROUND_HALF_UP);

export default formatDisplayAmount;
