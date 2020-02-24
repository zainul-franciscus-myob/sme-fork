import {
  getBankReconciliationCancelModal,
  getCreateBankReconciliationPayload,
  getHeaderSelectStatus,
  getOptions,
  getOrder,
  getOutOfBalance,
  getSelectedAccount,
  getTableRowByIndexSelector,
} from '../BankReconciliationSelectors';

describe('BankReconciliationSelectors', () => {
  describe('getOptions', () => {
    it('should return positive dollar amount', () => {
      const state = {
        statementDate: '2019-05-01',
        selectedAccountId: '1',
        closingBankStatementBalance: '12345',
        calculatedClosingBalance: 12346,
        lastReconcileDate: '2019-01-01',
        accounts: [],
      };

      const expected = {
        statementDate: '2019-05-01',
        selectedAccountId: '1',
        closingBankStatementBalance: '12345',
        hasReconciled: true,
        calculatedClosingBalance: '$12,346.00',
        outOfBalance: '$1.00',
        lastReconcileDate: '01/01/2019',
        accounts: [],
      };

      const actual = getOptions(state);

      expect(actual).toEqual(expected);
    });

    it('should return negative dollar amount', () => {
      const state = {
        statementDate: '2019-05-01',
        selectedAccountId: '1',
        closingBankStatementBalance: '12345',
        calculatedClosingBalance: -12346,
        lastReconcileDate: '2019-01-01',
        accounts: [],
      };

      const expected = {
        statementDate: '2019-05-01',
        selectedAccountId: '1',
        closingBankStatementBalance: '12345',
        hasReconciled: true,
        calculatedClosingBalance: '-$12,346.00',
        outOfBalance: '-$24,691.00',
        lastReconcileDate: '01/01/2019',
        accounts: [],
      };

      const actual = getOptions(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getOrder', () => {
    it('get descending order', () => {
      const state = {
        orderBy: 'DateOccurred',
        sortOrder: 'desc',
      };

      const expected = {
        column: 'DateOccurred',
        descending: true,
      };

      const actual = getOrder(state);

      expect(actual).toEqual(expected);
    });

    it('get ascending order', () => {
      const state = {
        orderBy: 'DateOccurred',
        sortOrder: 'asc',
      };

      const expected = {
        column: 'DateOccurred',
        descending: false,
      };

      const actual = getOrder(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTableRowByIndexSelector', () => {
    it('should build a collapsible row', () => {
      const getTableRowByIndex = getTableRowByIndexSelector();

      const state = {
        businessId: '123',
        region: 'au',
        entries: [
          {
            date: '2019-01-01',
            referenceId: '000000123',
            journalLineId: '1123',
            isChecked: true,
            description: 'Payment ref-001',
            withdrawal: 1200,
            journalTransactionId: '2234',
            journalId: '11',
            sourceJournal: 'CashPayment',
            hasMatchedTransactions: true,
            matchedTransactions: [
              {
                date: '2019-01-01',
                referenceId: '000000123',
                journalLineId: '1123',
                isChecked: true,
                description: 'Payment ref-001',
                withdrawal: 1200,
                journalTransactionId: '2234',
                journalId: '15',
                sourceJournal: 'CashPayment',
              },
            ],
          },
        ],
      };

      const props = {
        index: 0,
      };

      const expected = {
        date: '01/01/2019',
        link: '',
        referenceId: '',
        journalLineId: '1123',
        isChecked: true,
        description: 'Payment ref-001',
        withdrawal: '1,200.00',
        deposit: undefined,
        hasMatchedTransactions: true,
        matchedTransactions: [
          {
            date: '01/01/2019',
            link: '/#/au/123/spendMoney/15',
            referenceId: '000000123',
            journalLineId: '1123',
            description: 'Payment ref-001',
            withdrawal: '1,200.00',
          },
        ],
      };

      const actual = getTableRowByIndex(state, props);

      expect(actual).toEqual(expected);
    });

    it('should build a normal row', () => {
      const getTableRowByIndex = getTableRowByIndexSelector();

      const state = {
        businessId: '123',
        region: 'au',
        entries: [
          {
            date: '2019-01-01',
            referenceId: '000000124',
            journalLineId: '1124',
            isChecked: false,
            description: 'Payment ref-002',
            deposit: 1300,
            journalTransactionId: '2235',
            journalId: '12',
            sourceJournal: 'CashReceipt',
            hasMatchedTransactions: false,
          },
        ],
      };

      const props = {
        index: 0,
      };

      const expected = {
        date: '01/01/2019',
        link: '/#/au/123/receiveMoney/12',
        referenceId: '000000124',
        journalLineId: '1124',
        isChecked: false,
        description: 'Payment ref-002',
        withdrawal: undefined,
        deposit: '1,300.00',
        hasMatchedTransactions: false,
        matchedTransactions: [],
      };

      const actual = getTableRowByIndex(state, props);

      expect(actual).toEqual(expected);
    });
  });

  describe('getHeaderSelectStatus', () => {
    it('show checked when all entries are selected', () => {
      const state = {
        entries: [
          { isChecked: true },
          { isChecked: true },
        ],
      };
      const status = getHeaderSelectStatus(state);

      expect(status).toEqual('checked');
    });

    it('show unchecked when no entries exist', () => {
      const state = {
        entries: [],
      };
      const status = getHeaderSelectStatus(state);

      expect(status).toEqual('');
    });

    it('show indeterminate when partial entries are selected', () => {
      const state = {
        entries: [
          { isChecked: true },
          { isChecked: false },
        ],
      };
      const status = getHeaderSelectStatus(state);

      expect(status).toEqual('indeterminate');
    });

    it('show default status when no entry selected', () => {
      const state = {
        entries: [
          { isChecked: false },
          { isChecked: false },
        ],
      };
      const status = getHeaderSelectStatus(state);

      expect(status).toEqual('');
    });
  });

  describe('getCreateBankReconciliationPayload', () => {
    it('build request body', () => {
      const state = {
        statementDate: '2019-05-01',
        entries: [
          {
            date: '2019-01-01',
            referenceId: '000000123',
            journalLineId: '1123',
            isChecked: true,
            description: 'Payment ref-001',
            withdrawal: 1200,
            journalTransactionId: '2234',
            journalId: '11',
            sourceJournal: 'CashPayment',
          },
          {
            date: '2019-01-01',
            referenceId: '000000124',
            journalLineId: '1124',
            isChecked: false,
            description: 'Payment ref-002',
            deposit: 1300,
            journalTransactionId: '2235',
            journalId: '12',
            sourceJournal: 'CashReceipt',
          },
        ],
      };

      const expected = {
        statementDate: '2019-05-01',
        entries: [
          {
            journalLineId: '1123',
            journalTransactionId: '2234',
          },
        ],
      };

      const actual = getCreateBankReconciliationPayload(state);

      expect(actual).toEqual(expected);
    });

    it('flattens match transactions in entries', () => {
      const state = {
        statementDate: '2019-05-01',
        entries: [
          {
            journalLineId: '1123',
            isChecked: true,
            journalTransactionId: '2234',
            hasMatchedTransactions: false,
          },
          {
            journalLineId: '1124',
            isChecked: false,
            journalTransactionId: '2235',
            hasMatchedTransactions: false,
          },
          {
            isChecked: true,
            hasMatchedTransactions: true,
            matchedTransactions: [
              {
                journalLineId: '1125',
                journalTransactionId: '2236',
              },
              {
                journalLineId: '1126',
                journalTransactionId: '2237',
              },
            ],
          },
        ],
      };

      const expected = {
        statementDate: '2019-05-01',
        entries: [
          {
            journalLineId: '1123',
            journalTransactionId: '2234',
          },
          {
            journalLineId: '1125',
            journalTransactionId: '2236',
          },
          {
            journalLineId: '1126',
            journalTransactionId: '2237',
          },
        ],
      };

      const actual = getCreateBankReconciliationPayload(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getOutOfBalance', () => {
    it('handle invalid closingBankStatementBalance input', () => {
      const state = {
        closingBankStatementBalance: '-',
        calculatedClosingBalance: 100,
      };

      const actual = getOutOfBalance(state);

      expect(actual).toEqual(100);
    });

    it('handle more than 2 decimal places', () => {
      const state = {
        closingBankStatementBalance: '100',
        calculatedClosingBalance: 100.001,
      };

      const actual = getOutOfBalance(state);

      expect(actual).toEqual(0);
    });
  });

  describe('getSelectedAccount', () => {
    it('should get the account matching the selected id out of state', () => {
      const matchingAccount = { id: 5, accountType: 'Asset' };
      const state = {
        selectedAccountId: matchingAccount.id,
        accounts: [{ id: 1, accountType: 'Asset' }, { id: 2, accountType: 'Asset' }, matchingAccount],
      };

      const actual = getSelectedAccount(state);

      expect(actual).toEqual(matchingAccount);
    });
  });

  describe('getBankReconciliationCancelModal', () => {
    it('should show summary of current bank reconciliation selection', () => {
      const closingBankStatementBalance = 100;
      const calculatedClosingBalance = 50;
      const entries = [
        { deposit: 0, withdrawal: 10, isChecked: true },
        { deposit: 0, withdrawal: 10, isChecked: true },
        { deposit: 0, withdrawal: 10, isChecked: false },
        { deposit: 10, withdrawal: 0, isChecked: true },
        { deposit: 10, withdrawal: 0, isChecked: true },
        { deposit: 10, withdrawal: 0, isChecked: false },
      ];

      const expected = {
        outOfBalance: '-$50.00',
        closingBankStatementBalance: '$100.00',
        totalDeposit: '$20.00',
        totalWithdrawal: '$20.00',
      };

      const actual = getBankReconciliationCancelModal.resultFunc(
        closingBankStatementBalance, calculatedClosingBalance, entries,
      );

      expect(actual).toEqual(expected);
    });
  });
});
