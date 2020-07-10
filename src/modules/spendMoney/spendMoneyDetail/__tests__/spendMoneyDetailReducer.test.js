import Decimal from 'decimal.js';

import {
  ADD_ATTACHMENTS,
  APPEND_ALERT_MESSAGE,
  GET_TAX_CALCULATIONS,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_CONTACT_AFTER_CREATE,
  LOAD_JOB_AFTER_CREATE,
  LOAD_NEW_SPEND_MONEY,
  LOAD_SPEND_MONEY_DETAIL,
  LOAD_SUPPLIER_EXPENSE_ACCOUNT,
  PREFILL_DATA_FROM_IN_TRAY,
  RESET_BANK_STATEMENT_TEXT,
  UPDATE_BANK_STATEMENT_TEXT,
  UPDATE_SPEND_MONEY_HEADER,
  UPDATE_SPEND_MONEY_LINE,
  UPLOAD_ATTACHMENT,
  UPLOAD_ATTACHMENT_FAILED,
} from '../../SpendMoneyIntents';
import spendMoneyReducer from '../spendMoneyDetailReducer';

describe('spendMoneyDetailReducer', () => {
  describe('addAttachments', () => {
    it('should add less than 10MB attachment', () => {
      const state = {
        attachments: [],
      };

      const file = {
        name: 'filename',
        size: 10000000,
      };

      const action = {
        intent: ADD_ATTACHMENTS,
        files: [file],
      };

      const expected = {
        attachments: [
          {
            name: 'filename',
            size: 10000000,
            state: 'queued',
            file,
          },
        ],
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual).toEqual(expected);
    });

    it('should set failed state when adding more than 10MB attachment', () => {
      const state = {
        attachments: [],
      };

      const file = {
        name: 'filename',
        size: 10000001,
      };

      const action = {
        intent: ADD_ATTACHMENTS,
        files: [file],
      };

      const expected = {
        attachments: [
          {
            name: 'filename',
            size: 10000001,
            state: 'failed',
            error: 'File is more than 10MB',
            file,
          },
        ],
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('uploadAttachment', () => {
    it('update state for uploaded attachment', () => {
      const file = {
        name: 'filename',
      };

      const state = {
        attachments: [
          {
            state: 'queued',
            name: 'filename',
            file,
          },
        ],
      };

      const action = {
        intent: UPLOAD_ATTACHMENT,
        id: 'document id',
        name: 'filename',
        file,
      };

      const expected = {
        attachments: [
          {
            id: 'document id',
            name: 'filename',
            state: 'finished',
            file,
          },
        ],
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('uploadAttachmentFailed', () => {
    it('update state for upload failed attachment', () => {
      const file = {
        name: 'filename',
      };

      const state = {
        attachments: [
          {
            state: 'queued',
            file,
          },
        ],
      };

      const action = {
        intent: UPLOAD_ATTACHMENT_FAILED,
        message: 'error',
        file,
      };

      const expected = {
        attachments: [
          {
            state: 'failed',
            error: 'error',
            file,
          },
        ],
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual).toEqual(expected);
    });
  });

  describe('updateHeader', () => {
    describe('selectedPayToContactId', () => {
      it('should update selectedPayToContactId and isReportable', () => {
        const state = {
          spendMoney: {
            isReportable: false,
            selectedPayToContactId: '2',
            payToContacts: [
              { id: '1', isReportable: true },
              { id: '2', isReportable: false },
            ],
            lines: [],
          },
        };

        const action = {
          intent: UPDATE_SPEND_MONEY_HEADER,
          key: 'selectedPayToContactId',
          value: '1',
        };

        const actual = spendMoneyReducer(state, action);

        expect(actual.spendMoney.selectedPayToContactId).toEqual('1');
        expect(actual.spendMoney.isReportable).toBeTruthy();
      });
    });

    describe('isReportable', () => {
      it('should update value', () => {
        const state = {
          spendMoney: {
            isReportable: false,
            lines: [],
          },
        };

        const action = {
          intent: UPDATE_SPEND_MONEY_HEADER,
          key: 'isReportable',
          value: true,
        };

        const actual = spendMoneyReducer(state, action);

        expect(actual.spendMoney.isReportable).toBeTruthy();
      });
    });

    it('updates prefill status when corresponding field changed', () => {
      const state = {
        spendMoney: {
          lines: [],
        },
        prefillStatus: {
          description: true,
        },
      };

      const action = {
        intent: UPDATE_SPEND_MONEY_HEADER,
        key: 'description',
        value: 'dummy text',
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual.prefillStatus).toEqual({
        description: false,
      });
    });

    describe('expenseAccountId', () => {
      const action = {
        intent: UPDATE_SPEND_MONEY_HEADER,
        key: 'expenseAccountId',
        value: '1',
      };

      it('updates expenseAccountId', () => {
        const state = {
          spendMoney: {
            expenseAccountId: '',
            lines: [],
          },
        };

        const actual = spendMoneyReducer(state, action);

        expect(actual.spendMoney.expenseAccountId).toEqual('1');
      });

      it('updates all lines with expenseAccountId and its associated taxCodeId', () => {
        const state = {
          spendMoney: {
            expenseAccountId: '2',
            lines: [
              { accountId: '2', taxCodeId: '2', amount: '10.00' },
              { accountId: '3', taxCodeId: '3', amount: '20.00' },
            ],
          },
          accounts: [
            { id: '1', taxCodeId: '1' },
            { id: '2', taxCodeId: '2' },
            { id: '3', taxCodeId: '3' },
          ],
          taxCodes: [{ id: '1' }, { id: '2' }, { id: '3' }],
        };

        const actual = spendMoneyReducer(state, action);

        const expectedLines = [
          { accountId: '1', taxCodeId: '1', amount: '10.00' },
          { accountId: '1', taxCodeId: '1', amount: '20.00' },
        ];

        expect(actual.spendMoney.lines).toEqual(expectedLines);
      });
    });
  });

  describe('loadSupplierExpenseAccount', () => {
    const spendMoney = {
      expenseAccountId: '2',
      lines: [
        { accountId: '2', taxCodeId: '2', amount: '10.00' },
        { accountId: '3', taxCodeId: '3', amount: '20.00' },
      ],
    };

    const action = {
      intent: LOAD_SUPPLIER_EXPENSE_ACCOUNT,
      response: {
        expenseAccountId: '1',
      },
    };

    it('updates expenseAccountId and all lines with the accountId', () => {
      const state = {
        spendMoney,
        accounts: [
          { id: '1', taxCodeId: '1' },
          { id: '2', taxCodeId: '2' },
          { id: '3', taxCodeId: '3' },
        ],
        taxCodes: [{ id: '1' }, { id: '2' }, { id: '3' }],
      };

      const actual = spendMoneyReducer(state, action);
      const expectedLines = [
        { accountId: '1', taxCodeId: '1', amount: '10.00' },
        { accountId: '1', taxCodeId: '1', amount: '20.00' },
      ];

      expect(actual.spendMoney.lines).toEqual(expectedLines);
      expect(actual.spendMoney.expenseAccountId).toEqual('1');
    });
  });

  describe('updateLine', () => {
    describe('updates line prefill status', () => {
      [{ key: 'description' }, { key: 'amount' }].forEach((test) => {
        it(`should update status to false if line has been prefilled and ${test.key} is updated`, () => {
          const state = {
            spendMoney: {
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
            intent: UPDATE_SPEND_MONEY_LINE,
            lineIndex: 0,
            lineKey: test.key,
            lineValue: '',
          };

          const actual = spendMoneyReducer(state, action);

          expect(
            actual.spendMoney.lines[0].prefillStatus[action.lineKey]
          ).toEqual(false);
        });
      });

      it('should not update prefill status if line has not been prefilled', () => {
        const state = {
          spendMoney: {
            lines: [
              {
                amount: '23',
              },
            ],
          },
        };

        const action = {
          intent: UPDATE_SPEND_MONEY_LINE,
          lineIndex: 0,
          lineKey: test.key,
          lineValue: '',
        };

        const actual = spendMoneyReducer(state, action);

        expect(actual.spendMoney.lines[0].prefillStatus).toBeUndefined();
      });
    });
  });

  describe('PREFILL_NEW_SPEND_MONEY_FROM_IN_TRAY', () => {
    const document = {
      thumbnailUrl:
        'https://assets.digital.myob.com/images/favicons/apple-touch-icon.png',
      uploadedDate: '04/04/2019',
    };

    const buildExpected = ({ spendMoney, prefillStatus }) => ({
      spendMoney,
      inTrayDocument: document,
      prefillStatus,
      isPageEdited: true,
      showPrefillInfo: true,
    });

    const accounts = [
      { id: '1', taxCodeId: '1' },
      { id: '2', taxCodeId: '2' },
      { id: '3', taxCodeId: '3' },
    ];

    const taxCodes = [{ id: '1' }, { id: '2' }, { id: '3' }];

    it('prefills spendMoney', () => {
      const state = {
        spendMoney: {},
        isPageEdited: false,
        inTrayDocument: undefined,
        accounts,
        taxCodes,
      };

      const response = {
        spendMoney: {
          date: '2019-01-01',
          description: 'Some notes 437889188',
          selectedPayToContactId: '2',
          isTaxInclusive: true,
          expenseAccountId: '1',
          lines: [
            {
              amount: '10.00',
              description: 'Cooler Large',
            },
          ],
        },
        document,
      };

      const action = {
        intent: PREFILL_DATA_FROM_IN_TRAY,
        response,
      };

      const actual = spendMoneyReducer(state, action);
      const expected = {
        ...buildExpected({
          spendMoney: {
            selectedPayToContactId: '2',
            date: '2019-01-01',
            description: 'Some notes 437889188',
            isTaxInclusive: true,
            originalExpenseAccountId: '1',
            expenseAccountId: '1',
            lines: [
              {
                amount: '10.00',
                description: 'Cooler Large',
                accountId: '1',
                taxCodeId: '1',
                prefillStatus: {
                  amount: true,
                  description: true,
                },
              },
            ],
          },
          prefillStatus: {
            date: true,
            description: true,
            isTaxInclusive: true,
            selectedPayToContactId: true,
          },
        }),
        accounts,
        taxCodes,
      };

      expect(actual).toEqual(expected);
    });

    it('does not prefill bill when no ocr data available', () => {
      const state = {
        spendMoney: {},
        isPageEdited: false,
        inTrayDocument: undefined,
      };

      const response = {
        spendMoney: {},
        document,
      };

      const action = {
        intent: PREFILL_DATA_FROM_IN_TRAY,
        response,
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual).toEqual(
        buildExpected({
          spendMoney: {},
          prefillStatus: {
            date: false,
            description: false,
            isTaxInclusive: false,
            selectedPayToContactId: false,
          },
        })
      );
    });

    it('does not prefill lines when there are no prefilled lines returned', () => {
      const state = {
        spendMoney: {
          lines: [],
        },
        isPageEdited: false,
        inTrayDocument: undefined,
        accounts,
        taxCodes,
      };

      const response = {
        spendMoney: {
          date: '2019-01-01',
        },
        document,
      };

      const action = {
        intent: PREFILL_DATA_FROM_IN_TRAY,
        response,
      };
      const actual = spendMoneyReducer(state, action);

      const expected = {
        ...buildExpected({
          spendMoney: {
            date: '2019-01-01',
            lines: [],
          },
          prefillStatus: {
            date: true,
            description: false,
            isTaxInclusive: false,
            selectedPayToContactId: false,
          },
        }),
        accounts,
        taxCodes,
      };

      expect(actual).toEqual(expected);
    });

    it('does not prefill accountId and taxCodeId if no expenseAccountId was returned from prefill data', () => {
      const state = {
        spendMoney: {},
        newLine: {
          accountId: '',
          taxCodeId: '',
        },
        isPageEdited: false,
        inTrayDocument: undefined,
        accounts,
        taxCodes,
      };

      const response = {
        spendMoney: {
          lines: [
            {
              amount: '10.00',
            },
          ],
        },
        document,
      };

      const action = {
        intent: PREFILL_DATA_FROM_IN_TRAY,
        response,
      };

      const actual = spendMoneyReducer(state, action);
      const expected = {
        ...buildExpected({
          spendMoney: {
            lines: [
              {
                amount: '10.00',
                accountId: '',
                taxCodeId: '',
                prefillStatus: {
                  amount: true,
                  description: false,
                },
              },
            ],
          },
          prefillStatus: {
            date: false,
            description: false,
            isTaxInclusive: false,
            selectedPayToContactId: false,
          },
        }),
        newLine: {
          accountId: '',
          taxCodeId: '',
        },
        accounts,
        taxCodes,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getTaxCalculations', () => {
    const taxCalculations = {
      lines: [
        {
          taxExclusiveAmount: Decimal(90.91),
          taxAmount: Decimal(9.09),
          amount: Decimal(100),
        },
      ],
      totals: {
        subTotal: Decimal(100),
        totalTax: Decimal(9.09),
        totalAmount: Decimal(100),
      },
    };

    const state = {
      spendMoney: {
        lines: [
          {
            amount: '0',
          },
        ],
      },
      totals: {
        subTotal: '0',
        totalTax: '0',
        totalAmount: '0',
      },
    };

    const action = {
      intent: GET_TAX_CALCULATIONS,
      taxCalculations,
    };

    const actual = spendMoneyReducer(state, action);

    const expected = {
      isPageEdited: true,
      spendMoney: {
        lines: [
          {
            amount: '100',
          },
        ],
      },
      totals: {
        subTotal: '$100.00',
        totalTax: '$9.09',
        totalAmount: '$100.00',
      },
    };

    expect(actual).toEqual(expected);
  });

  describe('loadAccountAfterCreate', () => {
    it('should add the newly added account into the accounts list', () => {
      const state = {
        accounts: [
          {
            id: '1',
          },
        ],
      };

      const newAccount = {
        id: '123',
        displayName: 'My quick account',
        accountType: 'Asset',
        taxCodeId: '123',
        displayId: '1-9944',
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        ...newAccount,
      };

      const actual = spendMoneyReducer(state, action);

      const expected = [
        newAccount,
        {
          id: '1',
        },
      ];

      expect(actual.accounts).toEqual(expected);
    });
  });

  describe('loadContactAfterCreate', () => {
    const newContactId = '2';

    const newContact = {
      contactType: 'Supplier',
      displayContactType: 'Supplier',
      displayName: 'Shipping Logs',
      id: newContactId,
      displayId: 'SUS0000202',
      expenseAccountId: '456',
      isReportable: false,
    };

    const payToContacts = [
      {
        id: '1',
      },
    ];

    it('should add the newly added contact into the payToContacts list', () => {
      const state = {
        spendMoney: {
          payToContacts,
        },
      };

      const action = {
        intent: LOAD_CONTACT_AFTER_CREATE,
        contactId: newContactId,
        ...newContact,
      };

      const actual = spendMoneyReducer(state, action);

      const { expenseAccountId, ...expectedContact } = newContact;
      const expected = [expectedContact, payToContacts[0]];

      expect(actual.spendMoney.payToContacts).toEqual(expected);
      expect(actual.spendMoney.selectedPayToContactId).toEqual(newContactId);
    });

    it('should not update lines if spend money was prefilled but contact is a customer', () => {
      const state = {
        inTrayDocumentId: '1',
        spendMoney: {
          payToContacts,
          lines: [],
        },
      };

      const updatedContact = {
        ...newContact,
        contactType: 'Customer',
      };

      const action = {
        intent: LOAD_CONTACT_AFTER_CREATE,
        contactId: newContactId,
        ...updatedContact,
      };

      const actual = spendMoneyReducer(state, action);

      const { expenseAccountId, ...expectedContact } = updatedContact;
      const expected = [expectedContact, payToContacts[0]];

      expect(actual.spendMoney.payToContacts).toEqual(expected);
      expect(actual.spendMoney.selectedPayToContactId).toEqual(newContactId);
    });

    it('should not update lines if contact is a supplier but spend money was not prefilled', () => {
      const state = {
        spendMoney: {
          payToContacts,
          lines: [],
        },
      };

      const updatedContact = {
        ...newContact,
        contactType: 'Supplier',
      };

      const action = {
        intent: LOAD_CONTACT_AFTER_CREATE,
        contactId: newContactId,
        ...updatedContact,
      };

      const actual = spendMoneyReducer(state, action);

      const { expenseAccountId, ...expectedContact } = updatedContact;
      const expected = [expectedContact, payToContacts[0]];

      expect(actual.spendMoney.payToContacts).toEqual(expected);
      expect(actual.spendMoney.selectedPayToContactId).toEqual(newContactId);
    });

    it('should add expenseAccountId and update lines with the expense account id if the spend money was prefilled and contact is a supplier', () => {
      const state = {
        spendMoneyId: 'new',
        inTrayDocumentId: '1',
        accounts: [],
        spendMoney: {
          payToContacts,
          lines: [
            {
              accountId: '5',
            },
          ],
        },
      };

      const action = {
        intent: LOAD_CONTACT_AFTER_CREATE,
        contactId: newContactId,
        ...newContact,
      };

      const actual = spendMoneyReducer(state, action);

      const { expenseAccountId, ...expectedContact } = newContact;
      const expected = [expectedContact, payToContacts[0]];

      expect(actual.spendMoney.payToContacts).toEqual(expected);
      expect(actual.spendMoney.selectedPayToContactId).toEqual(newContactId);
      expect(actual.spendMoney.lines).toEqual([
        {
          accountId: '456',
          taxCodeId: '',
        },
      ]);
    });
  });

  describe('appendAlert', () => {
    it('should append an alert to an existing alert', () => {
      const state = {
        alert: {
          type: 'danger',
          message: 'oh no',
        },
      };

      const messageToAppend = 'oh yes';

      const action = {
        intent: APPEND_ALERT_MESSAGE,
        message: messageToAppend,
      };

      const actual = spendMoneyReducer(state, action);

      const expected = {
        type: 'danger',
        message: 'oh no; oh yes',
      };

      expect(actual.alert).toEqual(expected);
    });

    it('should create a new alert if there is no existing alert', () => {
      const state = {
        alert: undefined,
      };

      const messageToAppend = 'oh yes';

      const action = {
        intent: APPEND_ALERT_MESSAGE,
        message: messageToAppend,
      };

      const actual = spendMoneyReducer(state, action);

      const expected = {
        type: 'danger',
        message: 'oh yes',
      };

      expect(actual.alert).toEqual(expected);
    });
  });

  describe('updateBankStatementText', () => {
    it('should update bank statement text if the selected account is the electronic cleared account', () => {
      const state = {
        spendMoney: {
          referenceId: '55',
          selectedPayFromAccountId: '1',
          electronicClearingAccountId: '1',
        },
      };

      const action = {
        intent: UPDATE_BANK_STATEMENT_TEXT,
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual.spendMoney.bankStatementText).toEqual('Payment 55');
      expect(actual.spendMoney.originalBankStatementText).toEqual('Payment 55');
    });

    it('should not update bank statement text if the selected account is the electronic cleared account', () => {
      const state = {
        spendMoney: {
          referenceId: '55',
          selectedPayFromAccountId: '2',
          electronicClearingAccountId: '1',
          originalBankStatementText: 'original-text',
        },
      };

      const action = {
        intent: UPDATE_BANK_STATEMENT_TEXT,
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual.spendMoney.bankStatementText).toEqual('');
      expect(actual.spendMoney.originalBankStatementText).toEqual(
        'original-text'
      );
    });
  });

  describe('resetBankStatementText', () => {
    it('should prefill bankStatementText with originalBankStatementText if field is cleared', () => {
      const state = {
        spendMoney: {
          originalBankStatementText: 'some-text',
        },
      };

      const action = {
        intent: RESET_BANK_STATEMENT_TEXT,
        value: '',
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual.spendMoney.bankStatementText).toEqual('some-text');
    });

    it('should update bankStatementText with value if field is not cleared', () => {
      const state = {
        spendMoney: {
          originalBankStatementText: 'some-text',
        },
      };

      const action = {
        intent: RESET_BANK_STATEMENT_TEXT,
        value: 'updated-text',
      };

      const actual = spendMoneyReducer(state, action);

      expect(actual.spendMoney.bankStatementText).toEqual('updated-text');
    });
  });

  describe('loadNewSpendMoney', () => {
    const state = {};

    const action = {
      intent: LOAD_NEW_SPEND_MONEY,
      spendMoney: {
        lines: [
          {
            jobId: '1',
          },
          {
            jobId: '2',
          },
          {
            jobId: '3',
          },
        ],
      },
      newLine: {
        lineJobOptions: [],
      },
      jobs: [
        {
          id: '1',
          isActive: false,
        },
        {
          id: '2',
          isActive: false,
        },
        {
          id: '3',
          isActive: true,
        },
        {
          id: '4',
          isActive: true,
        },
      ],
    };
    describe('sets job options on newLine', () => {
      it('shows active jobs against new line', () => {
        const expectedJobOptions = action.jobs.filter((job) => job.isActive);
        const actual = spendMoneyReducer(state, action);

        expect(actual.newLine.lineJobOptions).toEqual(expectedJobOptions);
      });
    });
  });

  describe('loadSpendMoneyDetail', () => {
    const state = {};

    const action = {
      intent: LOAD_SPEND_MONEY_DETAIL,
      spendMoney: {
        lines: [
          {
            jobId: '1',
          },
          {
            jobId: '2',
          },
          {
            jobId: '3',
          },
        ],
      },
      newLine: {
        lineJobOptions: [],
      },
      jobs: [
        {
          id: '1',
          isActive: false,
        },
        {
          id: '2',
          isActive: false,
        },
        {
          id: '3',
          isActive: true,
        },
        {
          id: '4',
          isActive: true,
        },
      ],
    };
    describe('sets job options on each line and newLine', () => {
      it('shows inactive selected jobs against each line', () => {
        const lineOneExpectedOptions = action.jobs.filter(
          (job) => job.id !== '2'
        );
        const lineTwoExpectedOptions = action.jobs.filter(
          (job) => job.id !== '1'
        );
        const lineThreeExpectedOptions = action.jobs.filter(
          (job) => job.id !== '1' && job.id !== '2'
        );

        const actual = spendMoneyReducer(state, action);

        expect(actual.spendMoney.lines[0].lineJobOptions).toEqual(
          lineOneExpectedOptions
        );
        expect(actual.spendMoney.lines[1].lineJobOptions).toEqual(
          lineTwoExpectedOptions
        );
        expect(actual.spendMoney.lines[2].lineJobOptions).toEqual(
          lineThreeExpectedOptions
        );
      });

      it('shows active jobs against new line', () => {
        const expectedJobOptions = action.jobs.filter((job) => job.isActive);
        const actual = spendMoneyReducer(state, action);

        expect(actual.newLine.lineJobOptions).toEqual(expectedJobOptions);
      });
    });
  });

  describe('loadJobAfterCreate', () => {
    const lineJobOptions = [
      {
        id: '1',
        jobNumber: '100',
      },
      {
        id: '2',
        jobNumber: '200',
      },
    ];

    const state = {
      spendMoney: {
        lines: [{ lineJobOptions }, { lineJobOptions }, { lineJobOptions }],
      },
      newLine: {
        lineJobOptions,
      },
    };

    const action = {
      intent: LOAD_JOB_AFTER_CREATE,
      id: '3',
      jobName: 'Job 3',
      jobNumber: '300',
    };

    it('adds new job payload to the front of all line job options', () => {
      const actual = spendMoneyReducer(state, action);

      expect(
        actual.spendMoney.lines.map((line) => line.lineJobOptions[0])
      ).toEqual([
        { id: '3', jobName: 'Job 3', jobNumber: '300' },
        { id: '3', jobName: 'Job 3', jobNumber: '300' },
        { id: '3', jobName: 'Job 3', jobNumber: '300' },
      ]);
    });

    it('adds new job payload to the front of lineJobOptions on newLine', () => {
      const actual = spendMoneyReducer(state, action);

      expect(actual.newLine.lineJobOptions[0]).toEqual({
        id: '3',
        jobName: 'Job 3',
        jobNumber: '300',
      });
    });

    it('sets page state to edited', () => {
      const actual = spendMoneyReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });
  });
});
