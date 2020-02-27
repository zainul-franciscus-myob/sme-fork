import {
  ADD_BILL_LINE,
  FORMAT_AMOUNT_PAID,
  FORMAT_BILL_LINE,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_BILL,
  LOAD_ITEM_OPTION,
  PREFILL_BILL_FROM_IN_TRAY,
  REMOVE_BILL_LINE,
  SET_CALCULATED_BILL_LINES_AND_TOTALS,
  SET_UPGRADE_MODAL_SHOWING,
  UPDATE_BILL_LINE,
  UPDATE_BILL_OPTION,
  UPDATE_LAYOUT,
} from '../BillIntents';
import BillLayout from '../types/BillLayout';
import BillLineLayout from '../types/BillLineLayout';
import LineTaxTypes from '../types/LineTaxTypes';
import billReducer from '../billReducer';

describe('billReducer', () => {
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

      const actual = billReducer(state, action);

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

  describe('LOAD_BILL', () => {
    it('sets issueDate to today when is creating', () => {
      const state = {
        today: new Date(2020, 0, 1),
        billId: 'new',
      };

      const action = {
        intent: LOAD_BILL,
        response: {
        },
      };

      const actual = billReducer(state, action);

      expect(actual.bill.issueDate).toEqual('2020-01-01');
    });

    it('uses issueDate from response when is not creating', () => {
      const state = {
        today: new Date(2020, 0, 1),
        billId: '1',
      };

      const action = {
        intent: LOAD_BILL,
        response: {
          bill: {
            issueDate: '2019-02-03',
          },
        },
      };

      const actual = billReducer(state, action);

      expect(actual.bill.issueDate).toEqual('2019-02-03');
    });

    describe('subscription upgrade modal', () => {
      const state = {};

      const action = {
        intent: LOAD_BILL,
        response: {
          bill: {
            issueDate: '2019-02-03',
          },
          subscription: {
            monthlyLimit: {
              limit: 5,
              hasHitLimit: true,
            },
          },
        },
      };

      it('shows upgrade modal if subscription limit has been reached', () => {
        const actual = billReducer(state, action);

        expect(actual.subscription.isUpgradeModalShowing).toBeTruthy();
      });

      it('does not show upgrade modal if subscription limit has not been reached', () => {
        const modifiedAction = {
          ...action,
          response: {
            ...action.response,
            subscription: {
              monthlyLimit: {
                limit: 5,
                hasHitLimit: false,
              },
            },
          },
        };
        const actual = billReducer(state, modifiedAction);

        expect(actual.subscription.isUpgradeModalShowing).toBeFalsy();
      });
    });
  });

  describe('SET_CALCULATED_BILL_LINES_AND_TOTALS', () => {
    it('merges calculated line totals response into the state', () => {
      const state = {
        bill: {
          lines: [],
          isTaxInclusive: false,
        },
        totals: {},
      };

      const action = {
        intent: SET_CALCULATED_BILL_LINES_AND_TOTALS,
        response: {
          bill: {
            lines: [
              'a',
            ],
            isTaxInclusive: true,
          },
          totals: {
            subTotal: '1',
            totalTax: '2',
            totalAmount: '3',
            amountDue: '4',
          },
        },
      };

      const actual = billReducer(state, action);

      expect(actual).toEqual({
        bill: {
          lines: [
            'a',
          ],
          isTaxInclusive: true,
        },
        totals: {
          subTotal: '1',
          totalTax: '2',
          totalAmount: '3',
          amountDue: '4',
        },
      });
    });
  });

  describe('UPDATE_LAYOUT', () => {
    it('updates the bill table layout with the given value', () => {
      const state = {
        layout: 'something',
        bill: {
          lines: [],
        },
      };

      const action = {
        intent: UPDATE_LAYOUT,
        value: 'something else',
      };

      const actual = billReducer(state, action);

      expect(actual.layout).toEqual('something else');
    });

    it('removes all item lines if transitioning to a service layout and clears line id', () => {
      const state = {
        layout: BillLayout.ITEM_AND_SERVICE,
        bill: {
          lines: [
            { type: BillLineLayout.SERVICE, id: 'something' },
            { type: BillLineLayout.ITEM_AND_SERVICE, id: 'somethingElse' },
          ],
        },
      };

      const action = { intent: UPDATE_LAYOUT, value: BillLayout.SERVICE };

      const actual = billReducer(state, action);

      const expected = [{ type: BillLineLayout.SERVICE, id: '' }];

      expect(actual.bill.lines).toEqual(expected);
    });

    it('keeps service lines when switching from service to itemAndService layout and clears line id', () => {
      const state = {
        layout: BillLayout.SERVICE,
        bill: {
          lines: [
            { type: BillLineLayout.SERVICE, id: 'a' },
          ],
        },
      };

      const action = { intent: UPDATE_LAYOUT, value: BillLayout.ITEM_AND_SERVICE };

      const actual = billReducer(state, action);

      const expected = [{ type: BillLineLayout.SERVICE, id: '' }];

      expect(actual.bill.lines).toEqual(expected);
    });

    it('changes the default template options in export pdf for service', () => {
      const state = {
        layout: BillLayout.SERVICE,
        bill: {
          lines: [],
        },
        itemTemplateOptions: {
          defaultTemplate: 'a',
        },
        serviceTemplateOptions: {
          defaultTemplate: 'b',
        },
        exportPdf: {
          template: 'b',
        },
      };

      const action = { intent: UPDATE_LAYOUT, key: 'layout', value: BillLayout.ITEM_AND_SERVICE };

      const actual = billReducer(state, action);

      expect(actual.exportPdf.template).toEqual('a');
    });

    it('changes the default template options in export pdf for itemAndService', () => {
      const state = {
        layout: BillLayout.ITEM_AND_SERVICE,
        bill: {
          lines: [],
        },
        itemTemplateOptions: {
          defaultTemplate: 'a',
        },
        serviceTemplateOptions: {
          defaultTemplate: 'b',
        },
        exportPdf: {
          template: 'a',
        },
      };

      const action = { intent: UPDATE_LAYOUT, key: 'layout', value: BillLayout.SERVICE };

      const actual = billReducer(state, action);

      expect(actual.exportPdf.template).toEqual('b');
    });
  });

  describe('UPDATE_BILL_OPTION', () => {
    it('updates key with given value', () => {
      const state = {
        bill: {
          a: '1',
          lines: [],
        },
      };

      const action = {
        intent: UPDATE_BILL_OPTION,
        key: 'a',
        value: '2',
      };

      const actual = billReducer(state, action);

      expect(actual.bill).toEqual({
        a: '2',
      });
    });

    it('sets isPageEdited to true', () => {
      const state = {
        bill: {
          lines: [],
        },
        isPageEdited: false,
      };

      const action = {
        intent: UPDATE_BILL_OPTION,
        key: 'a',
        value: '2',
      };

      const actual = billReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });

    [
      'DayOfMonthAfterEOM',
      'OnADayOfTheMonth',
    ].forEach((expirationTerm) => {
      it(`sets expirationDays to 1, when is currently 0 and expirationTerms is changed to ${expirationTerm}`, () => {
        const state = {
          bill: {
            expirationDays: '0',
            expirationTerm: 'InAGivenNumberOfDays',
            lines: [],
          },
        };

        const action = {
          intent: UPDATE_BILL_OPTION,
          key: 'expirationTerm',
          value: expirationTerm,
        };

        const actual = billReducer(state, action);

        expect(actual.bill).toEqual({
          expirationDays: '1',
          expirationTerm,
        });
      });
    });

    describe('prefillStatus', () => {
      it('updates prefill status when corresponding field changed', () => {
        const state = {
          bill: {
            lines: [],
          },
          prefillStatus: {
            supplierId: true,
          },
        };

        const action = {
          intent: UPDATE_BILL_OPTION,
          key: 'supplierId',
          value: '2',
        };

        const actual = billReducer(state, action);

        expect(actual.prefillStatus).toEqual({
          supplierId: false,
        });
      });

      it('does not update prefill status when other field changed', () => {
        const state = {
          bill: {
            lines: [],
          },
          prefillStatus: {
            supplierId: true,
          },
        };

        const action = {
          intent: UPDATE_BILL_OPTION,
          key: 'other',
          value: 'blah',
        };

        const actual = billReducer(state, action);

        expect(actual.prefillStatus).toEqual({
          supplierId: true,
        });
      });
    });

    describe('when expenseAccountId is updated', () => {
      it('updates the accountId and taxCodeId for all prefilled lines', () => {
        const state = {
          bill: {
            expenseAccountId: '2',
            lines: [
              { accountId: '2', taxCodeId: '2', amount: '10.00' },
              { accountId: '3', taxCodeId: '3', amount: '20.00' },
            ],
          },
          accountOptions: [
            { id: '1', taxCodeId: '1' },
            { id: '2', taxCodeId: '2' },
            { id: '3', taxCodeId: '3' },
          ],
          taxCodes: [
            { id: '1' },
            { id: '2' },
            { id: '3' },
          ],
        };

        const action = {
          intent: UPDATE_BILL_OPTION,
          key: 'expenseAccountId',
          value: '1',
        };
        const actual = billReducer(state, action);

        const expectedLines = [
          { accountId: '1', taxCodeId: '1', amount: '10.00' },
          { accountId: '1', taxCodeId: '1', amount: '20.00' },
        ];

        expect(actual.bill.lines).toEqual(expectedLines);
      });
    });
  });

  describe('ADD_BILL_LINE', () => {
    const state = {
      bill: {
        lines: [
          {},
          {},
        ],
      },
      newLine: {},
      accountOptions: [],
    };

    const action = {
      intent: ADD_BILL_LINE,
      line: {
        description: 'test',
      },
    };

    it('sets isPageEdited to true', () => {
      const actual = billReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });

    it('adds a new line', () => {
      const actual = billReducer(state, action);

      expect(actual.bill.lines[2]).toBeDefined();
    });
  });

  describe('REMOVE_BILL_LINE', () => {
    const state = {
      bill: {
        lines: [
          {
            id: '1',
          },
          {
            id: '2',
          },
        ],
      },
    };

    const action = {
      intent: REMOVE_BILL_LINE,
      index: 1,
    };

    it('removes line at index', () => {
      const actual = billReducer(state, action);

      expect(actual.bill.lines).toEqual([
        {
          id: '1',
        },
      ]);
    });

    it('sets isPageEdited to true', () => {
      const actual = billReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });
  });

  describe('UPDATE_BILL_LINE', () => {
    it('updates key at line at index with value', () => {
      const state = {
        bill: {
          lines: [
            {},
            {
              hello: 2,
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_BILL_LINE, index: 1, key: 'hello', value: 3,
      };

      const actual = billReducer(state, action);

      expect(actual.bill.lines[1].hello).toEqual(3);
    });

    it('updates both discount and displayDiscount when key is discount', () => {
      const state = {
        bill: {
          lines: [
            {},
          ],
        },
      };

      const action = {
        intent: UPDATE_BILL_LINE,
        index: 0,
        key: 'discount',
        value: '1234',
      };

      const actual = billReducer(state, action);

      expect(actual.bill.lines[0].discount).toEqual('1234');
      expect(actual.bill.lines[0].displayDiscount).toEqual('1234');
    });

    it('updates both amount and displayAmount when key is amount', () => {
      const state = {
        bill: {
          lines: [
            {},
          ],
        },
      };

      const action = {
        intent: UPDATE_BILL_LINE,
        index: 0,
        key: 'amount',
        value: '1234',
      };

      const actual = billReducer(state, action);

      expect(actual.bill.lines[0].amount).toEqual('1234');
      expect(actual.bill.lines[0].displayAmount).toEqual('1234');
    });

    it('updates taxCodeId and accountId when key is accountId', () => {
      const action = {
        intent: UPDATE_BILL_LINE,
        index: 0,
        key: 'accountId',
        value: '5',
      };

      const state = {
        bill: {
          lines: [
            {
              id: '2',
            },
          ],
        },
        accountOptions: [
          {
            id: '5',
            taxCodeId: '10',
          },
        ],
      };

      const actual = billReducer(state, action);

      expect(actual.bill.lines[0].accountId).toEqual('5');
      expect(actual.bill.lines[0].taxCodeId).toEqual('10');
    });

    it('updates type to item when key is itemId', () => {
      const state = {
        bill: {
          lines: [
            {},
          ],
        },
      };

      const action = {
        intent: UPDATE_BILL_LINE, index: 0, key: 'itemId', value: '1',
      };

      const actual = billReducer(state, action);

      expect(actual.bill.lines[0].itemId).toEqual('1');
      expect(actual.bill.lines[0].type).toEqual('item');
    });

    it('clears line id if the line type has been changed', () => {
      const state = {
        bill: {
          lines: [
            { type: BillLineLayout.SERVICE, id: '1' },
          ],
        },
      };

      const action = {
        intent: UPDATE_BILL_LINE, index: 0, key: 'itemId', value: '1',
      };

      const actual = billReducer(state, action);

      expect(actual.bill.lines[0].id).toEqual('');
    });

    it('sets isPageEdited to true', () => {
      const action = {
        intent: UPDATE_BILL_LINE,
        index: 0,
        key: 'description',
        value: 'abc',
      };

      const state = {
        bill: {
          lines: [
            {},
          ],
        },
      };
      const actual = billReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });

    it('should set the correct lineSubTypeId for an item line', () => {
      const state = {
        bill: {
          lines: [
            {
              type: BillLineLayout.ITEM,
              accountId: '1',
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_BILL_LINE,
        key: test.key,
        index: 0,
        value: '',
      };

      const actual = billReducer(state, action);

      expect(actual.bill.lines[0].lineSubTypeId).toEqual(
        LineTaxTypes.DEFAULT_ITEM_LINE_SUB_TYPE_ID,
      );
    });

    it('should set the correct lineSubTypeId for a service line', () => {
      const state = {
        bill: {
          lines: [
            {
              type: BillLineLayout.SERVICE,
              accountId: '1',
            },
          ],
        },
      };

      const action = {
        intent: UPDATE_BILL_LINE,
        key: test.key,
        index: 0,
        value: '',
      };

      const actual = billReducer(state, action);

      expect(actual.bill.lines[0].lineSubTypeId).toEqual(
        LineTaxTypes.DEFAULT_SERVICE_LINE_SUB_TYPE_ID,
      );
    });

    describe('updates line prefill status', () => {
      [
        { key: 'itemId' },
        { key: 'accountId' },
        { key: 'taxCodeId' },
      ].forEach((test) => {
        it(`should not update prefillStatus if line has been prefilled and ${test.key} is updated`, () => {
          const state = {
            bill: {
              lines: [{
                amount: '23',
                prefillStatus: {
                  amount: true,
                },
              }],
            },
            accountOptions: [
              {
                id: '5',
                taxCodeId: '10',
              },
            ],
          };

          const action = {
            intent: UPDATE_BILL_LINE,
            index: 0,
            key: test.key,
            value: '',
          };

          const actual = billReducer(state, action);

          expect(actual.bill.lines[0].prefillStatus).toEqual({ amount: true });
        });
      });

      [
        { key: 'description' },
        { key: 'amount' },
        { key: 'discount' },
        { key: 'units' },
        { key: 'unitPrice' },
      ].forEach((test) => {
        it(`should update status to false if line has been prefilled and ${test.key} is updated`, () => {
          const state = {
            bill: {
              lines: [{
                amount: '23',
                prefillStatus: {
                  amount: true,
                },
              }],
            },
          };

          const action = {
            intent: UPDATE_BILL_LINE,
            index: 0,
            key: test.key,
            value: '',
          };

          const actual = billReducer(state, action);

          expect(actual.bill.lines[0].prefillStatus[action.key]).toEqual(false);
        });
      });

      it('should return undefined for prefillStatus if line has not been prefilled', () => {
        const state = {
          bill: {
            lines: [{
              amount: '',
            }],
          },
        };

        const action = {
          intent: UPDATE_BILL_LINE,
          index: 0,
          key: 'amount',
          value: '',
        };

        const actual = billReducer(state, action);

        expect(actual.bill.lines[0].prefillStatus).toBeUndefined();
      });
    });

    describe('sets isLineEdited', () => {
      [
        {
          key: 'discount',
          expected: true,
        },
        {
          key: 'amount',
          expected: true,
        },
        {
          key: 'units',
          expected: true,
        },
        {
          key: 'unitPrice',
          expected: true,
        },
        {
          key: 'accountId',
          expected: false,
        },
        {
          key: 'taxCodeId',
          expected: false,
        },
      ].forEach((test) => {
        it(`should set isLineEdited to ${test.expected} given the key ${test.key}`, () => {
          const state = {
            bill: {
              lines: [],
            },
            isLineEdited: false,
          };

          const action = {
            intent: UPDATE_BILL_LINE,
            key: test.key,
            value: '',
          };

          const actual = billReducer(state, action);

          expect(actual.isLineEdited).toEqual(test.expected);
        });
      });
    });
  });

  describe('FORMAT_BILL_LINE', () => {
    it('sets units at index to 1 when empty', () => {
      const state = {
        bill: {
          lines: [
            {},
            {
              units: '',
            },
          ],
        },
      };

      const action = {
        intent: FORMAT_BILL_LINE,
        index: 1,
        key: 'units',
      };

      const actual = billReducer(state, action);

      expect(actual.bill.lines[1].units).toEqual('1');
    });
  });

  describe('FORMAT_AMOUNT_PAID', () => {
    const state = {
      bill: {
        amountPaid: '0',
      },
    };

    const action = {
      intent: FORMAT_AMOUNT_PAID,
    };

    const actual = billReducer(state, action);

    expect(actual).toEqual({
      bill: {
        amountPaid: '0',
        displayAmountPaid: '0.00',
      },
    });
  });

  describe('LOAD_ACCOUNT_AFTER_CREATE', () => {
    it('merges new account payload into state', () => {
      const state = {
        accountOptions: [{ thisIsAnAccount: true }],
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        thisIsAnAccount: false,
      };

      const actual = billReducer(state, action);

      expect(actual).toEqual({
        accountOptions: [{ thisIsAnAccount: false }, { thisIsAnAccount: true }],
        isPageEdited: true,
      });
    });
  });

  describe('PREFILL_NEW_BILL_FROM_IN_TRAY', () => {
    const document = {
      thumbnailUrl: 'https://assets.digital.myob.com/images/favicons/apple-touch-icon.png',
      uploadedDate: '04/04/2019',
    };

    const response = {
      layout: 'service',
      bill: {
        supplierId: '2',
        supplierInvoiceNumber: '1234',
        issueDate: '2018-11-02',
        isTaxInclusive: true,
      },
      lines: [{
        id: '',
        amount: '500.77',
        displayAmount: '500.77',
      }],
      document,
    };

    const buildExpected = ({ layout, bill, prefillStatus }) => ({
      layout,
      bill,
      inTrayDocument: document,
      newLine: {
        id: '',
      },
      prefillStatus,
      isPageEdited: true,
      showPrefillInfo: true,
    });

    const defaultLinePrefillStatus = {
      description: false,
      amount: false,
      discount: false,
      units: false,
      unitPrice: false,
    };

    it('prefills bill from an OCR document', () => {
      const state = {
        layout: 'itemAndService',
        bill: { lines: [] },
        newLine: {
          id: '',
        },
        isPageEdited: false,
        inTrayDocument: undefined,
      };

      const action = {
        intent: PREFILL_BILL_FROM_IN_TRAY,
        response,
      };

      const actual = billReducer(state, action);

      expect(actual).toEqual(buildExpected({
        layout: 'service',
        bill: {
          supplierId: '2',
          supplierInvoiceNumber: '1234',
          issueDate: '2018-11-02',
          isTaxInclusive: true,
          lines: [{
            id: '',
            amount: '500.77',
            displayAmount: '500.77',
            prefillStatus: {
              ...defaultLinePrefillStatus,
              amount: true,
            },
          }],
        },
        prefillStatus: {
          supplierId: true,
          supplierInvoiceNumber: true,
          issueDate: true,
        },
      }));
    });

    it('prefills bill from a supplier feed', () => {
      const state = {
        layout: 'service',
        bill: { lines: [] },
        newLine: {
          id: '',
        },
        isPageEdited: false,
        inTrayDocument: undefined,
      };

      const action = {
        intent: PREFILL_BILL_FROM_IN_TRAY,
        response: {
          ...response,
          layout: 'itemAndService',
          lines: [
            {
              id: '',
              description: 'Hello',
              amount: '20.44',
              displayAmount: '20.44',
              unitPrice: '21.44',
              discount: '0',
              displayDiscount: '0.00',
            },
          ],
        },
      };

      const actual = billReducer(state, action);

      expect(actual).toEqual(buildExpected({
        layout: 'itemAndService',
        bill: {
          supplierId: '2',
          supplierInvoiceNumber: '1234',
          issueDate: '2018-11-02',
          isTaxInclusive: true,
          lines: [{
            id: '',
            description: 'Hello',
            amount: '20.44',
            displayAmount: '20.44',
            unitPrice: '21.44',
            discount: '0',
            displayDiscount: '0.00',
            prefillStatus: {
              ...defaultLinePrefillStatus,
              description: true,
              amount: true,
              discount: true,
              unitPrice: true,
            },
          }],
        },
        prefillStatus: {
          supplierId: true,
          supplierInvoiceNumber: true,
          issueDate: true,
        },
      }));
    });

    it('does not prefill bill when there is user input data, except for issue date', () => {
      const state = {
        layout: 'itemAndService',
        bill: {
          supplierId: '1',
          supplierInvoiceNumber: '123',
          issueDate: '2018-10-02',
          isTaxInclusive: false,
          lines: [
            { id: '1' },
          ],
        },
        newLine: {
          id: '',
        },
        isPageEdited: false,
        inTrayDocument: undefined,
      };

      const action = {
        intent: PREFILL_BILL_FROM_IN_TRAY,
        response,
      };

      const actual = billReducer(state, action);

      expect(actual).toEqual(buildExpected({
        layout: 'itemAndService',
        bill: {
          supplierId: '1',
          supplierInvoiceNumber: '123',
          issueDate: '2018-11-02',
          isTaxInclusive: false,
          lines: [
            { id: '1' },
          ],
        },
        prefillStatus: {
          supplierId: false,
          supplierInvoiceNumber: false,
          issueDate: true,
        },
      }));
    });

    it('does not prefill bill lines when there is no in tray data returned', () => {
      const state = {
        layout: 'service',
        bill: {
          supplierId: '2',
          supplierInvoiceNumber: '123',
          issueDate: '2018-10-02',
          isTaxInclusive: false,
          lines: [],
        },
        newLine: {
          id: '',
        },
        isPageEdited: false,
        inTrayDocument: undefined,
      };

      const action = {
        intent: PREFILL_BILL_FROM_IN_TRAY,
        response: {
          layout: 'itemAndService',
          bill: {
            supplierId: '',
            supplierInvoiceNumber: '',
            issueDate: '',
          },
          lines: [],
          document,
        },
      };

      const actual = billReducer(state, action);

      expect(actual).toEqual(buildExpected({
        layout: 'service',
        bill: {
          supplierId: '2',
          supplierInvoiceNumber: '123',
          issueDate: '2018-10-02',
          isTaxInclusive: false,
          lines: [],
        },
        prefillStatus: {
          supplierId: false,
          supplierInvoiceNumber: false,
          issueDate: false,
        },
      }));
    });
  });

  describe('SET_UPGRADE_MODAL_SHOWING', () => {
    const state = {
      subscription: {
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

      const actual = billReducer(state, action);

      expect(actual.subscription.isUpgradeModalShowing).toBeFalsy();
      expect(actual.subscription.monthlyLimit).toEqual(monthlyLimit);
    });

    it('uses current state monthlyLimit if no monthlyLimit is provided in action', () => {
      const action = {
        intent: SET_UPGRADE_MODAL_SHOWING,
        isUpgradeModalShowing: false,
      };

      const expectedMonthlyLimit = {
        hasHitLimit: false,
      };

      const actual = billReducer(state, action);

      expect(actual.subscription.monthlyLimit).toEqual(expectedMonthlyLimit);
    });
  });
});
