import {
  LOAD_BILL_LIST_NEXT_PAGE,
  SORT_AND_FILTER_BILL_LIST,
} from '../../BillIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  START_LOADING_MORE,
  STOP_LOADING_MORE,
} from '../../billDetail/BillIntents';
import billListReducer from '../billListReducer';

describe('billListReducer', () => {
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
            status: 'Open',
          },
          sortOrder: 'asc',
          orderBy: 'DisplayId',
        },
      },
    ].forEach((test) => {
      it(`uses default settings when settings is ${test.name}`, () => {
        const actual = billListReducer(
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
          status: 'All',
        });
        expect(actual.sortOrder).toEqual('desc');
        expect(actual.orderBy).toEqual('DateOccurred');
      });
    });

    it('uses given settings when settingsVersion are the same', () => {
      const actual = billListReducer(
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
              status: 'Open',
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
        status: 'Open',
      });
      expect(actual.sortOrder).toEqual('asc');
      expect(actual.orderBy).toEqual('DisplayId');
    });

    describe('setInitialStateWithQueryParams', () => {
      it('use given query parameters to prefill filter options and sorting', () => {
        const actual = billListReducer(
          {},
          {
            intent: SET_INITIAL_STATE,
            context: {
              dateFrom: '2020-01-01',
              dateTo: '2020-01-31',
              keywords: 'Yak',
              supplierId: '1',
              status: 'Closed',
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
          status: 'Closed',
        });
        expect(actual.orderBy).toEqual('BalanceDue');
        expect(actual.sortOrder).toEqual('asc');
      });

      it('should use default filter options if not provided', () => {
        const actual = billListReducer(
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
          status: 'All',
        });
        expect(actual.orderBy).toEqual('DateOccurred');
        expect(actual.sortOrder).toEqual('desc');
      });
    });
  });

  describe('LOAD_BILL_LIST_NEXT_PAGE', () => {
    it('removes duplicate entries', () => {
      const action = {
        intent: LOAD_BILL_LIST_NEXT_PAGE,
        entries: [{ id: 'a' }, { id: 'b' }],
      };

      const state = {
        entries: [{ id: 'b' }, { id: 'c' }],
      };

      const actual = billListReducer(state, action);

      expect(actual.entries).toEqual([{ id: 'b' }, { id: 'c' }, { id: 'a' }]);
    });
    it('sets hasNextPage to false when action.pagination.hasNextPage is false', () => {
      const action = {
        intent: LOAD_BILL_LIST_NEXT_PAGE,
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

      const actual = billListReducer(state, action);

      expect(actual.pagination).toEqual({
        hasNextPage: false,
      });
    });
    it('sets hasNextPage to true when action.pagination.hasNextPage is true', () => {
      const action = {
        intent: LOAD_BILL_LIST_NEXT_PAGE,
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

      const actual = billListReducer(state, action);

      expect(actual.pagination).toEqual({
        hasNextPage: true,
      });
    });
  });

  describe('SORT_AND_FILTER_BILL_LIST', () => {
    it('sets pagination.hasNextPage to true when action.hasNextPage is true', () => {
      const action = {
        intent: SORT_AND_FILTER_BILL_LIST,
        pagination: {
          hasNextPage: true,
        },
      };
      const state = {
        pagination: {
          hasNextPage: false,
        },
      };

      const actual = billListReducer(state, action);

      expect(actual.pagination.hasNextPage).toEqual(true);
    });

    it('sets pagination.hasNextPage to false when action.hasNextPage is false', () => {
      const action = {
        intent: SORT_AND_FILTER_BILL_LIST,
        pagination: {
          hasNextPage: false,
        },
      };
      const state = {
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = billListReducer(state, action);

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

      const actual = billListReducer(state, action);

      expect(actual.isLoadingMore).toEqual(true);
    });
  });

  describe('STOP_LOADNG_MORE', () => {
    it('sets isLoadingMore to false', () => {
      const action = {
        intent: STOP_LOADING_MORE,
      };

      const state = {
        isLoadingMore: true,
      };

      const actual = billListReducer(state, action);

      expect(actual.isLoadingMore).toEqual(false);
    });
  });
});
