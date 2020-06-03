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
});
