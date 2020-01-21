import {
  ADD_BILL_SERVICE_LINE,
  FORMAT_AMOUNT_PAID,
  FORMAT_BILL_SERVICE_LINES,
  ITEM_CALCULATE,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_BILL,
  LOAD_ITEM_OPTION,
  PREFILL_BILL_FROM_IN_TRAY,
  REMOVE_BILL_LINE,
  SERVICE_CALCULATE,
  SET_ACCOUNT_LOADING_STATE,
  UPDATE_BILL_ITEM_LINE,
  UPDATE_BILL_OPTION,
  UPDATE_BILL_SERVICE_LINE,
} from '../BillIntents';
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

    describe('when monthly limit is not provided', () => {
      const action = {
        intent: LOAD_BILL,
        response: {
          bill: {
            issueDate: '2019-02-03',
          },
        },
      };
      it('does not show the upgrade modal', () => {
        const actual = billReducer({}, action);

        expect(actual.monthlyLimit).toBeUndefined();
        expect(actual.isUpgradeModalShowing).toBe(false);
      });
    });

    describe('when monthly limit is provided and the limit has not been hit', () => {
      const action = {
        intent: LOAD_BILL,
        response: {
          bill: {
            issueDate: '2019-02-03',
          },
          monthlyLimit: {
            used: 4,
            limit: 5,
            month: 'April 1994',
          },
        },
      };
      it('does not show the upgrade modal', () => {
        const actual = billReducer({}, action);

        expect(actual.monthlyLimit).toBeDefined();
        expect(actual.isUpgradeModalShowing).toBe(false);
      });
    });

    describe('when monthly limit is provided and the limit has been hit', () => {
      const action = {
        intent: LOAD_BILL,
        response: {
          bill: {
            issueDate: '2019-02-03',
          },
          monthlyLimit: {
            used: 5,
            limit: 5,
            month: 'April 1994',
          },
        },
      };
      it('shows the upgrade modal', () => {
        const actual = billReducer({}, action);

        expect(actual.monthlyLimit).toBeDefined();
        expect(actual.isUpgradeModalShowing).toBe(true);
      });
    });
  });

  describe('UPDATE_BILL_ITEM_LINE', () => {
    it('updates key on line at index', () => {
      const action = {
        intent: UPDATE_BILL_ITEM_LINE,
        index: 1,
        key: 'description',
        value: 'hello',
      };

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

      const actual = billReducer(state, action);

      expect(actual.bill.lines[1]).toEqual(
        {
          id: '2',
          description: 'hello',
        },
      );
    });

    it('sets isPageEdited to true', () => {
      const action = {
        intent: UPDATE_BILL_ITEM_LINE,
        index: 0,
        key: 'description',
        value: 'hello',
      };

      const state = {
        bill: {
          lines: [
            {
              id: '2',
            },
          ],
        },
      };

      const actual = billReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });

    it('should update displayDiscount when discount is changed', () => {
      const state = {
        bill: {
          lines: [
            {},
          ],
        },
      };

      const action = {
        intent: UPDATE_BILL_ITEM_LINE,
        index: 0,
        key: 'discount',
        value: '1234',
      };

      const actual = billReducer(state, action);

      expect(actual.bill.lines[0].discount).toEqual('1234');
      expect(actual.bill.lines[0].displayDiscount).toEqual('1234');
    });

    it('should update displayAmount when amount is changed', () => {
      const state = {
        bill: {
          lines: [
            {},
          ],
        },
      };

      const action = {
        intent: UPDATE_BILL_ITEM_LINE,
        index: 0,
        key: 'amount',
        value: '1234',
      };

      const actual = billReducer(state, action);

      expect(actual.bill.lines[0].amount).toEqual('1234');
      expect(actual.bill.lines[0].displayAmount).toEqual('1234');
    });
  });

  describe('ITEM_CALCULATE', () => {
    it('merges item calculate response into the state', () => {
      const state = {
        bill: {
          lines: [],
          isTaxInclusive: false,
        },
        totals: {},
      };

      const action = {
        intent: ITEM_CALCULATE,
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

  describe('UPDATE_BILL_OPTION', () => {
    it('updates key with given value', () => {
      const state = {
        bill: {
          a: '1',
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
        bill: {},
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

    it('updates prefill status when corresponding field changed', () => {
      const state = {
        bill: {},
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
        bill: {},
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

  describe('ADD_BILL_SERVICE_LINE', () => {
    const state = {
      newLine: {
        id: '',
        description: '',
        accountId: '',
        amount: '',
        taxCodeId: '',
      },
      bill: {
        lines: [],
      },
      accountOptions: [
        {
          id: '5',
          taxCodeId: '10',
        },
      ],
    };

    const action = {
      intent: ADD_BILL_SERVICE_LINE,
      accountId: '5',
    };

    it('adds a line to the bill', () => {
      const actual = billReducer(state, action);

      expect(actual.bill.lines).toEqual([
        {
          id: '',
          taxCodeId: '10',
          description: '',
          accountId: '5',
          amount: '',
        },
      ]);
    });

    it('sets isPageEdited to true', () => {
      const actual = billReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
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

  describe('UPDATE_BILL_SERVICE_LINE', () => {
    it('updates key on line at index', () => {
      const action = {
        intent: UPDATE_BILL_SERVICE_LINE,
        index: 1,
        key: 'description',
        value: 'abc',
      };

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

      const actual = billReducer(state, action);

      expect(actual.bill.lines[1]).toEqual(
        {
          id: '2',
          description: 'abc',
        },
      );
    });

    it('updates taxCodeId key', () => {
      const action = {
        intent: UPDATE_BILL_SERVICE_LINE,
        index: 0,
        key: 'taxCodeId',
        value: '2',
      };

      const state = {
        bill: {
          lines: [
            {
              id: '2',
              taxCodeId: '1',
            },
          ],
        },
      };

      const actual = billReducer(state, action);

      expect(actual.bill.lines[0]).toEqual(
        {
          id: '2',
          taxCodeId: '2',
        },
      );
    });

    it('also updates taxCodeId when accountId is updated', () => {
      const action = {
        intent: UPDATE_BILL_SERVICE_LINE,
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

      expect(actual.bill.lines[0]).toEqual(
        {
          id: '2',
          accountId: '5',
          taxCodeId: '10',
        },
      );
    });

    it('sets isPageEdited to true', () => {
      const action = {
        intent: UPDATE_BILL_SERVICE_LINE,
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

    it('should update displayAmount when amount is changed', () => {
      const state = {
        bill: {
          lines: [
            {},
          ],
        },
      };

      const action = {
        intent: UPDATE_BILL_SERVICE_LINE,
        index: 0,
        key: 'amount',
        value: '1234',
      };

      const actual = billReducer(state, action);

      expect(actual.bill.lines[0].amount).toEqual('1234');
      expect(actual.bill.lines[0].displayAmount).toEqual('1234');
    });
  });

  describe('FORMAT_BILL_SERVICE_LINES', () => {
    it('formats all bill lines', () => {
      const state = {
        bill: {
          lines: [
            {
              amount: '1',
            },
            {
              amount: '2',
            },
          ],
        },
      };
      const action = {
        intent: FORMAT_BILL_SERVICE_LINES,
      };

      const actual = billReducer(state, action);

      expect(actual.bill.lines).toEqual([
        { amount: '1', displayAmount: '1.00' },
        { amount: '2', displayAmount: '2.00' },
      ]);
    });
  });

  describe('CALCULATE_TOTALS', () => {
    it('merges totals response into store', () => {
      const state = {
        totals: {
          subTotal: '0.00',
          totalTax: '0.00',
          totalAmount: '0.00',
          amountDue: '0.00',
        },
      };

      const action = {
        intent: SERVICE_CALCULATE,
        response: {
          totals: {
            subTotal: '1.00',
            totalTax: '2.00',
            totalAmount: '3.00',
            amountDue: '4.00',
          },
        },
      };

      const actual = billReducer(state, action);

      expect(actual).toEqual({
        totals: {
          subTotal: '1.00',
          totalTax: '2.00',
          totalAmount: '3.00',
          amountDue: '4.00',
        },
      });
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
  describe('SET_ACCOUNT_LOADING_STATE', () => {
    it('sets state to true', () => {
      const state = {
        isAccountLoading: false,
      };

      const action = {
        intent: SET_ACCOUNT_LOADING_STATE,
        isAccountLoading: true,
      };

      const actual = billReducer(state, action);

      expect(actual).toEqual({
        isAccountLoading: true,
      });
    });
    it('sets state to false', () => {
      const state = {
        isAccountLoading: true,
      };

      const action = {
        intent: SET_ACCOUNT_LOADING_STATE,
        isAccountLoading: false,
      };

      const actual = billReducer(state, action);

      expect(actual).toEqual({
        isAccountLoading: false,
      });
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
      bill: {
        supplierId: '2',
        supplierInvoiceNumber: '1234',
        issueDate: '2018-11-02',
        isTaxInclusive: true,
      },
      newLine: {
        amount: '500.77',
        displayAmount: '500.77',
      },
      document,
    };

    const buildExpected = ({ bill, prefillStatus }) => ({
      bill,
      inTrayDocument: document,
      newLine: {
        id: '',
      },
      prefillStatus,
      isPageEdited: true,
      showPrefillInfo: true,
    });

    it('prefills bill', () => {
      const state = {
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
        bill: {
          supplierId: '2',
          supplierInvoiceNumber: '1234',
          issueDate: '2018-11-02',
          isTaxInclusive: true,
          lines: [{
            id: '',
            amount: '500.77',
            displayAmount: '500.77',
          }],
        },
        prefillStatus: {
          supplierId: true,
          supplierInvoiceNumber: true,
          issueDate: true,
        },
      }));
    });

    it('does not prefill bill when there is user input data except for issue date', () => {
      const state = {
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

    it('does not prefill bill when no ocr data available', () => {
      const state = {
        bill: {
          issueDate: '2018-11-02',
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
          bill: {
            supplierId: '',
            supplierInvoiceNumber: '',
            issueDate: '',
            isTaxInclusive: true,
          },
          newLine: {
            amount: '',
            displayAmount: '',
          },
          document,
        },
      };

      const actual = billReducer(state, action);

      expect(actual).toEqual(buildExpected({
        bill: {
          supplierId: '',
          supplierInvoiceNumber: '',
          issueDate: '2018-11-02',
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
});
