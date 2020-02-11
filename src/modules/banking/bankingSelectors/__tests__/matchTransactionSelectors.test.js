import {
  getAccounts,
  getDefaultMatchTransactionFilterRequestParams,
  getMatchTransactionFilterRequestParams,
  getMatchTransactionPayload,
  getSelectedText,
  getTableEntries,
  getTotals,
  getUnmatchTransactionPayload,
} from '../matchTransactionSelectors';

describe('matchTransactionSelectors', () => {
  describe('getMatchTransactionPayload', () => {
    const state = {
      openPosition: 0,
      filterOptions: {
        bankAccount: '123',
        transactionType: 'approved',
      },
      entries: [
        {
          transactionId: '1',
          deposit: '100',
          date: '2010-09-09',
          description: 'originalDescription',
          note: 'newDescription',
        },
      ],
      openEntry: {
        match: {
          filterOptions: {},
          entries: [
            {
              journalLineId: '444',
              referenceId: '1234',
              journalId: '3333',
              sourceJournal: 'CashPayment',
              totalAmount: '100.00',
              type: 'Transaction',
              selected: true,
            },
            {
              journalId: '8',
              journalLineId: '222',
              contactId: '1',
              type: 'Purchase',
              discountAmount: '50.00',
              matchAmount: '20.00',
              selected: true,
            },
          ],
          adjustments: [
            {
              amount: '10', description: 'desc', accountId: '123', taxCodeId: '12', quantity: '1',
            },
          ],
        },
      },
    };

    const expected = {
      bankFeedAccountId: '123',
      bankTransactionId: '1',
      bankFeedDescription: 'newDescription',
      date: '2010-09-09',
      isCredit: true,
      payments: [
        {
          id: '8',
          contactId: '1',
          matchAmount: '20.00',
          discountAmount: '50.00',
        },
      ],
      allocations: [
        {
          journalLineId: '444',
          referenceId: '1234',
          journalId: '3333',
          sourceJournal: 'CashPayment',
          totalAmount: '100.00',
        },
      ],
      adjustments: [
        {
          amount: '10',
          description: 'desc',
          accountId: '123',
          taxCodeId: '12',
          quantity: '1',
        },
      ],
    };

    it('should return a valid payload', () => {
      const index = 0;
      const actual = getMatchTransactionPayload(state, index);
      expect(actual).toEqual(expected);
    });

    it('should return original description as bankFeedDescription if there was no new description entered', () => {
      const index = 0;
      const modifiedState = {
        ...state,
        entries: [
          {
            transactionId: '1',
            deposit: '100',
            date: '2010-09-09',
            description: 'originalDescription',
          },
        ],
      };
      const actual = getMatchTransactionPayload(modifiedState, index);
      expect(actual.bankFeedDescription).toEqual('originalDescription');
    });
  });

  describe('getTableEntries', () => {
    it('should return correct entries', () => {
      const state = {
        region: 'au',
        businessId: 'abc',
        openPosition: 0,
        entries: [
          {
            transactionId: '1',
            deposit: '50',
            date: '2018-05-06',
          },
        ],
        openEntry: {
          match: {
            filterOptions: {},
            entries: [
              {
                journalLineId: '444',
                referenceId: '1234',
                journalId: '3333',
                sourceJournal: 'CashPayment',
                totalAmount: '100.00',
                type: 'Transaction',
              },
              {
                journalId: '8',
                journalLineId: '222',
                sourceJournal: 'CashPayment',
                contactId: '1',
                totalAmount: '100.00',
                type: 'Purchase',
                discountAmount: '50.00',
                matchAmount: '20.00',
                originalAmount: '150.00',
              },
            ],
          },
        },
      };

      const expected = [
        {
          allowCustomAmount: false,
          balanceOwed: '',
          discountAmount: '',
          displayTotalAmount: '100.00',
          journalId: '3333',
          journalLineId: '444',
          link: '/#/au/abc/spendMoney/3333',
          matchAmount: '',
          referenceId: '1234',
          sourceJournal: 'CashPayment',
          totalAmount: '100.00',
          type: 'Transaction',
        },
        {
          allowCustomAmount: true,
          balanceOwed: '50.00',
          contactId: '1',
          discountAmount: '50.00',
          displayTotalAmount: '100.00',
          journalId: '8',
          journalLineId: '222',
          link: '/#/au/abc/spendMoney/8',
          matchAmount: '20.00',
          type: 'Purchase',
          sourceJournal: 'CashPayment',
          originalAmount: '150.00',
          totalAmount: '100.00',
          badgeText: 'Total: $150.00',
        },
      ];
      const actual = getTableEntries(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getTotals', () => {
    it('should return correct totals', () => {
      const state = {
        openPosition: 0,
        entries: [
          {
            transactionId: '1',
            deposit: '100',
          },
        ],
        openEntry: {
          match: {
            filterOptions: {},
            entries: [
              {
                journalLineId: '444',
                referenceId: '1234',
                journalId: '3333',
                sourceJournal: 'CashPayment',
                totalAmount: '100.00',
                type: 'Transaction',
                selected: true,
              },
              {
                journalId: '8',
                journalLineId: '222',
                contactId: '1',
                type: 'Purchase',
                discountAmount: '50.00',
                matchAmount: '20.00',
                selected: true,
              },
            ],
            adjustments: [
              {
                amount: '10', description: 'desc', accountId: '123', taxCodeId: '12',
              },
            ],
          },
        },
      };

      const expected = {
        matchAmountTotal: '$120.00',
        adjustmentsTotal: '$10.00',
        subtotal: '$130.00',
        outOfBalance: '-$30.00',
        isOutOfBalance: true,
      };

      const actual = getTotals(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getSelectedText', () => {
    it('should return correct selection text when transaction selected', () => {
      const state = {
        openPosition: 0,
        entries: [
          {
            transactionId: '1',
            deposit: '100',
            date: '2018-05-06',
          },
        ],
        openEntry: {
          match: {
            filterOptions: {},
            entries: [
              { selected: true },
              { selected: false },
            ],
          },
        },
      };

      const expected = '1 transactions selected';

      const actual = getSelectedText(state);
      expect(actual).toEqual(expected);
    });

    it('should return correct selection text when no transaction selected', () => {
      const state = {
        openPosition: 0,
        entries: [
          {
            transactionId: '1',
            deposit: '100',
            date: '2018-05-06',
          },
        ],
        openEntry: {
          match: {
            filterOptions: {},
            entries: [
              { selected: false },
            ],
          },
        },
      };

      const expected = 'No transaction selected';

      const actual = getSelectedText(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getAccounts', () => {
    it('should return withdrawal accounts when bank transaction is withdrawal', () => {
      const withdrawalAccounts = [1];

      const state = {
        openPosition: 0,
        entries: [
          {
            transactionId: '1',
            withdrawal: '100',
          },
        ],
        withdrawalAccounts,
      };

      const expected = withdrawalAccounts;

      const actual = getAccounts(state);
      expect(actual).toEqual(expected);
    });

    it('should return deposit accounts when bank transaction is deposit', () => {
      const depositAccounts = [1];

      const state = {
        openPosition: 0,
        entries: [
          {
            transactionId: '1',
            deposit: '100',
          },
        ],
        depositAccounts,
      };

      const expected = depositAccounts;

      const actual = getAccounts(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getMatchTransactionFilterRequestParams', () => {
    it('should return correct request params when showType is closeMatches', () => {
      const state = {
        filterOptions: {
          bankAccount: '123',
        },
        openPosition: 0,
        entries: [
          {
            transactionId: '1',
            deposit: '100',
            date: '2018-05-06',
          },
        ],
        openEntry: {
          match: {
            filterOptions: {
              showType: 'closeMatches',
              contactId: '1',
              includeClosed: true,
              keywords: '123',
            },
          },
        },
      };

      const expected = {
        isCredit: true,
        showType: 'closeMatches',
        bankFeedTransactionId: '1',
        keywords: '123',
        contactId: '1',
        includeClosed: true,
        accountId: '123',
        dateFrom: '2018-05-01',
        dateTo: '2018-05-11',
        amountFrom: 99.9,
        amountTo: 100.1,
      };

      const actual = getMatchTransactionFilterRequestParams(state);
      expect(actual).toEqual(expected);
    });

    it('should return correct request params when showType is all', () => {
      const state = {
        filterOptions: {
          bankAccount: '123',
        },
        openPosition: 0,
        entries: [
          {
            transactionId: '1',
            deposit: '100',
            date: '2018-05-06',
          },
        ],
        openEntry: {
          match: {
            filterOptions: {
              showType: 'all',
              contactId: '1',
              includeClosed: true,
              keywords: '123',
            },
          },
        },
      };

      const expected = {
        isCredit: true,
        showType: 'all',
        bankFeedTransactionId: '1',
        keywords: '123',
        contactId: '1',
        includeClosed: true,
        accountId: '123',
        dateFrom: '2017-05-06',
        dateTo: '2019-05-06',
        amountFrom: 0,
        amountTo: 9999999999,
      };

      const actual = getMatchTransactionFilterRequestParams(state);
      expect(actual).toEqual(expected);
    });

    it('should return correct request params when showType is last90Days', () => {
      const state = {
        filterOptions: {
          bankAccount: '123',
        },
        openPosition: 0,
        entries: [
          {
            transactionId: '1',
            deposit: '100',
            date: '2018-05-06',
          },
        ],
        openEntry: {
          match: {
            filterOptions: {
              showType: 'last90Days',
              contactId: '1',
              includeClosed: true,
              keywords: '123',
            },
          },
        },
      };

      const expected = {
        isCredit: true,
        bankFeedTransactionId: '1',
        showType: 'last90Days',
        keywords: '123',
        contactId: '1',
        includeClosed: true,
        accountId: '123',
        dateFrom: '2018-02-05',
        dateTo: '2018-05-06',
        amountFrom: 0,
        amountTo: 9999999999,
      };

      const actual = getMatchTransactionFilterRequestParams(state);
      expect(actual).toEqual(expected);
    });

    it('should return correct request params when showType is selected', () => {
      const state = {
        filterOptions: {
          bankAccount: '123',
        },
        openPosition: 0,
        entries: [
          {
            transactionId: '1',
            deposit: '100',
            date: '2018-05-06',
          },
        ],
        openEntry: {
          match: {
            filterOptions: {
              showType: 'selected',
              contactId: '1',
              includeClosed: true,
              keywords: '123',
            },
          },
        },
      };

      const expected = {
        isCredit: true,
        bankFeedTransactionId: '1',
        keywords: '123',
        showType: 'selected',
        contactId: '1',
        includeClosed: true,
        accountId: '123',
        dateFrom: '2018-05-01',
        dateTo: '2018-05-11',
        amountFrom: 99.9,
        amountTo: 100.1,
      };

      const actual = getMatchTransactionFilterRequestParams(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getDefaultMatchTransactionFilterRequestParams', () => {
    it('should return correct request params', () => {
      const bankTransaction = {
        transactionId: '1',
        deposit: '100',
        date: '2018-05-06',
        journalLineId: '1',
      };

      const expected = {
        isCredit: true,
        bankFeedTransactionId: '1',
        keywords: '',
        showType: 'selected',
        contactId: '',
        includeClosed: false,
        accountId: '123',
        dateFrom: '2018-05-01',
        dateTo: '2018-05-11',
        amountFrom: 99.9,
        amountTo: 100.1,
      };

      const actual = getDefaultMatchTransactionFilterRequestParams('123', bankTransaction);
      expect(actual).toEqual(expected);
    });
  });

  describe('getUnmatchTransactionPayload', () => {
    it('should return correct request params', () => {
      const state = {
        filterOptions: {
          bankAccount: '123',
        },
        openPosition: 0,
        entries: [
          {
            transactionId: '1',
            deposit: '100',
            date: '2018-05-06',
          },
        ],
        openEntry: {
          match: {
            filterOptions: {},
            entries: [
              { journalLineId: '1', isMatched: true },
              { journalLineId: '2', isMatched: true },
            ],
          },
        },
      };

      const expected = {
        bankAccountId: '123',
        entries: [
          { transactionId: '1', journalLineId: '1' },
          { transactionId: '1', journalLineId: '2' },
        ],
      };

      const actual = getUnmatchTransactionPayload(state);
      expect(actual).toEqual(expected);
    });
  });
});