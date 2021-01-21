import TransactionType from '../../types/TransactionType';
import getRecurringUrl from '../getRecurringUrl';

describe('getRecurringUrl', () => {
  it.each([
    [TransactionType.BILL, '/#/au/bizId/recurringTransaction'],
    [TransactionType.GENERAL_JOURNAL, '/#/au/bizId/recurringTransaction'],
    [TransactionType.INVOICE, '/#/au/bizId/recurringTransaction/45/invoice'],
    [TransactionType.QUOTE, '/#/au/bizId/recurringTransaction'],
    [TransactionType.RECEIVE_MONEY, '/#/au/bizId/recurringTransaction'],
    [
      TransactionType.SPEND_MONEY,
      '/#/au/bizId/recurringTransaction/45/spendMoney',
    ],
    [TransactionType.TRANSFER_MONEY, '/#/au/bizId/recurringTransaction'],
    ['Unknown', '/#/au/bizId/recurringTransaction'],
  ])('', (transactionType, expected) => {
    const businessId = 'bizId';
    const region = 'au';
    const recurringTransactionId = '45';

    const actual = getRecurringUrl({
      businessId,
      region,
      recurringTransactionId,
      transactionType,
    });

    expect(actual).toEqual(expected);
  });
});
