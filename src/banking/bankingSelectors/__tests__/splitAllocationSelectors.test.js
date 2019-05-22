import { getSplitAllocationPayload, getTotals } from '../splitAllocationSelectors';

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
  describe('getSplitAllocationPayload', () => {
    it('should return a valid payload', () => {
      const state = {
        filterOptions: {
          bankAccount: '123',
          transactionType: 'approved',
        },
        entries: [
          {
            transactionId: '1',
          },
        ],
        openEntry: {
          allocate: {
            isSpendMoney: true,
            date: '2019-10-20',
            contactId: '222',
            isReportable: true,
            lines: [
              {
                accountId: '123',
                amount: '1000.00',
                description: 'my description',
                taxCodeId: '333',
                accounts: [{}, {}],
                taxCodes: [{}, {}],
              },
            ],
          },
        },
      };

      const expected = {
        bankAccountId: '123',
        transactionId: '1',
        isWithdrawal: true,
        contactId: '222',
        date: '2019-10-20',
        isReportable: true,
        lines: [{
          accountId: '123',
          amount: '1000.00',
          description: 'my description',
          taxCodeId: '333',
        }],
      };

      const index = 0;
      const actual = getSplitAllocationPayload(state, index);
      expect(actual).toEqual(expected);
    });
  });
});
