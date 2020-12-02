import {
  FINISH_RECODE,
  LOAD_FIND_AND_RECODE_LIST_NEXT_PAGE,
  RECODE_ITEM_FAILURE,
  RECODE_ITEM_SUCCESS,
  RESET_FILTER_OPTIONS,
  SELECT_ALL_ITEMS,
  SELECT_ITEM,
  SET_SORT_ORDER,
  START_RECODE,
  UPDATE_FILTER_OPTIONS,
  UPDATE_RECODE_OPTIONS,
} from '../FindAndRecodeIntents';
import Periods from '../../../../components/PeriodPicker/Periods';
import RecodeStatus from '../types/RecodeStatus';
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
    const state = {
      recodeItems: [
        {
          id: '1',
          status: RecodeStatus.SELECTED,
        },
      ],
    };

    it('appends if not already selected', () => {
      const action = {
        intent: SELECT_ITEM,
        id: '2',
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.recodeItems).toEqual([
        {
          id: '1',
          status: RecodeStatus.SELECTED,
        },
        {
          id: '2',
          status: RecodeStatus.SELECTED,
        },
      ]);
    });

    it('removes if already selected', () => {
      const action = {
        intent: SELECT_ITEM,
        id: '1',
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.recodeItems).toEqual([]);
    });
  });

  describe('SELECT_ALL_ITEMS', () => {
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

    it('selects all if only some selected', () => {
      const modifiedState = {
        ...state,
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.SELECTED,
          },
        ],
      };
      const action = {
        intent: SELECT_ALL_ITEMS,
      };

      const actual = findAndRecodeReducer(modifiedState, action);

      expect(actual.recodeItems).toEqual([
        {
          id: '1',
          status: RecodeStatus.SELECTED,
        },
        {
          id: '2',
          status: RecodeStatus.SELECTED,
        },
      ]);
    });

    it('unselects all if all selected', () => {
      const modifiedState = {
        ...state,
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.SELECTED,
          },
          {
            id: '2',
            status: RecodeStatus.SELECTED,
          },
        ],
      };
      const action = {
        intent: SELECT_ALL_ITEMS,
      };

      const actual = findAndRecodeReducer(modifiedState, action);

      expect(actual.recodeItems).toEqual([]);
    });
  });

  describe('UPDATE_RECODE_OPTIONS', () => {
    it('updates accountId with value', () => {
      const state = {
        recodeOptions: {
          accountId: '1',
          taxCodeId: '',
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
        taxCodeId: '',
      });
    });
    it('updates taxCodeId with value', () => {
      const state = {
        recodeOptions: {
          accountId: '1',
          taxCodeId: '',
        },
      };
      const action = {
        intent: UPDATE_RECODE_OPTIONS,
        key: 'taxCodeId',
        value: '1',
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.recodeOptions).toEqual({
        accountId: '1',
        taxCodeId: '1',
      });
    });
  });

  describe('START_RECODE', () => {
    const state = {
      recodeItems: [
        {
          id: '1',
          status: RecodeStatus.SELECTED,
        },
        {
          id: '2',
          status: RecodeStatus.SELECTED,
        },
      ],
    };

    it('sets all items to loading', () => {
      const action = {
        intent: START_RECODE,
        id: '2',
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.recodeItems).toEqual([
        {
          id: '1',
          status: RecodeStatus.LOADING,
        },
        {
          id: '2',
          status: RecodeStatus.LOADING,
        },
      ]);
    });
  });

  describe('RECODE_ITEM_SUCCESS', () => {
    const state = {
      accountList: [
        {
          id: '100',
          displayId: '1-1000',
          displayName: '🍉',
        },
      ],
      taxCodeList: [
        {
          id: '200',
          displayName: 'NT',
        },
      ],
      recodeOptions: {
        accountId: '100',
        taxCodeId: '200',
      },
      entries: [
        {
          id: '1',
          displayAccountName: 'account1',
          taxCode: 'taxCode1',
        },
        {
          id: '2',
          displayAccountName: 'account2',
          taxCode: 'taxCode2',
        },
      ],
      recodeItems: [
        {
          id: '1',
          status: RecodeStatus.SELECTED,
        },
        {
          id: '2',
          status: RecodeStatus.SELECTED,
        },
      ],
    };

    it('sets item to success', () => {
      const action = {
        intent: RECODE_ITEM_SUCCESS,
        id: '2',
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.recodeItems).toEqual([
        {
          id: '1',
          status: RecodeStatus.SELECTED,
        },
        {
          id: '2',
          status: RecodeStatus.SUCCESS,
        },
      ]);
    });

    it('updates entry account name and tax code', () => {
      const action = {
        intent: RECODE_ITEM_SUCCESS,
        id: '2',
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.entries).toEqual([
        {
          id: '1',
          displayAccountName: 'account1',
          taxCode: 'taxCode1',
        },
        {
          id: '2',
          displayAccountName: '1-1000 🍉',
          taxCode: 'NT',
        },
      ]);
    });

    it('does not update tax code name when not recoding tax code', () => {
      const modifiedState = {
        ...state,
        recodeOptions: {
          ...state.recodeOptions,
          taxCodeId: '',
        },
      };

      const action = {
        intent: RECODE_ITEM_SUCCESS,
        id: '2',
      };

      const actual = findAndRecodeReducer(modifiedState, action);

      expect(actual.entries).toEqual([
        {
          id: '1',
          displayAccountName: 'account1',
          taxCode: 'taxCode1',
        },
        {
          id: '2',
          displayAccountName: '1-1000 🍉',
          taxCode: 'taxCode2',
        },
      ]);
    });

    it('does not update account name when not recoding account', () => {
      const modifiedState = {
        ...state,
        recodeOptions: {
          ...state.recodeOptions,
          accountId: '',
        },
      };

      const action = {
        intent: RECODE_ITEM_SUCCESS,
        id: '2',
      };

      const actual = findAndRecodeReducer(modifiedState, action);

      expect(actual.entries).toEqual([
        {
          id: '1',
          displayAccountName: 'account1',
          taxCode: 'taxCode1',
        },
        {
          id: '2',
          displayAccountName: 'account2',
          taxCode: 'NT',
        },
      ]);
    });
  });

  describe('RECODE_ITEM_FAILURE', () => {
    const state = {
      recodeItems: [
        {
          id: '1',
          status: RecodeStatus.SELECTED,
        },
        {
          id: '2',
          status: RecodeStatus.SELECTED,
        },
      ],
    };

    it('sets item to failure with error', () => {
      const action = {
        intent: RECODE_ITEM_FAILURE,
        id: '2',
        error: '🥬',
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.recodeItems).toEqual([
        {
          id: '1',
          status: RecodeStatus.SELECTED,
        },
        {
          id: '2',
          status: RecodeStatus.FAILURE,
          error: '🥬',
        },
      ]);
    });
  });

  describe('FINISH_RECODE', () => {
    it('keeps failures selected', () => {
      const state = {
        recodeItems: [
          {
            id: '1',
            status: RecodeStatus.SUCCESS,
          },
          {
            id: '2',
            status: RecodeStatus.FAILURE,
            error: '🥬',
          },
        ],
      };
      const action = {
        intent: FINISH_RECODE,
      };

      const actual = findAndRecodeReducer(state, action);

      expect(actual.recodeItems).toEqual([
        {
          id: '2',
          status: RecodeStatus.FAILURE,
          error: '🥬',
        },
      ]);
    });
  });
});
