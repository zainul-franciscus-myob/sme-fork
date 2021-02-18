import {
  getAccountModalContext,
  getBillLine,
  getFreightAmount,
  getFreightTaxCode,
  getIsLinesSupported,
  getIsNewLine,
  getIsReadOnly,
  getItemComboboxContext,
  getNewLineIndex,
  getReadOnlyMessage,
  getTableData,
  getTotals,
  getUniqueSelectedItemIds,
} from '../RecurringBillSelectors';
import ItemTypes from '../../../../inventory/itemCombobox/ItemTypes';
import PurchaseLayout from '../../types/PurchaseLayout';
import PurchaseLineType from '../../types/PurchaseLineType';

describe('RecurringBillSelectors', () => {
  describe('getNewLineIndex', () => {
    it('returns last index of bill lines array plus one', () => {
      const state = {
        bill: {
          lines: [{}, {}, {}],
        },
      };

      const actual = getNewLineIndex(state);

      expect(actual).toEqual(3);
    });
  });

  describe('getIsNewLine', () => {
    it('returns true when no bill lines and index is 0', () => {
      const state = {
        bill: {
          lines: [],
        },
      };

      const props = {
        index: 0,
      };

      const actual = getIsNewLine(state, props);

      expect(actual).toEqual(true);
    });

    it('returns true when no bill lines and index is 1', () => {
      const state = {
        bill: {
          lines: [],
        },
      };

      const props = {
        index: 1,
      };

      const actual = getIsNewLine(state, props);

      expect(actual).toEqual(true);
    });

    it('returns false when bill lines has line at given index', () => {
      const state = {
        bill: {
          lines: [
            {
              id: '1',
            },
          ],
        },
      };

      const props = {
        index: 0,
      };

      const actual = getIsNewLine(state, props);

      expect(actual).toEqual(false);
    });

    it('returns true when bill lines does not have lines at given index', () => {
      const state = {
        bill: {
          lines: [
            {
              id: '1',
            },
          ],
        },
      };

      const props = {
        index: 1,
      };

      const actual = getIsNewLine(state, props);

      expect(actual).toEqual(true);
    });
  });

  describe('getTableData', () => {
    it('returns dummy array with same length as bill lines to avoid rerender line item table', () => {
      const state = {
        bill: {
          lines: ['a', 'b', 'c'],
        },
      };

      const actual = getTableData(state);

      expect(actual).toEqual([{}, {}, {}]);
    });
  });

  describe('getRecurringBillLine', () => {
    it('return new line when no line at index', () => {
      const state = {
        bill: {
          lines: [],
        },
        newLine: {
          id: '',
        },
      };
      const props = { index: 0 };

      const actual = getBillLine(state, props);

      expect(actual).toEqual({
        id: '',
      });
    });

    it('return line at index', () => {
      const state = {
        bill: {
          lines: [{ id: '1' }],
        },
      };
      const props = { index: 0 };

      const actual = getBillLine(state, props);

      expect(actual).toEqual({
        id: '1',
      });
    });

    describe('returns subtitle line', () => {
      const state = {
        bill: {
          lines: [
            {
              type: PurchaseLineType.SUB_TOTAL,
              description: 'Description',
              amount: '10',
            },
          ],
        },
      };

      const actual = getBillLine(state, { index: 0 });

      expect(actual).toEqual({
        type: PurchaseLineType.SUB_TOTAL,
        description: 'Subtotal',
        amount: '10',
      });
    });
  });

  describe('getIsLinesSupported', () => {
    it.each([
      [PurchaseLineType.SERVICE, true],
      [PurchaseLineType.ITEM, true],
      [PurchaseLineType.HEADER, false],
      [PurchaseLineType.SUB_TOTAL, false],
    ])(
      'validate whether bill with %s line type are supported',
      (type, expected) => {
        const lines = [
          { type: PurchaseLineType.SERVICE },
          { type: PurchaseLineType.ITEM },
          { type },
        ];

        const actual = getIsLinesSupported.resultFunc(lines);

        expect(actual).toEqual(expected);
      }
    );
  });

  describe('getIsReadOnly', () => {
    it.each([
      [PurchaseLayout.SERVICE, false],
      [PurchaseLayout.ITEM_AND_SERVICE, false],
      ['N/A', true],
    ])('%s layout', (layout, expected) => {
      const actual = getIsReadOnly({
        bill: {
          layout,
          lines: [],
        },
      });

      expect(actual).toEqual(expected);
    });

    it.each([
      [PurchaseLineType.SERVICE, false],
      [PurchaseLineType.ITEM, false],
      [PurchaseLineType.HEADER, true],
      [PurchaseLineType.SUB_TOTAL, true],
      ['N/A', true],
    ])('have %s line type', (type, expected) => {
      const actual = getIsReadOnly({
        bill: {
          layout: PurchaseLayout.ITEM_AND_SERVICE,
          lines: [
            { type: PurchaseLineType.SERVICE },
            { type: PurchaseLineType.ITEM },
            { type },
          ],
        },
      });

      expect(actual).toEqual(expected);
    });

    it('should be read only when has freight amount', () => {
      const actual = getIsReadOnly({
        bill: {
          layout: PurchaseLayout.ITEM_AND_SERVICE,
          lines: [],
          taxExclusiveFreightAmount: '1',
        },
      });

      expect(actual).toBe(true);
    });
  });

  describe('getAccountModalContext', () => {
    it('returns region and businesID from state', () => {
      const state = {
        region: 'Spain',
        businessId: 'manzana',
      };

      const actual = getAccountModalContext(state);

      expect(actual).toEqual({ region: 'Spain', businessId: 'manzana' });
    });
  });

  describe('getItemComboboxModuleContext', () => {
    it('returns the businessId, region and pre-set item type', () => {
      const state = {
        businessId: 'bizId',
        region: 'vn',
      };

      const actual = getItemComboboxContext(state);
      expect(actual).toEqual({
        businessId: 'bizId',
        region: 'vn',
        itemType: ItemTypes.Bought,
      });
    });
  });

  describe('getUniqueSelectedItemIds', () => {
    it('returns a list of unique selected item ids excluding empty ids', () => {
      const state = {
        bill: {
          layout: PurchaseLayout.ITEM_AND_SERVICE,
          lines: [
            { itemId: '1' },
            { itemId: '2' },
            { itemId: '' },
            { itemId: '1' },
          ],
        },
      };
      const actual = getUniqueSelectedItemIds(state);
      expect(actual).toEqual(['1', '2']);
    });
  });

  describe('getTotals', () => {
    it('calculate totals with calculable lines', () => {
      const actual = getTotals({
        bill: {
          isTaxInclusive: true,
          lines: [
            {
              type: PurchaseLineType.SERVICE,
              taxExclusiveAmount: '9.99',
              taxAmount: '0.01',
            },
            {
              type: PurchaseLineType.SUB_TOTAL,
              taxExclusiveAmount: '99',
              taxAmount: '1',
            },
          ],
          taxExclusiveFreightAmount: '0',
          freightTaxAmount: '0',
        },
      });

      expect(actual).toEqual({
        subTotal: '10',
        totalTax: '0.01',
        totalAmount: '10',
      });
    });

    it('calculate totals with lines and freight', () => {
      const actual = getTotals({
        bill: {
          isTaxInclusive: true,
          lines: [
            {
              type: PurchaseLineType.SERVICE,
              taxExclusiveAmount: '9.99',
              taxAmount: '0.01',
            },
            {
              type: PurchaseLineType.SUB_TOTAL,
              taxExclusiveAmount: '99',
              taxAmount: '1',
            },
          ],
          taxExclusiveFreightAmount: '9.09',
          freightTaxAmount: '0.91',
        },
      });

      expect(actual).toEqual({
        subTotal: '10',
        totalTax: '0.92',
        totalAmount: '20',
      });
    });

    it('calculate totals with only freight', () => {
      const actual = getTotals({
        bill: {
          isTaxInclusive: true,
          lines: [],
          taxExclusiveFreightAmount: '9.09',
          freightTaxAmount: '0.91',
        },
      });

      expect(actual).toEqual({
        subTotal: '0',
        totalTax: '0.91',
        totalAmount: '10',
      });
    });
  });

  describe('getFreightAmount', () => {
    it('calculate tax inclusive amount when isTaxInclusive is true', () => {
      const actual = getFreightAmount({
        bill: {
          isTaxInclusive: true,
          taxExclusiveFreightAmount: '9.09',
          freightTaxAmount: '0.91',
        },
      });

      expect(actual).toBe('10');
    });

    it('calculate tax inclusive amount when isTaxInclusive is false', () => {
      const actual = getFreightAmount({
        bill: {
          isTaxInclusive: false,
          taxExclusiveFreightAmount: '9.09',
          freightTaxAmount: '0.91',
        },
      });

      expect(actual).toBe('9.09');
    });
  });

  describe('getFreightTaxCode', () => {
    it('should lookup freight taxCode display name', () => {
      const state = {
        taxCodeOptions: [
          {
            id: '2',
            displayName: 'GST',
          },
        ],
        bill: {
          freightTaxCodeId: '2',
        },
      };

      const actual = getFreightTaxCode(state);

      expect(actual).toBe('GST');
    });
  });

  describe('getReadOnlyMessage', () => {
    it.each([
      [
        false,
        'blah',
        false,
        "This recurring transaction is read only because the Blah layout isn't supported in the browser. Switch to AccountRight desktop to edit this recurring transaction.",
      ],
      [
        false,
        '',
        false,
        "This recurring transaction is read only because the bill layout isn't supported in the browser. Switch to AccountRight desktop to edit this recurring transaction.",
      ],
      [
        false,
        undefined,
        false,
        "This recurring transaction is read only because the bill layout isn't supported in the browser. Switch to AccountRight desktop to edit this recurring transaction.",
      ],
      [
        true,
        '',
        false,
        'This recurring transaction is read only because it contains unsupported features. Switch to AccountRight desktop to edit this recurring transaction.',
      ],
      [
        true,
        '',
        true,
        "This recurring transaction is read only because freight isn't supported in the browser. Switch to AccountRight desktop to edit this recurring transaction.",
      ],
    ])(
      'isLayoutSupported %s, layout %s, hasFreightAmount %s',
      (isLayoutSupported, layout, hasFreightAmount, message) => {
        const actual = getReadOnlyMessage.resultFunc(
          isLayoutSupported,
          layout,
          hasFreightAmount
        );

        expect(actual).toEqual(message);
      }
    );
  });
});
