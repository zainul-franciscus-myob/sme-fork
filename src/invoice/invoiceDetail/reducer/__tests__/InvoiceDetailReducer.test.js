import { LOAD_ITEM_OPTION } from '../../../InvoiceIntents';
import invoiceDetailReducer from '../invoiceDetailReducer';

describe('InvoiceDetailReducer', () => {
  describe('LOAD_ITEM_OPTION', () => {
    it('puts the item option at the top of item options', () => {
      const state = {
        itemOptions: [
          {
            id: '1',
            itemId: 'a',
            description: 'A',
          },
        ],
      };

      const action = {
        intent: LOAD_ITEM_OPTION,
        response: {
          id: '2',
          itemId: 'b',
          description: 'B',
        },
      };

      const actual = invoiceDetailReducer(state, action);

      expect(actual.itemOptions).toEqual([
        {
          id: '2',
          itemId: 'b',
          description: 'B',
        },
        {
          id: '1',
          itemId: 'a',
          description: 'A',
        },

      ]);
    });
  });
});
