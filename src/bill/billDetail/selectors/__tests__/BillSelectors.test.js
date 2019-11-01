import {
  getBillLine,
  getIsNewLine,
  getNewLineIndex,
  getPageTitle,
  getTableData,
} from '../billSelectors';

describe('BillSelectors', () => {
  describe('getNewLineIndex', () => {
    it('returns last index of bill lines array', () => {
      const state = {
        bill: {
          lines: [{}, {}, {}],
        },
      };

      const actual = getNewLineIndex(state);

      expect(actual).toEqual(2);
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
        inTrayDocumentId: 'a',
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
});
