import {
  getFilterBankTransactionsParams,
  getFilterBankTransactionsUrlParams,
  getLoadBankTransactionsNextPageParams,
  getLoadBankTransactionsNextPageUrlParams,
  getLoadBankTransactionsParams,
  getLoadBankTransactionsUrlParams,
  getSortBankTransactionsParams,
  getSortBankTransactionsUrlParams,
} from '../index';
import TransactionTypes from '../../TransactionTypes';

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
      const state = {
        filterOptions: {
          transactionType: TransactionTypes.ALLOCATED,
          dateTo: 'dateTo',
          dateFrom: 'dateFrom',
          otherFilters: 'otherFilters',
        },
        sortOrder: 'sortOrder',
        orderBy: 'orderBy',
      };

      it('returns date and no date filters for approved transaction types', () => {
        const expected = {
          transactionType: TransactionTypes.ALLOCATED,
          dateTo: 'dateTo',
          dateFrom: 'dateFrom',
          otherFilters: 'otherFilters',
          sortOrder: 'sortOrder',
          orderBy: 'orderBy',
        };

        const actual = getLoadBankTransactionsParams(state);

        expect(actual).toEqual(expected);
      });

      it('returns date filters for non approved transaction types', () => {
        const expected = {
          transactionType: TransactionTypes.UNALLOCATED,
          otherFilters: 'otherFilters',
          sortOrder: 'sortOrder',
          orderBy: 'orderBy',
        };

        const actual = getLoadBankTransactionsParams({
          ...state,
          filterOptions: {
            ...state.filterOptions,
            transactionType: TransactionTypes.UNALLOCATED,
          },
        });

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
      const state = {
        filterOptions: {
          transactionType: TransactionTypes.ALLOCATED,
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

      it('returns date and no date filters and offset for approved transaction types', () => {
        const expected = {
          transactionType: TransactionTypes.ALLOCATED,
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

      it('returns date filters for non approved transaction types', () => {
        const expected = {
          transactionType: TransactionTypes.UNALLOCATED,
          otherFilters: 'otherFilters',
          sortOrder: 'sortOrder',
          orderBy: 'orderBy',
          offset: 20,
        };

        const actual = getLoadBankTransactionsNextPageParams({
          ...state,
          filterOptions: {
            ...state.filterOptions,
            transactionType: TransactionTypes.UNALLOCATED,
          },
        });

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
      const state = {
        filterOptions: {
          transactionType: TransactionTypes.ALLOCATED,
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

      it('returns date and no date filters and offset for approved transaction types', () => {
        const expected = {
          transactionType: TransactionTypes.ALLOCATED,
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

      it('returns date filters for non approved transaction types', () => {
        const expected = {
          transactionType: TransactionTypes.UNALLOCATED,
          otherFilters: 'otherFilters',
          sortOrder: 'sortOrder',
          orderBy: 'orderBy',
          offset: 0,
        };

        const actual = getFilterBankTransactionsParams({
          ...state,
          filterOptions: {
            ...state.filterOptions,
            transactionType: TransactionTypes.UNALLOCATED,
          },
        });

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
});
