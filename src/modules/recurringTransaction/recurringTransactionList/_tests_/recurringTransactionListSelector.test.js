import {
  calculateOverdue,
  getFlipSortOrder,
  getTableEntries,
} from '../recurringTransactionListSelectors';
import ScheduleFrequency from '../../types/ScheduleFrequency';
import TransactionType from '../../types/TransactionType';

describe('recurringTransactionListSelector', () => {
  describe('getTableEntries', () => {
    it.each([
      [TransactionType.BILL, true],
      [TransactionType.GENERAL_JOURNAL, false],
      [TransactionType.INVOICE, true],
      [TransactionType.QUOTE, false],
      [TransactionType.RECEIVE_MONEY, false],
      [TransactionType.SPEND_MONEY, true],
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

  describe('calculateOverdue', () => {
    it('returns empty if the frequency is Never', () => {
      const actual = calculateOverdue({ frequency: ScheduleFrequency.NEVER });
      expect(actual).toEqual('');
    });

    it('returns Up to date if the number of days overdue is negative', () => {
      const actual = calculateOverdue({
        frequency: ScheduleFrequency.FORTNIGHTLY,
        currentDate: new Date('01/31/2020'),
        nextDueDate: new Date('02/28/2020'),
      });
      expect(actual).toEqual('Up to date');
    });

    it('returns Up to date if the number of days overdue is 0', () => {
      const actual = calculateOverdue({
        frequency: ScheduleFrequency.FORTNIGHTLY,
        currentDate: new Date('01/01/2020'),
        nextDueDate: new Date('01/01/2020'),
      });
      expect(actual).toEqual('Up to date');
    });

    it.each([
      ['01/28/2020', '3 days'],
      ['01/30/2020', '1 day'],
    ])(
      'returns the number of overdue days if the number of days overdue is positive',
      (nextDueDate, expected) => {
        const actual = calculateOverdue({
          frequency: ScheduleFrequency.FORTNIGHTLY,
          currentDate: new Date('01/31/2020'),
          nextDueDate: new Date(nextDueDate),
        });
        expect(actual).toEqual(expected);
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
