import {
  LOAD_QUOTE_LIST_NEXT_PAGE,
  SET_NEXT_PAGE_LOADING_STATE,
  SORT_AND_FILTER_QUOTE_LIST,
} from '../../QuoteIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import quoteListReducer from '../quoteListReducer';

describe('quoteListReducer', () => {
  describe('SET_INITIAL_STATE', () => {
    const state = {
      settingsVersion: '1.0',
      filterOptions: {
        dateFrom: '2019-01-01',
        dateTo: '2020-01-01',
        keywords: '',
        customerId: undefined,
      },
      sortOrder: 'desc',
      orderBy: 'DateOccurred',
    };

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
        const actual = quoteListReducer(state, {
          intent: SET_INITIAL_STATE,
          settings: test.settings,
        });

        expect(actual.filterOptions).toEqual({
          dateFrom: expect.any(String),
          dateTo: expect.any(String),
          keywords: '',
          customerId: undefined,
        });
        expect(actual.sortOrder).toEqual('desc');
        expect(actual.orderBy).toEqual('DateOccurred');
      });
    });

    it('uses given settings when settingsVersion are the same', () => {
      const actual = quoteListReducer(state, {
        intent: SET_INITIAL_STATE,
        settings: {
          settingsVersion: '1.0',
          filterOptions: {
            dateFrom: '2020-01-01',
            dateTo: '2021-01-01',
            keywords: '🦒',
            customerId: '1',
          },
          sortOrder: 'asc',
          orderBy: 'DisplayId',
        },
      });

      expect(actual.filterOptions).toEqual({
        dateFrom: '2020-01-01',
        dateTo: '2021-01-01',
        keywords: '🦒',
        customerId: '1',
      });
      expect(actual.sortOrder).toEqual('asc');
      expect(actual.orderBy).toEqual('DisplayId');
    });
  });

  describe('LOAD_QUOTE_LIST_NEXT_PAGE', () => {
    it('does not add to list if id already exists in state entries', () => {
      const state = {
        entries: [
          {
            id: '1',
          },
          {
            id: '2',
          },
        ],
      };

      const action = {
        intent: LOAD_QUOTE_LIST_NEXT_PAGE,
        entries: [
          {
            id: '1',
          },
          {
            id: '4',
          },
        ],
      };

      const actual = quoteListReducer(state, action);

      expect(actual.entries).toEqual([
        {
          id: '1',
        },
        {
          id: '2',
        },
        {
          id: '4',
        },
      ]);
    });
    it('sets hasNextPage to true if action.pagination.hasNextPage is true', () => {
      const state = {
        entries: [],
        pagination: {
          hasNextPage: false,
        },
      };

      const action = {
        intent: LOAD_QUOTE_LIST_NEXT_PAGE,
        entries: [],
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = quoteListReducer(state, action);

      expect(actual.pagination.hasNextPage).toEqual(true);
    });

    it('sets hasNextPage to false if action.pagination.hasNextPage is false', () => {
      const state = {
        entries: [],
        pagination: {
          hasNextPage: true,
        },
      };

      const action = {
        intent: LOAD_QUOTE_LIST_NEXT_PAGE,
        entries: [],
        pagination: {
          hasNextPage: false,
        },
      };

      const actual = quoteListReducer(state, action);

      expect(actual.pagination.hasNextPage).toEqual(false);
    });
  });

  describe('START_LOADING_MORE', () => {
    it('sets isNextPageLoading to true', () => {
      const state = {
        isNextPageLoading: false,
      };

      const action = {
        intent: SET_NEXT_PAGE_LOADING_STATE,
        isNextPageLoading: true,
      };

      const actual = quoteListReducer(state, action);

      expect(actual.isNextPageLoading).toEqual(true);
    });

    it('sets isNextPageLoading to false', () => {
      const state = {
        isNextPageLoading: true,
      };

      const action = {
        intent: SET_NEXT_PAGE_LOADING_STATE,
        isNextPageLoading: false,
      };

      const actual = quoteListReducer(state, action);

      expect(actual.isNextPageLoading).toEqual(false);
    });
  });

  describe('SORT_AND_FILTER_QUOTE_LIST', () => {
    it('sets hasNextPage to true if action.pagination.hasNextPage is true', () => {
      const state = {
        entries: [],
        pagination: {
          hasNextPage: false,
        },
      };

      const action = {
        intent: SORT_AND_FILTER_QUOTE_LIST,
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = quoteListReducer(state, action);

      expect(actual.pagination.hasNextPage).toEqual(true);
    });
    it('sets hasNextPage to false if action.pagination.hasNextPage is false', () => {
      const state = {
        entries: [],
        pagination: {
          hasNextPage: true,
        },
      };

      const action = {
        intent: SORT_AND_FILTER_QUOTE_LIST,
        pagination: {
          hasNextPage: false,
        },
      };

      const actual = quoteListReducer(state, action);

      expect(actual.pagination.hasNextPage).toEqual(false);
    });
  });
});
