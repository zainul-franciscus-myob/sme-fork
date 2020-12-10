import {
  CLOSE_ALERT,
  LOAD_ITEM,
  OPEN,
  OPEN_ALERT,
  START_LOADING,
  STOP_LOADING,
  UPDATE_BUYING_OPTION,
  UPDATE_IS_BUYING,
  UPDATE_ITEM_OPTION,
  UPDATE_SELLING_OPTION,
} from '../InventoryModalIntents';
import { RESET_STATE } from '../../../../SystemIntents';
import inventoryModalReducer from '../inventoryModalReducer';

describe('inventoryModalReducer', () => {
  describe('OPEN', () => {
    it('sets isOpen to true', () => {
      const state = {
        isOpen: false,
      };

      const action = {
        intent: OPEN,
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual.isOpen).toEqual(true);
    });
  });

  describe('RESET_STATE', () => {
    it('sets isOpen to false', () => {
      const state = {
        isOpen: true,
      };

      const action = {
        intent: RESET_STATE,
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual.isOpen).toEqual(false);
    });
  });

  describe('LOAD_ITEM', () => {
    it('sets the state using the action response', () => {
      const state = {};

      const action = {
        intent: LOAD_ITEM,
        response: {
          a: 'a',
          b: 'b',
        },
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual).toEqual({
        a: 'a',
        b: 'b',
      });
    });
  });

  describe('UPDATE_ITEM_OPTION', () => {
    it('updates key with value', () => {
      const state = {
        item: { a: 'a' },
      };

      const action = {
        intent: UPDATE_ITEM_OPTION,
        key: 'a',
        value: 'b',
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual.item).toEqual({
        a: 'b',
      });
    });
  });

  describe('UPDATE_SELLING_OPTION', () => {
    it('updates key with value', () => {
      const state = {
        item: {
          sellingDetails: {
            a: 'a',
          },
        },
      };

      const action = {
        intent: UPDATE_SELLING_OPTION,
        key: 'a',
        value: 'b',
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual.item.sellingDetails).toEqual({
        a: 'b',
      });
    });

    it('updates isTaxInclusive when key is isTaxInclusiveForSellingDetails', () => {
      const state = {
        item: {
          sellingDetails: {
            isTaxInclusive: false,
          },
        },
      };

      const action = {
        intent: UPDATE_SELLING_OPTION,
        key: 'isTaxInclusiveForSellingDetails',
        value: true,
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual).toEqual({
        item: {
          sellingDetails: {
            isTaxInclusive: true,
          },
        },
      });
    });
    it('updates taxCodeId according to selected accountOption', () => {
      const state = {
        item: {
          sellingDetails: {},
        },
        sellingAccountOptions: [
          {
            id: '1',
            taxCodeId: '2',
          },
          {
            id: '3',
            taxCodeId: '4',
          },
        ],
      };
      const action = {
        intent: UPDATE_SELLING_OPTION,
        key: 'accountId',
        value: '3',
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual.item.sellingDetails.accountId).toEqual('3');
      expect(actual.item.sellingDetails.taxCodeId).toEqual('4');
    });
    it('updates taxCodeId with value', () => {
      const state = {
        item: {
          sellingDetails: {
            taxCodeId: '1',
          },
        },
      };
      const action = {
        intent: UPDATE_SELLING_OPTION,
        key: 'taxCodeId',
        value: '3',
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual.item.sellingDetails.taxCodeId).toEqual('3');
    });
  });

  describe('UPDATE_BUYING_OPTION', () => {
    it('updates key with value', () => {
      const state = {
        item: {
          buyingDetails: {
            a: 'a',
          },
        },
      };

      const action = {
        intent: UPDATE_BUYING_OPTION,
        key: 'a',
        value: 'b',
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual.item.buyingDetails).toEqual({
        a: 'b',
      });
    });

    it('updates taxCodeId according to selected accountOption', () => {
      const state = {
        item: {
          buyingDetails: {},
        },
        buyingAccountOptions: [
          {
            id: '1',
            taxCodeId: '2',
          },
          {
            id: '3',
            taxCodeId: '4',
          },
        ],
      };
      const action = {
        intent: UPDATE_BUYING_OPTION,
        key: 'accountId',
        value: '3',
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual.item.buyingDetails.accountId).toEqual('3');
      expect(actual.item.buyingDetails.taxCodeId).toEqual('4');
    });
    it('updates taxCodeId with value', () => {
      const state = {
        item: {
          buyingDetails: {
            taxCodeId: '1',
          },
        },
      };
      const action = {
        intent: UPDATE_BUYING_OPTION,
        key: 'taxCodeId',
        value: '3',
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual.item.buyingDetails.taxCodeId).toEqual('3');
    });

    it('updates isTaxInclusive when key is isTaxInclusiveForBuyingDetails', () => {
      const state = {
        item: {
          buyingDetails: {
            isTaxInclusive: false,
          },
        },
      };

      const action = {
        intent: UPDATE_BUYING_OPTION,
        key: 'isTaxInclusiveForBuyingDetails',
        value: true,
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual).toEqual({
        item: {
          buyingDetails: {
            isTaxInclusive: true,
          },
        },
      });
    });
  });

  describe('UPDATE_IS_BUYING', () => {
    it('updates isBuying key with value', () => {
      const state = {
        isBuying: true,
      };

      const action = {
        intent: UPDATE_IS_BUYING,
        isBuying: false,
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual.isBuying).toEqual(false);
    });

    it('resets buyingDetails to default state', () => {
      const state = {
        isBuying: true,
        item: {
          buyingDetails: {
            accountId: 'a',
            price: '$1.00',
            taxCodeId: '1',
            unitOfMeasure: 'a',
            isTaxInclusive: false,
          },
        },
      };

      const action = {
        intent: UPDATE_IS_BUYING,
        isBuying: false,
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual).toEqual({
        isBuying: false,
        item: {
          buyingDetails: {
            accountId: '',
            price: '',
            taxCodeId: '',
            unitOfMeasure: '',
            isTaxInclusive: true,
          },
        },
      });
    });
  });

  describe('START_LOADING', () => {
    it('sets isLoading to true', () => {
      const state = {
        isLoading: false,
      };

      const action = {
        intent: START_LOADING,
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual.isLoading).toEqual(true);
    });
  });

  describe('STOP_LOADING', () => {
    it('sets isLoading to false', () => {
      const state = {
        isLoading: true,
      };

      const action = {
        intent: STOP_LOADING,
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual.isLoading).toEqual(false);
    });
  });

  describe('OPEN_ALERT', () => {
    it('opens alert with message and alert type', () => {
      const state = {
        alert: undefined,
      };

      const action = {
        intent: OPEN_ALERT,
        message: 'some message',
        type: 'some type',
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual.alert).toEqual({
        message: 'some message',
        type: 'some type',
      });
    });
  });

  describe('CLOSE_ALERT', () => {
    it('sets alert to undefined', () => {
      const state = {
        alert: {
          message: 'some message',
          type: 'some type',
        },
      };

      const action = {
        intent: CLOSE_ALERT,
      };

      const actual = inventoryModalReducer(state, action);

      expect(actual.alert).toEqual(undefined);
    });
  });
});
