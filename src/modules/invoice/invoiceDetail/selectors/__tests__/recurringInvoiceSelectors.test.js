import {
  getSaveAsRecurringPayload,
  getSaveAsRecurringUrlParams,
  getShowPrefillRecurringButton,
} from '../recurringInvoiceSelectors';

describe('recurringInvoiceSelectors', () => {
  describe('getSaveAsRecurringUrlParams', () => {
    it('should return businessId', () => {
      const state = {
        businessId: '123',
      };
      const expected = {
        businessId: '123',
      };

      const actual = getSaveAsRecurringUrlParams(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getSaveAsRecurringPayload', () => {
    it('should return the invoice and schedule detail', () => {
      const state = {
        invoice: {
          customerId: '123',
          lines: [],
        },
        recurringSchedule: {
          recurringTransactionName: 'schedule 1',
          nextDueDate: '2020-11-19',
        },
      };

      const expected = {
        invoice: {
          customerId: '123',
          lines: [],
        },
        schedule: {
          recurringTransactionName: 'schedule 1',
          nextDueDate: '2020-11-19',
        },
      };
      const actual = getSaveAsRecurringPayload(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getShowPrefillRecurringButton', () => {
    it('shows on new invoice', () => {
      const actual = getShowPrefillRecurringButton.resultFunc(
        true,
        false,
        true
      );

      expect(actual).toBeTruthy();
    });

    it('hides when feature toggle is off', () => {
      const actual = getShowPrefillRecurringButton.resultFunc(
        true,
        false,
        false
      );

      expect(actual).toBeFalsy();
    });

    it('hides when customer is disabled', () => {
      const actual = getShowPrefillRecurringButton.resultFunc(true, true, true);

      expect(actual).toBeFalsy();
    });
  });
});
