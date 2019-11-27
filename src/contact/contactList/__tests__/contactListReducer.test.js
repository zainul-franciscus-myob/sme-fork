
import {
  LOAD_CONTACT_LIST,
  LOAD_CONTACT_LIST_NEXT_PAGE,
  SET_NEXT_PAGE_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CONTACT_LIST,
} from '../../ContactIntents';
import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import contactListReducer from '../contactListReducer';

describe('contactListReducer', () => {
  describe('LOAD_CONTACT_LIST_NEXT_PAGE', () => {
    it('does not add a contact entry to list if entry already exists in state', () => {
      const action = {
        intent: LOAD_CONTACT_LIST_NEXT_PAGE,
        entries: [
          {
            id: '1',
            name: 'Alex',
          },
          {
            id: '2',
            name: 'Tony',
          },
          {
            id: '4',
            name: 'Matias',
          },
        ],
        pagination: {},
      };

      const state = {
        entries: [
          {
            id: '1',
            name: 'Alex',
          },
          {
            id: '2',
            name: 'Tony',
          },
          {
            id: '3',
            name: 'Justin',
          },
        ],
      };
      const expectedEntries = [
        {
          id: '1',
          name: 'Alex',
        },
        {
          id: '2',
          name: 'Tony',
        },
        {
          id: '3',
          name: 'Justin',
        },
        {
          id: '4',
          name: 'Matias',
        },
      ];

      const actual = contactListReducer(state, action);

      expect(actual.entries).toEqual(expectedEntries);
    });

    it('sets loadMoreButtonStatus to HIDDEN if hasNextPage false in action', () => {
      const action = {
        intent: LOAD_CONTACT_LIST_NEXT_PAGE,
        entries: [
          {
            id: '1',
            name: 'Alex',
          },
          {
            id: '3',
            name: 'Justin',
          },
        ],
        pagination: {
          hasNextPage: false,
        },
      };

      const state = {
        entries: [
          {
            id: '1',
            name: 'Alex',
          },
          {
            id: '2',
            name: 'Tony',
          },
        ],
      };

      const actual = contactListReducer(state, action);

      expect(actual.loadMoreButtonStatus).toEqual(LoadMoreButtonStatuses.HIDDEN);
    });

    it('sets loadMoreButtonStatus to SHOWN if hasNextPage is true in action', () => {
      const action = {
        intent: LOAD_CONTACT_LIST_NEXT_PAGE,
        entries: [
          {
            id: '1',
            name: 'Alex',
          },
          {
            id: '3',
            name: 'Justin',
          },
        ],
        pagination: {
          hasNextPage: true,
        },
      };

      const state = {
        entries: [
          {
            id: '1',
            name: 'Alex',
          },
          {
            id: '2',
            name: 'Tony',
          },
        ],
      };

      const actual = contactListReducer(state, action);

      expect(actual.loadMoreButtonStatus).toEqual(LoadMoreButtonStatuses.SHOWN);
    });
  });

  describe('LOAD_CONTACT_LIST', () => {
    it('sets loadMoreButtonStatus to HIDDEN if hasNextPage false in action', () => {
      const action = {
        intent: LOAD_CONTACT_LIST,
        entries: [
          {
            id: '1',
            name: 'Alex',
          },
          {
            id: '3',
            name: 'Justin',
          },
        ],
        pagination: {
          hasNextPage: false,
        },
      };

      const state = {};

      const actual = contactListReducer(state, action);

      expect(actual.loadMoreButtonStatus).toEqual(LoadMoreButtonStatuses.HIDDEN);
    });

    it('sets loadMoreButtonStatus to SHOWN if hasNextPage is true in action', () => {
      const action = {
        intent: LOAD_CONTACT_LIST,
        entries: [
          {
            id: '1',
            name: 'Alex',
          },
          {
            id: '3',
            name: 'Justin',
          },
        ],
        pagination: {
          hasNextPage: true,
        },
      };

      const state = {};

      const actual = contactListReducer(state, action);

      expect(actual.loadMoreButtonStatus).toEqual(LoadMoreButtonStatuses.SHOWN);
    });
  });

  describe('SET_TABLE_LOADING_STATE', () => {
    it('sets loadMoreButtonStatus to HIDDEN if isTableLoading true in action', () => {
      const action = {
        intent: SET_TABLE_LOADING_STATE,
        isTableLoading: true,
      };
      const state = {};

      const actual = contactListReducer(state, action);

      expect(actual.loadMoreButtonStatus).toEqual(LoadMoreButtonStatuses.HIDDEN);
    });

    it('sets loadMoreButtonStatus to SHOWN if isTableLoading false in action', () => {
      const action = {
        intent: SET_TABLE_LOADING_STATE,
        isTableLoading: false,
      };
      const state = {};

      const actual = contactListReducer(state, action);

      expect(actual.loadMoreButtonStatus).toEqual(LoadMoreButtonStatuses.SHOWN);
    });
  });

  describe('SET_NEXT_PAGE_LOADING_STATE', () => {
    it('sets loadMoreButtonStatus to LOADING if action.isNextPageLoading true', () => {
      const action = {
        intent: SET_NEXT_PAGE_LOADING_STATE,
        isNextPageLoading: true,
      };
      const state = {
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = contactListReducer(state, action);

      expect(actual.loadMoreButtonStatus).toEqual(LoadMoreButtonStatuses.LOADING);
    });

    it('sets loadMoreButtonStatus to HIDDEN if action.isNextPageLoading false and state.hasNextPage false', () => {
      const action = {
        intent: SET_NEXT_PAGE_LOADING_STATE,
        isNextPageLoading: false,
      };
      const state = {
        pagination: {
          hasNextPage: false,
        },
      };

      const actual = contactListReducer(state, action);
      expect(actual.loadMoreButtonStatus).toEqual(LoadMoreButtonStatuses.HIDDEN);
    });

    it('sets loadMoreButtonStatus to SHOWN if action.isNextPageLoading false and state.hasNextPage true', () => {
      const action = {
        intent: SET_NEXT_PAGE_LOADING_STATE,
        isNextPageLoading: false,
      };
      const state = {
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = contactListReducer(state, action);

      expect(actual.loadMoreButtonStatus).toEqual(LoadMoreButtonStatuses.SHOWN);
    });
  });

  describe('SORT_AND_FILTER_CONTACT_LIST', () => {
    it('sets loadMoreButtonStatus to HIDDEN if hasNextPage false in action', () => {
      const action = {
        intent: SORT_AND_FILTER_CONTACT_LIST,
        entries: [
          {
            id: '1',
            name: 'Alex',
          },
          {
            id: '3',
            name: 'Justin',
          },
        ],
        pagination: {
          hasNextPage: false,
        },
      };

      const state = {
        filterOptions: {
          showInactive: true,
        },
      };

      const actual = contactListReducer(state, action);

      expect(actual.loadMoreButtonStatus).toEqual(LoadMoreButtonStatuses.HIDDEN);
    });

    it('sets loadMoreButtonStatus to SHOWN if hasNextPage is true in action', () => {
      const action = {
        intent: SORT_AND_FILTER_CONTACT_LIST,
        entries: [
          {
            id: '1',
            name: 'Alex',
          },
          {
            id: '3',
            name: 'Justin',
          },
        ],
        pagination: {
          hasNextPage: true,
        },
      };

      const state = {
        filterOptions: {
          showInactive: true,
        },
      };

      const actual = contactListReducer(state, action);

      expect(actual.loadMoreButtonStatus).toEqual(LoadMoreButtonStatuses.SHOWN);
    });
  });
});
