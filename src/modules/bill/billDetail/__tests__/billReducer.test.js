import {
  ADD_BILL_LINE,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_BILL,
  LOAD_JOB_AFTER_CREATE,
  LOAD_SUPPLIER_DETAIL,
  PREFILL_BILL_FROM_IN_TRAY,
  RELOAD_BILL,
  REMOVE_BILL_LINE,
  SET_UPGRADE_MODAL_SHOWING,
  UPDATE_BILL_LINE,
  UPDATE_BILL_OPTION,
  UPDATE_LAYOUT,
} from '../BillIntents';
import BillLayout from '../types/BillLayout';
import BillLineType from '../types/BillLineType';
import LineTaxTypes from '../types/LineTaxTypes';
import LoadingState from '../../../../components/PageView/LoadingState';
import billReducer from '../reducer/billReducer';

describe('billReducer', () => {
  describe('LOAD_BILL', () => {
    it('sets feature toggle when bill is being reloaded', () => {
      const state = {
        today: new Date(2020, 0, 1),
        billId: 'new',
        isBillJobColumnEnabled: true,
      };

      const action = {
        intent: RELOAD_BILL,
        response: {
          bill: {
            lines: [],
          },
        },
      };

      const actual = billReducer(state, action);

      expect(actual.isBillJobColumnEnabled).toEqual(true);
      expect(actual.loadingState).toEqual(LoadingState.LOADING_SUCCESS);
    });

    it('sets issueDate to today when is creating', () => {
      const state = {
        today: new Date(2020, 0, 1),
        billId: 'new',
      };

      const action = {
        intent: LOAD_BILL,
        response: {
          bill: {
            lines: [],
          },
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
            lines: [],
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
            lines: [],
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

    describe('line type', () => {
      it.each([
        [BillLineType.SERVICE, '10'],
        [BillLineType.ITEM, '10'],
        [BillLineType.HEADER, undefined],
        [BillLineType.SUB_TOTAL, '10'],
      ])('calculate amount for %s line', (type, expected) => {
        const state = {};
        const action = {
          intent: LOAD_BILL,
          response: {
            bill: {
              amountPaid: '10',
              isTaxInclusive: true,
              lines: [{ type, taxExclusiveAmount: '9.99', taxAmount: '0.01' }],
            },
          },
        };

        const actual = billReducer(state, action);

        expect(actual.bill.lines[0].amount).toEqual(expected);
      });
    });
  });

  describe('UPDATE_LAYOUT', () => {
    it('updates the bill table layout with the given value', () => {
      const state = {
        bill: {
          layout: 'something',
          lines: [],
        },
      };

      const action = {
        intent: UPDATE_LAYOUT,
        value: 'something else',
      };

      const actual = billReducer(state, action);

      expect(actual.bill.layout).toEqual('something else');
    });

    it('removes all item lines if transitioning to a service layout and clears line id', () => {
      const state = {
        bill: {
          layout: BillLayout.ITEM_AND_SERVICE,
          lines: [
            { type: BillLineType.SERVICE, id: 'something' },
            { type: BillLineType.ITEM_AND_SERVICE, id: 'somethingElse' },
          ],
        },
      };

      const action = { intent: UPDATE_LAYOUT, value: BillLayout.SERVICE };

      const actual = billReducer(state, action);

      const expected = [{ type: BillLineType.SERVICE, id: '' }];

      expect(actual.bill.lines).toEqual(expected);
    });

    it('keeps service lines when switching from service to itemAndService layout and clears line id', () => {
      const state = {
        bill: {
          layout: BillLayout.SERVICE,
          lines: [{ type: BillLineType.SERVICE, id: 'a' }],
        },
      };

      const action = {
        intent: UPDATE_LAYOUT,
        value: BillLayout.ITEM_AND_SERVICE,
      };

      const actual = billReducer(state, action);

      const expected = [{ type: BillLineType.SERVICE, id: '' }];

      expect(actual.bill.lines).toEqual(expected);
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
        intent: UPDATE_BILL_OPTION,
        key: 'a',
        value: '2',
      };

      const actual = billReducer(state, action);

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
          intent: UPDATE_BILL_OPTION,
          key: 'expirationTerm',
          value: expirationTerm,
        };

        const actual = billReducer(state, action);

        expect(actual.bill).toEqual({
          expirationDays: '1',
          expirationTerm,
          lines: [],
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
          taxCodes: [{ id: '1' }, { id: '2' }, { id: '3' }],
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

      it('does not update lines if key was not expenseAccountId', () => {
        const state = {
          bill: {
            expenseAccountId: '2',
            lines: [
              { accountId: '2', taxCodeId: '2', amount: '10.00' },
              { accountId: '3', taxCodeId: '3', amount: '20.00' },
            ],
          },
        };

        const action = {
          intent: UPDATE_BILL_OPTION,
          key: 'someOtherKey',
          value: '1',
        };
        const actual = billReducer(state, action);

        const expectedLines = [
          { accountId: '2', taxCodeId: '2', amount: '10.00' },
          { accountId: '3', taxCodeId: '3', amount: '20.00' },
        ];

        expect(actual.bill.lines).toEqual(expectedLines);
      });
    });
  });

  describe('LOAD_SUPPLIER_DETAIL', () => {
    const bill = {
      expenseAccountId: '2',
      lines: [
        { accountId: '2', taxCodeId: '2', amount: '10.00' },
        { accountId: '3', taxCodeId: '3', amount: '20.00' },
      ],
    };

    const action = {
      intent: LOAD_SUPPLIER_DETAIL,
      response: {
        supplierAddress: 'addr',
        expenseAccountId: '1',
        isReportable: true,
      },
    };

    it('updates isReportable', () => {
      const state = {
        billId: 'new',
        bill,
        accountOptions: [],
        taxCodes: [],
      };

      const actual = billReducer(state, action);

      expect(actual.bill.isReportable).toBeTruthy();
    });

    it('updates expenseAccountId and all lines with the accountId if is creating new bill from intray', () => {
      const state = {
        billId: 'new',
        source: 'inTray',
        bill,
        accountOptions: [
          { id: '1', taxCodeId: '1' },
          { id: '2', taxCodeId: '2' },
          { id: '3', taxCodeId: '3' },
        ],
        taxCodes: [{ id: '1' }, { id: '2' }, { id: '3' }],
      };

      const actual = billReducer(state, action);
      const expectedLines = [
        { accountId: '1', taxCodeId: '1', amount: '10.00' },
        { accountId: '1', taxCodeId: '1', amount: '20.00' },
      ];

      expect(actual.bill.lines).toEqual(expectedLines);
      expect(actual.bill.expenseAccountId).toEqual('1');
    });

    it('does not update expenseAccountId or lines with the accountId if not is creating new bill from intray', () => {
      const state = {
        billId: 'new',
        bill,
      };

      const actual = billReducer(state, action);
      const expectedLines = bill.lines;

      expect(actual.bill.lines).toEqual(expectedLines);
      expect(actual.bill.expenseAccountId).toEqual('2');
    });

    it('does not update expenseAccountId or lines with the accountId if not is creating new bill', () => {
      const state = {
        billId: 'id',
        bill,
      };

      const actual = billReducer(state, action);
      const expectedLines = bill.lines;

      expect(actual.bill.lines).toEqual(expectedLines);
      expect(actual.bill.expenseAccountId).toEqual('2');
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
        intent: UPDATE_BILL_LINE,
        index: 1,
        key: 'hello',
        value: 3,
      };

      const actual = billReducer(state, action);

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

      const actual = billReducer(state, action);

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

      const actual = billReducer(state, action);

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

      const actual = billReducer(state, action);

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

      const actual = billReducer(state, action);

      expect(actual.bill.lines[0].itemId).toEqual('1');
      expect(actual.bill.lines[0].type).toEqual('item');
    });

    it('clears line id if the line type has been changed', () => {
      const state = {
        bill: {
          lines: [{ type: BillLineType.SERVICE, id: '1' }],
        },
      };

      const action = {
        intent: UPDATE_BILL_LINE,
        index: 0,
        key: 'itemId',
        value: '1',
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
          lines: [{}],
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
              type: BillLineType.ITEM,
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
        LineTaxTypes.DEFAULT_ITEM_LINE_SUB_TYPE_ID
      );
    });

    it('should set the correct lineSubTypeId for a service line', () => {
      const state = {
        bill: {
          lines: [
            {
              type: BillLineType.SERVICE,
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
        LineTaxTypes.DEFAULT_SERVICE_LINE_SUB_TYPE_ID
      );
    });

    describe('updates line prefill status', () => {
      [{ key: 'itemId' }, { key: 'accountId' }, { key: 'taxCodeId' }].forEach(
        (test) => {
          it(`should not update prefillStatus if line has been prefilled and ${test.key} is updated`, () => {
            const state = {
              bill: {
                lines: [
                  {
                    amount: '23',
                    prefillStatus: {
                      amount: true,
                    },
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

            const action = {
              intent: UPDATE_BILL_LINE,
              index: 0,
              key: test.key,
              value: '',
            };

            const actual = billReducer(state, action);

            expect(actual.bill.lines[0].prefillStatus).toEqual({
              amount: true,
            });
          });
        }
      );

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
              lines: [
                {
                  amount: '23',
                  prefillStatus: {
                    amount: true,
                  },
                },
              ],
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
            lines: [
              {
                amount: '',
              },
            ],
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

    describe('job options on lines', () => {
      it('adds newly created job to job list for the new line', () => {
        const state = {
          bill: {
            lines: [
              {
                lineJobOptions: [
                  {
                    id: '1',
                    isActive: true,
                  },
                ],
              },
            ],
          },
          newLine: {
            lineJobOptions: [
              {
                id: '1',
                isActive: true,
              },
            ],
          },
        };
        const action = {
          intent: LOAD_JOB_AFTER_CREATE,
          id: '3',
          jobName: 'qajob',
          jobNumber: '123',
        };
        const actual = billReducer(state, action);

        expect(actual.newLine.lineJobOptions).toEqual([
          {
            id: '3',
            jobName: 'qajob',
            jobNumber: '123',
          },
          {
            id: '1',
            isActive: true,
          },
        ]);
      });

      it('show newly created job through quick add after creation', () => {
        const state = {
          bill: {
            lines: [
              {
                lineJobOptions: [
                  {
                    id: '1',
                    isActive: true,
                  },
                  {
                    id: '2',
                    isActive: false,
                  },
                ],
              },
            ],
          },
          newLine: {
            lineJobOptions: [],
          },
        };
        const action = {
          intent: LOAD_JOB_AFTER_CREATE,
          id: '3',
          jobName: 'qajob',
          jobNumber: '123',
        };

        const actual = billReducer(state, action);
        actual.bill.lines.forEach((line) => {
          expect(line.lineJobOptions).toEqual([
            {
              id: '3',
              jobName: 'qajob',
              jobNumber: '123',
            },
            {
              id: '1',
              isActive: true,
            },
            {
              id: '2',
              isActive: false,
            },
          ]);
        });
      });

      it('shows both active and assigned inactive job options against each line', () => {
        const state = {};
        const action = {
          intent: LOAD_BILL,
          response: {
            bill: {
              lines: [
                {
                  jobId: '2',
                },
              ],
            },
            jobOptions: [
              {
                id: '1',
                isActive: true,
              },
              {
                id: '2',
                isActive: false,
              },
              {
                id: '3',
                isActive: false,
              },
            ],
          },
        };
        const actual = billReducer(state, action);

        actual.bill.lines.forEach((line) => {
          expect(line.lineJobOptions).toEqual([
            {
              id: '1',
              isActive: true,
            },
            {
              id: '2',
              isActive: false,
            },
          ]);
        });
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

          const actual = billReducer(state, action);

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

      const actual = billReducer(state, action);

      expect(actual).toEqual({
        accountOptions: [{ thisIsAnAccount: false }, { thisIsAnAccount: true }],
        isPageEdited: true,
      });
    });
  });

  describe('PREFILL_NEW_BILL_FROM_IN_TRAY', () => {
    const document = {
      thumbnailUrl:
        'https://assets.digital.myob.com/images/favicons/apple-touch-icon.png',
      uploadedDate: '04/04/2019',
    };

    const response = {
      bill: {
        supplierId: '2',
        supplierInvoiceNumber: '1234',
        layout: 'service',
        issueDate: '2018-11-02',
        isTaxInclusive: true,
        note: 'Some notes',
        isReportable: true,
      },
      lines: [
        {
          id: '',
          amount: '500.77',
        },
      ],
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

    const defaultLinePrefillStatus = {
      description: false,
      amount: false,
      discount: false,
      units: false,
      unitPrice: false,
    };

    it('prefills bill from an OCR document', () => {
      const state = {
        bill: {
          layout: 'itemAndService',
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
        response,
      };

      const actual = billReducer(state, action);

      expect(actual).toEqual(
        buildExpected({
          bill: {
            supplierId: '2',
            supplierInvoiceNumber: '1234',
            layout: 'service',
            issueDate: '2018-11-02',
            isTaxInclusive: true,
            isReportable: true,
            note: 'Some notes',
            lines: [
              {
                id: '',
                amount: '500.77',
                prefillStatus: {
                  ...defaultLinePrefillStatus,
                  amount: true,
                },
              },
            ],
          },
          prefillStatus: {
            supplierId: true,
            supplierInvoiceNumber: true,
            issueDate: true,
            note: true,
          },
        })
      );
    });

    it('prefills bill from a supplier feed', () => {
      const state = {
        bill: {
          layout: 'service',
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
          ...response,
          bill: {
            ...response.bill,
            layout: 'itemAndService',
            note: 'Some notes',
          },
          lines: [
            {
              id: '',
              description: 'Hello',
              amount: '20.44',
              unitPrice: '21.44',
              discount: '0',
            },
          ],
        },
      };

      const actual = billReducer(state, action);

      expect(actual).toEqual(
        buildExpected({
          bill: {
            supplierId: '2',
            supplierInvoiceNumber: '1234',
            layout: 'itemAndService',
            issueDate: '2018-11-02',
            isTaxInclusive: true,
            isReportable: true,
            note: 'Some notes',
            lines: [
              {
                id: '',
                description: 'Hello',
                amount: '20.44',
                unitPrice: '21.44',
                discount: '0',
                prefillStatus: {
                  ...defaultLinePrefillStatus,
                  description: true,
                  amount: true,
                  discount: true,
                  unitPrice: true,
                },
              },
            ],
          },
          prefillStatus: {
            supplierId: true,
            supplierInvoiceNumber: true,
            issueDate: true,
            note: true,
          },
        })
      );
    });

    it('does not prefill bill when there is user input data, except for issue date', () => {
      const state = {
        bill: {
          supplierId: '1',
          supplierInvoiceNumber: '123',
          layout: 'itemAndService',
          issueDate: '2018-10-02',
          isTaxInclusive: false,
          note: 'Some note typed by the user',
          lines: [{ id: '1' }],
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

      expect(actual).toEqual(
        buildExpected({
          bill: {
            supplierId: '1',
            supplierInvoiceNumber: '123',
            layout: 'itemAndService',
            issueDate: '2018-11-02',
            isTaxInclusive: false,
            note: 'Some note typed by the user',
            lines: [{ id: '1' }],
          },
          prefillStatus: {
            supplierId: false,
            supplierInvoiceNumber: false,
            issueDate: true,
            note: false,
          },
        })
      );
    });

    it('does not prefill bill lines when there is no in tray data returned', () => {
      const state = {
        bill: {
          layout: 'service',
          supplierId: '2',
          supplierInvoiceNumber: '123',
          issueDate: '2018-10-02',
          isTaxInclusive: true,
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
            layout: 'itemAndService',
            issueDate: '',
          },
          lines: [],
          document,
        },
      };

      const actual = billReducer(state, action);

      expect(actual).toEqual(
        buildExpected({
          bill: {
            supplierId: '2',
            supplierInvoiceNumber: '123',
            layout: 'service',
            issueDate: '2018-10-02',
            isTaxInclusive: true,
            lines: [],
          },
          prefillStatus: {
            supplierId: false,
            supplierInvoiceNumber: false,
            issueDate: false,
            note: false,
          },
        })
      );
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
