import {
  getBillLine,
  getFreightAmount,
  getFreightTaxCode,
  getHasLineBeenPrefilled,
  getHasNoteBeenPrefilled,
  getIsBeforeFYAndAfterConversionDate,
  getIsLinesSupported,
  getIsNewLine,
  getIsReadOnly,
  getModalContext,
  getNewLineIndex,
  getPageTitle,
  getPrefillButtonText,
  getReadOnlyMessage,
  getShouldShowAccountCode,
  getTableData,
  getTotals,
  getUpdatedSupplierOptions,
} from '../billSelectors';
import BillLayout from '../../types/BillLayout';
import BillLineType from '../../types/BillLineType';

describe('BillSelectors', () => {
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

  describe('getShouldShowAccountCode', () => {
    it('returns true for all create new scenarios', () => {
      const state = {
        billId: 'new',
      };

      const actual = getShouldShowAccountCode(state);
      expect(actual).toBeTruthy();
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
        bill: {
          lines: [{ prefillStatus: { amount: true } }],
        },
      };
      const actual = getHasLineBeenPrefilled(state, 0);
      expect(actual).toEqual(true);
    });

    it('returns false if line does not have prefillStatus', () => {
      const state = {
        bill: {
          lines: [{ amount: '20' }],
        },
      };
      const actual = getHasLineBeenPrefilled(state, 0);
      expect(actual).toEqual(false);
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

  describe('getPageTitle', () => {
    it('returns "Create Bill" when creating', () => {
      const state = {
        billId: 'new',
        bill: {
          billNumber: '',
        },
      };

      const actual = getPageTitle(state);

      expect(actual).toEqual('Create bill');
    });

    it('returns "Bill billNumber" when updating', () => {
      const state = {
        billId: '1',
        bill: {
          billNumber: '123',
        },
      };

      const actual = getPageTitle(state);

      expect(actual).toEqual('Bill 123');
    });

    it('returns be "Create bill from In Tray" when creating from intray', () => {
      const state = {
        billId: 'new',
        source: 'inTray',
        bill: {
          billNumber: '',
        },
      };

      const actual = getPageTitle(state);

      expect(actual).toEqual('Create bill from In Tray');
    });
  });

  describe('getBillLine', () => {
    it('return new line when no line at index', () => {
      const state = {
        bill:
          {
            lines: [],
          },
        newLine: {
          id: '',
        },
      };
      const props = { index: 0 };

      const actual = getBillLine(state, props);

      expect(actual).toEqual(
        {
          id: '',
        },
      );
    });

    it('return line at index', () => {
      const state = {
        bill:
          {
            lines: [
              { id: '1' },
            ],
          },
      };
      const props = { index: 0 };

      const actual = getBillLine(state, props);

      expect(actual).toEqual(
        {
          id: '1',
        },
      );
    });

    describe('returns subtitle line', () => {
      const state = {
        bill: {
          lines: [{ type: BillLineType.SUB_TOTAL, description: 'Description', amount: '10' }],
        },
      };

      const actual = getBillLine(state, { index: 0 });

      expect(actual).toEqual({ type: BillLineType.SUB_TOTAL, description: 'Subtotal', amount: '10' });
    });
  });

  describe('getIsLinesSupported', () => {
    it.each([
      [BillLineType.SERVICE, true],
      [BillLineType.ITEM, true],
      [BillLineType.HEADER, false],
      [BillLineType.SUB_TOTAL, false],
    ])('validate whether bill with %s line type are supported', (type, expected) => {
      const lines = [
        { type: BillLineType.SERVICE },
        { type: BillLineType.ITEM },
        { type },
      ];

      const actual = getIsLinesSupported.resultFunc(lines);

      expect(actual).toEqual(expected);
    });
  });

  describe('getIsReadOnly', () => {
    it.each([
      [BillLayout.SERVICE, false],
      [BillLayout.ITEM_AND_SERVICE, false],
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
      [BillLineType.SERVICE, false],
      [BillLineType.ITEM, false],
      [BillLineType.HEADER, true],
      [BillLineType.SUB_TOTAL, true],
      ['N/A', true],
    ])('have %s line type', (type, expected) => {
      const actual = getIsReadOnly({
        bill: {
          layout: BillLayout.ITEM_AND_SERVICE,
          lines: [
            { type: BillLineType.SERVICE },
            { type: BillLineType.ITEM },
            { type },
          ],
        },
      });

      expect(actual).toEqual(expected);
    });

    it('should be read only when has freight amount', () => {
      const actual = getIsReadOnly({
        bill: {
          layout: BillLayout.ITEM_AND_SERVICE,
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
        region: 'Spain', businessId: 'manzana',
      };

      const actual = getModalContext(state);

      expect(actual).toEqual({ region: 'Spain', businessId: 'manzana' });
    });
  });

  describe('getUpdatedSupplierOptions', () => {
    it('should contain newly added contact option', () => {
      const option1 = { id: '1', displayName: 'Option 1' };
      const option2 = { id: '2', displayName: 'Option 2' };
      const expected = [option2, option1];

      const actual = getUpdatedSupplierOptions({ supplierOptions: [option1] }, option2);

      expect(actual).toEqual(expected);
    });

    it('should contain updated contact option', () => {
      const option1 = { id: '1', displayName: 'Option 1' };
      const option2 = { id: '1', displayName: 'Updated option 1' };
      const expected = [option2];

      const actual = getUpdatedSupplierOptions({ supplierOptions: [option1] }, option2);

      expect(actual).toEqual(expected);
    });
  });

  describe('getPrefillButtonText', () => {
    it('show prefill when new', () => {
      const state = {
        billId: 'new',
      };

      const actual = getPrefillButtonText(state);

      expect(actual).toEqual('Prefill from a source document');
    });

    it('show link when existing', () => {
      const state = {
        billId: '👨🏻‍💻',
      };

      const actual = getPrefillButtonText(state);

      expect(actual).toEqual('Link a source document');
    });
  });

  describe('getTotals', () => {
    it('calculate totals with calculable lines', () => {
      const actual = getTotals({
        bill: {
          isTaxInclusive: true,
          lines: [
            { type: BillLineType.SERVICE, taxExclusiveAmount: '9.99', taxAmount: '0.01' },
            { type: BillLineType.SUB_TOTAL, taxExclusiveAmount: '99', taxAmount: '1' },
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
            { type: BillLineType.SERVICE, taxExclusiveAmount: '9.99', taxAmount: '0.01' },
            { type: BillLineType.SUB_TOTAL, taxExclusiveAmount: '99', taxAmount: '1' },
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
      [false, 'blah', false, 'This bill is read only because the Blah layout isn\'t supported in the browser. Switch to AccountRight desktop to edit this bill.'],
      [true, '', false, 'This bill is read only because it contains unsupported features. Switch to AccountRight desktop to edit this bill.'],
      [true, '', true, 'This bill is read only because freight isn\'t supported in the browser. Switch to AccountRight desktop to edit this bill.'],
    ])('isLayoutSupported %s, layout %s, hasFreightAmount %s', (isLayoutSupported, layout, hasFreightAmount, message) => {
      const actual = getReadOnlyMessage.resultFunc(isLayoutSupported, layout, hasFreightAmount);

      expect(actual)
        .toEqual(message);
    });
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
          bill: {
            issueDate,
          },
          startOfFinancialYearDate,
          conversionDate,
        };

        const actual = getIsBeforeFYAndAfterConversionDate(state);

        expect(actual).toEqual(expected);
      },
    );
  });
});
