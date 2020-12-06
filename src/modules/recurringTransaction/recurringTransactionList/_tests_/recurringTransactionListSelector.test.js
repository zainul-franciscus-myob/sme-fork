import {
  getFlipSortOrder,
  getTableEntries,
} from '../recurringTransactionListSelectors';
import TransactionType from '../../types/TransactionType';

describe('recurringTransactionListSelector', () => {
  describe('getTableEntries', () => {
    it.each([
      [TransactionType.BILL, false],
      [TransactionType.GENERAL_JOURNAL, false],
      [TransactionType.INVOICE, true],
      [TransactionType.QUOTE, false],
      [TransactionType.RECEIVE_MONEY, false],
      [TransactionType.SPEND_MONEY, false],
      [TransactionType.TRANSFER_MONEY, false],
      ['Unknown', false],
    ])(
      'determines read link for %s recurring transaction',
      (transactionType, expected) => {
        const entries = [{ id: '1', transactionType }];

        const actual = getTableEntries.resultFunc(entries, 'bizId', 'au');

        if (expected) {
          expect(actual[0].link).toBeDefined();
        } else {
          expect(actual[0].link).toBeUndefined();
        }
      }
    );
  });

  describe('getFlipSortOrder', () => {
    it('should be asc when current order is desc', () => {
      const state = { sortOrder: 'desc' };
      const expected = 'asc';
      const actual = getFlipSortOrder(state);

      expect(actual).toEqual(expected);
    });
    it('should be desc when current order is asc', () => {
      const state = { sortOrder: 'asc' };
      const expected = 'desc';
      const actual = getFlipSortOrder(state);

      expect(actual).toEqual(expected);
    });
  });
});
