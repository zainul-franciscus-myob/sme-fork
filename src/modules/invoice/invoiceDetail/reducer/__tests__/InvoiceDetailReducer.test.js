import {
  ADD_INVOICE_LINE,
  FORMAT_INVOICE_LINE,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_INVOICE_DETAIL,
  LOAD_ITEM_OPTION,
  REMOVE_INVOICE_LINE,
  SET_UPGRADE_MODAL_SHOWING,
  UPDATE_INVOICE_LAYOUT,
  UPDATE_INVOICE_LINE,
} from '../../../InvoiceIntents';
import InvoiceLayout from '../../InvoiceLayout';
import InvoiceLineLayout from '../../InvoiceLineLayout';
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
          layout: 'itemAndService',
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

    it('remove item lines and clear line ids when switching to service', () => {
      const state = {
        invoice: {
          layout: 'itemAndService',
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
          id: '',
          layout: 'service',
        },
      ]);
    });

    it('keeps service lines and clear line ids when switching to itemAndService layout', () => {
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
        layout: 'itemAndService',
      };

      const actual = invoiceDetailReducer(state, action);

      expect(actual.invoice.lines).toEqual([
        {
          id: '',
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

    it(`sets the line layout to ${InvoiceLineLayout.ITEM} when key is itemId`, () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          lines: state.invoice.lines.map(line => ({
            ...line,
            layout: InvoiceLineLayout.SERVICE,
          })),
        },
      };

      const modifiedAction = {
        ...action,
        key: 'itemId',
        value: '🐑',
      };

      const actual = invoiceDetailReducer(modifiedState, modifiedAction);

      expect(actual.invoice.lines[1].layout).toEqual(InvoiceLineLayout.ITEM);
    });

    it(`sets the line layout to ${InvoiceLineLayout.SERVICE} when key is anything but itemId`, () => {
      const actual = invoiceDetailReducer(state, action);

      expect(actual.invoice.lines[1].layout).toEqual(InvoiceLineLayout.SERVICE);
    });

    it(`does not set the line layout when already ${InvoiceLineLayout.ITEM}`, () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          lines: state.invoice.lines.map(line => ({
            ...line,
            layout: InvoiceLineLayout.ITEM,
          })),
        },
      };

      const actual = invoiceDetailReducer(modifiedState, action);

      expect(actual.invoice.lines[1].layout).toEqual(InvoiceLineLayout.ITEM);
    });

    it('clears the line ids if the line layout is changed', () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          lines: state.invoice.lines.map(line => ({
            ...line,
            id: '1',
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

      expect(actual.invoice.lines[1].id).toEqual('');
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

    it('does no change unit when updating account and unit was not empty', () => {
      const modifiedState = {
        invoice: {
          lines: [
            {},
            { units: '2' },
          ],
        },
        accountOptions: [
          {
            id: '🐱',
            taxCodeId: '2',
          },
        ],
      };
      const modifiedAction = {
        ...action,
        key: 'accountId',
        value: '🐱',
      };

      const actual = invoiceDetailReducer(modifiedState, modifiedAction);

      expect(actual.invoice.lines[1].units).toEqual('2');
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

  describe('FORMAT_INVOICE_LINE', () => {
    [
      {
        name: 'unitPrice', displayName: 'displayUnitPrice', value: '10', displayValue: '10.00',
      },
      {
        name: 'discount', displayName: 'displayDiscount', value: '10', displayValue: '10.00',
      },
      {
        name: 'amount', displayName: 'displayAmount', value: '10', displayValue: '10.00',
      },
      {
        name: 'units', displayName: 'units', value: '10.0', displayValue: '10',
      },
    ].forEach(({
      name, displayName, value, displayValue,
    }) => {
      it(`should format ${name}`, () => {
        const state = {
          invoice: {
            lines: [
              {
                [name]: value,
              },
            ],
          },
        };

        const action = {
          intent: FORMAT_INVOICE_LINE,
          key: name,
          index: 0,
        };

        const actual = invoiceDetailReducer(state, action);

        expect(actual.invoice.lines[0][displayName]).toEqual(displayValue);
      });
    });

    it('should not format other keys', () => {
      const state = {
        invoice: {
          lines: [{}],
        },
        something: '',
      };

      const action = {
        intent: FORMAT_INVOICE_LINE,
        key: 'blah',
        index: 0,
      };

      const actual = invoiceDetailReducer(state, action);

      const expected = {
        invoice: {
          lines: [{}],
        },
        something: '',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('SET_UPGRADE_MODAL_SHOWING', () => {
    const state = {
      subscription: {
        isTrial: true,
        isUpgradeModalShowing: true,
        monthlyLimit: {
          hasHitLimit: false,
        },
      },
    };

    it('sets isUpgradeModalShowing and monthlyLimit to values', () => {
      const monthlyLimit = {
        hasHitLimit: true,
        limit: 5,
        used: 6,
      };

      const action = {
        intent: SET_UPGRADE_MODAL_SHOWING,
        isUpgradeModalShowing: false,
        monthlyLimit,
      };

      const actual = invoiceDetailReducer(state, action);

      expect(actual.subscription.isUpgradeModalShowing).toBeFalsy();
      expect(actual.subscription.monthlyLimit).toEqual(monthlyLimit);
      expect(actual.subscription.isTrial).toBeTruthy();
    });

    it('uses current state monthlyLimit if no monthlyLimit is provided in action', () => {
      const action = {
        intent: SET_UPGRADE_MODAL_SHOWING,
        isUpgradeModalShowing: false,
      };

      const expectedMonthlyLimit = {
        hasHitLimit: false,
      };

      const actual = invoiceDetailReducer(state, action);

      expect(actual.subscription.monthlyLimit).toEqual(expectedMonthlyLimit);
    });
  });

  describe('LOAD_INVOICE_DETAIL', () => {
    describe('subscription upgrade modal', () => {
      const state = {};

      const action = {
        intent: LOAD_INVOICE_DETAIL,
        invoice: {
          issueDate: '2019-02-03',
          lines: [],
        },
        subscription: {
          isTrial: false,
          monthlyLimit: {
            limit: 5,
            hasHitLimit: true,
          },
        },
      };

      it('shows upgrade modal if subscription limit has been reached on load new invoice', () => {
        const actual = invoiceDetailReducer(state, action);

        expect(actual.subscription.isUpgradeModalShowing).toBeTruthy();
      });

      it('does not show upgrade modal if subscription limit has not been reached on load new invoice', () => {
        const modifiedAction = {
          ...action,
          subscription: {
            isTrial: false,
            monthlyLimit: {
              limit: 5,
              hasHitLimit: false,
            },
          },
        };
        const actual = invoiceDetailReducer(state, modifiedAction);

        expect(actual.subscription.isUpgradeModalShowing).toBeFalsy();
      });

      it('does not show upgrade modal on load existing invoice', () => {
        const modifiedAction = {
          ...action,
          subscription: {
            isTrial: false,
          },
        };
        const actual = invoiceDetailReducer(state, modifiedAction);

        expect(actual.subscription.isUpgradeModalShowing).toBeFalsy();
        expect(actual.subscription.monthlyLimit.hasHitLimit).toBeFalsy();
      });
    });
  });
});
