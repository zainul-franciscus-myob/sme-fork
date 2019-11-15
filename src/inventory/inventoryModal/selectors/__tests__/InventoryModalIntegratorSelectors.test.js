import { getSaveItemContent } from '../InventoryModalIntegratorSelectors';

describe('InventoryModalIntegratorSelectors', () => {
  describe('getSaveItemContent', () => {
    const state = {
      isBuying: true,
      isSelling: true,
      item: {
        displayId: 'hello',
        buyingDetails: {
          a: '',
        },
        sellingDetails: {
          a: 'a',
        },
      },
    };

    it('sends the item', () => {
      const actual = getSaveItemContent(state);

      expect(actual).toEqual({
        displayId: 'hello',
        buyingDetails: {
          a: '',
        },
        sellingDetails: {
          a: 'a',
        },
      });
    });

    it('ignores buyingDetails when isBuying is false', () => {
      const modifiedState = {
        ...state,
        isBuying: false,
      };
      const actual = getSaveItemContent(modifiedState);

      expect(actual.buyingDetails).toEqual(undefined);
    });

    it('ignores sellingDetails when isSelling is false', () => {
      const modifiedState = {
        ...state,
        isSelling: false,
      };
      const actual = getSaveItemContent(modifiedState);

      expect(actual.sellingDetails).toEqual(undefined);
    });
  });
});
