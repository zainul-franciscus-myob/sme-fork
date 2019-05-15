import { getTotals } from '../splitAllocationSelectors';

describe('splitAllocationSelectors', () => {
  describe('getTotals', () => {
    [
      ['fully allocated single allocation', [{ amount: 1000 }], 1000, '$1,000.00 (100.00%)', '$0.00 (0.00%)'],
      ['partly allocated single allocation', [{ amount: 500 }], 1000, '$500.00 (50.00%)', '$500.00 (50.00%)'],
      ['fully allocated split allocation', [{ amount: 500 }, { amount: 500 }], 1000, '$1,000.00 (100.00%)', '$0.00 (0.00%)'],
      ['partly allocated split allocation', [{ amount: 500 }, { amount: 100 }], 1000, '$600.00 (60.00%)', '$400.00 (40.00%)'],
      ['negative allocation', [{ amount: -500 }], 1000, '$-500.00 (-50.00%)', '$1,500.00 (150.00%)'],
      ['calculated decimal values', [{ amount: 33 }, { amount: 67.7 }], 295, '$100.70 (34.14%)', '$194.30 (65.86%)'],
    ].forEach((args) => {
      const [scenario, ...rest] = args;

      it(`should return ${scenario}`, () => {
        const [lines, total, totalAllocated, totalUnallocated] = rest;

        const result = getTotals.resultFunc(lines, total);

        expect(result.totalAllocated).toEqual(totalAllocated);
        expect(result.totalUnallocated).toEqual(totalUnallocated);
      });
    });
  });
});
