import {
  LOAD_QUOTE_LIST_NEXT_PAGE, SORT_AND_FILTER_QUOTE_LIST, START_LOADING_MORE, STOP_LOADING_MORE,
} from '../../QuoteIntents';
import quoteListReducer from '../quoteListReducer';

describe('quoteListReducer', () => {
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

      expect(actual.entries).toEqual(
        [
          {
            id: '1',
          },
          {
            id: '2',
          },
          {
            id: '4',
          },
        ],
      );
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
    it('sets isLoadingMore to true', () => {
      const state = {
        isLoadingMore: false,
      };

      const action = {
        intent: START_LOADING_MORE,
      };

      const actual = quoteListReducer(state, action);

      expect(actual.isLoadingMore).toEqual(true);
    });
  });


  describe('STOP_LOADING_MORE', () => {
    it('sets isLoadingMore to false', () => {
      const state = {
        isLoadingMore: true,
      };

      const action = {
        intent: STOP_LOADING_MORE,
      };

      const actual = quoteListReducer(state, action);

      expect(actual.isLoadingMore).toEqual(false);
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
