import {
  ADD_INVOICE_LINE,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_ITEM_OPTION,
  REMOVE_INVOICE_LINE,
  UPDATE_INVOICE_LAYOUT,
  UPDATE_INVOICE_LINE,
} from '../../../InvoiceIntents';
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

    it('sets taxCodeId when changing accountId and that account has a taxCodeId', () => {
      const modifiedState = {
        ...state,
        accountOptions: [
          {
            id: '1',
            taxCodeId: '2',
          },
        ],
      };

      const modifiedAction = {
        ...action,
        key: 'accountId',
        value: '1',
      };

      const actual = invoiceDetailReducer(modifiedState, modifiedAction);

      expect(actual.invoice.lines[1].accountId).toEqual('1');
      expect(actual.invoice.lines[1].taxCodeId).toEqual('2');
    });


    it('sets taxCodeId to empty when changing accountId and that account does not exist', () => {
      const modifiedState = {
        ...state,
        accountOptions: [],
      };

      const modifiedAction = {
        ...action,
        key: 'accountId',
        value: '1',
      };

      const actual = invoiceDetailReducer(modifiedState, modifiedAction);

      expect(actual.invoice.lines[1].accountId).toEqual('1');
      expect(actual.invoice.lines[1].taxCodeId).toEqual('');
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
      accountOptions: [],
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

    [
      {
        key: 'accountId',
        line: {
          accountId: '1',
        },
      },
      {
        key: 'itemId',
        line: {
          itemId: '1',
        },
      },
      {
        key: 'description',
        line: {
          description: 'noot noot 🐧',
        },
      },
    ].forEach((test) => {
      it(`adds new line with given value for ${test.key}`, () => {
        const modifiedAction = {
          ...action,
          line: test.line,
        };

        const actual = invoiceDetailReducer(state, modifiedAction);

        expect(actual.invoice.lines[2][test.key]).toEqual(test.line[test.key]);
      });
    });

    it('cannot add new line with other keys', () => {
      const modifiedState = {
        ...state,
        newLine: {
          taxCodeId: 'noop',
        },
      };


      const modifiedAction = {
        intent: ADD_INVOICE_LINE,
        line: {
          taxCodeId: '2',
        },
      };

      const actual = invoiceDetailReducer(modifiedState, modifiedAction);

      expect(actual.invoice.lines[2].taxCodeId).toEqual('noop');
    });

    it('sets taxCodeId when changing accountId and that account has a taxCodeId', () => {
      const modifiedState = {
        ...state,
        accountOptions: [
          {
            id: '1',
            taxCodeId: '2',
          },
        ],
      };

      const modifiedAction = {
        ...action,
        line: {
          accountId: '1',
        },
      };

      const actual = invoiceDetailReducer(modifiedState, modifiedAction);

      expect(actual.invoice.lines[2].accountId).toEqual('1');
      expect(actual.invoice.lines[2].taxCodeId).toEqual('2');
    });


    it('sets taxCodeId to empty when changing accountId and that account does not exist', () => {
      const modifiedState = {
        ...state,
        accountOptions: [],
      };

      const modifiedAction = {
        ...action,
        line: {
          accountId: '1',
        },
      };

      const actual = invoiceDetailReducer(modifiedState, modifiedAction);

      expect(actual.invoice.lines[2].accountId).toEqual('1');
      expect(actual.invoice.lines[2].taxCodeId).toEqual('');
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
    it('merges new account payload into account options', () => {
      const state = {
        accountOptions: [{ thisIsAnAccount: true }],
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        thisIsAnAccount: false,
      };

      const actual = invoiceDetailReducer(state, action);

      expect(actual.accountOptions).toEqual([
        { thisIsAnAccount: false },
        { thisIsAnAccount: true },
      ]);
    });
    it('sets page state to edited', () => {
      const state = {
        accountOptions: [{ thisIsAnAccount: true }],
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        thisIsAnAccount: false,
      };

      const actual = invoiceDetailReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });
  });
});
