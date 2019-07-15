import { getSaveTaxPayItemPayload, getTab } from '../PayItemListSelectors';
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
