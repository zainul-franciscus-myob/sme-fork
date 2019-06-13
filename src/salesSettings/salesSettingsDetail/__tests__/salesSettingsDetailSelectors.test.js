import {
  getPayDirectLink, getReminderLink,
  getShowDateField,
  getShowDateInput,
} from '../SalesSettingsDetailSelectors';

describe('salesSettingsSelectors', () => {
  describe('getShowDateField', () => {
    it('shows date field for OnADayOfTheMonth', () => {
      const state = {
        tabData: {
          paymentType: 'DayOfMonthAfterEOM',
        },
      };

      expect(getShowDateField(state)).toBe(true);
    });

    it('shows date field for InAGivenNumberOfDays', () => {
      const state = {
        tabData: {
          paymentType: 'InAGivenNumberOfDays',
        },
      };

      expect(getShowDateField(state)).toBe(true);
    });

    it('shows date field for DayOfMonthAfterEOM', () => {
      const state = {
        tabData: {
          paymentType: 'DayOfMonthAfterEOM',
        },
      };

      expect(getShowDateField(state)).toBe(true);
    });

    it('shows date field for NumberOfDaysAfterEOM', () => {
      const state = {
        tabData: {
          paymentType: 'NumberOfDaysAfterEOM',
        },
      };

      expect(getShowDateField(state)).toBe(true);
    });

    it('not shows date field for Prepaid', () => {
      const state = {
        tabData: {
          paymentType: 'Prepaid',
        },
      };

      expect(getShowDateField(state)).toBe(false);
    });

    it('not shows date field for CashOnDelivery', () => {
      const state = {
        tabData: {
          paymentType: 'CashOnDelivery',
        },
      };

      expect(getShowDateField(state)).toBe(false);
    });
  });

  describe('getShowDateInput', () => {
    it('not shows date text input for OnADayOfTheMonth', () => {
      const state = {
        tabData: {
          paymentType: 'DayOfMonthAfterEOM',
        },
      };

      expect(getShowDateInput(state)).toBe(false);
    });

    it('shows date text input for InAGivenNumberOfDays', () => {
      const state = {
        tabData: {
          paymentType: 'InAGivenNumberOfDays',
        },
      };

      expect(getShowDateInput(state)).toBe(true);
    });

    it('not shows date text input for DayOfMonthAfterEOM', () => {
      const state = {
        tabData: {
          paymentType: 'DayOfMonthAfterEOM',
        },
      };

      expect(getShowDateInput(state)).toBe(false);
    });

    it('shows date text input for NumberOfDaysAfterEOM', () => {
      const state = {
        tabData: {
          paymentType: 'NumberOfDaysAfterEOM',
        },
      };

      expect(getShowDateInput(state)).toBe(true);
    });
  });

  describe('getPayDirectLink', () => {
    it('builds pay direct link', () => {
      const state = {
        businessId: '123',
        payDirect: {
          serialNumber: '000',
          url: 'https://foo.bar',
        },
      };
      const expected = 'https://foo.bar?cdf=123&sn=000';

      expect(getPayDirectLink(state)).toEqual(expected);
    });
  });

  describe('getReminderLink', () => {
    it('builds reminder link', () => {
      const state = {
        businessId: '123',
        reminders: {
          url: 'https://foo.bar',
        },
      };
      const expected = 'https://foo.bar?consumer=ARL&origin=global&businessId=123';

      expect(getReminderLink(state)).toEqual(expected);
    });
  });
});
