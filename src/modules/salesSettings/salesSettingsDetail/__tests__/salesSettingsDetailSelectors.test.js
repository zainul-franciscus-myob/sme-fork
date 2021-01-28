import {
  getIsSubscribed,
  getMarketplaceLink,
  getReminderLink,
  getShowActions,
  getShowDateField,
  getShowDateInput,
  getTemplates,
} from '../SalesSettingsDetailSelectors';
import { mainTabIds } from '../tabItems';
import Region from '../../../../common/types/Region';

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
      const expected =
        'https://foo.bar?consumer=ARL&source=SMEP&origin=global&cfid=123';

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

describe('getIsSubscribed', () => {
  it.each([
    ['testvalue', true],
    ['', false],
  ])('checks einvoice subsribed status', (appName, expected) => {
    const state = {
      salesSettings: {
        eInvoicingAppName: appName,
      },
    };
    expect(getIsSubscribed(state)).toEqual(expected);
  });
});

describe('getShowActions', () => {
  it.each([
    [Region.au, false],
    [
      Region.nz,
      new TypeError(`Cannot read property 'hasActions' of undefined`),
    ],
  ])(
    'checks eInvoicing visiblity of tabs for region',
    (testRegion, expected) => {
      const state = {
        region: testRegion,
        selectedTab: mainTabIds.eInvoicing,
        isEInvoicingEnabled: true,
      };

      try {
        expect(getShowActions(state)).toEqual(expected);
      } catch (e) {
        expect(e).toEqual(expected);
      }
    }
  );
});

describe('marketplaceClick', () => {
  it.each([
    [
      Region.au,
      'https://www.myob.com/au/apps/category/tasks?category=einvoicing',
    ],
    [
      Region.nz,
      'https://www.myob.com/nz/apps/category/tasks?category=einvoicing',
    ],
  ])(
    'checks marketplace link is correct for region',
    (testRegion, expected) => {
      const state = {
        region: testRegion,
      };

      expect(getMarketplaceLink(state)).toEqual(expected);
    }
  );
});
