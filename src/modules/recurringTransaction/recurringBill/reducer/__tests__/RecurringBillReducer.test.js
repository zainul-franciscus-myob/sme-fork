import {
  ADD_BILL_LINE,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_RECURRING_BILL,
  LOAD_SUPPLIER,
  REMOVE_BILL_LINE,
  UPDATE_BILL_HEADER_OPTIONS,
  UPDATE_BILL_LAYOUT,
  UPDATE_BILL_LINE,
} from '../../RecurringBillIntents';
import LineTaxTypes from '../../types/LineTaxTypes';
import PurchaseLayout from '../../types/PurchaseLayout';
import PurchaseLineType from '../../types/PurchaseLineType';
import recurringBillReducer from '../RecurringBillReducer';

describe('billReducer', () => {
  describe('LOAD_RECURRING_BILL', () => {
    describe('line type', () => {
      it.each([
        [PurchaseLineType.SERVICE, '10'],
        [PurchaseLineType.ITEM, '10'],
        [PurchaseLineType.HEADER, undefined],
        [PurchaseLineType.SUB_TOTAL, '10'],
      ])('calculate amount for %s line', (type, expected) => {
        const state = {};
        const action = {
          intent: LOAD_RECURRING_BILL,
          response: {
            bill: {
              amountPaid: '10',
              isTaxInclusive: true,
              lines: [{ type, taxExclusiveAmount: '9.99', taxAmount: '0.01' }],
            },
          },
        };

        const actual = recurringBillReducer(state, action);

        expect(actual.bill.lines[0].amount).toEqual(expected);
      });
    });
  });

  describe('UPDATE_BILL_LAYOUT', () => {
    it('updates the bill table layout with the given value', () => {
      const state = {
        bill: {
          layout: 'something',
          lines: [],
        },
      };

      const action = {
        intent: UPDATE_BILL_LAYOUT,
        value: 'something else',
      };

      const actual = recurringBillReducer(state, action);

      expect(actual.bill.layout).toEqual('something else');
    });

    it('removes all item lines if transitioning to a service layout and clears line id', () => {
      const state = {
        bill: {
          layout: PurchaseLayout.ITEM_AND_SERVICE,
          lines: [
            { type: PurchaseLineType.SERVICE, id: 'something' },
            { type: PurchaseLineType.ITEM_AND_SERVICE, id: 'somethingElse' },
          ],
        },
      };

      const action = {
        intent: UPDATE_BILL_LAYOUT,
        value: PurchaseLayout.SERVICE,
      };

      const actual = recurringBillReducer(state, action);

      const expected = [{ type: PurchaseLineType.SERVICE, id: '' }];

      expect(actual.bill.lines).toEqual(expected);
    });

    it('keeps service lines when switching from service to itemAndService layout and clears line id', () => {
      const state = {
        bill: {
          layout: PurchaseLayout.SERVICE,
          lines: [{ type: PurchaseLineType.SERVICE, id: 'a' }],
        },
      };

      const action = {
        intent: UPDATE_BILL_LAYOUT,
        value: PurchaseLayout.ITEM_AND_SERVICE,
      };

      const actual = recurringBillReducer(state, action);

      const expected = [{ type: PurchaseLineType.SERVICE, id: '' }];

      expect(actual.bill.lines).toEqual(expected);
    });
  });

  describe('UPDATE_BILL_HEADER_OPTIONS', () => {
    it('updates key with given value', () => {
      const state = {
        bill: {
          a: '1',
          lines: [],
        },
      };

      const action = {
        intent: UPDATE_BILL_HEADER_OPTIONS,
        key: 'a',
        value: '2',
      };

      const actual = recurringBillReducer(state, action);

      expect(actual.bill).toEqual({
        a: '2',
        lines: [],
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
        intent: UPDATE_BILL_HEADER_OPTIONS,
        key: 'a',
        value: '2',
      };

      const actual = recurringBillReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });

    ['DayOfMonthAfterEOM', 'OnADayOfTheMonth'].forEach((expirationTerm) => {
      it(`sets expirationDays to 1, when is currently 0 and expirationTerms is changed to ${expirationTerm}`, () => {
        const state = {
          bill: {
            expirationDays: '0',
            expirationTerm: 'InAGivenNumberOfDays',
            lines: [],
          },
        };

        const action = {
          intent: UPDATE_BILL_HEADER_OPTIONS,
          key: 'expirationTerm',
          value: expirationTerm,
        };

        const actual = recurringBillReducer(state, action);

        expect(actual.bill).toEqual({
          expirationDays: '1',
          expirationTerm,
          lines: [],
        });
      });
    });
  });

  describe('LOAD_SUPPLIER', () => {
    const bill = {
      lines: [
        { accountId: '2', taxCodeId: '2', amount: '10.00' },
        { accountId: '3', taxCodeId: '3', amount: '20.00' },
      ],
    };

    const action = {
      intent: LOAD_SUPPLIER,
      response: {
        supplierAddress: 'addr',
      },
    };

    it('updates supplierAddress', () => {
      const state = {
        recurringTransactionId: 'new',
        bill,
        accountOptions: [],
        taxCodes: [],
      };

      const actual = recurringBillReducer(state, action);

      expect(actual.bill.supplierAddress).toEqual('addr');
    });
  });

  describe('ADD_BILL_LINE', () => {
    const state = {
      bill: {
        lines: [{}, {}],
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
      const actual = recurringBillReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });

    it('adds a new line', () => {
      const actual = recurringBillReducer(state, action);

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
      const actual = recurringBillReducer(state, action);

      expect(actual.bill.lines).toEqual([
        {
          id: '1',
        },
      ]);
    });

    it('sets isPageEdited to true', () => {
      const actual = recurringBillReducer(state, action);

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
        intent: UPDATE_BILL_LINE,
        index: 1,
        key: 'hello',
        value: 3,
      };

      const actual = recurringBillReducer(state, action);

      expect(actual.bill.lines[1].hello).toEqual(3);
    });

    it('updates both discount when key is discount', () => {
      const state = {
        bill: {
          lines: [{}],
        },
      };

      const action = {
        intent: UPDATE_BILL_LINE,
        index: 0,
        key: 'discount',
        value: '1234',
      };

      const actual = recurringBillReducer(state, action);

      expect(actual.bill.lines[0].discount).toEqual('1234');
    });

    it('updates both amount when key is amount', () => {
      const state = {
        bill: {
          lines: [{}],
        },
      };

      const action = {
        intent: UPDATE_BILL_LINE,
        index: 0,
        key: 'amount',
        value: '1234',
      };

      const actual = recurringBillReducer(state, action);

      expect(actual.bill.lines[0].amount).toEqual('1234');
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

      const actual = recurringBillReducer(state, action);

      expect(actual.bill.lines[0].accountId).toEqual('5');
      expect(actual.bill.lines[0].taxCodeId).toEqual('10');
    });

    it('updates type to item when key is itemId', () => {
      const state = {
        bill: {
          lines: [{}],
        },
      };

      const action = {
        intent: UPDATE_BILL_LINE,
        index: 0,
        key: 'itemId',
        value: '1',
      };

      const actual = recurringBillReducer(state, action);

      expect(actual.bill.lines[0].itemId).toEqual('1');
      expect(actual.bill.lines[0].type).toEqual('item');
    });

    it('clears line id if the line type has been changed', () => {
      const state = {
        bill: {
          lines: [{ type: PurchaseLineType.SERVICE, id: '1' }],
        },
      };

      const action = {
        intent: UPDATE_BILL_LINE,
        index: 0,
        key: 'itemId',
        value: '1',
      };

      const actual = recurringBillReducer(state, action);

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
          lines: [{}],
        },
      };
      const actual = recurringBillReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });

    it('should set the correct lineSubTypeId for an item line', () => {
      const state = {
        bill: {
          lines: [
            {
              type: PurchaseLineType.ITEM,
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

      const actual = recurringBillReducer(state, action);

      expect(actual.bill.lines[0].lineSubTypeId).toEqual(
        LineTaxTypes.DEFAULT_ITEM_LINE_SUB_TYPE_ID
      );
    });

    it('should set the correct lineSubTypeId for a service line', () => {
      const state = {
        bill: {
          lines: [
            {
              type: PurchaseLineType.SERVICE,
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

      const actual = recurringBillReducer(state, action);

      expect(actual.bill.lines[0].lineSubTypeId).toEqual(
        LineTaxTypes.DEFAULT_SERVICE_LINE_SUB_TYPE_ID
      );
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
          key: 'jobId',
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

          const actual = recurringBillReducer(state, action);

          expect(actual.isLineEdited).toEqual(test.expected);
        });
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

      const actual = recurringBillReducer(state, action);

      expect(actual).toEqual({
        accountOptions: [{ thisIsAnAccount: false }, { thisIsAnAccount: true }],
        isPageEdited: true,
      });
    });
  });
});
