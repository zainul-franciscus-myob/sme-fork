import {
  getExpensesTableEntries,
  getSaveTaxPayItemPayload,
  getTab,
} from '../PayItemListSelectors';
import { tabIds } from '../tabItems';

describe('PayItemListSelectors', () => {
  describe('getTab', () => {
    it('returns tab from state', () => {
      const tab = tabIds.expenses;
      const state = {
        tab,
      };
      const expected = tab;
      const actual = getTab(state);

      expect(actual).toBe(expected);
    });

    it('returns first tab in the tabItems when the tab in state is invalid', () => {
      const state = {
        tab: 'something',
      };
      const expected = Object.values(tabIds)[0];
      const actual = getTab(state);

      expect(actual).toBe(expected);
    });
  });

  describe('getExpensesTableEntries', () => {
    it('gets entry with link', () => {
      const state = {
        businessId: '1',
        region: 'au',
        expenses: {
          entries: [
            {
              id: '6',
            },
            {
              id: '7',
            },
          ],
        },
      };

      const actual = getExpensesTableEntries(state);

      const expected = [
        {
          id: '6',
          link: '/#/au/1/payItem/expense/6',
        },
        {
          id: '7',
          link: '/#/au/1/payItem/expense/7',
        },
      ];

      expect(actual).toEqual(expected);
    });
  });

  describe('getSaveTaxPayItemPayload', () => {
    it('returns atoReportingCategory and accountId for save', () => {
      const state = {
        taxPayItem: {
          tax: {
            atoReportingCategory: 'a',
            accountId: 'b',
          },
        },
      };
      const expected = {
        atoReportingCategory: 'a',
        accountId: 'b',
      };

      const actual = getSaveTaxPayItemPayload(state);
      expect(actual).toEqual(expected);
    });
  });
});
