import { businessEventTypes } from '../../../../common/types/BusinessEventTypeMap';
import {
  getFilterBankTransactionsParams,
  getFilterBankTransactionsUrlParams,
  getIsFocused,
  getIsTabDisabled,
  getLoadBankTransactionsNextPageParams,
  getLoadBankTransactionsNextPageUrlParams,
  getLoadBankTransactionsParams,
  getLoadBankTransactionsUrlParams,
  getLocationOfTransactionLine,
  getSortBankTransactionsParams,
  getSortBankTransactionsUrlParams,
} from '../index';
import BankTransactionStatusTypes from '../../types/BankTransactionStatusTypes';
import FocusLocations from '../../types/FocusLocations';
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
});
