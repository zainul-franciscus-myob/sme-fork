import Decimal from 'decimal.js';

import getUnitPrice from '../getUnitPrice';

describe('getUnitPrice', () => {
  it('should return current unit price if discount is 100%', () => {
    const units = 1;
    const amount = 20.0;
    const discount = 100.0;
    const currentUnitPrice = 75.0;

    const unitPrice = getUnitPrice({
      units,
      amount,
      discount,
      currentUnitPrice,
    });

    expect(unitPrice).toEqual(currentUnitPrice);
  });

  it('should return current unit price if units are 0', () => {
    const units = 0;
    const amount = 20.0;
    const discount = 50.0;
    const currentUnitPrice = 75.0;

    const unitPrice = getUnitPrice({
      units,
      amount,
      discount,
      currentUnitPrice,
    });

    expect(unitPrice).toEqual(currentUnitPrice);
  });

  it('should calculate unit price', () => {
    const units = 1;
    const amount = Decimal(20.0);
    const discount = 50.0;
    const currentUnitPrice = 75.0;

    const unitPrice = getUnitPrice({
      units,
      amount,
      discount,
      currentUnitPrice,
    });

    expect(unitPrice).toEqual(Decimal(40));
  });
});
