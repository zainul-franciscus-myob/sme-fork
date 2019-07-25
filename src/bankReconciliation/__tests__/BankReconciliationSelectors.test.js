import {
  getCreateBankReconciliationPayload,
  getEntries,
  getHeaderSelectStatus,
  getOptions,
  getOrder,
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

  describe('getEntries', () => {
    it('get entries with formatted amount when exist', () => {
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

      const expected = [
        {
          date: '01/01/2019',
          link: '/#/au/123/spendMoney/11',
          referenceId: '000000123',
          journalLineId: '1123',
          isChecked: true,
          description: 'Payment ref-001',
          withdrawal: '1,200.00',
          deposit: undefined,
        },
        {
          date: '01/01/2019',
          link: '/#/au/123/receiveMoney/12',
          referenceId: '000000124',
          journalLineId: '1124',
          isChecked: false,
          description: 'Payment ref-002',
          withdrawal: undefined,
          deposit: '1,300.00',
        },
      ];

      const actual = getEntries(state);

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
  });
});
