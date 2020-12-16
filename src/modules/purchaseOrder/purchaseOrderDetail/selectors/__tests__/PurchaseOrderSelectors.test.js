import {
  getAmountDue,
  getConversionMonthYear,
  getHasLineBeenPrefilled,
  getHasNoteBeenPrefilled,
  getIsBeforeFYAndAfterConversionDate,
  getIsLinesSupported,
  getIsNewLine,
  getIsReadOnly,
  getItemComboboxContext,
  getModalContext,
  getNewLineIndex,
  getPageTitle,
  getPurchaseOrderLine,
  getReadOnlyMessage,
  getTableData,
  getTotals,
  getUniqueSelectedItemIds,
} from '../purchaseOrderSelectors';
import ItemTypes from '../../../../inventory/itemCombobox/ItemTypes';
import PurchaseOrderLayout from '../../types/PurchaseOrderLayout';
import PurchaseOrderLineType from '../../types/PurchaseOrderLineType';

describe('PurchaseOrderSelectors', () => {
  describe('getNewLineIndex', () => {
    it('returns last index of purchaseOrder lines array plus one', () => {
      const state = {
        purchaseOrder: {
          lines: [{}, {}, {}],
        },
      };

      const actual = getNewLineIndex(state);

      expect(actual).toEqual(3);
    });
  });

  describe('getIsNewLine', () => {
    it('returns true when no purchaseOrder lines and index is 0', () => {
      const state = {
        purchaseOrder: {
          lines: [],
        },
      };

      const props = {
        index: 0,
      };

      const actual = getIsNewLine(state, props);

      expect(actual).toEqual(true);
    });

    it('returns true when no purchaseOrder lines and index is 1', () => {
      const state = {
        purchaseOrder: {
          lines: [],
        },
      };

      const props = {
        index: 1,
      };

      const actual = getIsNewLine(state, props);

      expect(actual).toEqual(true);
    });

    it('returns false when purchaseOrder lines has line at given index', () => {
      const state = {
        purchaseOrder: {
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

    it('returns true when purchaseOrder lines does not have lines at given index', () => {
      const state = {
        purchaseOrder: {
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

  describe('getHasNoteBeenPrefilled', () => {
    it('returns true if the note has been automatically prefilled', () => {
      const state = { prefillStatus: { note: true } };
      const actual = getHasNoteBeenPrefilled(state);
      expect(actual).toEqual(true);
    });

    it('returns false if the note has not been automatically prefilled', () => {
      const state = { prefillStatus: { note: false } };
      const actual = getHasNoteBeenPrefilled(state);
      expect(actual).toEqual(false);
    });
  });

  describe('getHasLineBeenPrefilled', () => {
    it('returns true if line has prefillStatus', () => {
      const state = {
        purchaseOrder: {
          lines: [{ prefillStatus: { amount: true } }],
        },
      };
      const actual = getHasLineBeenPrefilled(state, 0);
      expect(actual).toEqual(true);
    });

    it('returns false if line does not have prefillStatus', () => {
      const state = {
        purchaseOrder: {
          lines: [{ amount: '20' }],
        },
      };
      const actual = getHasLineBeenPrefilled(state, 0);
      expect(actual).toEqual(false);
    });
  });

  describe('getTableData', () => {
    it('returns dummy array with same length as purchaseOrder lines to avoid rerender line item table', () => {
      const state = {
        purchaseOrder: {
          lines: ['a', 'b', 'c'],
        },
      };

      const actual = getTableData(state);

      expect(actual).toEqual([{}, {}, {}]);
    });
  });

  describe('getPageTitle', () => {
    it('returns "Create Purchase order" when creating', () => {
      const state = {
        purchaseOrderId: 'new',
        purchaseOrder: {
          purchaseOrderNumber: '',
        },
      };

      const actual = getPageTitle(state);

      expect(actual).toEqual('Create purchase order');
    });

    it('returns "Purchase order purchaseOrderNumber" when updating', () => {
      const state = {
        purchaseOrderId: '1',
        purchaseOrder: {
          purchaseOrderNumber: '123',
        },
      };

      const actual = getPageTitle(state);

      expect(actual).toEqual('Purchase Order 123');
    });
  });

  describe('getPurchaseOrderLine', () => {
    it('return new line when no line at index', () => {
      const state = {
        purchaseOrder: {
          lines: [],
        },
        newLine: {
          id: '',
        },
      };
      const props = { index: 0 };

      const actual = getPurchaseOrderLine(state, props);

      expect(actual).toEqual({
        id: '',
      });
    });

    it('return line at index', () => {
      const state = {
        purchaseOrder: {
          lines: [{ id: '1' }],
        },
      };
      const props = { index: 0 };

      const actual = getPurchaseOrderLine(state, props);

      expect(actual).toEqual({
        id: '1',
      });
    });

    describe('returns subtitle line', () => {
      const state = {
        purchaseOrder: {
          lines: [
            {
              type: PurchaseOrderLineType.SUB_TOTAL,
              description: 'Description',
              amount: '10',
            },
          ],
        },
      };

      const actual = getPurchaseOrderLine(state, { index: 0 });

      expect(actual).toEqual({
        type: PurchaseOrderLineType.SUB_TOTAL,
        description: 'Subtotal',
        amount: '10',
      });
    });
  });

  describe('getIsLinesSupported', () => {
    it.each([
      [PurchaseOrderLineType.SERVICE, true],
      [PurchaseOrderLineType.ITEM, true],
      [PurchaseOrderLineType.HEADER, false],
      [PurchaseOrderLineType.SUB_TOTAL, false],
    ])(
      'validate whether purchaseOrder with %s line type are supported',
      (type, expected) => {
        const lines = [
          { type: PurchaseOrderLineType.SERVICE },
          { type: PurchaseOrderLineType.ITEM },
          { type },
        ];

        const actual = getIsLinesSupported.resultFunc(lines);

        expect(actual).toEqual(expected);
      }
    );
  });

  describe('getIsReadOnly', () => {
    it.each([
      [PurchaseOrderLayout.SERVICE, false],
      [PurchaseOrderLayout.ITEM_AND_SERVICE, false],
      ['N/A', true],
    ])('%s layout', (layout, expected) => {
      const actual = getIsReadOnly({
        purchaseOrder: {
          layout,
          isForeignCurrency: false,
          lines: [],
        },
      });

      expect(actual).toEqual(expected);
    });

    it.each([
      [PurchaseOrderLineType.SERVICE, false],
      [PurchaseOrderLineType.ITEM, false],
      [PurchaseOrderLineType.HEADER, true],
      [PurchaseOrderLineType.SUB_TOTAL, true],
      ['N/A', true],
    ])('have %s line type', (type, expected) => {
      const actual = getIsReadOnly({
        purchaseOrder: {
          layout: PurchaseOrderLayout.ITEM_AND_SERVICE,
          isForeignCurrency: false,
          lines: [
            { type: PurchaseOrderLineType.SERVICE },
            { type: PurchaseOrderLineType.ITEM },
            { type },
          ],
        },
      });

      expect(actual).toEqual(expected);
    });
  });

  describe('getAccountModalContext', () => {
    it('returns region and businesID from state', () => {
      const state = {
        region: 'Spain',
        businessId: 'manzana',
      };

      const actual = getModalContext(state);

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
        purchaseOrder: {
          layout: PurchaseOrderLayout.ITEM_AND_SERVICE,
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
        purchaseOrder: {
          isTaxInclusive: true,
          lines: [
            {
              type: PurchaseOrderLineType.SERVICE,
              taxExclusiveAmount: '9.99',
              taxAmount: '0.01',
            },
            {
              type: PurchaseOrderLineType.SUB_TOTAL,
              taxExclusiveAmount: '99',
              taxAmount: '1',
            },
          ],
        },
      });

      expect(actual).toEqual({
        subTotal: '10',
        totalTax: '0.01',
        totalAmount: '10',
      });
    });

    it('returns amountDue with calculated totals', () => {
      const actual = getAmountDue({
        purchaseOrder: {
          isTaxInclusive: true,
          amountPaid: '1',
          lines: [
            {
              type: PurchaseOrderLineType.SERVICE,
              taxExclusiveAmount: '9.99',
              taxAmount: '0.01',
            },
            {
              type: PurchaseOrderLineType.SUB_TOTAL,
              taxExclusiveAmount: '99',
              taxAmount: '1',
            },
          ],
        },
      });

      expect(actual).toEqual('9');
    });
  });
});

describe('getReadOnlyMessage', () => {
  it.each([
    [
      false,
      'blah',
      "This purchase order is read only because the Blah layout isn't supported in the browser. Switch to AccountRight desktop to edit this purchase order.",
    ],
    [
      false,
      '',
      "This purchase order is read only because the purchase order layout isn't supported in the browser. Switch to AccountRight desktop to edit this purchase order.",
    ],
    [
      false,
      undefined,
      "This purchase order is read only because the purchase order layout isn't supported in the browser. Switch to AccountRight desktop to edit this purchase order.",
    ],
    [
      true,
      '',
      'This purchase order is read only because it contains unsupported features. Switch to AccountRight desktop to edit this purchase order.',
    ],
  ])(
    'isLayoutSupported %s, layout %s',
    (isLayoutSupported, layout, message) => {
      const actual = getReadOnlyMessage.resultFunc(isLayoutSupported, layout);

      expect(actual).toEqual(message);
    }
  );
});

describe('getIsBeforeFYAndAfterConversionDate', () => {
  it.each([
    ['2014-07-01', '2011-01-01', '2010-01-01', false],
    ['2014-07-01', '2011-01-01', '2011-01-01', true],
    ['2014-07-01', '2011-01-01', '2013-01-01', true],
    ['2014-07-01', '2011-01-01', '2014-06-30', true],
    ['2014-07-01', '2011-01-01', '2014-07-01', false],
    ['2014-07-01', '2011-01-01', '2014-07-02', false],
    ['2014-07-01', '2011-01-01', '2015-01-01', false],
    ['2014-07-01', '2014-07-01', '2013-01-01', false],
    ['2014-07-01', '2014-07-01', '2014-07-01', false],
    ['2014-07-01', '2014-07-01', '2015-01-01', false],
    ['2014-07-01', '2015-01-01', '2014-07-02', false],
  ])(
    'when start of financial year date is %s, conversion date is %s and issue date is %s, should return %s',
    (startOfFinancialYearDate, conversionDate, issueDate, expected) => {
      const state = {
        purchaseOrder: {
          issueDate,
        },
        startOfFinancialYearDate,
        conversionDate,
      };

      const actual = getIsBeforeFYAndAfterConversionDate(state);

      expect(actual).toEqual(expected);
    }
  );
});

describe('getConversionMonthYear', () => {
  [
    { value: '2013-08-01', expected: 'August 2013' },
    { value: '2013-01-01', expected: 'January 2013' },
    { value: '2013-07-01', expected: 'July 2013' },
    { value: '2013-12-01', expected: 'December 2013' },
  ].forEach((test) => {
    it('should format correctly', () => {
      const state = {
        conversionDate: test.value,
      };
      const actual = getConversionMonthYear(state);

      expect(actual).toEqual(test.expected);
    });
  });
});
