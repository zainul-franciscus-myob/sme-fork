import { getScheduleOptions } from '../RecurringTransactionModalSelectors';
import TransactionType from '../../types/TransactionType';

describe('RecurringTransactionModalSelectors', () => {
  describe('getScheduleOptions', () => {
    it('returns RecurringScheduleOptions props', () => {
      const schedule = {
        name: 'Recurring A',
      };

      const actual = getScheduleOptions.resultFunc(
        schedule,
        TransactionType.INVOICE,
        false
      );

      expect(actual).toEqual({
        name: 'Recurring A',
        transactionType: TransactionType.INVOICE,
        isDisabled: false,
        showTransactionType: false,
      });
    });
  });
});
