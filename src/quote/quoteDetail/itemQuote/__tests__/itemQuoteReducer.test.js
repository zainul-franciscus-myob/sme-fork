import {
  ADD_TABLE_ROW,
  CHANGE_EXPORT_PDF_FORM,
  CHANGE_TABLE_ROW,
  FORMAT_LINE_AMOUNT_INPUTS,
  REMOVE_TABLE_ROW,
  UPDATE_ITEM_QUOTE_OPTION,
} from '../ItemQuoteIntents';
import itemQuoteReducer from '../itemQuoteReducer';

describe('itemQuoteReducer', () => {
  describe('updateQuoteOption', () => {
    it('updates quote with given key and value', () => {
      const state = {
        quote: {
          id: '1',
        },
      };
      const action = { intent: UPDATE_ITEM_QUOTE_OPTION, key: 'id', value: '2' };

      const actual = itemQuoteReducer(state, action);

      const expected = {
        quote: {
          id: '2',
        },
        isPageEdited: true,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('addTableRow', () => {
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
        intent: ADD_TABLE_ROW,
        row: {
          id: 'notUsed',
          newData: 'newData',
        },
      };

      const actual = itemQuoteReducer(state, action);

      expect(actual.quote.lines).toEqual([
        {
          defaultData: 'defaultData',
          newData: 'newData',
        },
      ]);
    });
  });

  describe('changeTableRow', () => {
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
        intent: CHANGE_TABLE_ROW, index: 1, key: 'hello', value: 3,
      };

      const actual = itemQuoteReducer(state, action);

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
        intent: CHANGE_TABLE_ROW, index: 0, key: 'amount', value: '3',
      };

      const actual = itemQuoteReducer(state, action);

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
        intent: CHANGE_TABLE_ROW, index: 0, key: 'discount', value: '3',
      };

      const actual = itemQuoteReducer(state, action);

      expect(actual.quote.lines[0].discount).toEqual('3');
      expect(actual.quote.lines[0].displayDiscount).toEqual('3');
    });
  });

  describe('removeTableRow', () => {
    it('removes line at index', () => {
      const state = {
        quote: {
          lines: [
            1, 2,
          ],
        },
      };

      const action = {
        intent: REMOVE_TABLE_ROW,
        index: 1,
      };

      const actual = itemQuoteReducer(state, action);

      expect(actual.quote.lines).toEqual([1]);
    });
  });

  describe('formatLineAmountInputs', () => {
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
        intent: FORMAT_LINE_AMOUNT_INPUTS,
        index: 1,
        key: 'units',
      };

      const actual = itemQuoteReducer(state, action);

      expect(actual.quote.lines[1].units).toEqual('0');
    });
  });

  describe('CHANGE_EXPORT_PDF_FORM', () => {
    it('changes selected form', () => {
      const state = {
        exportPdf: {
          selectedForm: 'a',
        },
      };

      const action = { intent: CHANGE_EXPORT_PDF_FORM, selectedForm: 'b' };

      const actual = itemQuoteReducer(state, action);

      expect(actual).toEqual({ exportPdf: { selectedForm: 'b' } });
    });
  });
});
