import {
  ADD_INVOICE_LINE,
  LOAD_ABN_FROM_CUSTOMER,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CUSTOMER,
  LOAD_INVOICE_DETAIL,
  LOAD_PREFILL_FROM_RECURRING_INVOICE,
  RELOAD_INVOICE_DETAIL,
  REMOVE_INVOICE_LINE,
  SET_UPGRADE_MODAL_SHOWING,
  UPDATE_INVOICE_LAYOUT,
  UPDATE_INVOICE_LINE,
} from '../../../InvoiceIntents';
import InvoiceHistoryAccordianStatus from '../../types/InvoiceHistoryAccordionStatus';
import InvoiceLineType from '../../types/InvoiceLineType';
import invoiceDetailReducer from '../invoiceDetailReducer';

describe('InvoiceDetailReducer', () => {
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

      const actual = invoiceDetailReducer(state, action);

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

      const actual = invoiceDetailReducer(state, action);

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
      const actual = invoiceDetailReducer(state, action);

      expect(actual.invoice.lines[1].description).toEqual('test');
    });

    it('sets isPageEdited to true', () => {
      const actual = invoiceDetailReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });

    it(`sets the line type to ${InvoiceLineType.ITEM} when key is itemId`, () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          lines: state.invoice.lines.map((line) => ({
            ...line,
            type: InvoiceLineType.SERVICE,
          })),
        },
      };

      const modifiedAction = {
        ...action,
        key: 'itemId',
        value: '????',
      };

      const actual = invoiceDetailReducer(modifiedState, modifiedAction);

      expect(actual.invoice.lines[1].type).toEqual(InvoiceLineType.ITEM);
    });

    it(`sets the line type to ${InvoiceLineType.SERVICE} when key is anything but itemId`, () => {
      const actual = invoiceDetailReducer(state, action);

      expect(actual.invoice.lines[1].type).toEqual(InvoiceLineType.SERVICE);
    });

    it(`does not set the line type when already ${InvoiceLineType.ITEM}`, () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          lines: state.invoice.lines.map((line) => ({
            ...line,
            type: InvoiceLineType.ITEM,
          })),
        },
      };

      const actual = invoiceDetailReducer(modifiedState, action);

      expect(actual.invoice.lines[1].type).toEqual(InvoiceLineType.ITEM);
    });

    it('clears the line ids if the line type is changed', () => {
      const modifiedState = {
        ...state,
        invoice: {
          ...state.invoice,
          lines: state.invoice.lines.map((line) => ({
            ...line,
            id: '1',
            type: InvoiceLineType.SERVICE,
          })),
        },
      };

      const modifiedAction = {
        ...action,
        key: 'itemId',
        value: '????',
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

    it('does no change unit when updating account and unit was not empty', () => {
      const modifiedState = {
        invoice: {
          lines: [{}, { units: '2' }],
        },
        accountOptions: [
          {
            id: '????',
            taxCodeId: '2',
          },
        ],
      };
      const modifiedAction = {
        ...action,
        key: 'accountId',
        value: '????',
      };

      const actual = invoiceDetailReducer(modifiedState, modifiedAction);

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
        lines: ['a', 'b'],
      },
    };

    const action = {
      intent: REMOVE_INVOICE_LINE,
      index: 1,
    };

    it('removes line at given index', () => {
      const actual = invoiceDetailReducer(state, action);

      expect(actual.invoice.lines).toEqual(['a']);
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

    describe('line type', () => {
      it.each([
        [InvoiceLineType.SERVICE, '10'],
        [InvoiceLineType.ITEM, '10'],
        [InvoiceLineType.HEADER, undefined],
        [InvoiceLineType.SUB_TOTAL, '10'],
      ])('calculate amount for %s line', (type, expected) => {
        const state = {};
        const action = {
          intent: LOAD_INVOICE_DETAIL,
          invoice: {
            issueDate: '2019-02-03',
            isTaxInclusive: true,
            lines: [{ type, taxExclusiveAmount: '9.99', taxAmount: '0.01' }],
          },
          subscription: {
            isTrial: false,
            monthlyLimit: { hasHitLimit: false },
          },
        };

        const actual = invoiceDetailReducer(state, action);

        expect(actual.invoice.lines[0].amount).toEqual(expected);
      });
    });

    describe('originalAmountDue', () => {
      it('calculates originalAmountDue with freight amount and lines amount', () => {
        const state = {};
        const action = {
          intent: LOAD_INVOICE_DETAIL,
          invoice: {
            isTaxInclusive: true,
            lines: [
              {
                type: InvoiceLineType.SERVICE,
                taxExclusiveAmount: '9.99',
                taxAmount: '0.01',
              },
            ],
            taxExclusiveFreightAmount: '9.09',
            freightTaxAmount: '0.91',
            amountPaid: '5',
          },
          subscription: {
            isTrial: false,
            monthlyLimit: { hasHitLimit: false },
          },
        };

        const actual = invoiceDetailReducer(state, action);

        expect(actual.originalAmountDue).toBe('15');
      });
    });
  });

  describe('RELOAD_INVOICE_DETAIL', () => {
    const businessId = 'businessId';
    const region = 'region';
    const invoiceId = 'invoiceid';
    const duplicateId = 'duplicateId';
    const quoteId = 'quoteId';

    const state = {
      businessId,
      region,
      invoiceId,
      duplicateId,
      quoteId,
    };

    const action = {
      intent: RELOAD_INVOICE_DETAIL,
      invoice: { invoiceId, lines: [] },
      subscription: {},
    };

    it('maintains business id, region, and invoice id', () => {
      const actual = invoiceDetailReducer(state, action);

      expect(actual.businessId).toEqual(businessId);
      expect(actual.region).toEqual(region);
      expect(actual.invoiceId).toEqual(invoiceId);
      expect(actual.duplicateId).toBeUndefined();
      expect(actual.quoteId).toBeUndefined();
    });

    it('maintains pay direct data', () => {
      const payDirect = {
        isLoading: false,
        isServiceAvailable: true,
        isRegistered: false,
        registrationUrl: 'registrationUrl',
      };

      const actual = invoiceDetailReducer({ ...state, payDirect }, action);

      expect(actual.payDirect).toEqual(payDirect);
    });

    it('maintains history data', () => {
      const invoiceHistory = [{}, {}];
      const invoiceHistoryAccordionStatus = InvoiceHistoryAccordianStatus.OPEN;

      const actual = invoiceDetailReducer(
        { ...state, invoiceHistory, invoiceHistoryAccordionStatus },
        action
      );

      expect(actual.invoiceHistory).toEqual(invoiceHistory);
      expect(actual.invoiceHistoryAccordionStatus).toEqual(
        invoiceHistoryAccordionStatus
      );
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
      const actual = invoiceDetailReducer(state, action);

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
      const actual = invoiceDetailReducer(state, action);

      expect(actual.abn).not.toBeUndefined();
    });
  });

  describe('LOAD_PREFILL_FROM_RECURRING_INVOICE', () => {
    it.each([
      [true, '10'],
      [false, '9.99'],
    ])(
      'set invoice and calculates line amounts when tax inclusive is %s',
      (isTaxInclusive, expected) => {
        const state = {};
        const action = {
          intent: LOAD_PREFILL_FROM_RECURRING_INVOICE,
          invoice: {
            isTaxInclusive,
            lines: [{ taxExclusiveAmount: '9.99', taxAmount: '0.01' }],
          },
        };

        const actual = invoiceDetailReducer(state, action);

        expect(actual.invoice.lines[0].amount).toEqual(expected);
      }
    );
  });
});
