import { getMatchTransactionPayload } from '../matchTransactionSelectors';

describe('matchTransactionSelectors', () => {
  describe('getMatchTransactionPayload', () => {
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
          match: {
            selectedJournalLineId: '444',
            entries: [{
              journalLineId: '444',
              referenceId: '1234',
              journalId: '3333',
              sourceJournal: 'CashPayment',
            }],
          },
        },
      };

      const expected = {
        bankAccountId: '123',
        transactionId: '1',
        sourceJournal: 'CashPayment',
        journalId: '3333',
        journalLineId: '444',
        referenceId: '1234',
      };

      const index = 0;
      const actual = getMatchTransactionPayload(state, index);
      expect(actual).toEqual(expected);
    });
  });
});
