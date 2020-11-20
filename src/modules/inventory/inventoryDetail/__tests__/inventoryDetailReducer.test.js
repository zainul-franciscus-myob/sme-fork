import { UPDATE_BUYING_DETAILS } from '../../InventoryIntents';
import inventoryDetailReducer from '../inventoryDetailReducer';

describe('inventoryDetailReducer', () => {
  describe('updateBuyingDetails', () => {
    it('sets buyingDetails.isTaxInclusive from buyingPriceTaxInclusive', () => {
      const state = {
        item: {
          buyingDetails: {
            isTaxInclusive: false,
            taxCodeId: 0,
          },
        },
      };

      const action = {
        intent: UPDATE_BUYING_DETAILS,
        key: 'buyingPriceTaxInclusive',
        value: true,
      };

      const actual = inventoryDetailReducer(state, action);

      expect(actual.item.buyingDetails.isTaxInclusive).toEqual(true);
    });
  });
});
