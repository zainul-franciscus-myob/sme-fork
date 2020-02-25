import {
  getAccountModalContext,
  getBillLine,
  getHasLineBeenPrefilled,
  getIsNewLine,
  getLoadBillModalType,
  getNewLineIndex,
  getPageTitle,
  getTableData,
  getUpdatedSupplierOptions,
} from '../billSelectors';
import ModalType from '../../types/ModalType';

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

    it('returns "Bill displayBillNumber" when updating', () => {
      const state = {
        billId: '1',
        bill: {
          displayBillNumber: '123',
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
  });

  describe('getLoadBillModalType', () => {
    it.each([
      [ModalType.None, false, undefined],
      [ModalType.ExportPdf, false, 'true'],
      [ModalType.None, true, undefined],
      [ModalType.None, true, 'true'],
    ], ('should return modal type %s', (expected, isCreating, openExportPdf) => {
      const customState = {
        billId: isCreating ? 'new' : '1',
        openExportPdf,
      };

      const actual = getLoadBillModalType(customState);

      expect(actual).toEqual(expected);
    }));
  });

  describe('getAccountModalContext', () => {
    it('returns region and businesID from state', () => {
      const state = {
        region: 'Spain', businessId: 'manzana',
      };

      const actual = getAccountModalContext(state);

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
});
