import {
  ADD_INVOICE_LINE,
  LOAD_ABN_FROM_CUSTOMER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CUSTOMER,
  LOAD_RECURRING_INVOICE,
  RELOAD_RECURRING_INVOICE,
  REMOVE_INVOICE_LINE,
  UPDATE_INVOICE_LAYOUT,
  UPDATE_INVOICE_LINE,
} from '../../RecurringInvoiceIntents';
import SalesLineType from '../../../types/SalesLineType';
import recurringInvoiceReducer from '../RecurringInvoiceReducer';

describe('RecurringInvoiceReducer', () => {
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

      const actual = recurringInvoiceReducer(state, action);

      expect(actual.invoice.layout).toEqual('service');
    });

    it('remove item lines and clear line ids when switching to service', () => {
      const state = {
        invoice: {
          layout: 'itemAndService',
          lines: [
            {
              id: '1',
              type: 'item',
            },
            {
              id: '2',
              type: 'service',
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_INVOICE_LAYOUT,
        layout: 'service',
      };

      const actual = recurringInvoiceReducer(state, action);

      expect(actual.invoice.lines).toEqual([
        {
          id: '',
          type: 'service',
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
              type: 'service',
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_INVOICE_LAYOUT,
        layout: 'itemAndService',
      };

      const actual = recurringInvoiceReducer(state, action);

      expect(actual.invoice.lines).toEqual([
        {
          id: '',
          type: 'service',
        },
      ]);
    });
  });

  describe('UPDATE_INVOICE_LINE', () => {
    const state = {
      invoice: {
        lines: [{}, {}],
      },
    };

    const action = {
      intent: UPDATE_INVOICE_LINE,
      index: 1,
      key: 'description',
      value: 'test',
    };

    it('update key at index with given value', () => {
      const actual = recurringInvoiceReducer(state, action);

      expect(actual.invoice.lines[1].description).toEqual('test');
    });

    it('sets isPageEdited to true', () => {
      const actual = recurringInvoiceReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });

    it(`sets the line type to ${SalesLineType.ITEM} when key is itemId`, () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          lines: state.invoice.lines.map((line) => ({
            ...line,
            type: SalesLineType.SERVICE,
          })),
        },
      };

      const modifiedAction = {
        ...action,
        key: 'itemId',
        value: '🐑',
      };

      const actual = recurringInvoiceReducer(modifiedState, modifiedAction);

      expect(actual.invoice.lines[1].type).toEqual(SalesLineType.ITEM);
    });

    it(`sets the line type to ${SalesLineType.SERVICE} when key is anything but itemId`, () => {
      const actual = recurringInvoiceReducer(state, action);

      expect(actual.invoice.lines[1].type).toEqual(SalesLineType.SERVICE);
    });

    it(`does not set the line type when already ${SalesLineType.ITEM}`, () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          lines: state.invoice.lines.map((line) => ({
            ...line,
            type: SalesLineType.ITEM,
          })),
        },
      };

      const actual = recurringInvoiceReducer(modifiedState, action);

      expect(actual.invoice.lines[1].type).toEqual(SalesLineType.ITEM);
    });

    it('clears the line ids if the line type is changed', () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          lines: state.invoice.lines.map((line) => ({
            ...line,
            id: '1',
            type: SalesLineType.SERVICE,
          })),
        },
      };

      const modifiedAction = {
        ...action,
        key: 'itemId',
        value: '🐑',
      };

      const actual = recurringInvoiceReducer(modifiedState, modifiedAction);

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

      const actual = recurringInvoiceReducer(modifiedState, modifiedAction);

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

      const actual = recurringInvoiceReducer(modifiedState, modifiedAction);

      expect(actual.invoice.lines[1].accountId).toEqual('1');
      expect(actual.invoice.lines[1].taxCodeId).toEqual('');
    });

    it('does no change unit when updating account and unit was not empty', () => {
      const modifiedState = {
        invoice: {
          lines: [{}, { units: '2' }],
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

      const actual = recurringInvoiceReducer(modifiedState, modifiedAction);

      expect(actual.invoice.lines[1].units).toEqual('2');
    });
  });

  describe('ADD_INVOICE_LINE', () => {
    const state = {
      invoice: {
        lines: [{}, {}],
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
      const actual = recurringInvoiceReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });

    it('adds a new line', () => {
      const actual = recurringInvoiceReducer(state, action);

      expect(actual.invoice.lines[2]).toBeDefined();
    });
  });

  describe('REMOVE_INVOICE_LINE', () => {
    const state = {
      invoice: {
        lines: ['a', 'b'],
      },
    };

    const action = {
      intent: REMOVE_INVOICE_LINE,
      index: 1,
    };

    it('removes line at given index', () => {
      const actual = recurringInvoiceReducer(state, action);

      expect(actual.invoice.lines).toEqual(['a']);
    });

    it('sets isPageEdited to true', () => {
      const actual = recurringInvoiceReducer(state, action);

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

      const actual = recurringInvoiceReducer(state, action);

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

      const actual = recurringInvoiceReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });
  });

  describe('LOAD_RECURRING_INVOICE', () => {
    describe('line type', () => {
      it.each([
        [SalesLineType.SERVICE, '10'],
        [SalesLineType.ITEM, '10'],
        [SalesLineType.HEADER, undefined],
        [SalesLineType.SUB_TOTAL, '10'],
      ])('calculate amount for %s line', (type, expected) => {
        const state = {};
        const action = {
          intent: LOAD_RECURRING_INVOICE,
          invoice: {
            issueDate: '2019-02-03',
            isTaxInclusive: true,
            lines: [{ type, taxExclusiveAmount: '9.99', taxAmount: '0.01' }],
          },
        };

        const actual = recurringInvoiceReducer(state, action);

        expect(actual.invoice.lines[0].amount).toEqual(expected);
      });
    });
  });

  describe('RELOAD_RECURRING_INVOICE', () => {
    const businessId = 'businessId';
    const region = 'region';
    const recurringTransactionId = 'invoiceid';
    const duplicateId = 'duplicateId';
    const quoteId = 'quoteId';

    const state = {
      businessId,
      region,
      recurringTransactionId,
      duplicateId,
      quoteId,
    };

    const action = {
      intent: RELOAD_RECURRING_INVOICE,
      invoice: { recurringTransactionId, lines: [] },
      subscription: {},
    };

    it('maintains business id, region, and invoice id', () => {
      const actual = recurringInvoiceReducer(state, action);

      expect(actual.businessId).toEqual(businessId);
      expect(actual.region).toEqual(region);
      expect(actual.recurringTransactionId).toEqual(recurringTransactionId);
      expect(actual.duplicateId).toBeUndefined();
      expect(actual.quoteId).toBeUndefined();
    });
  });

  describe('LOAD_ABN_FROM_CUSTOMER', () => {
    const state = {
      invoice: { lines: [] },
    };

    const action = {
      intent: LOAD_CUSTOMER,
      address: 'addr',
      abn: { status: 'None' },
    };

    it('set customer address', () => {
      const actual = recurringInvoiceReducer(state, action);

      expect(actual.invoice.address).toEqual('addr');
    });
  });

  describe('LOAD_ABN_FROM_CUSTOMER', () => {
    const state = {
      invoice: { lines: [] },
    };

    const action = {
      intent: LOAD_ABN_FROM_CUSTOMER,
      abn: { status: 'None' },
    };

    it('set customer abn', () => {
      const actual = recurringInvoiceReducer(state, action);

      expect(actual.abn).not.toBeUndefined();
    });
  });
});
