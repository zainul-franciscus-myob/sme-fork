import {
  getReminderLink,
  getShowDateField,
  getShowDateInput,
  getTemplates,
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

  describe('getReminderLink', () => {
    it('builds reminder link', () => {
      const state = {
        businessId: '123',
        reminders: {
          url: 'https://foo.bar',
        },
      };
      const expected = 'https://foo.bar?consumer=ARL&origin=global&cfid=123';

      expect(getReminderLink(state)).toEqual(expected);
    });
  });

  describe('getTemplates', () => {
    it.each([
      [
        'IckyLeaks - Service & Items2',
        '/#/au/bizId/template/IckyLeaks%20-%20Service%20%26%20Items2',
      ],
      [
        'Special template for special people',
        '/#/au/bizId/template/Special%20template%20for%20special%20people',
      ],
    ])('returns link with encoded template name', (name, expected) => {
      const templateSettings = {
        templates: [{ name }],
      };

      const actual = getTemplates.resultFunc('au', 'bizId', templateSettings);

      expect(actual[0].link).toEqual(expected);
    });
  });
});
