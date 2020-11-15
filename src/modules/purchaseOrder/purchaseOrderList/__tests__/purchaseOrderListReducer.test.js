import {
  LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE,
  SORT_AND_FILTER_PURCHASE_ORDER_LIST,
  START_LOADING_MORE,
  UPDATE_SORT_ORDER,
} from '../../PurchaseOrderIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import purchaseOrderListReducer from '../purchaseOrderListReducer';

describe('purchaseOrderListReducer', () => {
  describe('SET_INITIAL_STATE', () => {
    [
      {
        name: 'undefined',
        settings: undefined,
      },
      {
        name: 'different settingsVersion',
        settings: {
          settingsVersion: 'a different version 😭',
          filterOptions: {
            dateFrom: '2020-01-01',
            dateTo: '2021-01-01',
            keywords: '🦒',
            customerId: '1',
          },
          sortOrder: 'asc',
          orderBy: 'DisplayId',
        },
      },
    ].forEach((test) => {
      it(`uses default settings when settings is ${test.name}`, () => {
        const actual = purchaseOrderListReducer(
          {},
          {
            intent: SET_INITIAL_STATE,
            context: {},
            settings: test.settings,
          }
        );

        expect(actual.filterOptions).toEqual({
          dateFrom: expect.any(String),
          dateTo: expect.any(String),
          keywords: '',
          supplierId: undefined,
        });
        expect(actual.sortOrder).toEqual('desc');
        expect(actual.orderBy).toEqual('DateOccurred');
      });
    });

    it('uses given settings when settingsVersion are the same', () => {
      const actual = purchaseOrderListReducer(
        {},
        {
          intent: SET_INITIAL_STATE,
          context: {},
          settings: {
            settingsVersion: '84650621-cb7b-4405-8c69-a61e0be4b896',
            filterOptions: {
              dateFrom: '2020-01-01',
              dateTo: '2021-01-01',
              keywords: '🦒',
              customerId: '1',
            },
            sortOrder: 'asc',
            orderBy: 'DisplayId',
          },
        }
      );

      expect(actual.filterOptions).toEqual({
        dateFrom: '2020-01-01',
        dateTo: '2021-01-01',
        keywords: '🦒',
        customerId: '1',
      });
      expect(actual.sortOrder).toEqual('asc');
      expect(actual.orderBy).toEqual('DisplayId');
    });

    describe('setInitialStateWithQueryParams', () => {
      it('use given query parameters to prefill filter options and sorting', () => {
        const actual = purchaseOrderListReducer(
          {},
          {
            intent: SET_INITIAL_STATE,
            context: {
              dateFrom: '2020-01-01',
              dateTo: '2020-01-31',
              keywords: 'Yak',
              supplierId: '1',
              orderBy: 'BalanceDue',
              sortOrder: 'asc',
            },
            settings: undefined,
          }
        );

        expect(actual.filterOptions).toEqual({
          dateFrom: '2020-01-01',
          dateTo: '2020-01-31',
          keywords: 'Yak',
          supplierId: '1',
        });
        expect(actual.orderBy).toEqual('BalanceDue');
        expect(actual.sortOrder).toEqual('asc');
      });

      it('should use default filter options if not provided', () => {
        const actual = purchaseOrderListReducer(
          {},
          {
            intent: SET_INITIAL_STATE,
            context: {
              dateFrom: '2020-01-01',
              dateTo: '2020-01-31',
            },
            settings: undefined,
          }
        );

        expect(actual.filterOptions).toEqual({
          dateFrom: '2020-01-01',
          dateTo: '2020-01-31',
          keywords: '',
          supplierId: undefined,
        });
        expect(actual.orderBy).toEqual('DateOccurred');
        expect(actual.sortOrder).toEqual('desc');
      });
    });
  });

  describe('LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE', () => {
    it('removes duplicate entries', () => {
      const action = {
        intent: LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE,
        entries: [{ id: 'a' }, { id: 'b' }],
      };

      const state = {
        entries: [{ id: 'b' }, { id: 'c' }],
      };

      const actual = purchaseOrderListReducer(state, action);

      expect(actual.entries).toEqual([{ id: 'b' }, { id: 'c' }, { id: 'a' }]);
    });
    it('sets hasNextPage to false when action.pagination.hasNextPage is false', () => {
      const action = {
        intent: LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE,
        entries: [],
        pagination: {
          hasNextPage: false,
        },
      };

      const state = {
        entries: [],
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = purchaseOrderListReducer(state, action);

      expect(actual.pagination).toEqual({
        hasNextPage: false,
      });
    });
    it('sets hasNextPage to true when action.pagination.hasNextPage is true', () => {
      const action = {
        intent: LOAD_PURCHASE_ORDER_LIST_NEXT_PAGE,
        entries: [],
        pagination: {
          hasNextPage: true,
        },
      };

      const state = {
        entries: [],
        pagination: {
          hasNextPage: false,
        },
      };

      const actual = purchaseOrderListReducer(state, action);

      expect(actual.pagination).toEqual({
        hasNextPage: true,
      });
    });
  });

  describe('SORT_AND_FILTER_PURCHASE_ORDER_LIST', () => {
    it('sets pagination.hasNextPage to true when action.hasNextPage is true', () => {
      const action = {
        intent: SORT_AND_FILTER_PURCHASE_ORDER_LIST,
        pagination: {
          hasNextPage: true,
        },
      };
      const state = {
        pagination: {
          hasNextPage: false,
        },
      };

      const actual = purchaseOrderListReducer(state, action);

      expect(actual.pagination.hasNextPage).toEqual(true);
    });

    it('sets pagination.hasNextPage to false when action.hasNextPage is false', () => {
      const action = {
        intent: SORT_AND_FILTER_PURCHASE_ORDER_LIST,
        pagination: {
          hasNextPage: false,
        },
      };
      const state = {
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = purchaseOrderListReducer(state, action);

      expect(actual.pagination.hasNextPage).toEqual(false);
    });
  });

  describe('START_LOADNG_MORE', () => {
    it('sets isLoadingMore to true', () => {
      const action = {
        intent: START_LOADING_MORE,
      };

      const state = {
        isLoadingMore: false,
      };

      const actual = purchaseOrderListReducer(state, action);

      expect(actual.isLoadingMore).toEqual(true);
    });
  });

  describe('UPDATE_SORT_ORDER', () => {
    it('sets the sort order and orderBy', () => {
      const action = {
        intent: UPDATE_SORT_ORDER,
        orderBy: 'desc',
      };

      const state = {
        sortOrder: 'asc',
        orderBy: 'desc',
      };

      const actual = purchaseOrderListReducer(state, action);

      expect(actual.sortOrder).toEqual('desc');
      expect(actual.orderBy).toEqual('desc');
    });
  });
});
