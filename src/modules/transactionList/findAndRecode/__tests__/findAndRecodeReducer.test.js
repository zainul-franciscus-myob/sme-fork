import {
  LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE,
  RESET_FILTER_OPTIONS,
  SELECT_ALL_ITEMS,
  SELECT_ITEM,
  SET_SORT_ORDER,
  UPDATE_FILTER_OPTIONS,
  UPDATE_RECODE_OPTIONS,
} from '../FindAndRecodeIntents';
import Periods from '../../../../components/PeriodPicker/Periods';
import findAndRecodeReducer from '../findAndRecodeReducer';

describe('findAndRecodeReducer', () => {
  describe('UPDATE_FILTER_OPTIONS', () => {
    it('updates key with value', () => {
      const action = {
        intent: UPDATE_FILTER_OPTIONS,
        key: 'keywords',
        value: '🌶',
      };
      const state = {
        filterOptions: {
          keywords: '🥬',
        },
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.filterOptions.keywords).toEqual('🌶');
    });
  });

  describe('RESET_FILTER_OPTIONS', () => {
    it('resetsFilterOptions', () => {
      const action = {
        intent: RESET_FILTER_OPTIONS,
      };
      const state = {
        filterOptions: {},
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.filterOptions).toEqual({
        accountId: undefined,
        taxCodeId: undefined,
        sourceJournal: 'All',
        keywords: '',
        period: Periods.thisMonth,
        dateFrom: '',
        dateTo: '',
      });
    });
  });

  describe('SET_SORT_ORDER', () => {
    it('sort asc if not already sorted by it', () => {
      const action = {
        intent: SET_SORT_ORDER,
        orderBy: 'description',
      };
      const state = {
        orderBy: 'date',
        sortOrder: 'desc',
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.orderBy).toEqual('description');
      expect(actual.sortOrder).toEqual('asc');
    });

    it('flip sort order if sorted by it', () => {
      const action = {
        intent: SET_SORT_ORDER,
        orderBy: 'description',
      };
      const state = {
        orderBy: 'description',
        sortOrder: 'desc',
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.orderBy).toEqual('description');
      expect(actual.sortOrder).toEqual('asc');
    });
  });

  describe('LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE', () => {
    it('appends entries', () => {
      const action = {
        intent: LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE,
        entries: [
          {
            id: '1',
          },
        ],
      };
      const state = {
        entries: [
          {
            id: '2',
          },
        ],
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.entries).toEqual([
        {
          id: '2',
        },

        {
          id: '1',
        },
      ]);
    });
  });

  describe('SELECT_ITEM', () => {
    it('appends if not already selected', () => {
      const state = {
        selectedItems: ['1'],
      };
      const action = {
        intent: SELECT_ITEM,
        id: '2',
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.selectedItems).toEqual(['1', '2']);
    });

    it('removes if already selected', () => {
      const state = {
        selectedItems: ['1'],
      };
      const action = {
        intent: SELECT_ITEM,
        id: '1',
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.selectedItems).toEqual([]);
    });
  });

  describe('SELECT_ALL_ITEMS', () => {
    it('selects all if only some selected', () => {
      const state = {
        selectedItems: ['1'],
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
        intent: SELECT_ALL_ITEMS,
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.selectedItems).toEqual(['1', '2']);
    });

    it('unselects all if all selected', () => {
      const state = {
        selectedItems: ['1', '2'],
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
        intent: SELECT_ALL_ITEMS,
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.selectedItems).toEqual([]);
    });
  });

  describe('UPDATE_RECODE_OPTIONS', () => {
    it('updates key with value', () => {
      const state = {
        recodeOptions: {
          accountId: '1',
        },
      };
      const action = {
        intent: UPDATE_RECODE_OPTIONS,
        key: 'accountId',
        value: '2',
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.recodeOptions).toEqual({
        accountId: '2',
      });
    });
  });
});
