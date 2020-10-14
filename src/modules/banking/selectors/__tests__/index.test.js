import { businessEventTypes } from '../../../../common/types/BusinessEventTypeMap';
import {
  getBankingRuleModuleContext,
  getFilterBankTransactionsParams,
  getFilterBankTransactionsUrlParams,
  getIndexOfNextUnmatchedLine,
  getIsFocused,
  getIsTabDisabled,
  getLoadBankTransactionsNextPageParams,
  getLoadBankTransactionsNextPageUrlParams,
  getLoadBankTransactionsParams,
  getLoadBankTransactionsUrlParams,
  getLocationOfTransactionLine,
  getMatchTransactionsContext,
  getSortBankTransactionsParams,
  getSortBankTransactionsUrlParams,
  getSpendMoneyUid,
} from '../index';
import BankTransactionStatusTypes from '../../types/BankTransactionStatusTypes';
import FocusLocations from '../../types/FocusLocations';
import MatchTransactionShowType from '../../types/MatchTransactionShowType';
import Region from '../../../../common/types/Region';
import RuleTypes from '../../bankingRule/RuleTypes';
import TabItems from '../../types/TabItems';
import TransactionTypes from '../../types/TransactionTypes';

describe('Bank transactions index selectors', () => {
  describe('loadBankTransactionsSelectors', () => {
    describe('getLoadBankTransactionsUrlParams', () => {
      it('returns businessId', () => {
        const state = { businessId: 'id' };
        const actual = getLoadBankTransactionsUrlParams(state);

        expect(actual).toEqual({ businessId: 'id' });
      });
    });

    describe('getLoadBankTransactionsParams', () => {
      it('returns all filters', () => {
        const state = {
          filterOptions: {
            transactionType: TransactionTypes.UNALLOCATED,
            dateTo: 'dateTo',
            dateFrom: 'dateFrom',
            otherFilters: 'otherFilters',
          },
          sortOrder: 'sortOrder',
          orderBy: 'orderBy',
        };

        const expected = {
          transactionType: TransactionTypes.UNALLOCATED,
          dateTo: 'dateTo',
          dateFrom: 'dateFrom',
          otherFilters: 'otherFilters',
          sortOrder: 'sortOrder',
          orderBy: 'orderBy',
        };

        const actual = getLoadBankTransactionsParams(state);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('loadBankTransactionsNextPageSelectors', () => {
    describe('getLoadBankTransactionsNextPageUrlParams', () => {
      it('returns businessId', () => {
        const state = { businessId: 'id' };
        const actual = getLoadBankTransactionsNextPageUrlParams(state);

        expect(actual).toEqual({ businessId: 'id' });
      });
    });

    describe('getLoadBankTransactionsNextPageParams', () => {
      it('returns all filters with offset', () => {
        const state = {
          filterOptions: {
            transactionType: TransactionTypes.UNALLOCATED,
            dateTo: 'dateTo',
            dateFrom: 'dateFrom',
            otherFilters: 'otherFilters',
          },
          pagination: {
            offset: 20,
          },
          sortOrder: 'sortOrder',
          orderBy: 'orderBy',
        };

        const expected = {
          transactionType: TransactionTypes.UNALLOCATED,
          dateTo: 'dateTo',
          dateFrom: 'dateFrom',
          otherFilters: 'otherFilters',
          sortOrder: 'sortOrder',
          orderBy: 'orderBy',
          offset: 20,
        };

        const actual = getLoadBankTransactionsNextPageParams(state);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('filterBankTransactionsSelectors', () => {
    describe('getFilterBankTransactionsUrlParams', () => {
      it('returns businessId', () => {
        const state = { businessId: 'id' };
        const actual = getFilterBankTransactionsUrlParams(state);

        expect(actual).toEqual({ businessId: 'id' });
      });
    });

    describe('getFilterBankTransactionsParams', () => {
      it('returns all filters with offset', () => {
        const state = {
          filterOptions: {
            transactionType: TransactionTypes.UNALLOCATED,
            dateTo: 'dateTo',
            dateFrom: 'dateFrom',
            otherFilters: 'otherFilters',
          },
          pagination: {
            offset: 20,
          },
          sortOrder: 'sortOrder',
          orderBy: 'orderBy',
        };

        const expected = {
          transactionType: TransactionTypes.UNALLOCATED,
          dateTo: 'dateTo',
          dateFrom: 'dateFrom',
          otherFilters: 'otherFilters',
          sortOrder: 'sortOrder',
          orderBy: 'orderBy',
          offset: 0,
        };

        const actual = getFilterBankTransactionsParams(state);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('sortBankTransactionsSelectors', () => {
    describe('getSortBankTransactionsUrlParams', () => {
      it('returns businessId', () => {
        const state = { businessId: 'id' };
        const actual = getSortBankTransactionsUrlParams(state);

        expect(actual).toEqual({ businessId: 'id' });
      });
    });

    describe('getSortBankTransactionsParams', () => {
      const state = {
        filterOptions: {
          dateTo: 'dateTo',
          dateFrom: 'dateFrom',
          otherFilters: 'otherFilters',
        },
        pagination: {
          offset: 20,
        },
        sortOrder: 'asc',
        orderBy: 'stateOrderBy',
      };

      it('returns sort params which inclues applied filters and flipped sort order and offset', () => {
        const expected = {
          dateTo: 'dateTo',
          dateFrom: 'dateFrom',
          otherFilters: 'otherFilters',
          sortOrder: 'desc',
          orderBy: 'nonStateOrderBy',
          offset: 0,
        };

        const actual = getSortBankTransactionsParams(state, 'nonStateOrderBy');

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('getLocationOfTransactionLine', () => {
    it('should be undefined when transaction does not exist', () => {
      const state = {
        entries: [{}],
      };

      const location = getLocationOfTransactionLine(state, 2);

      expect(location).toEqual(undefined);
    });

    it(`should return the location ${FocusLocations.MATCHED_OR_ALLOCATED_ELEMENT} if is a valid entry`, () => {
      const state = {
        entries: [{}, {}],
      };

      const location = getLocationOfTransactionLine(state, 1);

      expect(location).toEqual(FocusLocations.MATCHED_OR_ALLOCATED_ELEMENT);
    });
  });

  describe('getIsTabDisabled', () => {
    const getStateWithEntry = (entry) => ({
      openPosition: 0,
      entries: [entry],
    });

    it('should be false given tab to expand is neither Allocate nor Transfer', () => {
      const state = getStateWithEntry({});

      const actual = getIsTabDisabled(state, TabItems.match);
      expect(actual).toEqual(false);
    });

    describe('tab to expand to is Allocate', () => {
      describe('open transaction type is split matched', () => {
        it('should be true', () => {
          const state = getStateWithEntry({
            type: BankTransactionStatusTypes.splitMatched,
            journals: [],
          });

          const actual = getIsTabDisabled(state, TabItems.allocate);
          expect(actual).toEqual(true);
        });
      });

      describe('open transaction type is NOT split matched', () => {
        it('should be false given open transaction has no sourceJournal ', () => {
          const state = getStateWithEntry({
            type: BankTransactionStatusTypes.singleAllocation,
            journals: [{}],
          });

          const actual = getIsTabDisabled(state, TabItems.allocate);
          expect(actual).toEqual(false);
        });

        test.each([
          [businessEventTypes.spendMoney],
          [businessEventTypes.receiveMoney],
        ])(
          'should be false given open transaction has %s source journal ',
          (sourceJournal) => {
            const state = getStateWithEntry({
              type: BankTransactionStatusTypes.matched,
              journals: [{ sourceJournal }],
            });
            const actual = getIsTabDisabled(state, TabItems.allocate);
            expect(actual).toEqual(false);
          }
        );

        test.each([
          [businessEventTypes.generalJournal],
          [businessEventTypes.transferMoney],
          [businessEventTypes.billPayment],
          [businessEventTypes.invoicePayment],
          [businessEventTypes.receiveRefund],
          [businessEventTypes.settlePurchaseReturn],
          [businessEventTypes.payRefund],
          [businessEventTypes.settleSaleReturn],
          [businessEventTypes.bill],
          [businessEventTypes.invoice],
          [businessEventTypes.employeePay],
          [businessEventTypes.paySuper],
          [businessEventTypes.electronicPayment],
        ])(
          'should be true given open transaction has %s source journal ',
          (sourceJournal) => {
            const state = getStateWithEntry({
              type: BankTransactionStatusTypes.matched,
              journals: [{ sourceJournal }],
            });
            const actual = getIsTabDisabled(state, TabItems.allocate);
            expect(actual).toEqual(true);
          }
        );
      });
    });

    describe('tab to expand to is Transfer', () => {
      describe('open transaction type is split matched', () => {
        it('should be true', () => {
          const state = getStateWithEntry({
            type: BankTransactionStatusTypes.splitMatched,
            journals: [],
          });

          const actual = getIsTabDisabled(state, TabItems.transfer);
          expect(actual).toEqual(true);
        });
      });

      describe('open transaction type is NOT split matched', () => {
        it('should be false given open transaction has no sourceJournal', () => {
          const state = getStateWithEntry({
            type: BankTransactionStatusTypes.singleAllocation,
            journals: [{}],
          });

          const actual = getIsTabDisabled(state, TabItems.transfer);
          expect(actual).toEqual(false);
        });

        it('should be false given open transaction has TransferMoney source journal', () => {
          const state = getStateWithEntry({
            type: BankTransactionStatusTypes.matched,
            journals: [businessEventTypes.transferMoney],
          });
          const actual = getIsTabDisabled(state, TabItems.transfer);
          expect(actual).toEqual(false);
        });

        test.each([
          [businessEventTypes.generalJournal],
          [businessEventTypes.spendMoney],
          [businessEventTypes.receiveMoney],
          [businessEventTypes.billPayment],
          [businessEventTypes.invoicePayment],
          [businessEventTypes.receiveRefund],
          [businessEventTypes.settlePurchaseReturn],
          [businessEventTypes.payRefund],
          [businessEventTypes.settleSaleReturn],
          [businessEventTypes.bill],
          [businessEventTypes.invoice],
          [businessEventTypes.employeePay],
          [businessEventTypes.paySuper],
          [businessEventTypes.electronicPayment],
        ])(
          'should be true given open transaction has %s source journal ',
          (sourceJournal) => {
            const state = getStateWithEntry({
              type: BankTransactionStatusTypes.matched,
              journals: [{ sourceJournal }],
            });
            const actual = getIsTabDisabled(state, TabItems.transfer);
            expect(actual).toEqual(true);
          }
        );
      });
    });
  });

  describe('getIsFocused', () => {
    it('should be true when element is in focus', () => {
      const state = {
        focus: {
          index: 1,
          location: FocusLocations.MATCHED_OR_ALLOCATED_ELEMENT,
          isFocused: true,
        },
      };

      const actual = getIsFocused(
        state,
        1,
        FocusLocations.MATCHED_OR_ALLOCATED_ELEMENT
      );

      expect(actual).toEqual(true);
    });

    test.each([
      [2, FocusLocations.MATCHED_OR_ALLOCATED_ELEMENT, false],
      [1, FocusLocations.SPLIT_ALLOCATION_ACCOUNT_COMBOBOX, true],
    ])(
      'should be false when inputs do not match state or if element is not in focus',
      (index, location, isFocused) => {
        const state = {
          focus: { index, location, isFocused },
        };

        const actual = getIsFocused(
          state,
          1,
          FocusLocations.MATCHED_OR_ALLOCATED_ELEMENT
        );

        expect(actual).toEqual(false);
      }
    );
  });

  describe('getIndexOfNextUnmatchedLine', () => {
    it(`given ${BankTransactionStatusTypes.unmatched} transactions after start index should return index of the first`, () => {
      const state = {
        entries: [
          { type: BankTransactionStatusTypes.splitMatched },
          {
            type: BankTransactionStatusTypes.splitAllocation,
          },
          {
            type: BankTransactionStatusTypes.unmatched,
          },
          {
            type: BankTransactionStatusTypes.singleAllocation,
          },
          {
            type: BankTransactionStatusTypes.unmatched,
          },
        ],
      };

      const actual = getIndexOfNextUnmatchedLine(state, 1);

      expect(actual).toEqual(2);
    });

    it(`given no ${BankTransactionStatusTypes.unmatched} transactions after start index should return -1`, () => {
      const state = {
        entries: [
          {
            type: BankTransactionStatusTypes.unmatched,
          },
          {
            type: BankTransactionStatusTypes.splitMatched,
          },
          {
            type: BankTransactionStatusTypes.splitAllocation,
          },
          {
            type: BankTransactionStatusTypes.singleAllocation,
          },
          {
            type: BankTransactionStatusTypes.transfer,
          },
          {
            type: BankTransactionStatusTypes.matched,
          },
          {
            type: BankTransactionStatusTypes.paymentRuleMatched,
          },
        ],
      };

      const actual = getIndexOfNextUnmatchedLine(state, 1);

      expect(actual).toEqual(-1);
    });

    it(`given no start index should should return index of the first ${BankTransactionStatusTypes.unmatched} transaction`, () => {
      const state = {
        entries: [
          {
            type: BankTransactionStatusTypes.matched,
          },
          {
            type: BankTransactionStatusTypes.unmatched,
          },
        ],
      };

      const actual = getIndexOfNextUnmatchedLine(state);

      expect(actual).toEqual(1);
    });
  });

  describe('getBankingRuleModuleContext', () => {
    const buildState = ({ withdrawal, deposit, activeTabId }) => ({
      businessId: '🌶',
      region: Region.au,
      openPosition: 1,
      entries: [
        {},
        {
          date: '2020-01-01',
          withdrawal,
          deposit,
          description: '🙅‍♀️',
        },
      ],
      filterOptions: {
        bankAccount: '1',
      },
      openEntry: {
        activeTabId,
      },
      bankAccounts: [
        {
          id: '1',
          displayId: '🍉',
          displayName: '👵',
        },
      ],
      taxCodes: [
        {
          id: '😍',
        },
      ],
      withdrawalAccounts: [
        {
          id: '😌',
        },
      ],
      depositAccounts: [
        {
          id: '🥺',
        },
      ],
    });

    it('builds', () => {
      const state = buildState({
        withdrawal: 10000,
        deposit: undefined,
        activeTabId: TabItems.allocate,
      });

      const actual = getBankingRuleModuleContext(state);

      expect(actual).toEqual({
        businessId: '🌶',
        region: Region.au,
        transaction: {
          accountId: '1',
          accountDisplayName: '🍉 👵',
          date: '2020-01-01',
          description: '🙅‍♀️',
          withdrawal: 10000,
          deposit: undefined,
        },
        ruleType: RuleTypes.spendMoney,
        bankAccounts: [
          {
            id: '1',
            displayId: '🍉',
            displayName: '👵',
          },
        ],
        taxCodes: [
          {
            id: '😍',
          },
        ],
        withdrawalAccounts: [
          {
            id: '😌',
          },
        ],
        depositAccounts: [
          {
            id: '🥺',
          },
        ],
      });
    });

    [
      {
        withdrawal: 10000,
        deposit: undefined,
        activeTabId: TabItems.allocate,
        ruleType: RuleTypes.spendMoney,
      },
      {
        withdrawal: 10000,
        deposit: undefined,
        activeTabId: TabItems.match,
        ruleType: RuleTypes.bill,
      },
      {
        withdrawal: undefined,
        deposit: 10000,
        activeTabId: TabItems.allocate,
        ruleType: RuleTypes.receiveMoney,
      },
      {
        withdrawal: undefined,
        deposit: 10000,
        activeTabId: TabItems.match,
        ruleType: RuleTypes.invoice,
      },
    ].forEach(({ withdrawal, deposit, activeTabId, ruleType }) => {
      const withdrawalDepositText = withdrawal ? 'withdrawal' : 'deposit';

      it(`return ruleType of "${ruleType}" when is ${withdrawalDepositText} and on tab "${activeTabId}"`, () => {
        const state = buildState({
          withdrawal,
          deposit,
          activeTabId,
        });

        const actual = getBankingRuleModuleContext(state);

        expect(actual.ruleType).toEqual(ruleType);
      });
    });
  });

  describe('getSpendMoneyUid', () => {
    it(`should get uid if journal type is "${businessEventTypes.spendMoney}"`, () => {
      const journalUid = '123e4567-e89b-12d3-a456-789123456790';
      const journals = [
        {
          journalUid,
          journalLineId: 1,
          journalId: 1,
          sourceJournal: businessEventTypes.spendMoney,
        },
      ];

      const actual = getSpendMoneyUid(journals);

      expect(actual).toEqual(journalUid);
    });

    it(`should get undefined if journal type is not "${businessEventTypes.spendMoney}"`, () => {
      const journals = [
        {
          journalUid: '🍉',
          journalLineId: 1,
          journalId: 1,
          sourceJournal: businessEventTypes.receiveMoney,
        },
      ];

      const actual = getSpendMoneyUid(journals);

      expect(actual).toEqual(undefined);
    });

    it('should get undefined if journal is empty', () => {
      const journals = [];

      const actual = getSpendMoneyUid(journals);

      expect(actual).toEqual(undefined);
    });
  });

  describe('getMatchTransactionsContext', () => {
    it('should get the context for match transactions', () => {
      const state = {
        businessId: 'tony-tang-business',
        region: 'au',
        entries: [
          {
            transactionId: '1000',
            withdrawal: 100,
            deposit: undefined,
            date: '20/12/2020',
            description: 'some-description',
            note: '',
            type: BankTransactionStatusTypes.unmatched,
          },
        ],
        taxCodes: [{ id: '2' }],
        jobs: [{ id: '1' }],
        withdrawalAccounts: [{ id: 'withdrawalAccounts' }],
        depositAccounts: [{ id: 'depositAccounts' }],
        filterOptions: {
          bankAccount: '123',
        },
      };

      const actual = getMatchTransactionsContext(state, 0);

      expect(actual).toEqual({
        businessId: 'tony-tang-business',
        region: 'au',
        contactId: undefined,
        taxCodes: [{ id: '2' }],
        jobs: [{ id: '1' }],
        accounts: [{ id: 'withdrawalAccounts' }],
        bankAccountId: '123',
        showType: MatchTransactionShowType.CLOSE_MATCHES,
        transaction: {
          id: '1000',
          amount: 100,
          date: '20/12/2020',
          isWithdrawal: true,
          description: 'some-description',
          note: '',
        },
      });
    });

    describe('setting accounts and isWithdrawal', () => {
      it('should use deposit accounts and set isWithdrawal to false if transaction is a deposit', () => {
        const state = {
          entries: [
            {
              deposit: 200,
              type: BankTransactionStatusTypes.unmatched,
            },
          ],
          filterOptions: {},
          withdrawalAccounts: [{ id: 'withdrawalAccounts' }],
          depositAccounts: [{ id: 'depositAccounts' }],
        };

        const actual = getMatchTransactionsContext(state, 0);

        expect(actual).toEqual({
          accounts: [{ id: 'depositAccounts' }],
          showType: MatchTransactionShowType.CLOSE_MATCHES,
          transaction: {
            amount: 200,
            isWithdrawal: false,
          },
        });
      });

      it('should use withdrawal accounts and set isWithdrawal to true if transaction is a withdrawal', () => {
        const state = {
          entries: [
            {
              withdrawal: 100,
              type: BankTransactionStatusTypes.unmatched,
            },
          ],
          filterOptions: {},
          withdrawalAccounts: [{ id: 'withdrawalAccounts' }],
          depositAccounts: [{ id: 'depositAccounts' }],
        };

        const actual = getMatchTransactionsContext(state, 0);

        expect(actual).toEqual({
          accounts: [{ id: 'withdrawalAccounts' }],
          showType: MatchTransactionShowType.CLOSE_MATCHES,
          transaction: {
            amount: 100,
            isWithdrawal: true,
          },
        });
      });
    });

    describe('setting the contactId', () => {
      it('should set contactId if applied rule is a bill', () => {
        const state = {
          entries: [{}],
          filterOptions: {},
          appliedRule: {
            ruleType: 'Bill',
            contactId: '1',
          },
        };

        const actual = getMatchTransactionsContext(state, 0);

        expect(actual.contactId).toEqual('1');
      });

      it('should set contactId if applied rule is a invoice', () => {
        const state = {
          entries: [{}],
          filterOptions: {},
          appliedRule: {
            ruleType: 'Invoice',
            contactId: '1',
          },
        };

        const actual = getMatchTransactionsContext(state, 0);

        expect(actual.contactId).toEqual('1');
      });

      it('should not set contactId if applied rule is not an invoice or bill', () => {
        const state = {
          entries: [{}],
          filterOptions: {},
          appliedRule: {
            ruleType: 'spend money',
            contactId: '1',
          },
        };

        const actual = getMatchTransactionsContext(state, 0);

        expect(actual.contactId).toEqual(undefined);
      });
    });

    describe('setting the show type', () => {
      test.each([
        [
          BankTransactionStatusTypes.unmatched,
          MatchTransactionShowType.CLOSE_MATCHES,
        ],
        [
          BankTransactionStatusTypes.matched,
          MatchTransactionShowType.CLOSE_MATCHES,
        ],
        [
          BankTransactionStatusTypes.paymentRuleMatched,
          MatchTransactionShowType.ALL,
        ],
        [
          BankTransactionStatusTypes.singleAllocation,
          MatchTransactionShowType.SELECTED,
        ],
        [
          BankTransactionStatusTypes.splitAllocation,
          MatchTransactionShowType.SELECTED,
        ],
      ])('should set %s to show type', (transactionType, showType) => {
        const state = {
          entries: [
            {
              type: transactionType,
            },
          ],
          filterOptions: {},
        };

        const actual = getMatchTransactionsContext(state, 0);

        expect(actual.showType).toEqual(showType);
      });
    });
  });
});
