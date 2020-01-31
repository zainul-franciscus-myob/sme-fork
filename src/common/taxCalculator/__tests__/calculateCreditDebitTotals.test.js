import { Decimal } from 'decimal.js';

import calculateCreditDebitTotals from '../calculateCreditDebitTotals';

describe('calculateCreditDebitTotals', () => {
  it('should calculate right totals', () => {
    const lines = [
      {
        taxExclusiveAmount: Decimal(50),
        taxAmount: Decimal(5),
        amount: Decimal(55),
        isCredit: true,
      },
      {
        taxExclusiveAmount: Decimal(100),
        taxAmount: Decimal(10),
        amount: Decimal(110),
        isCredit: false,
      },
    ];

    expect(calculateCreditDebitTotals({ isTaxInclusive: true, lines })).toEqual({
      totalCredit: Decimal(55),
      totalDebit: Decimal(110),
      totalOutOfBalance: Decimal(55),
      totalTax: Decimal(5),
    });
  });
});
