import {
  ADD_QUOTE_ITEM_LINE,
  FORMAT_QUOTE_ITEM_LINE,
  REMOVE_QUOTE_ITEM_LINE,
  UPDATE_QUOTE_ITEM_LINE,
} from '../../../QuoteIntents';
import quoteDetailReducer from '../quoteDetailReducer';

describe('ItemLayoutReducer', () => {
  describe('ADD_QUOTE_ITEM_LINE', () => {
    it('adds a new line', () => {
      const state = {
        quote: {
          lines: [],
        },
        newLine: {
          defaultData: 'defaultData',
        },
      };
      const action = {
        intent: ADD_QUOTE_ITEM_LINE,
        row: {
          id: 'notUsed',
          newData: 'newData',
        },
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines).toEqual([
        {
          defaultData: 'defaultData',
          newData: 'newData',
        },
      ]);
    });
  });

  describe('UPDATE_QUOTE_ITEM_LINE', () => {
    it('updates key at line at index with value', () => {
      const state = {
        quote: {
          lines: [
            {},
            {
              hello: 2,
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_QUOTE_ITEM_LINE, index: 1, key: 'hello', value: 3,
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[1].hello).toEqual(3);
    });

    it('updates both amount and displayAmount when key is amount', () => {
      const state = {
        quote: {
          lines: [
            {
              amount: '1',
              displayAmount: '1',
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_QUOTE_ITEM_LINE, index: 0, key: 'amount', value: '3',
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[0].amount).toEqual('3');
      expect(actual.quote.lines[0].displayAmount).toEqual('3');
    });

    it('updates both discount and displayDiscount when key is discount', () => {
      const state = {
        quote: {
          lines: [
            {
              discount: '1',
              displayDiscount: '1',
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_QUOTE_ITEM_LINE, index: 0, key: 'discount', value: '3',
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[0].discount).toEqual('3');
      expect(actual.quote.lines[0].displayDiscount).toEqual('3');
    });
  });

  describe('REMOVE_QUOTE_ITEM_LINE', () => {
    it('removes line at index', () => {
      const state = {
        quote: {
          lines: [
            1, 2,
          ],
        },
      };

      const action = {
        intent: REMOVE_QUOTE_ITEM_LINE,
        index: 1,
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines).toEqual([1]);
    });
  });

  describe('FORMAT_QUOTE_ITEM_LINE', () => {
    it('formats value at key at line at index', () => {
      const state = {
        quote: {
          lines: [
            {},
            { units: '-' },
          ],
        },
      };

      const action = {
        intent: FORMAT_QUOTE_ITEM_LINE,
        index: 1,
        key: 'units',
      };

      const actual = quoteDetailReducer(state, action);

      expect(actual.quote.lines[1].units).toEqual('0');
    });
  });
});
