import { LOAD_BILL_LIST_NEXT_PAGE, START_LOADING_MORE, STOP_LOADING_MORE } from '../../billDetail/BillIntents';
import { SORT_AND_FILTER_BILL_LIST } from '../../BillIntents';
import billListReducer from '../billListReducer';

describe('billListReducer', () => {
  describe('LOAD_BILL_LIST_NEXT_PAGE', () => {
    it('removes duplicate entries', () => {
      const action = {
        intent: LOAD_BILL_LIST_NEXT_PAGE,
        entries: [
          { id: 'a' },
          { id: 'b' },
        ],
      };

      const state = {
        entries: [
          { id: 'b' },
          { id: 'c' },
        ],
      };

      const actual = billListReducer(state, action);

      expect(actual.entries).toEqual([
        { id: 'b' },
        { id: 'c' },
        { id: 'a' },
      ]);
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
