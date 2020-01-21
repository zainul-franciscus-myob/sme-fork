import {
  ADD_INVOICE_LINE,
  FORMAT_INVOICE_LINE,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_INVOICE_DETAIL,
  LOAD_ITEM_OPTION,
  REMOVE_INVOICE_LINE,
  UPDATE_INVOICE_LAYOUT,
  UPDATE_INVOICE_LINE,
} from '../../../InvoiceIntents';
import InvoiceLayout from '../../InvoiceLayout';
import invoiceDetailReducer from '../invoiceDetailReducer';

describe('InvoiceDetailReducer', () => {
  describe('LOAD_ITEM_OPTION', () => {
    it('adds the item to selected items', () => {
      const state = {
        selectedItems: {},
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

      expect(actual.selectedItems).toEqual({
        2: {
          id: '2',
          itemId: 'b',
          description: 'B',
        },
      });
    });
  });

  describe('UPDATE_INVOICE_LAYOUT', () => {
    it('updates invoice layout to given layout', () => {
      const state = {
        invoice: {
          layout: 'item',
          lines: [],
        },
      };

      const action = {
        intent: UPDATE_INVOICE_LAYOUT,
        layout: 'service',
      };

      const actual = invoiceDetailReducer(state, action);

      expect(actual.invoice.layout).toEqual('service');
    });

    it('remove item lines when switching to service', () => {
      const state = {
        invoice: {
          layout: 'item',
          lines: [
            {
              id: '1',
              layout: 'item',
            },
            {
              id: '2',
              layout: 'service',
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_INVOICE_LAYOUT,
        layout: 'service',
      };

      const actual = invoiceDetailReducer(state, action);

      expect(actual.invoice.lines).toEqual([
        {
          id: '2',
          layout: 'service',
        },
      ]);
    });

    it('keeps service lines when switching to item', () => {
      const state = {
        invoice: {
          layout: 'service',
          lines: [
            {
              id: '2',
              layout: 'service',
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_INVOICE_LAYOUT,
        layout: 'item',
      };

      const actual = invoiceDetailReducer(state, action);

      expect(actual.invoice.lines).toEqual([
        {
          id: '2',
          layout: 'service',
        },
      ]);
    });
  });

  describe('UPDATE_INVOICE_LINE', () => {
    const state = {
      invoice: {
        lines: [
          {},
          {},
        ],
      },
    };

    const action = {
      intent: UPDATE_INVOICE_LINE,
      index: 1,
      key: 'description',
      value: 'test',
    };

    it('update key at index with given value', () => {
      const actual = invoiceDetailReducer(state, action);

      expect(actual.invoice.lines[1].description).toEqual('test');
    });

    it('sets isPageEdited to true', () => {
      const actual = invoiceDetailReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });

    it(`sets the line layout to ${InvoiceLayout.ITEM} when key is itemId`, () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          lines: state.invoice.lines.map(line => ({
            ...line,
            layout: InvoiceLayout.SERVICE,
          })),
        },
      };

      const modifiedAction = {
        ...action,
        key: 'itemId',
        value: '🐑',
      };

      const actual = invoiceDetailReducer(modifiedState, modifiedAction);

      expect(actual.invoice.lines[1].layout).toEqual(InvoiceLayout.ITEM);
    });

    it(`sets the line layout to ${InvoiceLayout.SERVICE} when key is anything but itemId`, () => {
      const actual = invoiceDetailReducer(state, action);

      expect(actual.invoice.lines[1].layout).toEqual(InvoiceLayout.SERVICE);
    });

    it(`does not set the line layout when already ${InvoiceLayout.ITEM}`, () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          lines: state.invoice.lines.map(line => ({
            ...line,
            layout: InvoiceLayout.ITEM,
          })),
        },
      };

      const actual = invoiceDetailReducer(modifiedState, action);

      expect(actual.invoice.lines[1].layout).toEqual(InvoiceLayout.ITEM);
    });

    it('sets taxCodeId when changing accountId and that account has a taxCodeId', () => {
      const modifiedState = {
        ...state,
      };

      const modifiedAction = {
        ...action,
        key: 'accountId',
        value: {
          id: '1',
          taxCodeId: '2',
        },
      };

      const actual = invoiceDetailReducer(modifiedState, modifiedAction);

      expect(actual.invoice.lines[1].accountId).toEqual('1');
      expect(actual.invoice.lines[1].taxCodeId).toEqual('2');
    });


    it('updates displayDiscount when updating discount', () => {
      const modifiedAction = {
        ...action,
        key: 'discount',
        value: '20.00',
      };

      const actual = invoiceDetailReducer(state, modifiedAction);

      expect(actual.invoice.lines[1].discount).toEqual('20.00');
      expect(actual.invoice.lines[1].displayDiscount).toEqual('20.00');
    });

    it('updates displayAmount when updating amount', () => {
      const modifiedAction = {
        ...action,
        key: 'amount',
        value: '20.00',
      };

      const actual = invoiceDetailReducer(state, modifiedAction);

      expect(actual.invoice.lines[1].amount).toEqual('20.00');
      expect(actual.invoice.lines[1].displayAmount).toEqual('20.00');
    });

    it('add account to selectedAccounts when updating account', () => {
      const modifiedState = {
        ...state,
        selectedAccounts: {},
      };

      const modifiedAction = {
        ...action,
        key: 'accountId',
        value: {
          id: '1',
        },
      };

      const actual = invoiceDetailReducer(modifiedState, modifiedAction);

      expect(actual.selectedAccounts).toEqual({ 1: { id: '1' } });
    });

    it('add item to selectedItems when updating item', () => {
      const modifiedState = {
        ...state,
        selectedItems: {},
      };

      const modifiedAction = {
        ...action,
        key: 'itemId',
        value: {
          id: '1',
        },
      };

      const actual = invoiceDetailReducer(modifiedState, modifiedAction);

      expect(actual.selectedItems).toEqual({ 1: { id: '1' } });
    });
  });

  describe('ADD_INVOICE_LINE', () => {
    const state = {
      invoice: {
        lines: [
          {},
          {},
        ],
      },
      newLine: {},
    };

    const action = {
      intent: ADD_INVOICE_LINE,
      line: {
        description: 'test',
      },
    };

    it('sets isPageEdited to true', () => {
      const actual = invoiceDetailReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });

    it('adds a new line', () => {
      const actual = invoiceDetailReducer(state, action);

      expect(actual.invoice.lines[2]).toBeDefined();
    });
  });

  describe('REMOVE_INVOICE_LINE', () => {
    const state = {
      invoice: {
        lines: [
          'a',
          'b',
        ],
      },
    };

    const action = {
      intent: REMOVE_INVOICE_LINE,
      index: 1,
    };

    it('removes line at given index', () => {
      const actual = invoiceDetailReducer(state, action);

      expect(actual.invoice.lines).toEqual([
        'a',
      ]);
    });

    it('sets isPageEdited to true', () => {
      const actual = invoiceDetailReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });
  });

  describe('LOAD_ACCOUNT_AFTER_CREATE', () => {
    it('merges new account payload into selected accounts', () => {
      const state = {
        selectedAccounts: {},
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        id: '123',
      };

      const actual = invoiceDetailReducer(state, action);

      expect(actual.selectedAccounts).toEqual({
        123: { id: '123' },
      });
    });
    it('sets page state to edited', () => {
      const state = {
        selectedAccounts: {},
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        id: '123',
      };

      const actual = invoiceDetailReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });
  });

  describe('FORMAT_INVOICE_LINE', () => {
    it('sets units at index to 1 when empty', () => {
      const state = {
        invoice: {
          lines: [
            {},
            {
              units: '',
            },
          ],
        },
      };

      const action = {
        intent: FORMAT_INVOICE_LINE,
        index: 1,
        key: 'units',
      };

      const actual = invoiceDetailReducer(state, action);

      expect(actual.invoice.lines[1].units).toEqual('1');
    });
  });

  describe('LOAD_INVOICE_DETAIL', () => {
    describe('when monthly limit is not provided', () => {
      const action = {
        intent: LOAD_INVOICE_DETAIL,
        invoice: {
        },
      };
      it('does not show the upgrade modal', () => {
        const actual = invoiceDetailReducer({}, action);

        expect(actual.monthlyLimit).toBeUndefined();
        expect(actual.isUpgradeModalShowing).toBe(false);
      });
    });

    describe('when monthly limit is provided and the limit has not been hit', () => {
      const action = {
        intent: LOAD_INVOICE_DETAIL,
        invoice: {
        },
        monthlyLimit: {
          used: 4,
          limit: 5,
          month: 'April 1994',
        },
      };
      it('does not show the upgrade modal', () => {
        const actual = invoiceDetailReducer({}, action);

        expect(actual.monthlyLimit).toBeDefined();
        expect(actual.isUpgradeModalShowing).toBe(false);
      });
    });

    describe('when monthly limit is provided and the limit has been hit', () => {
      const action = {
        intent: LOAD_INVOICE_DETAIL,
        invoice: {
        },
        monthlyLimit: {
          used: 5,
          limit: 5,
          month: 'April 1994',
        },
      };
      it('shows the upgrade modal', () => {
        const actual = invoiceDetailReducer({}, action);

        expect(actual.monthlyLimit).toBeDefined();
        expect(actual.isUpgradeModalShowing).toBe(true);
      });
    });
  });
});
