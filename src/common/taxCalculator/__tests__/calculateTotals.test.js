import { Decimal } from 'decimal.js';

import calculateTotals from '../calculateTotals';

describe('calculateTotals', () => {
  it('should calculate right totals when tax inclusive', () => {
    const lines = [
      {
        taxExclusiveAmount: Decimal(50),
        taxAmount: Decimal(5),
        amount: Decimal(55),
      },
      {
        taxExclusiveAmount: Decimal(100),
        taxAmount: Decimal(10),
        amount: Decimal(110),
      },
    ];

    expect(calculateTotals({ isTaxInclusive: true, lines })).toEqual({
      totalTax: Decimal(15),
      totalAmount: Decimal(165),
      subTotal: Decimal(165),
    });
  });

  it('should calculate right totals when tax exclusive', () => {
    const lines = [
      {
        taxExclusiveAmount: Decimal(50),
        taxAmount: Decimal(5),
        amount: Decimal(50),
      },
      {
        taxExclusiveAmount: Decimal(100),
        taxAmount: Decimal(10),
        amount: Decimal(100),
      },
    ];

    expect(calculateTotals({ isTaxInclusive: false, lines })).toEqual({
      totalTax: Decimal(15),
      totalAmount: Decimal(165),
      subTotal: Decimal(150),
    });
  });
});
